import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-nepali-datepicker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Nepali-Datepicker.component.html',
  styleUrl: './Nepali-Datepicker.component.css',
})
export class NepaliDatepickerComponent implements AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
    // Initialize the Nepali date picker
    $('.date-picker').nepaliDatePicker({
      dateFormat: '%D, %M %d, %y',
      closeOnDateSelect: true,

    });
  }
}


