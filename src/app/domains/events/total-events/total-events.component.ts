import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { EventsService } from '../data/services/events.service';
import { Observable, shareReplay } from 'rxjs';
import { TruncatePipe } from 'src/app/shared/util-common/pipes/truncate.pipe';
import { Router } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-total-events',
  standalone: true,
  imports: [CommonModule,
    TruncatePipe,
    NgOptimizedImage,
    NzBadgeModule,
    NzSkeletonModule
  ],
  templateUrl: './total-events.component.html',
  styleUrl: './total-events.component.scss',
})
export class TotalEventsComponent implements OnInit {

  events$!: Observable<any[]>
  private readonly router = inject(Router)
  private eventsService = inject(EventsService);

  ngOnInit(): void {
    this.fetchAllEvents();
  }

  fetchAllEvents() {
    this.events$ = this.eventsService.getAllEvents().pipe(shareReplay(1))
  }

  showMore(id: number) {
    this.router.navigate(['/home/events/detail',], { queryParams: { id: id } })
  }
}
