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

  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly organizationService = inject(OrganizationService);
  private readonly destoyref$ = inject(DestroyRef);

  ngOnInit(): void {
    this.buildForm();
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
      logo: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSave() {
    // this.isLoading = true;
    console.log('form val', this.form.value);

    this.organizationService
      .addOrganization(this.form.value)
      .pipe(takeUntilDestroyed(this.destoyref$))
      .subscribe((_res: any) => {
        console.log('res', _res);

        if (_res) {
          // route to vendor home page
          this.messageService.createMessage(
            'success',
            'Event added successfully.'
          );
          // this.onCancel();
          this.form.reset();

          // location.reload();
          // this.router.navigate(['/auth/list-event']);
          // scroll2Top();
          // this.changeDetector.detectChanges();
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
    // console.log('sel file', file);
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };
}
