import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IUser } from '../data/model/user.model';
import { Observable, of } from 'rxjs';
import {
  NzUploadChangeParam,
  NzUploadFile,
  NzUploadModule,
} from 'ng-zorro-antd/upload';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { UrlService } from 'src/app/shared/util-logger/url.service';
import { UserComponent } from '../user.component';
import { UsersService } from '../data/services/users.service';
import { Router } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormSubmitButtonsComponent } from 'src/app/shared/ui-common/form-submit-buttons/form-submit-buttons.component';
import { TruncatePipe } from 'src/app/shared/util-common/pipes/truncate.pipe';
import { NzFormModule } from 'ng-zorro-antd/form';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

@Component({
  selector: 'app-add-user',
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
    NzIconModule,
    NzFormModule,

    // project
    UserComponent,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  // props
  previewImage: string | undefined = '';
  previewVisible = false;
  showButton = true;
  fileList: any[] = [];

  userList$!: Observable<IUser[]>;
  form!: FormGroup;
  hasError!: boolean;
  showPassword = false;
  showcPassword = false;
  isLoading$!: Observable<boolean>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly userService = inject(UsersService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly urlService = inject(UrlService);
  private readonly messageService = inject(MessageService);

  ngOnInit() {
    this.initForm();
  }

  get f() {
    return this.form.controls;
  }

  initForm(): FormGroup {
    return (this.form = this.fb.group({
      userId: [0],
      name: ['', [Validators.required]],
      passWord: ['', [Validators.required]],
      cPassword: ['', [Validators.required]],
      address: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: [],
      file: [],
    }));
  }

  onTogglePassword() {
    this.showPassword = !this.showPassword;
  }
  onTogglecPassword() {
    this.showcPassword = !this.showcPassword;
  }

  handleChange(info: NzUploadChangeParam): void {
    console.log('set file', info);
    if (!info.fileList[0]) {
      return this.messageService.createMessage('error', 'Please select file.');
    }
    // this.fileList.push(info.fileList[0])
    this.form.patchValue({
      file: info?.['file']?.originFileObj,
    });
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    console.log('sel file', file);
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  // save member
  onSave(): void {
    this.hasError = false;
    console.log('saving form values', this.form.value);

    this.userService.saveUser(this.form.value).subscribe((user: IUser[]) => {
      console.log('member', user);

      this.messageService.createMessage(
        'success',
        'Member added successfully.'
      );
      this.form.reset();
      this.previewImage = '';
      this.userList$ = of(user);
    });
  }

  onCancel(): void {
    console.log('cancel');
    this.router.navigate(['/home']);
  }
}
