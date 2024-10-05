import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisosComponent } from './permisos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RecursosComponent } from './pages/recursos/recursos.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';

const routes: Routes = [{ path: '', component: PermisosComponent , children :[
  { path: 'perfiles', component: PerfilComponent},
  { path: 'recursos', component: RecursosComponent}, 
  { path: 'usuarios', component:UsuarioComponent },
  { path : '**' , pathMatch:'full' , redirectTo : 'usuarios'} 

] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisosRoutingModule { }
