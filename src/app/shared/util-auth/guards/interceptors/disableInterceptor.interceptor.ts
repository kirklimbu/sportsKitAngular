import { HttpContextToken, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

export const DISABLE_INTERCEPTORS = new HttpContextToken<boolean>(() => false);

@Injectable()
export class DisableInterceptorHandler extends HttpHandler {
  constructor(private httpHandler: HttpHandler) {
    super();
  }

  handle(req: HttpRequest<unknown>) {
    return this.httpHandler.handle(
      req.clone({
        context: req.context.set(DISABLE_INTERCEPTORS, true),
      }),
    );
  }
}