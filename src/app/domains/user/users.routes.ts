import { Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './user.component';

// import { StudyInJapanComponent } from "../study-destinations/study-in-japan/study-in-japan.component";

export const FEATURE_USERS_ROUTES: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: 'add-user',
    component: AddUserComponent,
  },
];
