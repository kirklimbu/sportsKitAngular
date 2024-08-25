
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import en from '@angular/common/locales/en';
import { en_US, ne_NP, provideNzI18n } from 'ng-zorro-antd/i18n';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { HttpTokenInterceptorService } from './shared/util-auth/guards/interceptors/http-token-interceptor.service';
import { appRoutes } from './app.routes';
import { AuthState } from './domains/auth/login/state/login.state';
import { NgxsModule, provideStore } from '@ngxs/store';
import { withNgxsStoragePlugin, } from '@ngxs/storage-plugin';
import { JwtModule } from '@auth0/angular-jwt';
import { ErrorInterceptor } from './shared/util-auth/guards/interceptors/error.interceptor';
import { NgxsReduxDevtoolsPlugin, withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { LoaderInterceptor } from './shared/util-auth/guards/interceptors/loader.interceptor';
import { withNgxsRouterPlugin, NavigationActionTiming } from '@ngxs/router-plugin';
import { UrlState } from './shared/util-logger/url.service';


registerLocaleData(en);
// registerLocaleData(ne_NP);

const ngZorroConfig: NzConfig = {
  message: { nzTop: 120 },
  notification: { nzTop: 240 }
};

export function tokenGetter() {
  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.setItem("token", ".")
    return localStorage.getItem("token")
  } else {
    return localStorage.getItem("token")
  }
}
export function jwtOptionsFactory(options: any) {
  let whitelist = options.whitelistedDomains || [];

  function addToDomainWhitelist(domain: any) {
    whitelist = [...whitelist, domain];
  }

  return {
    addToDomainWhitelist,
    options: () => ({
      ...options,
      whitelistedDomains: whitelist,
    }),
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideNzI18n(en_US,),
    provideNzI18n(ne_NP),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    importProvidersFrom([BrowserAnimationsModule]),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideNzConfig(ngZorroConfig),
    provideStore(
      [AuthState],
      withNgxsStoragePlugin({
        keys: '*'
      }),
    ),
    provideStore(
      [UrlState],
      withNgxsRouterPlugin({
        navigationActionTiming: NavigationActionTiming.PostActivation,
        // history: true
      })
    ),
    importProvidersFrom(NgxsModule.forRoot([AuthState])),
    provideStore([AuthState], withNgxsReduxDevtoolsPlugin()),
    importProvidersFrom(JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        throwNoTokenError: true,
      },
    })),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],

};


