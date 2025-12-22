import { Injectable, inject } from '@angular/core';
import {
  IGame2DTO,
  ITeam,
  ITeam3Dto,
  ITeamRegistrationFormDtoWrapper,
  ITournament,
} from './model/tournament.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITraining } from '../../training/data/model/training.model';
import { CustomResponse } from 'src/app/shared/models/CustomResponse.model';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  getAllPublicTournaments(): Observable<ITournament[]> {
    return this.http.get<ITournament[]>(`${this.apiUrl}tournament/list`);
  }
  // admin
  getAllAdminTournaments(): Observable<ITournament[]> {
    return this.http.get<ITournament[]>(
      `${this.apiUrl}auth/admin/tournament/list`
    );
  }

  getAdminGames(
    tournamentId: number,
    round?: number,
    userId?: number
  ): Observable<IGame2DTO[]> {
    return this.http.get<IGame2DTO[]>(
      `${this.apiUrl}tournament/game/list?tournamentId=${tournamentId}&round=${round}`
    );
  }

  getAdminRounds(
    tournamentId: number,
    userId?: number,
    round?: number
  ): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.apiUrl}auth/tournament/round/list?tournamentId=${tournamentId}`
    );
  }

  saveTeam(team: any): Observable<CustomResponse> {
    const formData = new FormData();
    formData.append('form', JSON.stringify(team));
    return this.http.post<CustomResponse>(
      `${this.apiUrl}tournament/registration/save`,
      formData
    );
  }

  // players
  getAllPlayers(id: number): Observable<ITeam3Dto[]> {
    return this.http.get<ITeam3Dto[]>(
      `${this.apiUrl}auth/admin/tournament/player/list?tournamentId=${id}`
    );
  }

  getFormValues(
    tournamentId: number,
    teamId: number
  ): Observable<ITeamRegistrationFormDtoWrapper> {
    console.log('form', tournamentId, teamId);

    return this.http.get<ITeamRegistrationFormDtoWrapper>(
      `${this.apiUrl}tournament/registration/form`,
      {
        params: { tournamentId, teamId },
      }
    );
  }

  verifyRegistration(mobilenumber: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}tournament/player/registration/check`,
      {
        params: { mobile: mobilenumber },
      }
    );
  }
}
