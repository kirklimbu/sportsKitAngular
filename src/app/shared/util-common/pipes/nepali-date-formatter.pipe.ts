
import { Pipe, PipeTransform } from '@angular/core';
import NepaliDate from 'nepali-datetime';

@Pipe({
  name: 'nepaliDateFormatter',
  standalone: true,
})
export class NepaliDateFormatterPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Split the input date (e.g., "2081/09/13")
    const [year, month, day] = value.split('/').map(Number);
    // Create a NepaliDate object
    const nepaliDate = new NepaliDate(year, month, day);
    // Format the date to "13 Poush, 2081"
    return nepaliDate.formatNepali('DD MMMM ,YYYY')

    
  }
}
