import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
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
import { AuthState } from '../../../auth/login/state/login.state';
import { Store } from '@ngxs/store';
import { Messages } from 'src/app/shared/util-logger/messages.enum';
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
  date: any = new Date();

  form!: FormGroup;
  addedFiles: any[] = [];
  croppedImage: any = '';
  defaultImg = 'https://bulma.io/images/placeholders/480x480.png';
  fileName = 'FILE NOT SELECTED';
  showCropper = false;
  enableUpload = false;
  finalImage: unknown;
  values: unknown[] = [{ value: '' }];
  imageChangedEvent: any = '';
  mode = 'add';
  isLoading = false;
  errorMessage: string | undefined;

  eventId$!: Observable<number>;
  event$!: Observable<any>;

  private readonly unsubscribe$: ReplaySubject<boolean> = new ReplaySubject(1);
  @ViewChild('fileInput', { static: false }) selectedFile!: ElementRef;
  @ViewChild('cropper', { static: false }) private scrollCropper!: ElementRef;

  private _nepaliDatepickerService = inject(NepaliDatepickerService);
  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private fb: FormBuilder,
    private eventService: EventsService,
    private messageService: MessageService,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.buildForm();
    // if (this.mode === 'edit') return this.edit();
    this.checkFormStatus();
  }
  get f() {
    return this.form.controls;
  }

  /**
   * check authentication
   */

  private checkFormStatus() {
    this.eventId$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => Number(params.get('id')))
    );
    this.eventId$.pipe(takeUntil(this.unsubscribe$)).subscribe((_res: any) => {
      console.log('fomn res', _res);
      if (_res) {
        this.mode = 'edit';
        this.edit();
      }
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
    this.event$.pipe(takeUntil(this.unsubscribe$)).subscribe((_res: any) => {
      // console.log('fomn res', _res);
      this.form.patchValue(_res);
      this.fileList = [
        {
          eventId: _res.eventId,
          name: _res.title,
          status: 'done',
          url: _res.image,
        },
      ];
      this.previewImage = _res.image;
      const BSDate = this._nepaliDatepickerService.BSToAD(
        _res.eventDate,
        'yyyy/mm/dd'
      );
      this.date = new Date(BSDate);
      this.changeDetector.detectChanges();
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

  resetFile(): void {
    this.croppedImage = '';
    this.fileName = 'No file selected';
    this.selectedFile.nativeElement.value = null;
    this.showCropper = false;
    this.enableUpload = false;
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    // console.log('sel file', file);
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  // nepali date picker
  updateNepaliDate($event: string) {
    // console.log('updaet nepali', $event);
    this.form.patchValue({ eventDate: $event });
  }
  updateEnglishDate($event: string) {
    // console.log('updaet eng', $event);
  }
  onDateChange($event: string) {
    // console.log('date', $event);
  }

  onSave() {
    this.checkNull('eventDate');
    this.isLoading = true;
    console.log('form val', this.form.value);

    this.eventService
      .addEvent(this.form.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((_res: any) => {
        console.log('res', _res);

        this.croppedImage = '';
        // this.isLoading = false;
        if (_res) {
          // route to vendor home page
          this.messageService.createMessage(
            'success',
            'Event added successfully.'
          );
          // this.onCancel();
          this.form.reset();
          this.previewImage = '';
          this.date = new Date();
          this.event$ = of(_res);
          // location.reload();
          // this.router.navigate(['/auth/list-event']);
          // scroll2Top();
          this.changeDetector.detectChanges();
        }
      });
  }

  /**
   * cancel
   */
  onCancel(): void {
    if (this.form.value) {
      this.form.reset();
      this.form.patchValue({
        fileList: null,
      });
      this.fileName = 'No file selected';
      this.mode = 'add';
    }
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
