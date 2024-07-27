import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { HomeService } from '../home/home.service';
import { Observable, shareReplay } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SanitizeHtmlPipe } from "../../shared/util-common/pipes/sanitize-html.pipe";
import { TruncatePipe } from 'src/app/shared/util-common/pipes/truncate.pipe';


@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NgOptimizedImage,
    SanitizeHtmlPipe,
    TruncatePipe
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {
  show = false;

  @Input() data!: any;


  ngOnInit() {
  }



}




