import { Observable } from 'rxjs';
import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
// third-party
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { HomeService } from '../home.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    NzCarouselModule
  ]
})
export class SliderComponent implements OnInit {
  effect = 'fade';

  @Input() bannerData!: any

  ngOnInit(): void {


  }



}