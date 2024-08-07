import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
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
import { Observable } from 'rxjs';
import { ITrainee } from './data/model/trainee.model';
import { TraineeService } from './data/services/trainee.service';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ITraining } from '../training/data/model/training.model';
import { TrainingService } from '../training/data/services/training.service';
import { MessageService } from 'src/app/shared/util-logger/message.service';

export interface AutocompleteOptionGroups {
  title: string;
  count?: number;
  children?: AutocompleteOptionGroups[];
}

@Component({
  selector: 'app-trainee',
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
    NzAutocompleteModule,
    NzSelectModule
  ],
  templateUrl: './trainee.component.html',
  styleUrl: './trainee.component.scss',
  // encapsulation: ViewEncapsulation.None,

})



export class TraineeComponent implements OnInit {


  selectedValue = null || 0;

  inputValue?: string;
  optionGroups: AutocompleteOptionGroups[] = [];

  data$!: Observable<ITrainee[]>;
  trainingList$!: Observable<ITraining[]>;

  private readonly traineeService = inject(TraineeService);
  private readonly trainingService = inject(TrainingService);
  private readonly messageService = inject(MessageService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly router = inject(Router);


  ngOnInit(): void {
    this.fetchAllTraining();
  }


  onSearch(): void {
    if (!this.selectedValue) return this.messageService.createMessage('error', 'Please select training.', 4_000);
    this.data$ = this.traineeService.getAllTrainee(this.selectedValue);

  }

  private fetchAllTraining(): void {
    this.trainingList$ = this.trainingService.getAllTraining();
  }




  onViewMore(id: number): void {
    this.router.navigate(['/admin/user-profile'], { queryParams: { memberId: id } })
  }
  onEdit(id: number): void {
    this.router.navigate(['/admin/training/add-training'], { queryParams: { id: id } })
  }


  onChange(value: string): void {
    console.log(value);
  }
}
