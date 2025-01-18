import { Injectable, inject } from '@angular/core';
import { ITournament } from './model/tournament.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITraining } from '../../training/data/model/training.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  apiUrl = environment.apiUrl;
 
  private http = inject(HttpClient);
  constructor() { }


  getAllPublicTournaments(): Observable<ITournament[]> {
    return this.http.get<ITournament[]>(`${this.apiUrl}tournament/list`);
  }
}
