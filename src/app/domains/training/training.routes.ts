
import { Routes } from '@angular/router';

import { AddTrainingComponent } from './admin/add-training.component';
import { AllTrainingsComponent } from './admin/all-trainings/all-trainings.component';

export const FEATURE_TRAINING_ROUTES: Routes = [
    {
        path: '',
        component: AllTrainingsComponent,
    },
    {
        path: 'add-training',
        component: AddTrainingComponent,
    },

];
