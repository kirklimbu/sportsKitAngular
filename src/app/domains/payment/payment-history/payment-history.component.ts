import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Observable, map, switchMap } from 'rxjs';
import { MemberService } from '../../members/data/services/member.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaymentService } from '../data/services/payment.service';
import { IMemberPayment } from '../../members/data/models/member-payment';

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    FormsModule,
    NzTableModule,
    NzDropDownModule,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzPageHeaderModule,
    NzSpaceModule
  ],
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.scss',
})
export class PaymentHistoryComponent {



  payerId$!: Observable<any>
  paymentHistory$!: Observable<IMemberPayment[]>
  private readonly paymentService = inject(PaymentService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly unsubscribe$ = inject(DestroyRef);

  ngOnInit(): void {
    this.checkFormStatus();
  }

  private checkFormStatus() {
    this.payerId$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => {
        const payerId = Number(params.get('id'));
        const type = params.get('type')

        return { payerId, type }
      })
    );
    this.payerId$.pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {
        console.log('fomn res', _res);
        this.fetchPymentHistory();

      });
  }


  private fetchPymentHistory() {
    this.paymentHistory$ = this.payerId$.pipe(
      switchMap((query: number) => this.paymentService.getPaymentHistory(query))
    );

  }

  // private fetchPymentHistory(): void {
  //   this.data$ = this.memberService.getAllMembers();
  // }

  onViewMore(arg0: any) {
    throw new Error('Method not implemented.');
  }

}

