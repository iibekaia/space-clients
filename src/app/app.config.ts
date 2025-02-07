import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {routes} from './app.routes';
import {API_URL} from '../config/config';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ButtonModule} from 'primeng/button';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      ButtonModule
    ]),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    // provideHttpClient(withInterceptors([clientInterceptorInterceptor])),
    provideHttpClient(withInterceptorsFromDi()),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    {
      provide: 'CONFIG',
      useValue: {API_URL},
    },
  ]
};
