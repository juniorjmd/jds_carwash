import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { DevolucionesComponent } from './pages/menuCentral/devoluciones.component';
import { DevolucionesCreateComponent } from './pages/crear/devoluciones.component';
import { ListarComponent } from './pages/listar/listar.component';
import { AnularComponent } from './pages/anular/anular.component';

const routes: Routes = [{ path: '', component: DevolucionesComponent ,
                            children : [
                              { path: 'listar', component: ListarComponent },
                              { path: 'anular', component: AnularComponent },
                              { path: 'crear', component: DevolucionesCreateComponent },
                              { path : '**' , pathMatch:'full' , redirectTo : 'listar'}  
                            ]},
                           ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevolucionesRoutingModule { }
