import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-secondary-links',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './secondary-links.component.html',
  styleUrls: ['./secondary-links.component.scss']
})
export class SecondaryLinksComponent {

  @Input() showPrimaryLink: boolean = true;
  @Input() showSecondaryLink: boolean = false;
  @Input() primaryLinkTitle!: string;
  @Input() secondaryLinkTitle!: string;
  @Input() primaryLinkLabel!: string;
  @Input() secondaryLinkLabel!: string;
  @Output() primaryAction = new EventEmitter<undefined>
  @Output() secondaryAction = new EventEmitter<undefined>


  onPrimaryLinkClick(data: any) {
    console.log('1click', data);
    this.primaryAction.emit(data);
  }

  onSecondaryLinkClick(data: any) {
    console.log('2click', data);
    this.secondaryAction.emit(data);
  }
}
