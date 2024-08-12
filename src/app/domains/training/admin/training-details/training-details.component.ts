import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NepaliDatepickerModule, NepaliDatepickerService } from 'nepali-datepicker-angular';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { EventsService } from 'src/app/domains/events/data/services/events.service';
import { FormSubmitButtonsComponent } from 'src/app/shared/ui-common/form-submit-buttons/form-submit-buttons.component';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { ITrainingDetail } from '../../data/model/training-detail.model';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { TrainingService } from '../../data/services/training.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ITrainingDetail2 } from '../../data/model/training-detail2.model';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';


@Component({
  selector: 'app-training-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    // third-party
    NzTableModule,
    NzDropDownModule,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzSpaceModule,
    NzPageHeaderModule,

  ],
  templateUrl: './training-details.component.html',
  styleUrl: './training-details.component.scss'
})
export class TrainingDetailsComponent implements OnInit {


  //props
  mode = 'add'
  trainingMasterId!: number;
  trainingId$!: Observable<any>
  data$!: Observable<ITrainingDetail2[]>
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private readonly destroy$ = inject(DestroyRef)
  private readonly trainingService = inject(TrainingService)

  ngOnInit(): void {
    this.checkFormStatus()
  }
  private checkFormStatus() {
    this.trainingId$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => {
        const id = Number(params.get('id'))
        this.trainingMasterId = id;
        console.log('trainingMasterId', this.trainingMasterId);

        return { trainingMasterId: id }
      })
    );
    this.trainingId$
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((_res: any) => {
        console.log('rs', _res);

        if (_res.trainingMasterId > 0) this.mode = 'edit';
        this.fetchMembers(_res);
      });
  }



  private fetchMembers(id: any): void {
    this.data$ = this.trainingService.getDetailList(id);
  }

  onClick(id?: number) {
    id
      ? this.router.navigate(['/admin/training/add-detail'], { queryParams: { id: id } })
      : this.router.navigate(['/admin/training/add-detail']);
  }



  onAdd() {
    console.log('trainingMasterId', this.trainingMasterId);
    const view = false;
    this.router.navigate(['/admin/training/add-detail'], { queryParams: { id: this.trainingMasterId, detailId: 0, view: view } })

  }

  onViewMore(masterId: number, detailId: number): void {
    const view = true;

    this.router.navigate(['/admin/training/add-detail'], { queryParams: { id: masterId, detailId: detailId, view: view } })
  }

  onEdit(masterId: number, detailId: number): void {
    const view = false;
    this.router.navigate(['/admin/training/add-detail'], { queryParams: { id: masterId, detailId: detailId, view: view } })
  }
}
