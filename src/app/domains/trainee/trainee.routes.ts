
import { Routes } from '@angular/router';
import { TraineeComponent } from './trainee.component';
import { AddTraineeComponent } from './add-trainee/add-trainee.component';
import { hasRoleGuard } from 'src/app/shared/util-auth/guards/hasRole.guard';
import { Role } from 'src/app/shared/util-auth/models/user.model';

export const FEATURE_TRAINEE_ROUTES: Routes = [
    {
        path: '',
        component: TraineeComponent,
    },
    {

        canActivate: [hasRoleGuard],
        data: {
            roles: [Role.ADMIN, Role.USER],
        },
        path: 'add-trainee',
        component: AddTraineeComponent,
    },

];
