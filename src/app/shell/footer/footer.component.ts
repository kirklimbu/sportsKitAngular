import { Component, Input, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { HomeService } from 'src/app/domains/home/home.service';
import { DatePipe } from '@angular/common';
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
  appVersion = signal('1.3.0');

  @Input() footerData!: any;

  private datePipe = inject(DatePipe);

  ngOnInit() {
    // this.fetchData()
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy');
  }
}
