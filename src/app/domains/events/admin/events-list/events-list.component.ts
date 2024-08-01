import { ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule,
    NgOptimizedImage,
    NzTableModule,
    NzDropDownModule,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule
    // InlineSVGModule
  ],
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit {
  @Input() data$!: Observable<IEvents[]>

  private eventService = inject(EventsService)
  private router = inject(Router)
  private readonly cd = inject(ChangeDetectorRef)

  constructor() { }

  ngOnInit() {
    (this.data$.subscribe(res => {
      console.log('init', res)
    }));
    this.fetchEvents();
  }

  ngOnChanges(): void {
    // (this.data$.subscribe(res => {
    // }));
    console.log('onchanges')
    if (!this.data$) this.fetchEvents()

    this.data$ = this.data$
    // this.cd.detectChanges();
  }

  private fetchEvents() {
    this.data$ = this.eventService.getAllEvents()

  }

  onClick(id?: number) {
    id
      ? this.router.navigate(['/admin/events/add-event'], { queryParams: { id: id } })
      : this.router.navigate(['/admin/events/add-event']);
  }


  onAdd() {
    // if (!this.form.controls['setMasterId'].value) return this.messageService.createMessage('error', 'Set is missing. Please select set.')
    // this.router.navigate(['/auth/question-add'], { queryParams: { setMasterId: this.form.controls['setMasterId'].value } })
  }


  onEdit(id: number) {
    id
      ? this.router.navigate(['/admin/events/add-event'], { queryParams: { id: id } })
      : this.router.navigate(['/admin/events/add-event']);
    // this.router.navigate(['/auth/question-add'], { queryParams: { id: id, setMasterId: this.form.controls['setMasterId'].value } })
  }
}
