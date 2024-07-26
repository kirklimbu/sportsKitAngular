import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminComponent } from '../admin/admin.component';

export const FEATURE_AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: '',
    data: {
      breadcrumb: {
        label: 'admin'
      }
    },
    component: AdminComponent,
    loadChildren: () =>
      import('.././admin').then((m) => m.FEATURE_ADMIN_ROUTES),
  },

];
