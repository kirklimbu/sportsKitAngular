import { Injectable, inject } from '@angular/core';
import { IGame2DTO, ITeam, ITournament } from './model/tournament.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITraining } from '../../training/data/model/training.model';
import { CustomResponse } from 'src/app/shared/models/CustomResponse.model';

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
  // admin 
  getAllAdminTournaments(): Observable<ITournament[]> {
    return this.http.get<ITournament[]>(`${this.apiUrl}auth/admin/tournament/list`);
  }

  getAdminGames(tournamentId: number, round?: number,userId?: number,): Observable<IGame2DTO[]> {
    return this.http.get<IGame2DTO[]>(`${this.apiUrl}tournament/game/list?tournamentId=${tournamentId}&round=${round}`);
  }


  getAdminRounds(tournamentId: number, userId?: number, round?: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}auth/tournament/round/list?tournamentId=${tournamentId}`,);
  }


  saveTeam(team: any): Observable<CustomResponse> {
    const formData = new FormData();
    formData.append('form', JSON.stringify(team));
    return this.http.post<CustomResponse>(
      `${this.apiUrl}tournament/registration/save`,
      formData
    );
  }
}
