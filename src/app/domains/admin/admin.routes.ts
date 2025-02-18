import { Routes } from '@angular/router';
import { hasRoleGuard } from 'src/app/shared/util-auth/guards/hasRole.guard';
import { Role } from 'src/app/shared/util-auth/models/user.model';
import { AuthGuard } from 'src/app/shared/util-auth/guards/auth.guard';
import { FEATURE_MEMBERS_ROUTES } from '../members';
import { FEATURE_EVENTS_ROUTES } from '../events/events.routes';

import { OrganizationComponent } from './organization/organization.component';
import { AddOrganizationComponent } from './organization/add-organization/add-organization.component';
import { FEATURE_USERS_ROUTES } from '../user/users.routes';
import { FEATURE_PAYMENT_ROUTES } from '../payment/payment.routes';
import { FEATURE_TRAINING_ROUTES } from '../training/training.routes';
import { FEATURE_TRAINEE_ROUTES } from '../trainee/trainee.routes';
import { InquiryComponent } from '../inquiry/inquiry.component';
import { FEATURE_TOURNAMENT_ROUTES } from '../tournament';

// import { DashboardComponent } from '../dashboard/dashboard.component';
// import { InquiryComponent } from '../inquiry/inquiry.component';

export const FEATURE_ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/admin/user-profile',
    pathMatch: 'full',
  },
  {
    canActivate: [hasRoleGuard],
    data: {
      roles: [Role.ADMIN],
    },
    path: "",
    loadChildren: () =>
      import('../members').then((m) => FEATURE_MEMBERS_ROUTES),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../user-profile').then((m) => m.FEATURE_USER_ROUTES),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('../user').then((m) => FEATURE_USERS_ROUTES),
  },
  {
    canActivate: [hasRoleGuard],
    data: {
      roles: [Role.ADMIN],
    },
    path: 'events',
    loadChildren: () => import('../events').then((m) => FEATURE_EVENTS_ROUTES),
  },
  {

    path: 'payment',
    loadChildren: () => import('../payment').then((m) => FEATURE_PAYMENT_ROUTES),
  },
  {
    canActivate: [hasRoleGuard],
    data: {
      roles: [Role.ADMIN, Role.USER],
    },
    path: 'training',
    loadChildren: () => import('../training').then((m) => FEATURE_TRAINING_ROUTES),
  },
  {

    path: 'trainee',
    loadChildren: () => import('../trainee').then((m) => FEATURE_TRAINEE_ROUTES),
  },

  // tournament
  {
    canActivate: [hasRoleGuard],
    data: {
      roles: [Role.ADMIN],
    },
    path: 'tournament',
    loadChildren: () => import('../tournament').then((m) => FEATURE_TOURNAMENT_ROUTES),
  },

  {
    canActivate: [hasRoleGuard],
    data: {
      roles: [Role.ADMIN],
    },
    path: 'organization',
    component: AddOrganizationComponent,
  },
  {
    canActivate: [hasRoleGuard],
    data: {
      roles: [Role.ADMIN],
    },
    path: 'inquiry',
    component: InquiryComponent,
  },

  {
    canActivate: [hasRoleGuard],
    data: {
      roles: [Role.ADMIN],
    },
    path: 'profile',
    component: OrganizationComponent,
  },
  {
    path: '**',
    redirectTo: '/admin/user-profile',
    pathMatch: 'full',
  },

];
