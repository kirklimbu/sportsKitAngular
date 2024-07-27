import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {


  apiUrl = environment.apiUrl;
  bannersUrl = '/assets/data/home_data.json';
  aboutUsUrl = '/assets/data/pages/about_us.json';
  footerUrl = '/assets/data/pages/company_info.json';
  whyusUrl = '/assets/data/pages/why_us.json';
  gallaryUrl = '/assets/data/pages/gallary.json';
  studyDestinationsUrl = '/assets/data/pages/services.json';


  private http = inject(HttpClient);
  private httpClient: HttpClient;
  constructor(
    private handler: HttpBackend,
  ) {
    this.httpClient = new HttpClient(handler);
  }
  // protected state: BehaviorSubject<Home> | undefined;

  getHomeContents(deviceId: string, userId: string) {
    console.log('calling home');

    if (userId == 'null' || userId == 'undefined' || userId == undefined) userId = '0';

    let params = {
      deviceId: deviceId,
      userId: userId,
    };
    return this.http.get<any>(`${this.apiUrl}home`, { params: params });
  }

  getBanners(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.bannersUrl}`, { headers: { skip: "true" } });
  }
  getWelComeMessage(): Observable<any> {
    return this.httpClient.get<any>(`${this.aboutUsUrl}`, { headers: { skip: "true" } });
  }

  getWhyUsContents(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.whyusUrl}`, { headers: { skip: "true" } });
  }
  getStudyDestinationContents(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.studyDestinationsUrl}`, { headers: { skip: "true" } });
  }
  getGallaryContents(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.gallaryUrl}`, { headers: { skip: "true" } });
  }

  getFooterContents(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}`, { headers: { skip: "true" } });
  }
  // getHomeContents(deviceId: string, userId: string) {
  //   if (userId == 'null' || userId == 'undefined' || userId == undefined) userId = '0';

  //   let params = {
  //     deviceId: deviceId,
  //     userId: userId,

  //   };
  //   return this.http.get<any>(`${this.apiUrl}home`, { params: params });

  // }




}
