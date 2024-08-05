import { Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './user.component';
import { ProfileComponent } from '../user-profile/profile/profile.component';
import { hasRoleGuard } from 'src/app/shared/util-auth/guards/hasRole.guard';
import { Role } from 'src/app/shared/util-auth/models/user.model';

// import { StudyInJapanComponent } from "../study-destinations/study-in-japan/study-in-japan.component";

export const FEATURE_USERS_ROUTES: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    canActivate: [hasRoleGuard],
    data: {
      roles: [Role.ADMIN],
    },
    path: 'add-user',
    component: AddUserComponent,
  },
  {
    canActivate: [hasRoleGuard],
    data: {
      roles: [Role.USER],
    },
    path: 'user-profile',
    component: ProfileComponent,
  },

];
