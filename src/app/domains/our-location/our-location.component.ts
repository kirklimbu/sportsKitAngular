import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
// third-party
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from 'src/app/shared/ui-common/map/map.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzImageModule } from 'ng-zorro-antd/image';
import { ContactUsFormComponent } from './contact-us-form/contact-us-form.component';
import { GlobalConstants } from 'src/app/shared/util-common/global-constants';
import { IOrganization } from '../admin/organization/data/models/organization/organization.model';

@Component({
  selector: 'app-our-location',
  standalone: true,
  imports: [
    // ng
    CommonModule,
    // third-party
    LeafletModule,
    NzButtonModule,
    NgOptimizedImage,
    NzImageModule,
    // project
    MapComponent,
    ContactUsFormComponent,
  ],
  templateUrl: './our-location.component.html',
  styleUrls: ['./our-location.component.scss'],
})
export class OurLocationComponent {
  // props
  readonly info = GlobalConstants;
  @Input() data!: IOrganization;
}
