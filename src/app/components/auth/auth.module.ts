import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [CommonModule, FormsModule, AuthRoutingModule],
  declarations: [AuthComponent, LoginComponent, ProfileComponent, ResetPasswordComponent, ForgotPasswordComponent]
})
export class AuthModule {}
