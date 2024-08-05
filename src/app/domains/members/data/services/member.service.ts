import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMember } from '../models/member.model';
import { IMemberPayment } from '../models/member-payment';

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

  saveMember(qustion: any): Observable<IMember[]> {
    console.log('saving memeber', qustion);
    const formData = new FormData();
    formData.append('form', JSON.stringify(qustion));
    formData.append('file', qustion.file);
    console.log('fsdfa', formData);
    return this.http.post<IMember[]>(
      `${this.apiUrl}auth/member/save`,
      formData
    );
  }

  getAllMembers(): Observable<IMember[]> {
    return this.http.get<IMember[]>(`${this.apiUrl}member/list`);
  }

  // payment section

  getPaymentFormValues(id: number): Observable<IMemberPayment[]> {
    return this.http.get<IMemberPayment[]>(
      `${this.apiUrl}auth/member/payment/form?memberId=${id}`
    );
  }
}
