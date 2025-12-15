import { NgOptimizedImage } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TruncatePipe } from 'src/app/shared/util-common/pipes/truncate.pipe';
import { NepaliDateFormatterPipe } from "../../shared/util-common/pipes/nepali-date-formatter.pipe";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    RouterModule,
    NgOptimizedImage,
    NzAvatarModule,
    NzCardModule,
    NzIconModule,
    NzButtonModule,
    NzGridModule,
    // project
    TruncatePipe,
    NepaliDateFormatterPipe
],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

  @Input() data!: any

  private router = inject(Router)


  showMore(id: number) {
    this.router.navigate(['/home/events/detail',], { queryParams: { id: id } })
  }
}
