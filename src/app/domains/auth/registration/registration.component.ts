import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/util-auth/services/auth-http/auth.service';

import { ConfirmedValidator } from 'src/app/shared/util-logger/confirm-password.validator';
// import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormSubmitButtonsComponent } from 'src/app/shared/ui-common/form-submit-buttons/form-submit-buttons.component';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UrlService } from 'src/app/shared/util-logger/url.service';
// import { MessageService } from 'src/app/shared/util-logger/message.service';
import { CustomResponse } from 'src/app/shared/models/CustomResponse.model';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // InlineSVGModule,
    FormSubmitButtonsComponent,
    NzIconModule
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: []
})
export class RegistrationComponent {
  form!: FormGroup;
  hasError!: boolean;
  showPassword = false;
  showcPassword = false;
  isLoading$!: Observable<boolean>;
  destroyRef = inject(DestroyRef)

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    // public activeModal: NgbActiveModal,
    // public modal: NgbModal,
    public urlService: UrlService,
    // public messageService: MessageService,
  ) {

  }
  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  //   private int memberId;
  //   private String name;
  //   private String dob;
  //   private String profilePic;
  //   private Short memberShipTypeId;
  // }

  initForm(): FormGroup {
    return this.form = this.fb.group({
      memberId: ['', [Validators.required]],
      name: [
        '', [Validators.required,]
        ,
      ],
      dob: [
        '', [Validators.required
        ]
      ],

      passWord: [
        '',
        [Validators.required,]
      ],
      cPassword: [
        '',
        [Validators.required,
        ],
      ],
      file: []
      // agree: [false, [Validators.required]],
    },
      {

        validator: ConfirmedValidator('passWord', 'cPassword')
      }
    );
  }

  onTogglePassword() {
    this.showPassword = !this.showPassword;
  }
  onTogglecPassword() {
    this.showcPassword = !this.showcPassword;
  }

  onSignUp() {
    this.hasError = false;
    this.authService.registration(this.form.value)
      .subscribe((user: CustomResponse) => {
        console.log('user', user,);
        // this.messageService.showSuccessMessage(user.message)
        this.router.navigate(['/auth/login'])

      });
  }

  onCancel(): void {
    console.log('cancel');
    this.router.navigate(['/home'])

  }


}
