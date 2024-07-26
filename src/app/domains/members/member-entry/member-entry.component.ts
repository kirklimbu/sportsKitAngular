import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomResponse } from 'src/app/shared/models/CustomResponse.model';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/util-auth/services/auth-http/auth.service';
import { ConfirmedValidator } from 'src/app/shared/util-logger/confirm-password.validator';
import { UrlService } from 'src/app/shared/util-logger/url.service';
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { log } from 'console';
import { ImageUploadDirective } from 'src/app/shared/util-common/directives/image-upload.directive';
import { MemberService } from '../services/member.service';
import { toFormData } from 'src/app/shared/util-common/toFormData';
@Component({
  selector: 'app-member-entry',
  standalone: true,
  imports: [CommonModule,
    NzUploadModule,
    NzModalModule,
    NzSelectModule,
    ImageUploadDirective,
    ReactiveFormsModule

  ],
  templateUrl: './member-entry.component.html',
  styleUrl: './member-entry.component.scss',
})
export class MemberEntryComponent {


  previewImage: string | undefined = '';
  previewVisible = false;
  fileList: any[] = []
  form!: FormGroup;
  hasError!: boolean;
  showPassword = false;
  showcPassword = false;
  isLoading$!: Observable<boolean>;

  destroyRef = inject(DestroyRef)
  memberService = inject(MemberService)

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
      name: [
        '', [Validators.required,]
        ,
      ],
      dob: [
        '', [Validators.required
        ]
      ],
      memberShipTypeId: ['', [Validators.required]],
      file: [],
      mobile: [],

    },

    );
  }

  handleChange(info: NzUploadChangeParam): void {
    console.log('sel file', info);
    if (!info.fileList[0]) {
      return this.messageService.createMessage('error', 'Please select file.')
    }
    this.fileList.push(info.fileList[0])
    this.form.patchValue({
      file: info?.['file']?.originFileObj
    })
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
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


  onSave(): void {
    this.hasError = false;
    console.log('saving form values', this.form.value);

    this.memberService.saveMember(this.form.value)
      .subscribe((user: CustomResponse) => {
        console.log('member', user,);
        debugger
        this.messageService.createMessage('success', user.message)
        // this.router.navigate(['/auth/profile'])

      });
  }

  onCancel(): void {
    console.log('cancel');
    this.router.navigate(['/home'])

  }



  onImageUpload(file: any, fileName: string,) {
    console.log('file', fileName);

    if (file) {
      const fileNames = ["questionFile1", "questionFile2", "optionAttchmentA", "optionAttchmentB", "optionAttchmentC", "optionAttchmentD"];
      if (fileNames.includes(fileName)) {
        this.form.patchValue({
          [fileName]: file
        })
      }
    }
  }

}
function getBase64(arg0: File): any {
  throw new Error('Function not implemented.');
}

