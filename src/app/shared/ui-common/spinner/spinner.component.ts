import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgxSpinnerModule } from 'ngx-spinner';
@Component({
  standalone: true,
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  imports: [
    NzSpinModule,
    NgxSpinnerModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SpinnerComponent {



}
