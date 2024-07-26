import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, shareReplay } from 'rxjs';
import { HomeService } from '../home/home.service';
import { NgOptimizedImage } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NzDividerModule,
    NzTypographyModule,
    NzTagModule
  ],
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.scss'
})
export class CoachesComponent implements OnInit {
  message$!: Observable<any>;
  show = false;
  @Input() data!: any;


  private homeService = inject(HomeService)
  private destroyRef$ = inject(DestroyRef)

  ngOnInit() {
    this.getWelcomeMessage()
  }

  getWelcomeMessage() {
    this.message$ = this.homeService.getWelComeMessage()
      .pipe(
        takeUntilDestroyed(this.destroyRef$),
        shareReplay(1)
      )

  }
}