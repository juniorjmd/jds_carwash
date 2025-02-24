import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPassWordComponent } from './pages/forgotPassWord/forgotPassWord.component';

const routes: Routes = [
  { path : '' , component : LoginComponent},
  { path : 'forgotPassword' , component : ForgotPassWordComponent},
  { path : '**' , pathMatch:'full' , redirectTo : ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
