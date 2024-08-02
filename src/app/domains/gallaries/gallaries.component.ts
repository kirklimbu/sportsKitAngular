import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  fadeInUpOnEnterAnimation,
  bounceOutDownOnLeaveAnimation,
} from 'angular-animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-gallaries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallaries.component.html',
  styleUrl: './gallaries.component.scss',
  animations: [
    fadeInUpOnEnterAnimation({
      anchor: 'enter',
      duration: 1000,
      delay: 100,
      translate: '30px',
    }),
    bounceOutDownOnLeaveAnimation({
      anchor: 'leave',
      duration: 500,
      delay: 200,
      translate: '40px',
    }),
  ],
})
export class GallariesComponent implements OnInit {
  gallary: any[] = [];
  private readonly homeService = inject(HomeService);
  private readonly unsubscribe$ = inject(DestroyRef);

  ngOnInit() {
    this.fetchGallaries();
  }
  fetchGallaries() {
    this.homeService
      .getGallaryContents()
      .pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((res) => {
        this.gallary = res.slice(0, 4);
      });
  }
}
