import { Component, DestroyRef, Input, OnInit, inject, signal } from '@angular/core';
import { HomeService } from '../home/home.service';
import { Observable, shareReplay } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SanitizeHtmlPipe } from "../../shared/util-common/pipes/sanitize-html.pipe";
import { TruncatePipe } from 'src/app/shared/util-common/pipes/truncate.pipe';
import { SpinnerComponent } from 'src/app/shared/ui-common/spinner/spinner.component';


@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NgOptimizedImage,
    SanitizeHtmlPipe,
    TruncatePipe,
    SpinnerComponent
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {
  show = false;
  isLoading = signal(false);

  @Input() data!: any;


  ngOnInit() {
  }


  scrollTo(elem: string) {
    console.log(elem);
    this.show = !this.show;
    document?.querySelector(elem)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


}




