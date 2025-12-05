import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GallaryService {
  apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  getGallaryContents(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}gallery/image/list`, {});
    // dba/api/gallery/image/list
  }
}
