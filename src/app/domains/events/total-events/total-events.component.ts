import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../data/services/events.service';
import { Observable } from 'rxjs';
import { TruncatePipe } from 'src/app/shared/util-common/pipes/truncate.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-total-events',
  standalone: true,
  imports: [CommonModule,
    TruncatePipe
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
    this.events$ = this.eventsService.getAllEvents()
  }

  showMore(id: number) {
    this.router.navigate(['/events/detail',], { queryParams: { id: id } })
  }
}
