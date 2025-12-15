import { Routes } from '@angular/router';
import { hasRoleGuard } from 'src/app/shared/util-auth/guards/hasRole.guard';
import { Role } from 'src/app/shared/util-auth/models/user.model';

import { FamousPlacesForm } from './admin/famous-places-form/famous-places-form';
import { FamousPlacesList } from './admin/famous-places-list/famous-places-list';

// import { DashboardComponent } from '../dashboard/dashboard.component';
// import { InquiryComponent } from '../inquiry/inquiry.component';

export const FEATURE_ADMIN_ROUTES: Routes = [
  {
    canActivate: [hasRoleGuard],
    data: {
      roles: [Role.ADMIN],
    },
    path: '',
    component: FamousPlacesList,
  },
  {
    canActivate: [hasRoleGuard],
    data: {
      roles: [Role.ADMIN],
    },
    path: 'add-places',
    component: FamousPlacesForm,
  },
];
