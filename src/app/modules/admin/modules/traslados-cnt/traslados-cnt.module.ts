import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrasladosCntRoutingModule } from './traslados-cnt-routing.module';
import { TrasladosCntComponent } from './traslados-cnt.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NewTrasladoDesdeCajaComponent } from './modals/newTrasladoDesdeCaja/newTrasladoDesdeCaja.component';
import { TrasladoDesdeCajaComponent } from './pages/trasladoDesdeCaja/trasladoDesdeCaja.component';
import { trasladoDeUnaAMuchasComponent } from './pages/trasladoDeUnaAMuchas/trasladoDeUnaAMuchas.component';
import { TrasladoParaAsignarSaldoComponent } from './pages/trasladoParaAsignarSaldo/trasladoParaAsignarSaldo.component';
import { trasladoDeMuchasAUnaComponent } from './pages/trasladoDeMuchasAUna/trasladoDeMuchasAUna.component';
import { newTrasladoAsignarSaldoComponent } from './modals/newTrasladoAsignarSaldo/newTrasladoAsignarSaldo.component';
import { newTrasladoDeUnaAMuchosComponent } from './modals/newTrasladoDeUnaAMuchos/newTrasladoDeUnaAMuchos.component';
import { newTrasladoDeMuchasAUnaComponent } from './modals/newTrasladoDeMuchasAUna/newTrasladoDeMuchasAUna.component';
import { EjecutarAsignacionSaldosComponent } from './modals/ejecutarAsignacionSaldos/ejecutarAsignacionSaldos.component';
import { ejecutarDeMuchaAUnaComponent } from './modals/ejecutarDeMuchaAUna/ejecutarDeMuchaAUna.component';
import { ejecutarDeUnaAMuchosComponent } from './modals/ejecutarDeUnaAMuchos/ejecutarDeUnaAMuchos.component';
import { ejecutarTrasladoDesdeCajaComponent } from './modals/ejecutarTrasladoDesdeCaja/ejecutarTrasladoDesdeCaja.component';


@NgModule({
  declarations: [
    TrasladosCntComponent,TrasladosCntComponent,TrasladoDesdeCajaComponent,
    NewTrasladoDesdeCajaComponent,newTrasladoAsignarSaldoComponent,
    newTrasladoDeUnaAMuchosComponent,newTrasladoDeMuchasAUnaComponent, 
    TrasladoParaAsignarSaldoComponent,trasladoDeUnaAMuchasComponent,trasladoDeMuchasAUnaComponent,
    ejecutarDeMuchaAUnaComponent,EjecutarAsignacionSaldosComponent,ejecutarDeUnaAMuchosComponent,ejecutarTrasladoDesdeCajaComponent
  ],
  imports: [
    CommonModule,
    TrasladosCntRoutingModule,
    SharedModule  ,FormsModule  
  ]
})
export class TrasladosCntModule { }
