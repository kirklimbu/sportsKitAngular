import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [DatePipe],
})
export class FooterComponent implements OnInit {
  currentDate!: string | null;
  appVersion = signal('1.9.0');

  @Input() footerData!: any;

  private datePipe = inject(DatePipe);

  ngOnInit() {
    // this.fetchData()
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy');
  }
}
