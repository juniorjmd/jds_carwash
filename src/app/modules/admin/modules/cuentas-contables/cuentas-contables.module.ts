import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CntClaseComponent } from './pages/cnt_clase.component';
import { cntRoutingModule } from './cnt-routing.module';
import { CntGruposComponent } from './pages/cntGrupos.component';
import { CntCuentasMComponent } from './pages/cntCuentasM/cntCuentasM.component';
import { CntSubCuentasComponent } from './pages/cnt-sub-cuentas.component';



@NgModule({
  declarations: [
    CntClaseComponent,
    CntGruposComponent,
    CntCuentasMComponent,
    CntSubCuentasComponent 
  ],
  imports: [  
    CommonModule, 
    SharedModule ,
    cntRoutingModule,
    FormsModule  
  ]
})
export class CuentasContablesModule { }
