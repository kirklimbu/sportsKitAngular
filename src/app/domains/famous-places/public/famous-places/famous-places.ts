import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IPlace1Dto } from '../../data/model/famous-places';
import { FamousPlacesService } from '../../data/services/famous-places';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';
import { TruncatePipe } from 'src/app/shared/util-common/pipes/truncate.pipe';
import { LazyImgDirective } from 'src/app/shared/util-common/directives/lazyImage/lazyImage.directive';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-famous-places',
  imports: [
    CommonModule,
    NzCardModule,
    NzImageModule,
    NzIconModule,
    TruncatePipe,
    LazyImgDirective,
  ],
  templateUrl: './famous-places.html',
  styleUrl: './famous-places.scss',
})
export class FamousPlaces {
  // props
  data$!: Observable<IPlace1Dto[]>;

  private placesService = inject(FamousPlacesService);
  private router = inject(Router);
  private readonly destroy$ = inject(DestroyRef);

  ngOnInit() {
    this.fetchPlaces();
  }
  private fetchPlaces() {
    this.data$ = this.placesService.getPlaces();
  }

  onShowMore(id: number) {
    this.router.navigate(['/home/famous-places']);
  }
  @ViewChild('placesContainer', { read: ElementRef })
  placesContainer!: ElementRef<HTMLDivElement>;

  scrollPlaces(direction: 'left' | 'right') {
    const scrollAmount = 320; // card width + gap
    this.placesContainer.nativeElement.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }
}
