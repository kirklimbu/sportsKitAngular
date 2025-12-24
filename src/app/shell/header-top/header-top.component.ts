import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
// third-party
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
// project
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Logout } from 'src/app/domains/auth/login/state/login.model';
import { AuthService } from 'src/app/shared/util-auth/services/auth-http/auth.service';
import { GlobalConstants } from 'src/app/shared/util-common/global-constants';
import { UserDetailsService } from 'src/app/shared/util-common/userDetails.service';
import { MessageService } from 'src/app/shared/util-logger/message.service';
@Component({
  selector: 'app-header-top',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // third-party
    NzIconModule,
    NzMenuModule,
    NzAvatarModule,
    NzDropDownModule,
  ],
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss'],
})
export class HeaderTopComponent implements OnInit {
  isLoggedIn = false;
  userDetails!: any;

  headerData = GlobalConstants;
  info$!: Observable<any>;

  @Input() notificationCount!: number;
  @Input() imgUrl!: string;
  @Input() data: any;

  authService = inject(AuthService);
  messageService = inject(MessageService);
  destroyRef = inject(DestroyRef);
  store = inject(Store);
  private userDetailsService = inject(UserDetailsService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getUserDetails();
  }

  private getUserDetails() {
    const isAuthenticated = this.userDetailsService.getUserStatus();
    isAuthenticated
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.isLoggedIn = res));
  }

  public onLogout() {
    this.store.dispatch(new Logout());
  }
  navigateToQrSection(): void {
    if (this.router.url === '/home') {
      const el = document.querySelector('.qr-code');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => {
          const el = document.querySelector('.qr-code');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      });
    }
  }
}
