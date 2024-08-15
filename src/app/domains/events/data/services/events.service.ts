import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponse } from 'src/app/shared/models/CustomResponse.model';
import { toFormData } from 'src/app/shared/util-common/toFormData';
import { environment } from 'src/environments/environment';
import { IEvents } from '../events.model';

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
  getFormValues(id: number): Observable<IEvents> {
    return this.http.get<IEvents>(`${this.apiUrl}auth/event/form?eventId=${id}`);
  }

  addEvent(form: any): Observable<CustomResponse> {
    const formData = new FormData();
    formData.append('form', JSON.stringify(form));
    formData.append('file', form.file);

    return this.http.post<CustomResponse>(`${this.apiUrl}auth/event/save`, formData);
  }

  addEventImage(file: any) {
    return this.http.post<any>(
      `${this.apiUrl}auth/event/image/save`,
      toFormData(file)
    );
  }


  getEventDetail(id: any): Observable<IEvents> {
    console.log('eventsid', id);

    return this.http.get<IEvents>(`${this.apiUrl}auth/event`, { params: id });
  }
  // getSearchedTags(query?: any): Observable<any[]> {
  //   const queries = { query: query.query };
  //   return this.http.get<any[]>(`${apiUrl}tag/search?`, {
  //     params: queries,
  //     headers: headers,
  //   });
  // }
}
