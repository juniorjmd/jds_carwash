import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module'; 
import { UsuarioDetalleComponent } from './pages/usuario-detalle.component';
import { UsuarioEditarComponent } from './pages/usuario-editar.component';
import { UsuarioNuevoComponent } from './pages/usuario-nuevo.component';
import { UsuarioPerfilComponent } from './pages/usuario-perfil.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [
    UsuarioNuevoComponent,UsuarioEditarComponent,UsuarioDetalleComponent,UsuarioPerfilComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule
  ]
})
export class UsuariosModule { }
