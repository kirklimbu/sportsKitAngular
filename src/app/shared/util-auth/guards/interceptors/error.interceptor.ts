import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, retry, catchError, throwError } from 'rxjs';
import { MessageService } from 'src/app/shared/util-logger/message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          console.log('client error', error);

          // client-side error
          errorMessage = `${error.error.message}`;
          if (error.status !== 200) {

            this.messageService.createMessage('error',
              `<strong class=''>Client side error.</strong>${errorMessage}`
            );
          }
          return throwError(() => new Error(errorMessage));
        }
        // server-side error
        console.log('server error', error);
        if (error.status !== 200) {

          errorMessage = `${error.error.message}`;
          this.messageService
            .createMessage('error', `<strong >Please contact your admin.</strong> </br>
          <small class='text-danger my-5'>${errorMessage}</small>`);
        }
        return throwError(() => new Error(errorMessage));

      })
    );
  }
}
