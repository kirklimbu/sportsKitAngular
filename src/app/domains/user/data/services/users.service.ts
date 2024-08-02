import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  getFormValues(id: number, setMasterId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}auth/exam/question/form?questionId=${id}&setMasterId=${setMasterId}`
    );
  }

  saveUser(qustion: IUser): Observable<IUser[]> {
    console.log('saving memeber', qustion);
    const formData = new FormData();
    formData.append('form', JSON.stringify(qustion));
    formData.append('file', qustion.file);
    console.log('fsdfa', formData);
    return this.http.post<IUser[]>(`${this.apiUrl}user/save`, formData);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}auth/user/list`);
  }
}
