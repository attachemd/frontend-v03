import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/modules/shared.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [SharedModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
