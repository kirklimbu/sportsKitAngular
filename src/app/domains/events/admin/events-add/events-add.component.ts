import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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

import {
  exhaustMap,
  map,
  shareReplay,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { Observable } from 'rxjs';

// third-party
// import { CalendarModule } from 'primeng/calendar';
// import {
//   ImageCroppedEvent,
//   ImageCropperModule,
//   LoadedImage,
// } from 'ngx-image-cropper';
import { FormSubmitButtonsComponent } from 'src/app/shared/ui-common/form-submit-buttons/form-submit-buttons.component';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EventsService } from '../../data/services/events.service';
import { TruncatePipe } from 'src/app/shared/util-common/pipes/truncate.pipe';
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
import { IEvents } from '../../data/events.model';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

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
    NzCheckboxModule,
    NepaliDatepickerModule,
    EventsListComponent,
  ],
  templateUrl: './events-add.component.html',
  styleUrls: ['./events-add.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
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

  avatarUrl: string | undefined;
  loading = false;

  eventId$!: Observable<object>;
  event$!: Observable<IEvents>;

  private _nepaliDatepickerService = inject(NepaliDatepickerService);
  private readonly unsubscribe$ = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly eventService = inject(EventsService);
  private readonly cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.buildForm();
    this.initFormMode();
  }

  private buildForm() {
    this.form = this.fb.group({
      eventId: [],
      title: ['', [Validators.required]],
      description: [''],
      eventDate: [],
      startTime: [],
      ticketPrice: [0],
      hasActive: [],
      file: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  handleChange(info: { file: NzUploadFile }): void {
    console.log('handle change');

    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        console.log('handel chg err');

        // this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  beforeUpload = (file: any): boolean => {
    this.form.patchValue({
      file: file,
    });

    this.getBase64(file, (img: string) => {
      this.loading = false;
      this.avatarUrl = img;
    });
    // this.cd.detectChanges();
    return false;
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private initFormMode(): void {
    this.eventId$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => {
        const id = Number(params.get('id'));
        return { eventId: id };
      }),
      shareReplay(1)
    );
    this.eventId$
      .pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {
        console.log('res', _res);

        if (_res) this.edit();
      });
  }

  /**
   *
   * edit
   */
  edit() {
    this.event$ = this.eventId$.pipe(
      switchMap((query: object) => this.eventService.getFormValues(query)),
      tap(() => console.log('API call made')),
      take(1) // take only the first response
    );
    this.event$

      .pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {
        // console.log('res', _res);

        if (_res.eventId > 0) {
          this.mode = 'edit';
        }

        this.form.patchValue(_res);
        if (_res.eventId == 0) {
          this.fileList = [];
          this.previewImage = _res.profilePic;
          this.date = null;
          return;
        }

        this.fileList = [
          {
            eventId: _res.eventId,
            name: _res.title,
            status: 'done',
            url: _res.image,
          },
        ];
        const BSDate = this._nepaliDatepickerService.BSToAD(
          _res.eventDate,
          'yyyy/mm/dd'
        );
        this.date = new Date(BSDate);
        this.cd.detectChanges();
      });
  }

  onSave() {
    // this.checkNull('eventDate');

    this.eventService
      .addEvent(this.form.value)
      .pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: CustomResponse) => {
        if (_res) {
          this.messageService.createMessage('success', _res.message);
          this.router.navigate(['/admin/events']);
        }
      });
  }

  private getEventIdFromRoute(): Observable<number> {
    return this.route.queryParamMap.pipe(
      map((params: ParamMap) => Number(params.get('id'))),
      shareReplay(1)
    );
  }

  // handleChange(info: NzUploadChangeParam): void {
  //   console.log('set file', info);
  //   if (!info.fileList[0]) {
  //     return this.messageService.createMessage('error', 'Please select file.');
  //   }
  //   // this.fileList.push(info.fileList[0])
  //   this.form.patchValue({
  //     file: info?.['file']?.originFileObj,
  //   });

  //   // on Delete
  //   if (info.file.status === 'removed') {
  //     this.onDeleteFile(info.file['eventId']);
  //   }
  // }

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
}
