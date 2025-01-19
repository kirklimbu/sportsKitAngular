
import { Routes } from '@angular/router';





import { AdminTournamentComponent } from './admin/admin-tournament/admin-tournament.component';
import { AdminAllGamesComponent } from './admin/admin-all-games/admin-all-games.component';

export const FEATURE_TOURNAMENT_ROUTES: Routes = [
    {
        path: '',
        component: AdminTournamentComponent,
    },
    {
        path: 'all-games',
        component: AdminAllGamesComponent,
    },

    

];
