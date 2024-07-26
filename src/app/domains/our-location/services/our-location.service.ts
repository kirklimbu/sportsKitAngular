import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { IContactUsForm } from '../models/contact-us.model';
import { environment } from 'src/environments/environment.prod';


const headers = {
  'X-TenantID': 'test',
  UserAgent: 'webAgent',
};
@Injectable({
  providedIn: 'root'
})
export class OurLocationService {

  apiUrl = `${environment.apiUrl}`;
  // apiUrl = "www.valleymulti.com/consultancy/api/";

  private http = inject(HttpClient);



  getFormValues() {
    return this.http.get<any>(
      `${this.apiUrl}query/form`, {
      headers: headers,
    }
    );
  }
  saveMessage(form: IContactUsForm): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}query/save`, { ...form }, {
      headers: headers,
    }).pipe(
      retry(2), // Retry the request up to 2 times on error
      catchError(error => {
        // Handle the error and provide user feedback
        throw error; // Rethrow the error or provide a fallback value
      })
    );
  }
}


