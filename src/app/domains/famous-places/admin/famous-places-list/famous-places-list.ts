import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { AuthState } from 'src/app/domains/auth/login/state/login.state';
import { EventsService } from 'src/app/domains/events/data/services/events.service';
import { IPlace1Dto } from '../../data/model/famous-places';
import { Observable } from 'rxjs/internal/Observable';
import { FamousPlacesService } from '../../data/services/famous-places';
import { Role } from 'src/app/shared/util-auth/models/user.model';

@Component({
  selector: 'app-famous-places-list',
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    NzTableModule,
    NzDropDownModule,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzSpaceModule,
    NzPageHeaderModule,
  ],
  templateUrl: './famous-places-list.html',
  styleUrl: './famous-places-list.scss',
})
export class FamousPlacesList implements OnInit {
  // props
  userRole: Role | undefined;

  data$!: Observable<IPlace1Dto[]>;

  private placesService = inject(FamousPlacesService);
  private router = inject(Router);
  private readonly destroy$ = inject(DestroyRef);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly store = inject(Store);

  ngOnInit() {
    this.checkUser();
    this.fetchPlaces();
  }

  private checkUser(): void {
    this.userRole = this.store.selectSnapshot(AuthState.userRole);
  }
  private fetchPlaces() {
    this.data$ = this.placesService.getAdminPlaces();
  }

  onClick(id?: number) {
    id
      ? this.router.navigate(['/admin/places/add-places'], {
          queryParams: { id: id },
        })
      : this.router.navigate(['/admin/places/add-places']);
  }

  onEdit(id: number) {
    this.router.navigate(['/admin/places/add-places'], {
      queryParams: { id: id },
    });
  }
}
