import { Component, DestroyRef, Input, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SanitizeHtmlPipe } from 'src/app/shared/util-common/pipes/sanitize-html.pipe';
import { Observable, map } from 'rxjs';
import { IEvents } from './data/events.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EventsService } from './data/services/events.service';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule,
    NzButtonModule,
    NgOptimizedImage,
    SanitizeHtmlPipe,
    NzSpaceModule
  ],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
})
export class EventDetailsComponent {
  show = false;
  id$!: Observable<{}>;

  data$!: Observable<IEvents>;

  private readonly route = inject(ActivatedRoute);
  private readonly unsubscribe$ = inject(DestroyRef);
  private readonly eventService = inject(EventsService)



  // #TODO UI FOR THIS PAGE
  ngOnInit() {
    this.checkFormStatus()
  }

  private checkFormStatus() {
    this.id$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => {
        const id = Number(params.get('id'))
        return { eventId: id }
      })
    );
    this.id$.pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {
        this.getEventDetail(_res)
      })
  }

  getEventDetail(id: any) {
    this.data$ = this.eventService.getEventDetail(id)

  }

  scrollTo(elem: string) {
    console.log(elem);
    this.show = !this.show;
    document?.querySelector(elem)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


