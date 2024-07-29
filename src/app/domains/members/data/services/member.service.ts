import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMember } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {


  apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  constructor() { }


  getFormValues(id: number, setMasterId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}auth/exam/question/form?questionId=${id}&setMasterId=${setMasterId}`
    );
  }

  saveMember(qustion: any): Observable<IMember[]> {
    console.log('saving memeber', qustion)
    const formData = new FormData();
    formData.append('form', JSON.stringify(qustion));
    formData.append('file', qustion.file);
    console.log('fsdfa', formData)
    return this.http.post<IMember[]>(`${this.apiUrl}auth/member/save`, formData)
  }

  getAllMembers(): Observable<IMember[]> {
    return this.http.get<IMember[]>(
      `${this.apiUrl}auth/member/list`
    );
  }

}
