
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable, map, switchMap } from 'rxjs';
import {
  NzUploadChangeParam,
  NzUploadFile,
  NzUploadModule,
} from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ImageUploadDirective } from 'src/app/shared/util-common/directives/image-upload.directive';
import { MemberService } from '../data/services/member.service';
import { AllMembersComponent } from '../all-members.component';
import { IMember } from '../data/models/member.model';
// import { NepaliDatepickerModule } from 'nepali-datepicker-angular';
import { NepaliDatepickerModule, NepaliDatepickerService } from 'nepali-datepicker-angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleCaseDirective } from 'src/app/shared/util-common/directives/titleCase.directive';
import { CustomResponse } from 'src/app/shared/models/CustomResponse.model';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

@Component({
  selector: 'app-member-entry',
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
    // project
    AllMembersComponent,
    TitleCaseDirective
  ],
  templateUrl: './member-entry.component.html',
  styleUrl: './member-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberEntryComponent implements OnInit {
  // props
  mode = 'add';
  previewImage: string | undefined = '';
  previewVisible = false;
  showButton = true;
  fileList: any[] = [];

  form!: FormGroup;
  hasError!: boolean;
  showPassword = false;
  showcPassword = false;

  memberShipType: any[] = []
  memberId$!: Observable<number>;
  member$!: Observable<any>;
  memberList$!: Observable<IMember[]>;
  isLoading$!: Observable<boolean>;
  date: any = null;

  private readonly _nepaliDatepickerService = inject(NepaliDatepickerService);
  private readonly memberService = inject(MemberService);
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
  // 

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  initForm(): FormGroup {
    return (this.form = this.fb.group({
      memberId: [0],
      address: [],
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      memberShipTypeId: ['', [Validators.required]],
      mobile1: ['', [Validators.required]],
      file: [],
      mobile2: [],
    }));
  }

  private checkFormStatus() {
    this.memberId$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => Number(params.get('id')))
    );
    this.memberId$.pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {
        if (_res > 0) this.mode = 'edit';
        this.edit();
      });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.form.patchValue({
      file: file
    });
    return false;
  };

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

    console.log('form', this.form.value);

    this.memberService
      .saveMember(this.form.value)
      .pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((res: CustomResponse) => {
        this.messageService.createMessage(
          'success',
          res.message,
          7_000
        );
        this.router.navigate(['/admin/list-member'])
      });
  }

  edit() {
    this.member$ = this.memberId$.pipe(
      switchMap((query: number) => this.memberService.getFormValues(query))
    );
    this.member$.pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {
        console.log('memer res', _res);

        this.memberShipType = _res.memberShipTypeList
        this.form.patchValue(_res.form);
        if (_res.form.memberId == 0) {
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

}

