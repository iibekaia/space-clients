import {
  ApplicationConfig,
  importProvidersFrom,
  InjectionToken,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {routes} from './app.routes';
import {API_URL} from '../config/config';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import {provideToastr, ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppConfig} from './core/models/clients.model';
import {clientInterceptorInterceptor} from './core/interceptors/client-interceptor.interceptor';

export const CONFIG = new InjectionToken<AppConfig>('CONFIG');
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      ButtonModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
    ]),
    // provideZoneChangeDetection({eventCoalescing: true}),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    // provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(withInterceptors([clientInterceptorInterceptor])),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: false,
      closeButton: true
    }),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    {
      provide: CONFIG,
      useValue: {API_URL}
    },
  ]
};
