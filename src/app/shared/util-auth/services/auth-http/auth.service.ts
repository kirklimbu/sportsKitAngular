import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponseDto, UserModel } from '../../models/user.model';
import { AuthModel } from '../../models/auth.model';
import { Store } from '@ngxs/store';
import { CustomResponse } from 'src/app/shared/models/CustomResponse.model';
import { UserDetailsService } from 'src/app/shared/util-common/userDetails.service';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private fields

  // private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserModel | undefined>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel | undefined>;
  isLoadingSubject: BehaviorSubject<boolean>;

  destroyRef = inject(DestroyRef);
  userDetailService = inject(UserDetailsService);
  // messageService = inject(MessageService);

  get currentUserValue(): UserModel | undefined {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel | undefined) {
    this.currentUserSubject.next(user);
  }

  store = inject(Store);

  constructor(private router: Router, private http: HttpClient) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel | undefined>(
      undefined
    );
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    // const subscr = this.getUserByToken().subscribe();
    // this.unsubscribe.push(subscr);
  }

  // public methods
  login(
    userName: string,
    passWord: string,
    deviceId: string
  ): Observable<LoginResponseDto> {
    console.log('calling auth sercice');

    this.isLoadingSubject.next(true);
    return this.http.post<LoginResponseDto>(`${API_URL}user/login`, {
      userName,
      passWord,
      deviceId,
    });
  }

  logout(): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(
      `${API_URL}auth/user/logout?userId=${this.userDetailService.getUserId()}`,
      {}
    );
  }


  forgetPassword(password: any): Observable<CustomResponse> {

    return this.http.post<CustomResponse>(`${API_URL}auth/user/password/save`,
      {
        ...password
      });
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.token) {
      // this.authLocalStorageToken,
      // localStorage.setItem(JSON.stringify(auth.token));
      return true;
    }
    return false;
  }

  // getAuthFromLocalStorage(): AuthModel | string | any {
  //   try {
  //     const authData = JSON.parse(
  //     //   // localStorage.getItem(this.authLocalStorageToken)!
  //     // );
  //     // return authData;
  //   } catch (error) {
  //     console.error(error);
  //     return undefined;
  //   }
  // }

  /**
   * create new user
   *
   */
  registration(user: UserModel): Observable<CustomResponse> {
    this.isLoadingSubject.next(true);
    return this.http.post<CustomResponse>(`${API_URL}user/registration/save`, {
      ...user,
    });
  }

  /**
   * user role
   */

  // getUserRole(): Role {
  //   const user = this.store.selectSnapshot(AuthState.userDetails);
  //   return user.role;
  // }

  // getUserDetails(): UserModel {
  //   const user = this.store.selectSnapshot(AuthState.userDetails);
  //   return user;
  // }
  private refreshPage() {
    const currentRoute = this.router.url;
    const url: any = currentRoute.split('?')[0];
    let id: any = currentRoute.split('?')[1];

    if (id) {
      id = id.split('=')[1];
    }

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      if (id) {
        this.router.navigate([url], { queryParams: { id } });
        return;
      }
      this.router.navigate([url]);
    });
  }
}
