import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/auth/jwt-interceptor';
import { routes } from './app.routes';

export const appConstants = {
  apiUrl: 'http://localhost:8080/api' // 👈 URL base
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
        //  Aquí inyectamos HttpClient con el interceptor JWT
    provideHttpClient(withInterceptors([jwtInterceptor])),
        //  Proveemos la configuración global
    { provide: 'APP_CONFIG', useValue: appConstants }
  ]
};
