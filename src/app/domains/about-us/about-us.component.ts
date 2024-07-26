import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { HomeService } from '../home/home.service';
import { Observable, shareReplay } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SanitizeHtmlPipe } from "../../shared/util-common/pipes/sanitize-html.pipe";


@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NgOptimizedImage,
    SanitizeHtmlPipe
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {

  @Input() data!: any;


  ngOnInit() {
  }



}




