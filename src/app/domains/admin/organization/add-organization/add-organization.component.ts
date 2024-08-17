import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { OrganizationService } from '../data/services/organization.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  NzUploadChangeParam,
  NzUploadFile,
  NzUploadModule,
} from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormSubmitButtonsComponent } from 'src/app/shared/ui-common/form-submit-buttons/form-submit-buttons.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, takeUntil } from 'rxjs';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

@Component({
  selector: 'app-add-organization',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    // third-party
    NzInputModule,
    NzUploadModule,
    NzModalModule,
    NzIconModule,
    FormSubmitButtonsComponent,
  ],
  templateUrl: './add-organization.component.html',
  styleUrl: './add-organization.component.scss',
})
export class AddOrganizationComponent implements OnInit {
  // props
  form!: FormGroup;
  mode = 'add';
  previewImage: string | undefined = '';
  previewVisible = false;
  fileList: any[] = [];
  addedFiles: any[] = [];
  avatarUrl: string | undefined;
  loading = false;


  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly organizationService = inject(OrganizationService);
  private readonly destoyref$ = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly unsubscribe$ = inject(DestroyRef);

  ngOnInit(): void {
    this.buildForm();
    this.fetchFormValues();
  }

  private buildForm() {
    this.form = this.fb.group({
      orgId: [0],
      name: ['', [Validators.required]],
      bio: [''],
      address: [''],
      mobile: [],
      emailOne: [],
      emailTwo: [],
      latitude: [],
      longitude: [],
      file: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  private fetchFormValues() {
    this.organizationService
      .getFormValues()
      .pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res) => {
        if (_res.name) this.mode = 'edit';
        this.form.patchValue(_res);
        this.fileList = [
          {
            name: _res.name,
            status: 'done',
            url: _res.logo,
          },
        ];

      });
  }

  onSave() {

    this.organizationService
      .addOrganization(this.form.value)
      .pipe(takeUntilDestroyed(this.destoyref$))
      .subscribe((_res: any) => {

        if (_res) {

          this.messageService.createMessage(
            'success',
            'Organization details added successfully.'
          );
          // this.onCancel();
          this.router.navigate(['admin/profile'])
        }
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


  }


  beforeUpload = (file: any): boolean => {

    this.form.patchValue({
      file: file
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


  handlePreview = async (file: NzUploadFile): Promise<void> => {
    // console.log('sel file', file);
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };
}
