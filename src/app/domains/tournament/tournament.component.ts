import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Observable } from 'rxjs';
import { Role } from 'src/app/shared/util-auth/models/user.model';
import { UserDetailsService } from 'src/app/shared/util-common/userDetails.service';
import { AuthState } from '../auth/login/state/login.state';
import { ITraining } from '../training/data/model/training.model';
import { TrainingService } from '../training/data/services/training.service';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ITournament } from './data/model/tournament.model';
import { TournamentService } from './data/tournament.service';
import { NepaliDateFormatterPipe } from 'src/app/shared/util-common/pipes/nepali-date-formatter.pipe';

@Component({
  selector: 'app-tournament',
  standalone: true,
  imports: [
    CommonModule,
  FormsModule,
  NzTableModule,
  NzDropDownModule,
  NzAvatarModule,
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

  templateUrl: './tournament.component.html',
  styleUrl: './tournament.component.scss',
})
export class TournamentComponent {

  data$!: Observable<ITournament[]>;

  private readonly tournamentService = inject(TournamentService);
  private readonly destroyRef = inject(DestroyRef)
  private readonly store = inject(Store);


  ngOnInit(): void {
    this.fetchMembers();
  }


  private fetchMembers(): void {
    this.data$ = this.tournamentService.getAllPublicTournaments();
  }



  // onViewMore(id: number): void {
  //   this.store.dispatch(new Navigate(['/training']))

  //   this.router.navigate(['/admin/training/detail'], { queryParams: { id: id } })
  // }
  // onEdit(id: number): void {
  //   this.router.navigate(['/admin/training/add-training'], { queryParams: { id: id } })
  // }


  // onJoin(id: number) {

  //   const isAuthenticated$ = this.store.select(AuthState.isAuthenticated);
  //   isAuthenticated$.pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe(res => {
  //       console.log('log', res);
  //       if (!res) {
  //         this.router.navigate(['/auth/login'])
  //       } else {
  //         this.router.navigate(['/admin/trainee'], { queryParams: { id: id } })

  //       }
  //     });


  // }

}
