import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map, switchMap } from 'rxjs';
import { ITraining } from '../../training/data/model/training.model';
import { NepaliDatepickerModule, NepaliDatepickerService } from 'nepali-datepicker-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { ITrainee } from '../data/model/trainee.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TraineeService } from '../data/services/trainee.service';


const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
@Component({
  selector: 'app-add-trainee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // third-party
    NzUploadModule,
    NzModalModule,
    NzSelectModule,
    NzIconModule,
    NepaliDatepickerModule,
  ],
  templateUrl: './add-trainee.component.html',
  styleUrl: './add-trainee.component.scss',
})
export class AddTraineeComponent {

  mode = 'add';
  previewVisible = false;
  previewImage: string | undefined = '';
  trainingMasterId!: number
  form!: FormGroup;
  trainingId$!: Observable<any>;
  member$!: Observable<any>;
  trainingList$!: Observable<ITraining[]>;

  fileList: any[] = [];
  trainingType: any[] = [];
  memberId$!: Observable<unknown>;
  trainee$!: Observable<any>;
  traineeList$!: Observable<ITrainee[]>;
  isLoading$!: Observable<boolean>;
  date: any;

  private readonly _nepaliDatepickerService = inject(NepaliDatepickerService);
  private readonly traineeService = inject(TraineeService);
  private readonly unsubscribe$ = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    this.initForm();
    this.checkFormStatus()
  }

  get f() {
    return this.form.controls;
  }

  private initForm(): FormGroup {
    return (this.form = this.fb.group({
      traineeId: [0],
      trainingMasterId: [0],
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: [],
      address: [],
      dob: ['', [Validators.required]],
      file: [],
      statusId: [],
    }));
  }


  private checkFormStatus() {
    this.memberId$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => {
        const trainingMasterId = Number(params.get('id'))
        const traineeId = Number(params.get('traineeId'))
        this.trainingMasterId = trainingMasterId
        return { trainingMasterId, traineeId }
      }
      )
    );
    this.memberId$.pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {
        console.log('query res', _res);

        if (_res > 0) this.mode = 'edit';
        this.edit();
      });
  }

  handleChange(info: NzUploadChangeParam): void {

    // if (!info.fileList[0]) {
    //   return this.messageService.createMessage('error', 'Please select file.');
    // }

    this.form.patchValue({
      file: info?.['file']?.originFileObj,
    });
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {

    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  // nepali date picker
  updateNepaliDate($event: string) {
    this.form.patchValue({ dob: $event });
  }
  updateEnglishDate($event: string) {
    console.log('updaet eng', $event);
  }
  onDateChange($event: string) {
    console.log('date', $event);
  }


  // save member
  onSave(): void {

    this.traineeService
      .saveTrainee(this.form.value)
      .pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((user: ITrainee[]) => {
        this.messageService.createMessage(
          'success',
          'Trainee added successfully.'
        );
        this.router.navigate(['/admin/trainee'])
      });
  }

  private edit() {
    this.member$ = this.memberId$.pipe(
      switchMap((query: unknown) => this.traineeService.getFormValues(query))
    );
    this.member$.pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {

        console.log('trainee add', _res);

        this.trainingType = _res.memberShipTypeList
        this.form.patchValue(_res.form);
        // traineeId

        if (_res.form.traineeId == 0) {
          this.fileList = []
          this.previewImage = _res.form.profilePic;
          this.date = null;
          return;
        }

        this.fileList = [
          {
            traineeId: _res.form.traineeId,
            name: _res.form.name,
            status: 'done',
            url: _res.form.profilePic,
          },
        ];
        const BSDate = this._nepaliDatepickerService.BSToAD(
          _res.form.dob,
          'yyyy/mm/dd'
        );
        this.date = new Date(BSDate);

        // this.cd.detectChanges();
      });
  }

  private resetForm(): void {
    this.form.reset();
    this.date = new Date();
    this.fileList = [];
  }
}
