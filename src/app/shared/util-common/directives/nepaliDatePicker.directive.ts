import { Directive, ElementRef, HostListener, OnInit, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import 'nepali-date-picker';
declare var $: any; // Declare jQuery

@Directive({
  selector: '[appNepaliDatePicker]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NepaliDatePickerDirective),
      multi: true
    }
  ]
})
export class NepaliDatePickerDirective implements ControlValueAccessor, OnInit {
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  constructor(private el: ElementRef,
    private renderer: Renderer2
  ) { }

  // @HostListener('blur')
  // onBlur(): void {
  //   this.onTouched();
  // }

  ngOnInit(): void {
    const element = this.el.nativeElement;
    // console.log('ele', element);

    $(element).nepaliDatePicker({
      dateFormat: '%D, %M %d, %y',
      closeOnDateSelect: true,

      onChange: (value: string) => {
        // console.log('onchg ', value);

        this.renderer.setProperty(element, 'value', value);
        this.onChange(value);
        this.onTouched();

      }
    });
  }

  writeValue(value: any): void {
    const element = this.el.nativeElement;
    // console.log('Write value:', value); // Debug log

    if (value) {

      $(element).val(value).trigger('change');
    } else {
      $(element).val('');
    }
  }

  registerOnChange(fn: any): void {
    // console.log('Register onChange', fn); // Debug log

    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // console.log('Register onTouched'); // Debug log

    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled);

  }
}
