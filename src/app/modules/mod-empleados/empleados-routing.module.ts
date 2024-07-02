import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";  
import { EmpleadosComponent } from "./pages/empleados/empleados.component";
import { CreacionEdicionComponent } from "./pages/creacion-edicion/creacion-edicion.component";
import { PagosComponent } from "./pages/pagos/pagos.component";
const routes: Routes = [
    { path : '' , component : EmpleadosComponent,
       children:[
        { path : 'mantenimiento' , component :CreacionEdicionComponent },
        { path : 'Pagos' , component : PagosComponent}, 
        { path : '**' , pathMatch:'full' , redirectTo : 'mantenimiento'}, 
        ]}, 
  
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class EmpleadosRoutingModule { }
  