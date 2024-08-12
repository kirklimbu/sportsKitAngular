import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ITraining } from '../../data/model/training.model';
import { TrainingService } from '../../data/services/training.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Role } from 'src/app/shared/util-auth/models/user.model';
import { UserDetailsService } from 'src/app/shared/util-common/userDetails.service';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/app/domains/auth/login/state/login.state';

@Component({
  selector: 'app-all-trainings',
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
    NzPageHeaderModule,
    NzSpaceModule,
    NzToolTipModule
  ],
  templateUrl: './all-trainings.component.html',
  styleUrl: './all-trainings.component.scss'
})
export class AllTrainingsComponent {
  // props
  userRole: Role | undefined
  data$!: Observable<ITraining[]>;

  private readonly trainingService = inject(TrainingService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly userDetailService = inject(UserDetailsService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);


  ngOnInit(): void {
    this.fetchMembers();
    this.checkUser();
  }


  checkUser(): void {
    this.userRole = this.store.selectSnapshot(AuthState.userRole);
  }


  private fetchMembers(): void {
    this.data$ = this.trainingService.getAllTraining();
  }

  onAddDetail(id: number) {
    this.router.navigate(['/admin/training/add-detail'], { queryParams: { id: id, detailId: 0, view: false } })

  }

  onViewMore(id: number): void {
    this.router.navigate(['/admin/training/detail'], { queryParams: { id: id, detailId: 0, view: true } })
  }
  onEdit(id: number): void {
    this.router.navigate(['/admin/training/add-training'], { queryParams: { id: id } })
  }

}
