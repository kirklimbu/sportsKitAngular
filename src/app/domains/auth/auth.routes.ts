import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminComponent } from '../admin/admin.component';
import { AddUserComponent } from '../user/add-user/add-user.component';
import { AuthComponent } from './auth.component';

export const FEATURE_AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: AuthComponent,
  },
];
