import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

export const FEATURE_AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: AuthComponent,
  },

  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },


];
