import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITraining } from '../model/training.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  getFormValues(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}auth/training/master/form`, { params: id }
    );
  }

  saveTraining(training: ITraining): Observable<ITraining[]> {
    console.log('saving training',);

    return this.http.post<ITraining[]>(
      `${this.apiUrl}auth/training/master/save`, { ...training }
    );
  }


  getAllTraining(): Observable<ITraining[]> {
    return this.http.get<ITraining[]>(`${this.apiUrl}training/master/list`);
  }

}
