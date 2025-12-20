import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { LazyImgDirective } from 'src/app/shared/util-common/directives/lazyImage/lazyImage.directive';
import { TruncatePipe } from 'src/app/shared/util-common/pipes/truncate.pipe';
import { IPlace1Dto, IPlaceCategoryVM } from '../../data/model/famous-places';
import { FamousPlacesService } from '../../data/services/famous-places';

@Component({
  selector: 'app-famous-places',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzImageModule,
    NzIconModule,
    NzTabsModule,
    NzFormModule,
    NzInputModule,
    NzImageModule,
    NzEmptyModule,
    TruncatePipe,
    LazyImgDirective,
  ],
  templateUrl: './famous-places.html',
  styleUrl: './famous-places.scss',
})
export class FamousPlaces implements OnInit {
  // props
  categories: IPlaceCategoryVM[] = [];
  activeCategoryName = '';

  searchControl = new FormControl('', { nonNullable: true });
  categories$!: Observable<IPlaceCategoryVM[]>;

  private placesService = inject(FamousPlacesService);
  private router = inject(Router);

  @ViewChildren('placesContainer', { read: ElementRef })
  containers!: QueryList<ElementRef<HTMLDivElement>>;

  ngOnInit(): void {
    this.categories$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      filter((v) => !v || v.length === 10),
      switchMap((mobile) =>
        mobile
          ? this.placesService.getPlaces(mobile)
          : this.placesService.getPlaces('')
      ),
      map((places) => this.groupByCategory(places)),
      shareReplay(1)
    );

    this.categories$.subscribe((categories) => {
      this.categories = categories;

      // set default active category
      if (!this.activeCategoryName && categories.length) {
        this.activeCategoryName = categories[0].categoryName.toLowerCase();
      }
    });
  }

  private groupByCategory(places: IPlace1Dto[]): IPlaceCategoryVM[] {
    const map = new Map<number, IPlaceCategoryVM>();

    places
      .filter((p) => p.hasActive)
      .forEach((place) => {
        if (!map.has(place.categoryId)) {
          map.set(place.categoryId, {
            categoryId: place.categoryId,
            categoryName: place.categoryName,
            places: [],
          });
        }
        map.get(place.categoryId)!.places.push(place);
      });

    return Array.from(map.values());
  }

  scrollPlaces(direction: 'left' | 'right', categoryId: number): void {
    const container = this.containers.find(
      (el) => el.nativeElement.dataset['category'] === String(categoryId)
    );

    if (!container) return;

    container.nativeElement.scrollBy({
      left: direction === 'left' ? -280 : 280,
      behavior: 'smooth',
    });
  }

  onShowMore(categoryId: number): void {
    this.router.navigate(['/home/famous-places'], {
      queryParams: { categoryId },
    });
  }
  onTabChange(index: number) {
    this.activeCategoryName =
      this.categories[index]?.categoryName?.toLowerCase() ?? '';
  }
}
