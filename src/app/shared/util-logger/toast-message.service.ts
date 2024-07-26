import { Injectable, Input } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  constructor(private messageService: MessageService) { }

  @Input() severity!: string;
  @Input() summary!: string;
  @Input() detail!: string;
  @Input() sticky: boolean = true;
  @Input() position: string = 'top-left';
  @Input() life: number = 1000;


  /**
   * severity: 'success', 
   * summary: 'Success', 
   * detail: 'Message Content' 
   */
  show() {
    this.messageService.add({
      severity: `${this.severity}`,
      summary: `${this.summary}`,
      detail: `${this.detail}`,
      life: this.life,
    })
  }
  /**
   * clear toast message
   * @returns 
   */
  clearToast = () => this.messageService.clear();
}
