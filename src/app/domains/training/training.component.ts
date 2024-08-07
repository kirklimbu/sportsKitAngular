import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
import { TrainingService } from './data/services/training.service';
import { ITraining } from './data/model/training.model';
import { Observable } from 'rxjs';

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
    NzPageHeaderModule,
    NzSpaceModule
  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss',
})
export class TrainingComponent {

  data$!: Observable<ITraining[]>;

  private readonly trainingService = inject(TrainingService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly router = inject(Router);


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
}
