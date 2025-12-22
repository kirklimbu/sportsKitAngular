import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzConfig } from 'ng-zorro-antd/core/config';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { SpinnerComponent } from './shared/ui-common/spinner/spinner.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { PopupMessage } from './shared/ui-common/popup-message/popup-message';
const isLoading = signal(false);

const ngZorroConfig: NzConfig = {
  message: { nzTop: 120 },
  notification: { nzTop: 240 },
};

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);
@Component({
  standalone: true,
  imports: [RouterModule, SpinnerComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: NZ_ICONS, useValue: icons }, NzModalService],
})
export class AppComponent implements OnInit {
  title = 'DNB Academy';

  private modalRef: NzModalRef | null = null;
  opened = signal(false);

  private modal = inject(NzModalService);

  constructor() {
    effect(() => {
      const spinner = document.getElementById('loading-spinner');
      if (spinner) {
        if (isLoading()) {
          spinner.style.display = 'block'; // Show spinner
        } else {
          spinner.style.display = 'none'; // Hide spinner
        }
      }
    });
  }

  ngOnInit(): void {
    // Simulate loading data
    isLoading.set(true); // Show spinner
    setTimeout(() => {
      isLoading.set(false); // Hide spinner after data is loaded
    }, 2000); // Simulate 2 seconds delay
    this.openMessage();
  }

  private openMessage() {
    this.modalRef = this.modal.create({
      nzContent: PopupMessage,
      // nzWidth: config.width ?? 360,
      nzFooter: null,
      // nzComponentParams: config.data,
      nzCentered: true,
      // nzAfterClose: () => {
      //   this.opened.set(false);
      //   this.modalRef = null;
      // },
    });
    this.modalRef.afterClose.subscribe(() => {
      this.opened.set(false);
      this.modalRef = null;
    });

    this.opened.set(true);
  }

  close() {
    this.modalRef?.close();
  }
}
