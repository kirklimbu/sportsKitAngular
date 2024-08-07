
import { Routes } from '@angular/router';
import { TrainingComponent } from './training.component';
import { AddTrainingComponent } from './add-training.component';

export const FEATURE_TRAINING_ROUTES: Routes = [
    {
        path: '',
        component: TrainingComponent,
    },
    {
        path: 'add-training',
        component: AddTrainingComponent,
    },

];
