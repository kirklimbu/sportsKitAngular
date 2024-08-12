import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TrainingService } from './data/services/training.service';
import { ITraining } from './data/model/training.model';
import { Observable } from 'rxjs';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { TruncatePipe } from 'src/app/shared/util-common/pipes/truncate.pipe';
import { Store } from '@ngxs/store';
import { AuthState } from '../auth/login/state/login.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    NzTableModule,
    NzDropDownModule,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzSkeletonModule,
    NzCardModule,
    NzListModule,
    NzSpaceModule,
    NzBadgeModule,
    TruncatePipe
  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss',
})
export class TrainingComponent {

  data$!: Observable<ITraining[]>;

  private readonly trainingService = inject(TrainingService);
  private readonly destroyRef = inject(DestroyRef)
  private readonly cd = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  private readonly store = inject(Store);


  ngOnInit(): void {
    this.fetchMembers();
  }


  private fetchMembers(): void {
    this.data$ = this.trainingService.getAllTraining();
  }



  onViewMore(id: number): void {
    this.router.navigate(['/admin/user-profile'], { queryParams: { memberId: id } })
  }
  onEdit(id: number): void {
    this.router.navigate(['/admin/training/add-training'], { queryParams: { id: id } })
  }


  onJoin(id: number) {

    const isAuthenticated$ = this.store.select(AuthState.isAuthenticated);
    isAuthenticated$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        console.log('log', res);
        if (!res) {
          this.router.navigate(['/auth/login'])
        } else {
          this.router.navigate(['/admin/trainee'])

        }
      });


  }

  // private getUserDetails() {
  //   const isAuthenticated = this.userDetailsService.getUserStatus();
  //   isAuthenticated.pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe(res => this.isLoggedIn = res);
  // }
}
