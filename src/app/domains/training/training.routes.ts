
import { Routes } from '@angular/router';

import { AddTrainingComponent } from './admin/add-training.component';
import { AllTrainingsComponent } from './admin/all-trainings/all-trainings.component';
import { AddTraineeComponent } from '../trainee/add-trainee/add-trainee.component';
import { AddTrainingDetailsComponent } from './admin/add-training-details/add-training-details.component';
import { TrainingDetailsComponent } from './admin/training-details/training-details.component';

export const FEATURE_TRAINING_ROUTES: Routes = [
    {
        path: '',
        component: AllTrainingsComponent,
    },
    {
        path: 'add-training',
        component: AddTrainingComponent,
    },
    {
        path: 'add-detail',
        component: AddTrainingDetailsComponent,
    },
    {
        path: 'detail',
        component: TrainingDetailsComponent,
    },

];
