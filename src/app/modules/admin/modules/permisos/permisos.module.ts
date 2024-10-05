import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisosRoutingModule } from './permisos-routing.module';
import { PermisosComponent } from './permisos.component';
import { RecursosComponent } from './pages/recursos/recursos.component';
import { PerfilComponent } from './pages/perfil/perfil.component'; 
import { UsuarioNuevoComponent } from './pages/usuario/nuevo/usuario-nuevo.component';
import { UsuarioEditarComponent } from './pages/usuario/editar/usuario-editar.component';
import { UsuarioDetalleComponent } from './pages/usuario/detalle/usuario-detalle.component';
import { UsuarioPerfilComponent } from './pages/usuario/perfil/usuario-perfil.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module'; 
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { MenuItemLiComponent } from 'src/app/modules/shared/componentes/menu-item-li/menu-item-li.component';


@NgModule({
  declarations: [
    PermisosComponent, RecursosComponent , PerfilComponent,  UsuarioNuevoComponent,UsuarioEditarComponent
    ,UsuarioDetalleComponent,UsuarioPerfilComponent, UsuarioComponent
  ],
  imports: [
    CommonModule,
    PermisosRoutingModule, 
    SharedModule  ,FormsModule  
  ]
})
export class PermisosModule { }
