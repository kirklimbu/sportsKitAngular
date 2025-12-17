import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { IPlaceCategory } from '../../data/model/famous-places';
import { FamousPlacesService } from '../../data/services/famous-places';
const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

@Component({
  selector: 'app-famous-places-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzSelectModule,
    NzDividerModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzModalModule,
    NzUploadModule,
    NzIconModule,
    NzCheckboxModule,
    NzSwitchModule,
  ],
  templateUrl: './famous-places-form.html',
  styleUrl: './famous-places-form.scss',
})
export class FamousPlacesForm implements OnInit {
  // props
  mode = 'add';
  placeCategoryList: IPlaceCategory[] = [];
  form!: FormGroup;
  isLoading$!: Observable<boolean>;
  previewImage: string | undefined = '';
  avatarUrl: string | undefined;
  loading = false;
  previewVisible = false;
  fileList: any[] = [];

  private destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly placeService = inject(FamousPlacesService);

  queryParamMapSignal = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  idsSignal = computed(() => ({
    id: Number(this.queryParamMapSignal()?.get('id') ?? 0),
  }));

  public ngOnInit(): void {
    this.buildForm();
    this.fetchDefaultFormValues();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      placeId: [],
      categoryId: [],
      name: [],
      description: [],
      mobile: [],
      email: [''],
      phone: [''],
      address: [''],
      mapLink: [],
      latitude: [],
      longitude: [],
      hasActive: [],
      docPath: [],
    });
  }

  fetchDefaultFormValues() {
    this.placeService
      .getFormValues(this.idsSignal().id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((_res) => {
        console.log('res form', _res);
        this.placeCategoryList = _res.placeCategoryList;
        this.form.patchValue(_res.form);
        this.avatarUrl = _res.form.docPath;
      });
  }

  onSave() {
    this.placeService
      .savePlaces(this.form.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        console.log('res', res);
        this.form.reset();
        this.messageService.createMessage('success', 'Saved successfully');
        this.router.navigate(['admin/places']);
      });
  }

  profilePicUpload = (file: any): boolean => {
    this.form.patchValue({
      docPath: file,
    });

    // to display the image
    this.getBase64(file, (img: string) => {
      this.loading = false;
      this.avatarUrl = img;
    });

    // this.cd.detectChanges();
    return false;
  };

  handleChange(info: { file: NzUploadFile }): void {
    console.log('handleChange info');

    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;

          this.avatarUrl = img;
          this.form.patchValue({
            docPath: info,
          });
          return;
        });
        break;
      case 'error':
        console.log('handel chg err');

        // this.msg.error('Network error');
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;

          this.avatarUrl = img;
          return;
        });
        break;
    }
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (reader.result) {
        callback(reader.result.toString());
      }
    });
    reader.readAsDataURL(img);
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    console.log('file handel prreview', file);

    if (!file.url && !file['preview']) {
      if (file.originFileObj) {
        file['preview'] = await getBase64(file.originFileObj);
      }
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };
}
