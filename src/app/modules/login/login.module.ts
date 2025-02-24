import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ForgotPassWordComponent } from './pages/forgotPassWord/forgotPassWord.component';


@NgModule({
  declarations: [LoginComponent,ForgotPassWordComponent],
  imports: [
    CommonModule,
    LoginRoutingModule, 
    RouterModule, 
    FormsModule, 
    SharedModule
  ]
})
export class LoginModule { }
