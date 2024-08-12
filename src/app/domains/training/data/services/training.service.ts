import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITraining } from '../model/training.model';
import { ITrainingDetail } from '../model/training-detail.model';
import { ITrainingDetail2 } from '../model/training-detail2.model';

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


  // training details


  getDetailFormValues(query: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}auth/training/detail/form`, { params: query }
    );
  }

  // getDetailList

  getDetailList(query: any): Observable<ITrainingDetail2[]> {
    return this.http.get<ITrainingDetail2[]>(`${this.apiUrl}auth/training/detail/list`, { params: query });
  }

  saveTrainingDetails(training: ITraining): Observable<ITrainingDetail[]> {
    console.log('saving training', training);

    return this.http.post<ITrainingDetail[]>(
      `${this.apiUrl}auth/training/detail/save`, { ...training }
    );
  }

}
