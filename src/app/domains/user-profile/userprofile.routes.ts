import { UserProfileComponent } from './user-profile.component';


import { Routes } from '@angular/router';

import { UserProfileAddComponent } from './user-profile-add/user-profile-add.component';
import { ProfileComponent } from './profile/profile.component';

export const FEATURE_USER_ROUTES: Routes = [
    {
        path: 'user-profile',
        component: UserProfileComponent,
    },

];
