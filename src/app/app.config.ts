import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {LayoutComponent} from "./layout/components/layout/layout.component";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    MessageService,
    importProvidersFrom(ToastModule),
    provideHttpClient(withFetch(), withInterceptors([]))
  ]
};
