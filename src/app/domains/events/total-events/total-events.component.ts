import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../data/services/events.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-total-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './total-events.component.html',
  styleUrl: './total-events.component.scss',
})
export class TotalEventsComponent implements OnInit {

  events$!: Observable<any[]>
  private eventsService = inject(EventsService);
  ngOnInit(): void {
    this.fetchAllEvents();
  }

  fetchAllEvents() {
    this.events$ = this.eventsService.getAllEvents()
  }
}
