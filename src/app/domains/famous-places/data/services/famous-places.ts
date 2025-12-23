import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPlace1Dto, IPlaceFormDtoWrapper } from '../model/famous-places';
import { getClientId } from 'src/app/shared/util-common/generateDeviceId';

@Injectable({
  providedIn: 'root',
})
export class FamousPlacesService {
  apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  getPlaces(mobilenumber: string): Observable<IPlace1Dto[]> {
    const deviceId = getClientId();
    return this.http.get<IPlace1Dto[]>(`${this.apiUrl}place/list`, {
      params: { mobile: mobilenumber, deviceId: deviceId },
    });
  }
  getAdminPlaces(): Observable<IPlace1Dto[]> {
    return this.http.get<IPlace1Dto[]>(
      `${this.apiUrl}auth/admin/place/list`,
      {}
    );
  }

  getFormValues(id: number): Observable<IPlaceFormDtoWrapper> {
    return this.http.get<IPlaceFormDtoWrapper>(
      `${this.apiUrl}auth/place/form?placeId=${id}`
    );
  }

  savePlaces(place: any): Observable<IPlace1Dto[]> {
    console.log('saving place', place);
    const { docPath, ...teamWithoutDoc } = place;
    const formData = new FormData();
    formData.append('form', JSON.stringify(teamWithoutDoc));
    formData.append('file', place.docPath);

    return this.http.post<IPlace1Dto[]>(
      `${this.apiUrl}auth/place/save`,
      formData
    );
  }
}
