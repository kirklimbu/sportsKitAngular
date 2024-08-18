import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { Observable } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  fadeInUpOnEnterAnimation,
  bounceOutDownOnLeaveAnimation,
} from 'angular-animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-gallaries',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, NzTypographyModule, NzButtonModule],
  templateUrl: './gallaries.component.html',
  styleUrl: './gallaries.component.scss',
  animations: [],
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

  scrollTo(elem: string) {
    console.log(elem);
    document
      ?.querySelector(elem)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
