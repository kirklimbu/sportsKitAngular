import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
// import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

@Component({
  standalone: true,
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  imports: [
    CommonModule,
    NgOptimizedImage,
    // CarouselModule,
    NzButtonModule,
    NzCarouselModule
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent implements OnInit, OnChanges {
  // props
  array = [1, 2, 3, 4];

  @Input() textPosition = '';
  @Input() title!: string;
  @Input() description!: string;
  @Input() subtitle!: string;
  @Input() data: any;
  @Input() navSpeed = 800;
  @Input() showPrice = true;
  @Input() showCartButtons = false;
  @Input() showCaption = true;
  @Input() loop = true;
  @Output() bookMySeat = new EventEmitter();


  // carouselOptions: OwlOptions = {
  //   autoWidth: true,
  //   autoplay: true,
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: true,
  //   margin: 10,
  //   nav: true,
  //   navSpeed: 700,
  //   navText: [
  //     '<i class="fa fa-chevron-left"></i>',
  //     '<i class="fa fa-chevron-right" ></i>',
  //   ],
  //   animateOut: 'fadeOut',
  //   responsive: {
  //     0: {
  //       items: 2,
  //     },
  //     400: {
  //       items: 2,
  //       // nav: true,
  //     },
  //     740: {
  //       items: 5,
  //       // nav: true,
  //     },
  //     940: {
  //       items: 5,
  //       // nav: true,
  //     },
  //   },
  //   // nav: true,
  // };



  ngOnChanges() {
    console.log('data', this.data);

  }
  ngOnInit(): void {
    console.log('data', this.data);

  }

  onClick() {
    console.log('click');

    this.bookMySeat.emit();
  }


  trackBy(index: any, item: any) {
    return item.productId;
  }
}
