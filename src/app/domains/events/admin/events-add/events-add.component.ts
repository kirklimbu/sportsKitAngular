
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  inject,
  OnInit,
  DestroyRef,

} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { map, switchMap, takeUntil } from 'rxjs/operators';

import { Observable, ReplaySubject, of } from 'rxjs';

// third-party
// import { CalendarModule } from 'primeng/calendar';
// import {
//   ImageCroppedEvent,
//   ImageCropperModule,
//   LoadedImage,
// } from 'ngx-image-cropper';
import { FormSubmitButtonsComponent } from 'src/app/shared/ui-common/form-submit-buttons/form-submit-buttons.component';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { Store } from '@ngxs/store';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EventsService } from '../../data/services/events.service';
import { TruncatePipe } from 'src/app/shared/util-common/pipes/truncate.pipe';
import { converterDate } from 'src/app/shared/util-logger/convert-date';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  NzUploadFile,
  NzUploadChangeParam,
  NzUploadModule,
} from 'ng-zorro-antd/upload';
import {
  NepaliDatepickerModule,
  NepaliDatepickerService,
} from 'nepali-datepicker-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { EventsListComponent } from '../events-list/events-list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CustomResponse } from 'src/app/shared/models/CustomResponse.model';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

@Component({
  selector: 'app-events-add',
  standalone: true,
  imports: [
    CommonModule,
    TruncatePipe,
    ReactiveFormsModule,
    // CalendarModule,
    // ImageCropperModule,
    // project
    FormSubmitButtonsComponent,
    // third-party
    NzInputModule,
    NzUploadModule,
    NzModalModule,
    NzIconModule,
    NepaliDatepickerModule,
    EventsListComponent,
  ],
  templateUrl: './events-add.component.html',
  styleUrls: ['./events-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsAddComponent implements OnInit {
  previewImage: string | undefined = '';
  previewVisible = false;
  showButton = true;
  fileList: any[] = [];
  date: any;

  form!: FormGroup;
  addedFiles: any[] = [];
  mode = 'add';

  eventId$!: Observable<number>;
  event$!: Observable<any>;

  private _nepaliDatepickerService = inject(NepaliDatepickerService);
  private readonly unsubscribe$ = inject(DestroyRef)
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly eventService = inject(EventsService)
  private readonly cd = inject(ChangeDetectorRef)

  ngOnInit(): void {
    this.buildForm();
    this.checkFormStatus();
  }

  get f() {
    return this.form.controls;
  }



  private checkFormStatus() {
    this.eventId$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => Number(params.get('id')))
    );
    this.eventId$.pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {
        console.log('event add res', _res);

        if (_res > 0) this.mode = 'edit';
        this.edit();
      });
  }


  /**
   *
   * edit
   */
  edit() {
    this.event$ = this.eventId$.pipe(
      switchMap((query: number) => this.eventService.getFormValues(query))
    );
    this.event$.pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {
        console.log('res', _res);

        this.form.patchValue(_res);
        if (_res.form.eventId == 0) {
          this.fileList = []
          this.previewImage = _res.form.profilePic;
          this.date = null;
          return;
        }

        this.fileList = [
          {
            traineeId: _res.form.eventId,
            name: _res.form.title,
            status: 'done',
            url: _res.form.image,
          },
        ];
        const BSDate = this._nepaliDatepickerService.BSToAD(
          _res.form.eventDate,
          'yyyy/mm/dd'
        );
        this.date = new Date(BSDate);
      });
  }

  private buildForm() {
    this.form = this.fb.group({
      eventId: [0],
      title: ['', [Validators.required]],
      description: [''],
      eventDate: [],
      startTime: [],
      ticketPrice: [0],
      file: ['', [Validators.required]],
    });
  }

  handleChange(info: NzUploadChangeParam): void {
    // console.log('set file', info);
    if (!info.fileList[0]) {
      return this.messageService.createMessage('error', 'Please select file.');
    }
    // this.fileList.push(info.fileList[0])
    this.form.patchValue({
      file: info?.['file']?.originFileObj,
    });

    // on Delete
    if (info.file.status === 'removed') {
      this.onDeleteFile(info.file['eventId']);
    }
  }

  onDeleteFile(docId: number): void {
    this.addedFiles = this.addedFiles.filter(
      (_deletedFile: any) => _deletedFile.docId !== docId
    );
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
    this.form.patchValue({ eventDate: $event });
  }
  updateEnglishDate($event: string) {
    // console.log('updaet eng', $event);
  }
  onDateChange($event: string) {
    // console.log('date', $event);
  }

  onSave() {
    // this.checkNull('eventDate');
    console.log('form val', this.form.value);

    this.event$ = this.eventService
      .addEvent(this.form.value);
    this.event$.pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: CustomResponse) => {
        console.log('res', _res);
        if (_res) {

          this.messageService.createMessage(
            'success',
            _res.message
          );
          this.router.navigate(['/admin/events'])
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
    if (value != 'eventDate') {
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
    if (value != 'eventDate') return;

    const convertedDate = converterDate(
      this.form.controls['eventDate'].value,
      'yyyy/MM/dd',
      'en'
    );
    this.form.patchValue({
      eventDate: convertedDate,
    });
  }
}
