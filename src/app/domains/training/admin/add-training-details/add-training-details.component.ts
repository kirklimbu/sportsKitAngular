import { ITrainingDetail2 } from './../../data/model/training-detail2.model';
import { TrainingService } from './../../data/services/training.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import {
  NepaliDatepickerModule,
  NepaliDatepickerService,
} from 'nepali-datepicker-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  Observable,
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
} from 'rxjs';
import { converterDate } from 'src/app/shared/util-logger/convert-date';
import { MessageService } from 'src/app/shared/util-logger/message.service';

import {
  ActivatedRoute,
  ParamMap,
  Router,
  RouterModule,
} from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ITrainingDetail } from '../../data/model/training-detail.model';
import { NzListModule } from 'ng-zorro-antd/list';
import { YouTubePlayer } from '@angular/youtube-player';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-training-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NepaliDatepickerModule,
    NzModalModule,
    NzListModule,
    YouTubePlayer,
  ],
  templateUrl: './add-training-details.component.html',
  styleUrl: './add-training-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTrainingDetailsComponent implements OnInit {
  form!: FormGroup;
  mode = 'add';
  videoId!: string;
  trainingMasterId!: number;
  trainingDetailId!: number;
  showDetails = 'false';
  trainingDetails!: ITrainingDetail;
  fileList: any[] = [];
  date: any;
  items: any;
  isVisible = false;
  isLoading = false;

  trainingDetails$!: Observable<ITrainingDetail2[]>;
  trainingMasterId$!: Observable<any>;
  private _nepaliDatepickerService = inject(NepaliDatepickerService);
  private readonly unsubscribe$ = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly trainingService = inject(TrainingService);
  private readonly route = inject(ActivatedRoute);
  private readonly modal = inject(NzModalService);
  private readonly router = inject(Router);
  private readonly cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.buildForm();
    this.checkFormStatus();
  }

  private buildForm() {
    this.form = this.fb.group({
      trainingDetailId: [0],
      trainingMasterId: [0],
      title: ['', [Validators.required]],
      description: [''],
      startDate: [],
      subDetailList: this.fb.array([
        // this.fb.group({
        //   link: [''],
        //   trainingSubDetailId: [],
        //   trainingDetailId: [],
        //   trainingMasterId: [],
        // })
      ]),
    });
  }

  get f() {
    return this.form.controls;
  }

  get subDetail(): FormArray {
    return this.form.get('subDetailList') as FormArray;
  }

  // // Helper method to get the 'subItems' FormArray inside an 'item'
  addSubDetail() {
    const subDetail: FormGroup = this.fb.group({
      link: [''],
      trainingSubDetailId: [],
      trainingDetailId: [this.trainingDetailId],
      trainingMasterId: [this.trainingMasterId],
    });
    subDetail.controls['link'].valueChanges
      .pipe(
        distinctUntilChanged(),
        shareReplay(1),
        takeUntilDestroyed(this.unsubscribe$)
      )
      .subscribe((value) => {
        console.log('link change', value);
      });

    // Add the new sub-item form group to the nested FormArray
    this.subDetail.push(subDetail);
  }

  showModal(): void {
    this.isVisible = true;
  }

  onRemoveLink(id: number): void {
    this.isLoading = true;
    this.trainingService
      .deleteLink({ trainingSubDetailId: id })
      .pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res) => {
        if (_res.message) {
          this.messageService.createMessage('success', _res.message);
          this.isVisible = false;
          this.isLoading = false;
        }
        this.cd.detectChanges();
      });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  private checkFormStatus() {
    this.trainingMasterId$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => {
        const masterId = Number(params.get('id'));
        const detailId = Number(params.get('detailId'));
        const view = params.get('view');
        return {
          trainingMasterId: masterId,
          trainingDetailId: detailId || 0,
          showDetails: view,
        };
      })
    );
    this.trainingMasterId$
      .pipe(
        distinctUntilChanged(),
        shareReplay(1),
        takeUntilDestroyed(this.unsubscribe$)
      )
      .subscribe((_res: any) => {
        console.log('res', _res);
        this.trainingMasterId = _res.trainingMasterId;
        this.trainingDetailId = _res.trainingDetailId;
        this.showDetails = _res.showDetails;
        this.edit();
      });
  }

  // #BUG onEdit failed to patch trainingSubDetailId
  edit() {
    this.trainingDetails$ = this.trainingMasterId$.pipe(
      switchMap((query: number) =>
        this.trainingService.getDetailFormValues(query)
      )
    );
    this.trainingDetails$
      .pipe(
        distinctUntilChanged(),
        shareReplay(1),
        takeUntilDestroyed(this.unsubscribe$)
      )
      .subscribe((_res: any) => {
        // console.log('default form res', _res);
        this.form.patchValue(_res.form);
        // this.trainingDetails = _res.form

        this.getYoutubeVideoLink(_res);

        // patch formArray on edit
        _res.form.subDetailList.forEach((detail: string) => {
          console.log('subDetailList link', detail);

          this.subDetail.push(this.fb.group(detail));
        });

        // date
        if (!_res.form.startDate) {
          // this.date = new Date();
          return;
        }
        const BSDate = this._nepaliDatepickerService.BSToAD(
          _res.form.startDate,
          'yyyy/mm/dd'
        );
        this.date = new Date(BSDate);
        this.cd.detectChanges();
      });
  }

  getYoutubeVideoLink(data: any) {
    // console.log('data', data);
    // start from here
    const regex =
      /^https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|)([^&\s]+)/;
    this.trainingDetails = data.form;
    this.trainingDetails.subDetailList.forEach((subDetail: any) => {
      const match = subDetail.link.match(regex);
      if (match && match[1]) {
        subDetail.ytlink = match[1];
      }

      // console.log('fila data', this.trainingDetails);
    });
  }

  // nepali date picker
  updateNepaliDate($event: string) {
    this.form.patchValue({ startDate: $event });
  }
  updateEnglishDate($event: string) {
    // console.log('updaet eng', $event);
  }
  onDateChange($event: string) {
    // console.log('date', $event);
  }

  onSave() {
    console.log('form ', this.form.value);

    this.checkNull('startDate');
    console.log('form val', this.form.value);

    this.trainingService
      .saveTrainingDetails(this.form.value)
      .pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {
        console.log('res', _res);
        if (_res) {
          this.messageService.createMessage('success', _res.message);
          // trainingMasterId
          this.router.navigate(['admin/training/detail'], {
            queryParams: { id: this.trainingMasterId },
          });
        }
      });
  }

  private checkNull(value: string): void {
    this.form.controls[`${value}`].value === null
      ? this.assignFormValue(value)
      : this.convertDate(value);
  }
  /**
   *
   * @param value
   */

  private assignFormValue(value: any): void {
    if (value != 'startDate') {
      this.form.patchValue({
        [`${value}`]: 0,
      });
    }
  }

  /**
   *
   * @param value
   * @returns
   */
  private convertDate(value: string): void {
    if (value != 'startDate') return;

    const convertedDate = converterDate(
      this.form.controls['startDate'].value,
      'yyyy/MM/dd',
      'en'
    );
    this.form.patchValue({
      startDate: convertedDate,
    });
  }
}
