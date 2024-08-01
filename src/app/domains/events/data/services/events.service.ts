import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { toFormData } from 'src/app/shared/util-common/toFormData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}event/list`);
  }

  // getFormValues;
  getFormValues(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}auth/event/form?eventId=${id}`);
  }

  addEvent(form: any) {
    const formData = new FormData();
    formData.append('form', JSON.stringify(form));
    formData.append('file', form.file);

    return this.http.post<any[]>(`${this.apiUrl}auth/event/save`, formData);
  }

  addEventImage(file: any) {
    return this.http.post<any>(
      `${this.apiUrl}auth/event/image/save`,
      toFormData(file)
    );
  }

  // getSearchedTags(query?: any): Observable<any[]> {
  //   const queries = { query: query.query };
  //   return this.http.get<any[]>(`${apiUrl}tag/search?`, {
  //     params: queries,
  //     headers: headers,
  //   });
  // }
}
