import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientesComponent } from "./pages/clientes/clientes.component";
import { ClienteInicioComponent } from "./pages/clientes/cliente-inicio.component";
import { ClienteNuevoComponent } from "./pages/clientes/cliente-nuevo.component";
import { ClienteDetalleComponent } from "./pages/clientes/cliente-detalle.component";
import { MaestrosComponent } from "./pages/clientes/maestros/maestros.component";
import { CiudadesComponent } from "./pages/clientes/maestros/ubicacion/ciudades.component";
import { DepartamentosComponent } from "./pages/clientes/maestros/ubicacion/departamentos.component";
import { PaisesComponent } from "./pages/clientes/maestros/ubicacion/paises.component";


const routes: Routes = [
    { path : '' , component : ClientesComponent,
       children:[
        { path : 'listado' , component : ClienteInicioComponent},
        { path : 'nuevo' , component : ClienteNuevoComponent},
        { path : 'detalle/idCliente' , component : ClienteDetalleComponent},
        { path : 'maestros' , component : MaestrosComponent,
           children:[
            {   path : 'ciudades' , component: CiudadesComponent}, 
            {   path : 'departamentos' , component: DepartamentosComponent}, 
            {   path : 'paises' , component: PaisesComponent},     
            { path : '**' , pathMatch:'full' , redirectTo : 'ciudades'},  
              
            ]},
        { path : '**' , pathMatch:'full' , redirectTo : 'listado'}, 
        ]}, 
  
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PersonasRoutingModule { }
  