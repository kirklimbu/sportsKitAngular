import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
// import { AuthState } from 'src/app/domains/auth/login/state/login.state';
import { DISABLE_INTERCEPTORS } from './disableInterceptor.interceptor';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/app/domains/auth/login/state/login.state';

@Injectable({
  providedIn: 'root',
})
export class HttpTokenInterceptorService implements HttpInterceptor {

  // token = localStorage['token'];

  constructor(private store: Store) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot(AuthState.token);
    console.log('token', token);


    // if (!this.shouldAttemptJwtTokenInjection(request)) {
    //     return next.handle(request);
    //   }
    if (request.context.get(DISABLE_INTERCEPTORS) === true) {
      request = request.clone({
        setHeaders: {
          UserAgent: environment.UserAgent,
          // 'X-TenantID': environment.X_TenantID,
        },
      });
      return next.handle(request);
    }


    if (!token) {
      console.log('token', token);

      request = request.clone({
        setHeaders: {
          UserAgent: environment.UserAgent,
          // 'X-TenantID': environment.X_TenantID,
        },
      });
      return next.handle(request);
    }
    console.log('token', token);

    request = request.clone({
      setHeaders: {
        Token: token,
        UserAgent: environment.UserAgent,
        // 'X-TenantID': environment.X_TenantID,
      },
    });
    return next.handle(request);
  }
}
