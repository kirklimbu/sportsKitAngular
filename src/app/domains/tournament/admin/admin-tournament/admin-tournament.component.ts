import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Observable } from 'rxjs';
import { NepaliDateFormatterPipe } from 'src/app/shared/util-common/pipes/nepali-date-formatter.pipe';
import { ITournament } from '../../data/model/tournament.model';
import { TournamentService } from '../../data/tournament.service';

@Component({
  selector: 'app-admin-tournament',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzToolTipModule,
    NzListModule,
    NzBadgeModule,
    NzCardModule,
    // project
    NepaliDateFormatterPipe,
  ],
  templateUrl: './admin-tournament.component.html',
  styleUrl: './admin-tournament.component.scss',
})
export class AdminTournamentComponent implements OnInit {
  data$!: Observable<ITournament[]>;

  private readonly tournamentService = inject(TournamentService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.data$ = this.tournamentService.getAllAdminTournaments();
  }

  onViewDetails(id: number): void {
    this.router.navigate(['/admin/tournament/all-games'], {
      queryParams: { id: id },
    });
  }
  onAddTeam(id: number): void {
    this.router.navigate(['/admin/tournament/add-team'], {
      queryParams: { id: id },
    });
  }
  onViewPlayers(id: number): void {
    this.router.navigate(['/admin/tournament/view-players'], {
      queryParams: { id: id },
    });
  }
}
