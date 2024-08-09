import { query } from 'express';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ITraining } from 'src/app/domains/training/data/model/training.model';
import { environment } from 'src/environments/environment';
import { ITrainee } from '../model/trainee.model';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {


  apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  getFormValues(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}auth/trainee/form`, { params: id }
    );
  }

  saveTrainee(training: ITrainee): Observable<ITrainee[]> {
    console.log('saving training',);
    console.log('saving memeber', training);
    const formData = new FormData();
    formData.append('form', JSON.stringify(training));
    formData.append('file', training.file);
    console.log('fsdfa', formData);
    return this.http.post<ITrainee[]>(
      `${this.apiUrl}auth/trainee/save`, formData
    );
  }


  getAllTrainee(id: number): Observable<ITrainee[]> {
    return this.http.get<ITrainee[]>(`${this.apiUrl}auth/trainee/list?trainingMasterId=${id}`);
  }
}
