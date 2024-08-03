import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  standalone: true,
  selector: 'app-form-submit-buttons',
  templateUrl: './form-submit-buttons.component.html',
  styleUrls: ['./form-submit-buttons.component.scss'],
  imports: [CommonModule, NzSpaceModule, NzButtonModule],
})
export class FormSubmitButtonsComponent {
  // props
  @Input() showPrimaryButton = true;
  @Input() showSecondaryButton = true;
  @Input() primaryButtonLabel = '';
  @Input() secondaryButtonLabel = '';
  @Input() mode = 'add';
  @Input() isDisabled = false;

  @Output() save: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() cancel: EventEmitter<Event> = new EventEmitter<Event>();

  // constructor() { }

  // ngOnInit(): void { }

  onSave($event: Event) {
    this.save.emit();
  }

  onCancel($event: Event) {
    this.cancel.emit();
  }
}
