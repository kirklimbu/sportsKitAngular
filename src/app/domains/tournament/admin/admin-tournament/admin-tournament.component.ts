import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NepaliDateFormatterPipe } from 'src/app/shared/util-common/pipes/nepali-date-formatter.pipe';
import { TournamentService } from '../../data/tournament.service';
import { Observable } from 'rxjs';
import { ITournament } from '../../data/model/tournament.model';
import { Router } from '@angular/router';

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
    NepaliDateFormatterPipe
  ],
  templateUrl: './admin-tournament.component.html',
  styleUrl: './admin-tournament.component.scss'
})
export class AdminTournamentComponent {

  data$!: Observable<ITournament[]>;

  private readonly tournamentService = inject(TournamentService);
  private readonly router = inject(Router);



  ngOnInit(): void {
    this.fetchData();
  }


  private fetchData(): void {
    this.data$ = this.tournamentService.getAllAdminTournaments();
  }

  onViewDetails(id: number):void {
      this.router.navigate(['/admin/tournament/all-games'], { queryParams: { id: id } })

  }
  onAddTeam(id: number):void {
      this.router.navigate(['/admin/tournament/add-team'], { queryParams: { id: id } })

  }

}
