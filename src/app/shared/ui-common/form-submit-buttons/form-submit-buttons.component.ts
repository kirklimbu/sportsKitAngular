import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-form-submit-buttons',
  templateUrl: './form-submit-buttons.component.html',
  styleUrls: ['./form-submit-buttons.component.scss'],
  imports: [CommonModule]
})
export class FormSubmitButtonsComponent implements OnInit {
  // props
  @Input() showPrimaryButton = true;
  @Input() showSecondaryButton = true;
  @Input() primaryButtonLabel = ''
  @Input() secondaryButtonLabel = ''
  @Input() mode: string = 'add';
  @Input() isDisabled: boolean = false;

  @Output('save') save: EventEmitter<Event> = new EventEmitter<Event>();
  @Output('cancel') cancel: EventEmitter<Event> = new EventEmitter<Event>();


  constructor() { }

  ngOnInit(): void { }

  onSave($event: Event) {
    this.save.emit();
  }

  onCancel($event: Event) {
    this.cancel.emit();
  }
}
