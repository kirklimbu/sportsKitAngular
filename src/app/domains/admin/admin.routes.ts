import { Routes } from '@angular/router';
import { hasRoleGuard } from 'src/app/shared/util-auth/guards/hasRole.guard';
import { Role } from 'src/app/shared/util-auth/models/user.model';
import { AuthGuard } from 'src/app/shared/util-auth/guards/auth.guard';
import { FEATURE_MEMBERS_ROUTES } from '../members';
import { FEATURE_EVENTS_ROUTES } from '../events/events.routes';

import { OrganizationComponent } from './organization/organization.component';
import { AddOrganizationComponent } from './organization/add-organization/add-organization.component';
import { FEATURE_USERS_ROUTES } from '../user/users.routes';

// import { DashboardComponent } from '../dashboard/dashboard.component';
// import { InquiryComponent } from '../inquiry/inquiry.component';

export const FEATURE_ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../members').then((m) => FEATURE_MEMBERS_ROUTES),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('../user').then((m) => FEATURE_USERS_ROUTES),
  },
  {
    path: 'events',
    canActivate: [AuthGuard],
    loadChildren: () => import('../events').then((m) => FEATURE_EVENTS_ROUTES),
  },
  {
    path: 'organization',
    component: AddOrganizationComponent,
  },
  {
    path: 'organization',
    component: AddOrganizationComponent,
  },
  // {
  //   path: '',
  //   canActivate: [hasRoleGuard],
  //   data:
  //   {
  //     roles: [Role.ADMIN],

  //   },
  //   loadChildren: () =>
  //     import('.././questions').then((m) => m.FEATURE_QUESTION_ROUTES),
  // },
  // {
  //   path: '',
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('.././set').then((m) => m.FEATURE_SET_ROUTES),
  // },

  {
    // canActivate: [hasRoleGuard],
    // data: {
    //   roles: [Role.ADMIN],
    // },
    path: 'profile',
    component: OrganizationComponent,
  },
  // {
  //   canActivate: [hasRoleGuard],
  //   data:
  //   {
  //     roles: [Role.ADMIN],

  //   },
  //   path: 'inquiry',
  //   component: InquiryComponent,

  // },

  // {
  //   canActivate: [hasRoleGuard],
  //   data:
  //   {
  //     roles: [Role.USER],
  //   },
  //   path: 'user-profile',
  //   component: UserProfileComponent,
  //   // data: {
  //   //   breadcrumb: {
  //   //     label: 'details'
  //   //   }
  //   // },
  // },
];
