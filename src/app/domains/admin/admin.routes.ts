
import { Routes } from '@angular/router';
import { hasRoleGuard } from 'src/app/shared/util-auth/guards/hasRole.guard';
import { Role } from 'src/app/shared/util-auth/models/user.model';
// import { UserProfileComponent } from '../user-profile/user-profile.component';
import { AuthGuard } from 'src/app/shared/util-auth/guards/auth.guard';
import { MemberEntryComponent } from '../members/member-entry/member-entry.component';
import { FEATURE_MEMBERS_ROUTES } from '../members';
import { FEATURE_EVENTS_ROUTES } from '../events/events.routes';
import { EventsAddComponent } from '../events/admin/events-add/events-add.component';

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
    path: 'events',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../events').then((m) => FEATURE_EVENTS_ROUTES),
  },
  {
    path: 'add-event',
    component: EventsAddComponent
  }
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

  // {
  //   canActivate: [hasRoleGuard],
  //   data:
  //   {
  //     roles: [Role.ADMIN],

  //   },
  //   path: 'dashboard',
  //   component: DashboardComponent,

  // },
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





]



