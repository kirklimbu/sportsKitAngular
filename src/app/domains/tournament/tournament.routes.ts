import { Routes } from '@angular/router';

import { AddTeamComponent } from './admin/add-team/add-team.component';
import { AdminAllGamesComponent } from './admin/admin-all-games/admin-all-games.component';
import { AdminTournamentComponent } from './admin/admin-tournament/admin-tournament.component';
import { ViewPlayers } from './admin/view-players/view-players';

export const FEATURE_TOURNAMENT_ROUTES: Routes = [
  {
    path: '',
    component: AdminTournamentComponent,
  },
  {
    path: 'all-games',
    component: AdminAllGamesComponent,
  },
  {
    path: 'add-team',
    component: AddTeamComponent,
  },
  {
    path: 'view-players',
    component: ViewPlayers,
  },
  
];
