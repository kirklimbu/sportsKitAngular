import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { SidenavComponent } from 'src/app/shell/sidevav/sidenav.component';
import { RouterModule } from '@angular/router';
// import { BreadcrumbModule } from 'xng-breadcrumb';
import { BodyComponent } from './body/body.component';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    // SidenavComponent,
    RouterModule,
    // BreadcrumbModule,
    BodyComponent
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  isSideNavCollapsed = false;
  collapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
