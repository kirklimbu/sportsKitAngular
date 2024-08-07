import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Store } from '@ngxs/store';
import { Logout } from '../../auth/login/state/login.model';
import { Role } from 'src/app/shared/util-auth/models/user.model';
import { UserDetailsService } from 'src/app/shared/util-common/userDetails.service';

@Component({
  selector: 'app-body',
  standalone: true,

  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    NzIconModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzToolTipModule
  ]
})
export class BodyComponent implements OnInit {

  isCollapsed = false;
  userRole!: Role | undefined;
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  private router = inject(Router)
  private store = inject(Store)
  private userDetailService = inject(UserDetailsService)
  role!: Role;

  ngOnInit(): void {
    this.checkUser()
  }

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }

  checkUser(): void {
    this.userRole = this.userDetailService.getUserRole();

    console.log('role', this.userRole);

  }

  // onViewProfile() {
  //   this.checkUser()

  //   const userRole: Role = this.userDetailService.getUserRole();

  //   // if (this.userRole === Role.ADMIN) {
  //   //   this.router.navigate(['admin/profile'])
  //   // } else {
  //   //   this.router.navigate(['admin/user-profile'])
  //   // }
  // }

  onLogout() {
    localStorage.clear();
    this.store.dispatch(new Logout());
    this.router.navigate(['/home']);


  }
}
