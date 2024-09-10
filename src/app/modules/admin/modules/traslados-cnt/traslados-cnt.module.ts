import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrasladosCntRoutingModule } from './traslados-cnt-routing.module';
import { TrasladosCntComponent } from './traslados-cnt.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NewTrasladoDesdeCajaComponent } from './modals/newTrasladoDesdeCaja/newTrasladoDesdeCaja.component';
import { TrasladoDesdeCajaComponent } from './pages/trasladoDesdeCaja/trasladoDesdeCaja.component';


@NgModule({
  declarations: [
    TrasladosCntComponent,TrasladosCntComponent,TrasladoDesdeCajaComponent,NewTrasladoDesdeCajaComponent
  ],
  imports: [
    CommonModule,
    TrasladosCntRoutingModule,
    SharedModule  ,FormsModule  
  ]
})
export class TrasladosCntModule { }
