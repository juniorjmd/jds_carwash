import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  
import { CuentasCntComponent } from './cuentas-cnt.component';
import { CntClaseComponent } from './pages/cnt_clase.component';
import { CntGruposComponent } from './pages/cntGrupos.component'; 
import { CntSubCuentasComponent } from './pages/cnt-sub-cuentas.component';
import { CntCuentasMComponent } from './pages/cntCuentasM/cntCuentasM.component';
import { OperacionesComponent } from './pages/operaciones/operaciones.component';
import { DetalleOperacionesComponent } from './pages/operaciones/pages/detalleOperaciones.component';
import { ListarOperacionesComponent } from './pages/operaciones/pages/listarOperaciones.component';
import { CrearOperacionesComponent } from './pages/operaciones/pages/crtOperaciones.component';

const routes: Routes = [{ path: '', component: CuentasCntComponent , 
                       children:[  
                        { path: 'clases', component: CntClaseComponent } ,
                        { path: 'grupos', component: CntGruposComponent } ,
                        { path: 'cuentas', component: CntCuentasMComponent } ,
                        { path: 'subCuentas', component: CntSubCuentasComponent } ,
                        { path: 'operaciones', component: OperacionesComponent ,children:[
                          { path: 'listar', component: ListarOperacionesComponent } ,
                          { path: 'crear', component: CrearOperacionesComponent },
                          { path: 'detalle', component: DetalleOperacionesComponent },
                           { path: '**',   pathMatch:'full' , redirectTo : 'listar' }  ] } ,
                        
                        { path: '**',   pathMatch:'full' , redirectTo : 'operaciones' } 
                                 ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class cntRoutingModule { }
