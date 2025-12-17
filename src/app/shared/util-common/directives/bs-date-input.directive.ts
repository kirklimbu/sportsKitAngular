import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appBsDateInput]',
})
export class BsDateInputDirective {
  private el: ElementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private control = inject(NgControl);

  @HostListener('input') onInput(): void {
    let value: string = this.el.nativeElement.value;

    // Strip non-numeric characters
    value = value.replace(/\D/g, '');

    // Format YYYY/MM/DD
    const year = value.slice(0, 4);
    let mm = value.slice(4, 6);
    let dd = value.slice(6, 8);

    // Handle MM restrictions
    if (mm.length === 2) {
      const mmVal = parseInt(mm, 10);
      if (mmVal < 1 || mmVal > 12) {
        mm = '';
      } else {
        mm = mm.padStart(2, '0');
      }
    }

    // Handle DD restrictions
    if (dd.length === 2) {
      const ddVal = parseInt(dd, 10);
      if (ddVal < 1 || ddVal > 32) {
        dd = '';
      } else {
        dd = dd.padStart(2, '0');
      }
    }

    // Combine formatted value
    let formatted = year;
    if (mm) formatted += '/' + mm;
    if (dd) formatted += '/' + dd;

    formatted = formatted.slice(0, 10); // Enforce max 10 chars

    // Update input element
    this.renderer.setProperty(this.el.nativeElement, 'value', formatted);
    this.control?.control?.setValue(formatted, { emitEvent: false });
  }

  @HostListener('blur') onBlur(): void {
    const value = this.el.nativeElement.value;
    const isValid = /^(\d{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2]\d|3[0-2])$/.test(
      value
    );

    if (!isValid) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid red');
      this.renderer.setAttribute(
        this.el.nativeElement,
        'title',
        'Enter a valid date in YYYY/MM/DD format. MM: 01–12, DD: 01–32'
      );
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border');
      this.renderer.removeAttribute(this.el.nativeElement, 'title');
    }
  }
}
