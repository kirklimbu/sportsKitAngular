
import { Routes } from '@angular/router';
import { TraineeComponent } from './trainee.component';
import { AddTraineeComponent } from './add-trainee/add-trainee.component';

export const FEATURE_TRAINEE_ROUTES: Routes = [
    {
        path: '',
        component: TraineeComponent,
    },
    {
        path: 'add-trainee',
        component: AddTraineeComponent,
    },

];
