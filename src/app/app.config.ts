import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideSpinnerConfig } from "ngx-spinner";
import { NgToastModule } from 'ng-angular-popup';
import { tokenInterceptor } from './interceptor/token/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)), 
    provideAnimationsAsync(), 
    provideHttpClient(withInterceptors([tokenInterceptor])), 
    provideSpinnerConfig({ type: 'ball-clip-rotate-multiple'}),
    importProvidersFrom(NgToastModule)
  ]
}