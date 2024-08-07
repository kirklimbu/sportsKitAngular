
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMemberPayment } from 'src/app/domains/members/data/models/member-payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  getPaymentHistory(params: any): Observable<IMemberPayment[]> {
    //   // dba/api/auth/payment/list?payerId=  type=

    return this.http.get<IMemberPayment[]>(
      `${this.apiUrl}auth/payment/list`, { params: params }
    );
  }
}
