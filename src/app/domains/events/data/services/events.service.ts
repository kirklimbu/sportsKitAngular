import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  apiUrl = environment.apiUrl
  private readonly http = inject(HttpClient)
  constructor() { }

  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}event/list`);

  }
}
