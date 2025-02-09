import {ApplicationConfig, importProvidersFrom, InjectionToken, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {routes} from './app.routes';
import {API_URL} from '../config/config';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import {provideToastr, ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppConfig} from './core/models/clients.model';

export const CONFIG = new InjectionToken<AppConfig>('CONFIG');
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      ButtonModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
    ]),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    // provideHttpClient(withInterceptors([clientInterceptorInterceptor])),
    provideHttpClient(withInterceptorsFromDi()),
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
