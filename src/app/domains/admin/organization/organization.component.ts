import { Component, inject, OnInit } from '@angular/core';
import { OrganizationService } from './data/services/organization.service';
import { Observable } from 'rxjs';
import { IOrganization } from './data/models/organization/organization.model';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    NzSpaceModule,
    NzButtonModule,
    NzIconModule,
  ],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss',
})
export class OrganizationComponent implements OnInit {
  // props
  details$!: Observable<IOrganization>;

  private readonly organizationService = inject(OrganizationService);

  ngOnInit(): void {
    this.getOrgDetails();
  }
  private getOrgDetails() {
    this.details$ = this.organizationService.getFormValues();
  }

  // onEdit() {}
}
