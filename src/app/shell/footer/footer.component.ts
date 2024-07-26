import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { HomeService } from 'src/app/domains/home/home.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,
    NgOptimizedImage],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [DatePipe]
})
export class FooterComponent implements OnInit {
  currentDate!: string | null

  @Input() footerData!: any;


  private datePipe = inject(DatePipe);


  ngOnInit() {
    // this.fetchData()
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy');


  }

}
