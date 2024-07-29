import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzConfig, } from 'ng-zorro-antd/core/config';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';

const ngZorroConfig: NzConfig = {
  message: { nzTop: 120 },
  notification: { nzTop: 240 }
};

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
@Component({
  standalone: true,
  imports: [
    RouterModule,

  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ],


})
export class AppComponent {
  title = 'DNB Academy';
}
