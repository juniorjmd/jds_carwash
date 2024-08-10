import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevolucionesRoutingModule } from './devoluciones-routing.module'; 
import { DevolucionesComponent } from './pages/menuCentral/devoluciones.component';
import { DevolucionesCreateComponent } from './pages/crear/devoluciones.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { AnularComponent } from './pages/anular/anular.component';
import { ListarComponent } from './pages/listar/listar.component';


@NgModule({
  declarations: [
    DevolucionesComponent,DevolucionesCreateComponent, AnularComponent, ListarComponent
  ],
  imports: [
    CommonModule,
    DevolucionesRoutingModule,SharedModule, 
    RouterModule, 
    AdminRoutingModule,
    FormsModule, 
    SharedModule
  ]
})
export class DevolucionesModule { }
