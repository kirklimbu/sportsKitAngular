import { SpinnerService } from './../../../ui-common/spinner/services/spinner.service';
import { Injectable, inject, signal } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
// import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private readonly spinnerService = inject(SpinnerService)
  constructor() { }
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    console.log('loader inter');

    this.spinnerService.showLoader();
    // this.spinner.show();
    return next.handle(request).pipe(finalize(() => this.spinnerService.hideLoader()));
  }
}
