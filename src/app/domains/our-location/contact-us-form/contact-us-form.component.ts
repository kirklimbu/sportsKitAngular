import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { OurLocationService } from '../services/our-location.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzMessageService } from 'ng-zorro-antd/message';

import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { catchError } from 'rxjs';
import { error } from 'console';




@Component({
  selector: 'app-contact-us-form',
  standalone: true,
  imports: [
    // ng
    ReactiveFormsModule,
    NzButtonModule,
    CommonModule,
    NzMessageModule,
    NzSpinModule
  ],
  templateUrl: './contact-us-form.component.html',
  styleUrl: './contact-us-form.component.scss',
  providers: [NzMessageService]
})
export class ContactUsFormComponent implements OnInit {

  isLoading = false;

  form!: FormGroup;
  typeList: any[] = [];

  destroyRef = inject(DestroyRef)

  private fb = inject(FormBuilder)
  private apiService = inject(OurLocationService)
  // private message = NzMessageService
  constructor(private message: NzMessageService) { }
  ngOnInit(): void {
    this.initForm();
    // this.fetchDefaultFormValues();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  initForm(): FormGroup {
    return this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      remarks: ['', [Validators.required]],
      typeId: ['', [Validators.required]],

    });
  }

  fetchDefaultFormValues() {
    this.apiService.getFormValues()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((_res: any) => {
        console.log('res', _res);

        this.form.patchValue(_res.form);
        this.typeList = _res.typeList;

      })

  }

  onSubmit() {
    this.isLoading = true;
    if (!this.form.valid) {
      this.message.error('Please fill up the form and submit.');
      this.isLoading = false;
      return
    }
    this.apiService.saveMessage(this.form.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.isLoading = false
        this.message.success(res.message)
        this.form.reset()
        this.form.controls['typeId'].patchValue(0)
        return;
      }),
      (error: Error) => {
        this.isLoading = false;
        this.message.error(error.message)
        return
      }

  }

}
