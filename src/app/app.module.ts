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
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './component/auth/auth.module';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LicenseComponent } from './component/license/license.component';
import { ClientComponent } from './component/client/client.component';
import { ProductComponent } from './component/product/product.component';
import { LicenseEditComponent } from './management/license-edit/license-edit.component';
import { DragulaModule } from 'ng2-dragula';
import { DnDFieldComponent } from './component/dnd-field/dnd-field.component';
import { AdDirective } from './directive/ad.directive';
import { DynamicFieldDirective } from './directive/dynamic-field.directive';
import { InputComponent } from './component/dnd-field/input/input.component';
import { RadioButtonComponent } from './component/dnd-field/radio-button/radio-button.component';
import { ConfirmFieldEditComponent } from './component/dnd-field/confirm-field-edit/confirm-field-edit.component';
import { SelectComponent } from './component/dnd-field/select/select.component';
import { CheckboxComponent } from './component/dnd-field/checkbox/checkbox.component';
import { DateComponent } from './component/dnd-field/date/date.component';
import { CustomFieldsComponent } from './management/custom-fields/custom-fields.component';
import { DndFieldEditComponent } from './component/dnd-field-edit/dnd-field-edit.component';
import { ConfirmFieldDeleteComponent } from './component/dnd-field/confirm-field-delete/confirm-field-delete.component';

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
    LicenseComponent,
    ClientComponent,
    ProductComponent,
    LicenseEditComponent,
    DnDFieldComponent,
    AdDirective,
    DynamicFieldDirective,
    InputComponent,
    RadioButtonComponent,
    ConfirmFieldEditComponent,
    SelectComponent,
    CheckboxComponent,
    DateComponent,
    CustomFieldsComponent,
    DndFieldEditComponent,
    ConfirmFieldDeleteComponent,
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
    DragulaModule.forRoot(),
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
