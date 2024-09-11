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


@NgModule({
  declarations: [
    TrasladosCntComponent,TrasladosCntComponent,TrasladoDesdeCajaComponent,NewTrasladoDesdeCajaComponent,
    TrasladoParaAsignarSaldoComponent,trasladoDeUnaAMuchasComponent,trasladoDeMuchasAUnaComponent
  ],
  imports: [
    CommonModule,
    TrasladosCntRoutingModule,
    SharedModule  ,FormsModule  
  ]
})
export class TrasladosCntModule { }
