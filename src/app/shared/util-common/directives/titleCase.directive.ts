import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTitleCase]',
  standalone: true,
})
export class TitleCaseDirective {
  constructor(
    private ngControl: NgControl) { }


  @HostListener('input', ['$event'])
  onInput(event: any) {
    const inputValue = event.target.value;
    const capitalizedValue = inputValue.replace(/\b\w/g, (match: string) => match.toUpperCase());
    this.ngControl.control?.setValue(capitalizedValue);
  }
}


