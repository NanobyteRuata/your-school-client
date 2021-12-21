import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationApiService } from './services/authentication-api.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { AuthenticationComponent } from './authentication.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    ForgotPasswordPageComponent,
    SignUpPageComponent,
    AuthenticationComponent,
  ],
  imports: [AuthenticationRoutingModule, SharedModule, CommonModule],
  providers: [AuthenticationApiService],
})
export class AuthenticationModule {}
