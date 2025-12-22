import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-popup-message',
  imports: [CommonModule, RouterModule],
  templateUrl: './popup-message.html',
  styleUrl: './popup-message.scss',
})
export class PopupMessage {
  
  private modalRef = inject(NzModalRef);
  private router = inject(Router);

  onVerify() {
    this.modalRef.close(); // ✅ CLOSE MODAL
    this.router.navigate(['/home/verify-registration']);
  }

  onFindHotel() {
    this.modalRef.close(); // ✅ CLOSE MODAL
    this.router.navigate(['/home/famous-places']);
  }
}
