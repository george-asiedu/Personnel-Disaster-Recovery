import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideHttpClient } from '@angular/common/http';
import { provideSpinnerConfig } from "ngx-spinner";
import { NgToastModule } from 'ng-angular-popup';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)), 
    provideAnimationsAsync(), 
    provideHttpClient(), 
    provideSpinnerConfig({ type: 'ball-clip-rotate-multiple'}),
    importProvidersFrom(NgToastModule)
  ]
}