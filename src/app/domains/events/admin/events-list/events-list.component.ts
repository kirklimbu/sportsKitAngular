import { ChangeDetectorRef, Component, DestroyRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
// import { InlineSVGModule } from 'ng-inline-svg-2';
import { EventsService } from '../../data/services/events.service';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { IEvents } from '../../data/events.model';
import { Observable } from 'rxjs';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TopScrollerService } from 'src/app/shared/services/top-scroller.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { Store } from '@ngxs/store';
import { Role } from 'src/app/shared/util-auth/models/user.model';
import { AuthState } from 'src/app/domains/auth/login/state/login.state';


@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    NgOptimizedImage,
    NzTableModule,
    NzDropDownModule,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzSpaceModule,
    NzPageHeaderModule,

    // InlineSVGModule
  ],
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit {

  userRole: Role | undefined

  @Input() data$!: Observable<IEvents[]>
  // @Output() sendEventId: any = new EventEmitter();
  @Output() sendEventId = new EventEmitter<number>();


  private topScrollerService = inject(TopScrollerService)
  private eventService = inject(EventsService)
  private router = inject(Router)
  private readonly destroy$ = inject(DestroyRef)
  private readonly cd = inject(ChangeDetectorRef)
  private readonly store = inject(Store);

  constructor() { }

  ngOnInit() {
    this.checkUser();

    this.fetchEvents();
  }


  private checkUser(): void {
    this.userRole = this.store.selectSnapshot(AuthState.userRole);
  }

  ngOnChanges(): void {

    console.log('onchanges')
    if (!this.data$) this.fetchEvents()

    this.data$ = this.data$
  }

  private fetchEvents() {
    this.data$ = this.eventService.getAllEvents()

  }

  onClick(id?: number) {
    id
      ? this.router.navigate(['/admin/events/add-event'], { queryParams: { id: id } })
      : this.router.navigate(['/admin/events/add-event']);
  }




  onEdit(id: number) {
    this.router.navigate(['/admin/events/add-event'], { queryParams: { id: id } })

  }

}
