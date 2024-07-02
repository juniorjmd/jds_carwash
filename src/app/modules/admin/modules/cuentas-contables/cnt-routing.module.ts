import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  
import { CuentasCntComponent } from './cuentas-cnt.component';

const routes: Routes = [{ path: '', component: CuentasCntComponent , 
                       children:[  
                                 ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class cntRoutingModule { }
