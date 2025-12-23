import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { ITeam3Dto } from '../../data/model/tournament.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, shareReplay } from 'rxjs';
import { TournamentService } from '../../data/tournament.service';
import { CommonModule } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/shared/util-common/pipes/search.pipe';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-view-players',
  imports: [
    CommonModule,
    FormsModule,
    NzTagModule,
    NzIconModule,
    NzTableModule,
    NzCardModule,
    NzInputModule,
    // project
    SearchPipe,
  ],
  templateUrl: './view-players.html',
  styleUrl: './view-players.scss',
})
export class ViewPlayers implements OnInit {
  // props

  genderMap: Record<string, string> = {
    Male: 'M',
    Female: 'F',
    'Non-binary': 'NB',
    'Prefer not to say': 'N/A',
    Other: 'O',
  };
  teams: any[] = [];
  filteredTeams: any[] = [];

  searchValue = '';
  statusFilter: string | null = null;
  genderFilter: string | null = null;

  data$!: Observable<ITeam3Dto[]>;

  private readonly tournamentService = inject(TournamentService);
  private readonly router = inject(Router);
  private readonly destroyRef$ = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);

  queryParamMapSignal = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  idsSignal = computed(() => ({
    id: Number(this.queryParamMapSignal()?.get('id') ?? 0),
  }));
  tournamentNameSignal = computed(() => {
    // This reads the name from navigation state once
    return history.state?.tournamentName ?? '';
  });

  ngOnInit() {
    this.fetchData();
  }

  private fetchData(): void {
    this.tournamentService
      .getAllPlayers(this.idsSignal().id)
      .pipe(takeUntilDestroyed(this.destroyRef$), shareReplay(1))
      .subscribe((players) => {
        this.teams = players;
        this.filteredTeams = [...this.teams];
      });
  }

  onEdit(team: ITeam3Dto): void {
    this.router.navigate(['/admin/tournament/add-team'], {
      queryParams: { tournamentId: team.tournamentId, teamId: team.teamId },
      state: { tournamentName: this.tournamentNameSignal() },
    });
  }
}
