import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from 'src/app/shared/util-auth/services/auth-http/auth.service';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { Logout } from '../login/state/login.model';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule

  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {

  form!: FormGroup;
  showPassword = false;
  showNewPassword = false;

  private store = inject(Store);

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private messageService = inject(MessageService);


  ngOnInit(): void {
    this.buildForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  buildForm(): void {
    this.form = this.fb.group({
      oldPassWord: [],
      newPassWord: []
    })
  }

  onSave() {

    this.authService
      .forgetPassword(this.form.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((_res: any) => {
        if (_res) {
          this.messageService.createMessage('success', _res.message);
          this.logout();
          this.router.navigate(['auth/login']);
        }
      });
  }

  private logout(): void {
    this.store.dispatch(new Logout());
  }


  onTogglePassword() {
    this.showPassword = !this.showPassword;
    this.showNewPassword = !this.showNewPassword;
  }

}
