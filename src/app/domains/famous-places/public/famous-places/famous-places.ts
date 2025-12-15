import { Component, DestroyRef, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlace1Dto } from '../../data/model/famous-places';
import { FamousPlacesService } from '../../data/services/famous-places';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';
import { TruncatePipe } from 'src/app/shared/util-common/pipes/truncate.pipe';
import { LazyImgDirective } from 'src/app/shared/util-common/directives/lazyImage/lazyImage.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-famous-places',
  imports: [
    CommonModule,
    NzCardModule,
    NzImageModule,
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

  onShowMore(id:number){
    this.router.navigate(['/home/famous-places'])
  }
}
