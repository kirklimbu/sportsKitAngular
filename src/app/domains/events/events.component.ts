import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NzAvatarModule,
    NzCardModule,
    NzIconModule,
    NzButtonModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

  @Input() data!: any



}
