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

  private destroyRef$ = inject(DestroyRef)
  private homeService = inject(HomeService)
  ngOnInit(): void {

    // this.loadSlider()
    console.log('slider', this.bannerData);

  }


  private loadSlider() {
    this.bannerData = this.homeService.getBanners()
    this.bannerData
      .pipe(
        takeUntilDestroyed(this.destroyRef$)
      )
      .subscribe((res: any) => {
        this.bannerData = res.bannerList
      })
  }

}