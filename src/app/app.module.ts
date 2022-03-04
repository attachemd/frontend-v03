import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/navigation/header/header.component';
import { SidenavListComponent } from './component/navigation/sidenav-list/sidenav-list.component';
import { SharedModule } from './modules/shared.module';
import { AuthService } from './services/auth/auth.service';
import { UIService } from './services/ui.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './component/auth/auth.module';
import { NotFoundComponent } from './component/not-found/not-found.component';

export function tokenGetter(): string | null {
  return localStorage.getItem('access');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    NotFoundComponent,
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [
          'localhost:4200',
          'localhost:8000',
          // environment.host
        ],
        disallowedRoutes: ['http://localhost:8000/api/auth/access_token'],
        skipWhenExpired: false,
        // throwNoTokenError: true
      },
    }),
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
  ],
  providers: [AuthService, UIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
