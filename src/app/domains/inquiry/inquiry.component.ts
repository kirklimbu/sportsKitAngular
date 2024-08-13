import { Component, OnInit, inject } from '@angular/core';
import { InquiryService } from './services/inquiry.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Inquiry } from './data/model/inquiry.model';

@Component({
  selector: 'app-inquiry',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule
  ],
  templateUrl: './inquiry.component.html',
  styleUrl: './inquiry.component.css'
})
export class InquiryComponent implements OnInit {

  data$!: Observable<Inquiry[]>
  private inquiryService = inject(InquiryService)

  ngOnInit() {
    this.getData();

  }

  private getData() {
    this.data$ = this.inquiryService.getInqueries();
  }

}
