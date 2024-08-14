import { ChangeDetectorRef, Component, DestroyRef, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Observable, distinctUntilChanged, map, shareReplay } from 'rxjs';
import { ITrainee } from './data/model/trainee.model';
import { TraineeService } from './data/services/trainee.service';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ITraining } from '../training/data/model/training.model';
import { TrainingService } from '../training/data/services/training.service';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Role } from 'src/app/shared/util-auth/models/user.model';
import { Store } from '@ngxs/store';
import { AuthState } from '../auth/login/state/login.state';
import { TitleCaseDirective } from 'src/app/shared/util-common/directives/titleCase.directive';

export interface AutocompleteOptionGroups {
  title: string;
  count?: number;
  children?: AutocompleteOptionGroups[];
}

@Component({
  selector: 'app-trainee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
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
    NzSelectModule,
    // project
    // TitleCaseDirective
  ],
  templateUrl: './trainee.component.html',
  styleUrl: './trainee.component.scss',
  // encapsulation: ViewEncapsulation.None,

})



export class TraineeComponent implements OnInit {

  form!: FormGroup;
  trainingMasterId!: number
  trainingId$!: Observable<any>;


  userRole: Role | undefined;
  showAddButton: boolean = false

  data$!: Observable<ITrainee[]>;
  trainingList$!: Observable<ITraining[]>;

  private readonly traineeService = inject(TraineeService);
  private readonly trainingService = inject(TrainingService);
  private readonly messageService = inject(MessageService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly router = inject(Router);

  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly unsubscribe$ = inject(DestroyRef);


  ngOnInit(): void {
    this.initForm();
    this.checkUser();
    this.fetchAllTraining();
    this.checkFormStatus();
  }

  checkUser(): void {
    this.userRole = this.store.selectSnapshot(AuthState.userRole);
  }


  private initForm() {
    this.form = this.fb.group({
      trainingMasterId: [0],
    })

    //  #TODO Enhance logic on this part
    //  #BUG DOUBLE API CALL 
    const id = this.form.controls['trainingMasterId']
    id.valueChanges
      .pipe(distinctUntilChanged(),
        shareReplay({ bufferSize: 1, refCount: true }),
        takeUntilDestroyed(this.unsubscribe$))
      .subscribe(value => {
        console.log(value);
        this.showAddButton = false;

      });

  }

  private checkFormStatus() {
    const id$: Observable<{ trainingMasterId: number, traineeId: number }> = this.route.queryParamMap.pipe(
      map((params: ParamMap) => {
        const trainingMasterId = Number(params.get('id'))
        const traineeId = Number(params.get('traineeId'))
        this.trainingMasterId = trainingMasterId
        return { trainingMasterId, traineeId }
      }
      )
    )
    id$.pipe(
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true }),
      takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {
        console.log('query res', _res);
        if (_res.trainingMasterId === 0) return;
        this.form.patchValue({ trainingMasterId: _res.trainingMasterId })
        this.onSearch()
      });
  }


  // 2 times api call vayo

  onSearch(): void {
    this.showAddButton = false;
    const id = this.form.controls['trainingMasterId'].value
    if (!id) return this.messageService.createMessage('error', 'Please select training.', 4_000);
    this.data$ = this.traineeService.getAllTrainee(id)
      .pipe(distinctUntilChanged(),
        shareReplay({ bufferSize: 1, refCount: true }),
      );
    this.data$
      .pipe(
        takeUntilDestroyed(this.unsubscribe$))
      .subscribe(res => {
        console.log(res);
        if (res) {
          this.showAddButton = true;
        }

      })

  }

  private fetchAllTraining(): void {
    this.trainingList$ = this.trainingService.getAllTraining()
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
      );
    // this.trainingList$ = this.trainingService.getAllTraining()
    //   .pipe(distinctUntilChanged(),
    //     shareReplay({ bufferSize: 1, refCount: true }),
    //     takeUntilDestroyed(this.destroy$));
    // return this.trainingList$;


  }


  onAdd() {
    const id = this.form.controls['trainingMasterId'].value

    if (!id) return this.messageService.createMessage('error', 'Please select training.')
    this.router.navigate(['/admin/trainee/add-trainee'], { queryParams: { id: id } })
  }

  onEdit(id: number): void {
    this.router.navigate(['/admin/trainee/add-trainee'], { queryParams: { traineeId: id } })
  }


}
