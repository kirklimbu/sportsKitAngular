import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMember, IMemberRequirementDto } from '../models/member.model';
import { IMemberPayment } from '../models/member-payment';
import { CustomResponse } from 'src/app/shared/models/CustomResponse.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  getFormValues(id: number): Observable<IMember> {
    return this.http.get<IMember>(
      `${this.apiUrl}auth/member/form?memberId=${id}`
    );
  }

  saveMember(qustion: any): Observable<CustomResponse> {
    console.log('saving memeber', qustion);
    const formData = new FormData();
    formData.append('form', JSON.stringify(qustion));
    formData.append('file', qustion.file);
    formData.append('card', qustion.cardPictemp);

    return this.http.post<CustomResponse>(
      `${this.apiUrl}auth/member/save`,
      formData
    );
  }

  getAllMembers(): Observable<IMember[]> {
    return this.http.get<IMember[]>(`${this.apiUrl}member/list`);
  }

  // payment section

  getPaymentFormValues(payment: any): Observable<IMemberPayment[]> {
    console.log('pay form', payment);

    return this.http.get<IMemberPayment[]>(
      `${this.apiUrl}auth/member/payment/form?memberId=${payment.id}&hasNewPayment=${payment.paymentType}`
    );
  }

  savePayment(payment: any): Observable<any> {
    console.log('saving memeber', payment);
    return this.http.post<CustomResponse>(`${this.apiUrl}auth/member/payment/save`, payment, {});
  }

  getMemberRequirements(id: number,type:string): Observable<IMemberRequirementDto> {

    return this.http.get<IMemberRequirementDto>(`${this.apiUrl}auth/member/requirement/list?parentId=${id}&parentType=${type}`);
  }
}
