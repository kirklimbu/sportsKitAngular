import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';
import { LazyImgDirective } from 'src/app/shared/util-common/directives/lazyImage/lazyImage.directive';
import { GlobalConstants } from 'src/app/shared/util-common/global-constants';

@Component({
  selector: 'app-download-app',
  imports: [NzCardModule, NzImageModule, LazyImgDirective],
  templateUrl: './download-app.html',
  styleUrl: './download-app.scss',
})
export class DownloadApp {
  readonly playstoreLink = GlobalConstants.PLAYSTORE_LINK;
}
