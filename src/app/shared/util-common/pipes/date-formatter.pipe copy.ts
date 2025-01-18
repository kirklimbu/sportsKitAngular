import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
  standalone: true,
})
export class DateFormatterPipe implements PipeTransform {
  private datePipe = new DatePipe('en-US');
  transform(value: string, ...args: unknown[]): unknown {
    if (!value) return '';
    const date = new Date(value);
    // Use Angular's DatePipe to format the date
    return this.datePipe.transform(date, 'MMM d, yyyy') || '';
  }
}
