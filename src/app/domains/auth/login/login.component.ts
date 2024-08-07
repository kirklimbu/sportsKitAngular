import {
  Component,
  DestroyRef,
  Input,
  OnInit,
  TemplateRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store, State } from '@ngxs/store';
import { Observable, finalize, first } from 'rxjs';
import { AuthService } from 'src/app/shared/util-auth/services/auth-http/auth.service';
import { Login } from './state/login.model';
// import { InlineSVGModule } from 'ng-inline-svg-2';
// import { SecondaryLinksComponent } from 'src/app/shared/ui-common/secondary-links/secondary-links.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthState } from './state/login.state';
import { UserDetailsService } from '../../../shared/util-common/userDetails.service';
// import { SeoService } from 'src/app/shared/util-logger/seo.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { SeoService } from 'src/app/shared/util-logger/seo.service';
import { GlobalConstants } from 'src/app/shared/util-common/global-constants';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { SecondaryLinksComponent } from 'src/app/shared/ui-common/secondary-links/secondary-links.component';
import { getDeviceId } from 'src/app/shared/util-common/generateDeviceId';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // ReactiveForms,
    // InlineSVGModule,
    ReactiveFormsModule,
    SecondaryLinksComponent,
    // FormSubmitButtonsComponent
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
  ],
  providers: [
    // NgbActiveModal,
    MessageService,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  hasError!: boolean;
  returnUrl = '';
  isLoading$: Observable<boolean>;
  showPassword = false;
  showSecondaryLink = true;
  logo = GlobalConstants.appLogo;

  @Input() showLinks = 'false';

  destroyRef = inject(DestroyRef);
  // activeModal = inject(NgbActiveModal)
  formError!: TemplateRef<{
    validation: string;
    message: string;
    control: AbstractControl<any, any>;
  }> | null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userDetailsService: UserDetailsService,
    private router: Router,
    private seoService: SeoService,
    private store: Store
  ) // private modalService: NgbModal,
  {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    // if user is admin navigate to dashboard else home
    // if (this.userDetailsService.getUserDetails().token) {
    //   this.router.navigate(['/home']);
    // }

    const content = 'Damak Namuna Badminton Academy, Damak 7 , Jhapa';
    const title = 'Damak Namuna Badminton Academy';
    this.seoService.setMetaDescription(content);
    this.seoService.setMetaTitle(title);
  }

  ngOnInit(): void {
    this.initForm();
    this.checkUser();
  }

  checkUser() {
    const userDetails = this.store.selectSnapshot(AuthState.userDetails);
    // console.log('user', userDetails);
    if (userDetails.user.role?.includes('Admin')) {
      console.log('amin');

      this.router.navigate(['auth/inquiry']);
      return;
    }
    console.log('no amin');

    this.router.navigate(['/auth/login']);
  }

  /**
   * check prevous page
   */

  checkPreviousPage() {
    // const currentPage = this.store.selectSnapshot(RouterState.url);
    // if (currentPage?.includes('/cart')) {
    //   this.showSecondaryLink = true;
    //   this.activeModal.close();
    //   this.router.navigate(['/cart'])
    //   return;
    // }
  }

  initForm() {
    this.form = this.fb.group({
      userName: [null, [Validators.required]],
      passWord: [null, [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onLogin(event?: any): void {
    this.hasError = false;

    const payload = {
      username: this.f['userName'].value,
      password: this.f['passWord'].value,
      deviceId: getDeviceId(),
    };

    if (payload.username !== null && payload.password !== null) {
      this.store
        .dispatch(new Login(payload))
        .pipe(
          first(),
          finalize(() => this.authService.isLoadingSubject.next(false)),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((user: any) => {
          console.log('after login user', user);
          /**
           * if admin logged in route to admin dashboard
           * else home page
           */
          const userDetails = this.store.selectSnapshot(AuthState.userDetails);

          // if (userDetails?.role?.includes('Admin')) {
          //   this.router.navigate(['/admin/user-profile']);
          //   return;
          // }
          this.router.navigate(['/admin/user-profile']);
          // return (this.hasError = true);
        });
    }
  }

  onTogglePassword() {
    this.showPassword = !this.showPassword;
  }

  onCancel(event: any) {
    this.router.navigate(['/home']);
  }
  private refresh() {
    // refresh current component only
    const currentRoute = this.router.url;
    const url: any = currentRoute.split('?')[0];
    let id: any = currentRoute.split('?')[1];

    if (id) id = id.split('=')[1];

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      if (id) {
        this.router.navigate([url], { queryParams: { id } });
        return;
      }
      this.router.navigate([url]); // no need
    });
  }

  public openDeleiveryForm(event: any) {
    this.router.navigate(['/registration']);

    // let modalRefCustomerDetailAdd = this.modalService.open(CustomerDetailsAddComponent, { backdrop: false });
    // modalRefCustomerDetailAdd.result.then((res) => {
    //   // unsubscribe onAdd
    //   this.sendUserDetails.emit(res);
    //   this.activeModal.close(res);
    // });
  }

  public openform(event: any) {
    // const modalRefRegistration = this.modalService.open(RegistrationComponent, { backdrop: false });
    // modalRefRegistration.result.then((res) => {
    //   // unsubscribe onAdd
    //   return res
    // });
  }

  onRegister(): void {
    this.router.navigate(['/auth/registration']);
  }
}
