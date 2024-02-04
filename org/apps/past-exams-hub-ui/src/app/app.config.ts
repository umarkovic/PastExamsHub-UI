import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { AuthenticationService } from './shared/services/authentication.service';
import { environment } from '../environments/environment';

function configureAuth(authenticationService: AuthenticationService) {
  return () => authenticationService.configureAuth(environment.authorityApiUrl);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(),
    provideOAuthClient({
      resourceServer: {
        allowedUrls: [environment.coreApiUrl],
        sendAccessToken: true,
      }
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      multi: true,
      deps: [AuthenticationService],
    },
    
  ],
};
