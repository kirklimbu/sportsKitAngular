import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TruncatePipe } from 'src/app/shared/util-common/pipes/truncate.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NzDividerModule,
    NzTypographyModule,
    NzTagModule,
    NzButtonModule,
    // project
    TruncatePipe
  ],
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.scss',
  animations: [
    trigger('fadeSlideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ]),
  ]
})
export class CoachesComponent {

  animate = false;
  show = false;

  message$!: Observable<any>;
  @Input() data!: any;


  scrollTo(elem: string) {
    this.show = !this.show;
    document?.querySelector(elem)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }



}