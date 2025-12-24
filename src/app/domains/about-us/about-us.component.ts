import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { LazyImgDirective } from 'src/app/shared/util-common/directives/lazyImage/lazyImage.directive';
import { TruncatePipe } from 'src/app/shared/util-common/pipes/truncate.pipe';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzImageModule,
    NzIconModule,
    TruncatePipe,
    LazyImgDirective,
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  show = false;
  isLoading = signal(false);

  @Input() data!: any;

  // scrollTo(elem: string) {
  //   console.log(elem);
  //   this.show = !this.show;
  //   document
  //     ?.querySelector(elem)
  //     ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // }
  toggleContent() {
    this.show = !this.show;

    // wait for DOM to update
    setTimeout(() => {
      document
        .querySelector('#about-us')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }
}
