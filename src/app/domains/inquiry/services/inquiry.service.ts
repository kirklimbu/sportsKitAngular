import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Inquiry } from '../data/model/inquiry.model';


const headers = {
  'X-TenantID': 'test',
  UserAgent: 'webAgent',
};
@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  apiUrl = environment.apiUrl;

  private readonly http = inject(HttpClient);

  getInqueries(): Observable<Inquiry[]> {
    return this.http.get<Inquiry[]>(`${this.apiUrl}auth/query/list`
    );
  }
}

