import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { HomeVhComponent } from './pages/home/home.component';
import { IngresoComponent } from './pages/ingreso/ingreso.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ServicioscostosComponent } from './pages/servicioscostos/servicioscostos.component';
import { TiposServiciosComponent } from './pages/tipos-servicios/tipos-servicios.component';
import { TiposComponent } from './pages/tipos/tipos.component';

const routes: Routes = [
  { path : '' ,component : HomeVhComponent, children:[
    { path : 'Ingresos' , component : IngresoComponent},
    { path : 'Servicios' , component : ServiciosComponent}, 
    { path : 'Tipos' , component : TiposComponent}, 
    { path : 'Costos' , component : ServicioscostosComponent},   
    { path : 'TiposServicios' , component : TiposServiciosComponent},  
     { path : '**' , pathMatch:'full' , redirectTo : 'Ingresos'}, 
   ]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculosRoutingModule { }
