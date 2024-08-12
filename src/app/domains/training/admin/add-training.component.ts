import { ITraining } from 'src/app/domains/training/data/model/training.model';
import { ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NepaliDatepickerModule, NepaliDatepickerService } from 'nepali-datepicker-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { Observable, map, switchMap } from 'rxjs';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { MemberService } from '../../members/data/services/member.service';
import { TrainingService } from '../data/services/training.service';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';


@Component({
  selector: 'app-add-training',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // third-party
    NzUploadModule,
    NzModalModule,
    NzSelectModule,
    NzIconModule,
    NzCheckboxModule,
    NepaliDatepickerModule,],
  templateUrl: './add-training.component.html',
  styleUrl: './add-training.component.scss',
})
export class AddTrainingComponent implements OnInit {
  // props
  mode = 'add';
  form!: FormGroup;
  date: any = new Date();
  trainingId$!: Observable<any>;
  member$!: Observable<any>;
  trainingList$!: Observable<ITraining[]>;
  trainingType: any


  private readonly _nepaliDatepickerService = inject(NepaliDatepickerService);
  private readonly trainingService = inject(TrainingService);
  private readonly unsubscribe$ = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);


  ngOnInit(): void {
    this.initForm();
    this.checkFormStatus();
  }
  // 

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  initForm(): FormGroup {
    return (this.form = this.fb.group({
      trainingMasterId: [],
      title: [],
      typeId: ['', [Validators.required]],
      trainer: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      fromTime: [],
      toTime: [],
      fee: [],
      hasStopReg: [],
    }));
  }



  private checkFormStatus() {
    this.trainingId$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => {
        const id = Number(params.get('id'))
        return { trainingMasterId: id }
      })
    );
    this.trainingId$.pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {
        console.log('rs', _res);

        if (_res.trainingMasterId > 0) this.mode = 'edit';
        this.edit();
      });
  }



  // nepali date picker
  updateNepaliDate($event: string, type: string) {

    type === 'start' ? this.form.patchValue({ startDate: $event }) : this.form.patchValue({ endDate: $event })
  }


  updateEnglishDate($event: string, type: string) {
    console.log('updaet eng', $event);
  }
  onDateChange($event: string) {
    console.log('date', $event);
  }


  // save member
  onSave(): void {

    this.trainingService
      .saveTraining(this.form.value)
      .pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((user: ITraining[]) => {
        this.messageService.createMessage(
          'success',
          'Training added successfully.'
        );
        this.form.reset();
        this.date = new Date();

      });
  }

  private edit() {
    this.trainingList$ = this.trainingId$.pipe(
      switchMap((query: number) => this.trainingService.getFormValues(query))
    );
    this.trainingList$.pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {
        this.trainingType = _res.trainingTypeList;
        this.form.patchValue(_res.form);

        if (!_res.form.startDate) {
          this.date = new Date();
          return;
        }

        const BSDate = this._nepaliDatepickerService.BSToAD(
          _res.form.startDate,
          'yyyy/mm/dd'
        );
        this.date = new Date(BSDate);
      });
  }


}
