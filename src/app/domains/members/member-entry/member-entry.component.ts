import { Component, DestroyRef, ElementRef, Renderer2, inject, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomResponse } from 'src/app/shared/models/CustomResponse.model';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/shared/util-auth/services/auth-http/auth.service';
import { ConfirmedValidator } from 'src/app/shared/util-logger/confirm-password.validator';
import { UrlService } from 'src/app/shared/util-logger/url.service';
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ImageUploadDirective } from 'src/app/shared/util-common/directives/image-upload.directive';
import { MemberService } from '../data/services/member.service';
import { AllMembersComponent } from '../all-members.component';
import { IMember } from '../data/models/member.model';
import { NepaliDatepickerModule } from 'nepali-datepicker-angular';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-member-entry',
  standalone: true,
  imports: [
    CommonModule,
    NzUploadModule,
    NzModalModule,
    NzSelectModule,
    NzIconModule,
    ImageUploadDirective,
    ReactiveFormsModule,
    // third-party
    NepaliDatepickerModule,
    // project
    AllMembersComponent,
  ],
  templateUrl: './member-entry.component.html',
  styleUrl: './member-entry.component.scss',
})
export class MemberEntryComponent implements OnInit {

  // props
  previewImage: string | undefined = '';
  previewVisible = false;
  showButton = true
  fileList: any[] = []



  memberList$!: Observable<IMember[]>
  form!: FormGroup;
  hasError!: boolean;
  showPassword = false;
  showcPassword = false;
  isLoading$!: Observable<boolean>;

  destroyRef = inject(DestroyRef)
  memberService = inject(MemberService)

  date: any = new Date()

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public urlService: UrlService,
    public messageService: MessageService,

  ) {

  }

  ngOnInit(): void {
    this.initForm();
  }


  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  initForm(): FormGroup {
    return this.form = this.fb.group({
      memberId: [0],
      name: ['', [Validators.required,]],
      dob: ['', [Validators.required]],
      memberShipTypeId: ['', [Validators.required]],
      file: [],
      mobile1: [],
      mobile2: [],

    },

    );
  }


  handleChange(info: NzUploadChangeParam): void {
    console.log('set file', info);
    if (!info.fileList[0]) {
      return this.messageService.createMessage('error', 'Please select file.')
    }
    // this.fileList.push(info.fileList[0])
    this.form.patchValue({
      file: info?.['file']?.originFileObj
    })
    // this.previewVisible = true
    // if (info.type = "removed") {
    //   // this.fileList.length = 0
    //   this.showButton = true
    // } else {
    //   this.showButton = false;
    // }
    // if (info.file.status !== 'uploading') {
    //   console.log(info.file, info.fileList);
    // }
    // if (info.file.status === 'done') {
    //   this.msg.success(`${info.file.name} file uploaded successfully`);
    // } else if (info.file.status === 'error') {
    //   this.msg.error(`${info.file.name} file upload failed.`);
    // }
  }


  handlePreview = async (file: NzUploadFile): Promise<void> => {
    console.log('sel file', file);
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  // nepali date picker
  updateNepaliDate($event: string) {
    console.log('updaet nepali', $event);
    this.form.patchValue({ "dob": $event })
  }
  updateEnglishDate($event: string) {
    console.log('updaet eng', $event);
  }
  onDateChange($event: string) {
    console.log('date', $event);
  }

  // save member
  onSave(): void {
    this.hasError = false;
    console.log('saving form values', this.form.value);

    this.memberService.saveMember(this.form.value)
      .subscribe((user: IMember[]) => {
        console.log('member', user,);

        this.messageService.createMessage('success', 'Member added successfully.')
        this.form.reset();
        this.previewImage = '';
        this.date = new Date();
        this.memberList$ = of(user)
      });
  }

  onCancel(): void {
    console.log('cancel');
    this.router.navigate(['/home'])

  }

}


