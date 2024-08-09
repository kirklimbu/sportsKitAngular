import { CommonModule } from '@angular/common';
import { SpinnerService } from './services/spinner.service';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, inject } from '@angular/core';


import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgxSpinnerModule } from 'ngx-spinner';
@Component({
  standalone: true,
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  imports: [
    CommonModule,
    NzSpinModule,
    NgxSpinnerModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SpinnerComponent {

  readonly spinnerService = inject(SpinnerService)
  @Input() isLoading: boolean = true;

}
