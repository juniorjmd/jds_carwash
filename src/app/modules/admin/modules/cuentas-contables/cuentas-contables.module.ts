import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CntClaseComponent } from './pages/cnt_clase.component';
import { cntRoutingModule } from './cnt-routing.module';
import { CntGruposComponent } from './pages/cntGrupos.component';
import { CntCuentasMComponent } from './pages/cntCuentasM/cntCuentasM.component';
import { CntSubCuentasComponent } from './pages/cnt-sub-cuentas.component';
import { CntContablesService } from 'src/app/services/cntContables.service';
import { cntClaseRequest, cntCuentaMayorRequest, cntGrupoRequest } from 'src/app/interfaces/producto-request';
import { OperacionesComponent } from './pages/operaciones/operaciones.component';
import { ModalCntSubCuentasComponent } from '../../modals/cuentasContables/cnt-sub-cuentas.component';
import { ModalCntCuentasMComponent } from '../../modals/cuentasContables/cntCuentasM/cntCuentasM.component';
import { ModalCntClaseComponent } from '../../modals/cuentasContables/cnt_clase.component';
import { ModalCntGruposComponent } from '../../modals/cuentasContables/cntGrupos.component';
import { CrearOperacionesComponent } from './pages/operaciones/pages/crtOperaciones.component';
import { ListarOperacionesComponent } from './pages/operaciones/pages/listarOperaciones.component';
import { DetalleOperacionesComponent } from './pages/operaciones/pages/detalleOperaciones.component';
import { ListarOperacionesAutomaticasComponent } from './pages/operaciones/pages/listarOperacionesAutomaticas.component';
import { ModalUpdateTransactionTmpComponent } from './modals/modalUpdateTransactionTmp/modalUpdateTransactionTmp.component';



@NgModule({
  declarations: [
    CntClaseComponent,ListarOperacionesAutomaticasComponent,
    CntGruposComponent,
    CntCuentasMComponent,
    CntSubCuentasComponent,
    OperacionesComponent ,
    ModalCntClaseComponent,
    ModalCntGruposComponent,
    ModalCntCuentasMComponent,
    ModalCntSubCuentasComponent,
    CrearOperacionesComponent ,
    ListarOperacionesComponent ,
    DetalleOperacionesComponent, ModalUpdateTransactionTmpComponent
  ],
  imports: [  
    CommonModule, 
    SharedModule ,
    cntRoutingModule,
    FormsModule  
  ]
})
export class CuentasContablesModule {}