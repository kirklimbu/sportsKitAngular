import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
// third-party
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
// project
import { GlobalConstants } from 'src/app/shared/util-common/global-constants';
import { RouterModule } from '@angular/router';
import { UserDetailsService } from 'src/app/shared/util-common/userDetails.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Logout } from 'src/app/domains/auth/login/state/login.model';
import { AuthService } from 'src/app/shared/util-auth/services/auth-http/auth.service';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { Store } from '@ngxs/store';
import { CustomResponse } from 'src/app/shared/models/CustomResponse.model';

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
}
