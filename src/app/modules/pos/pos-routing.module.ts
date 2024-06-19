import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbrirCajaComponent } from './pages/abrir-caja/abrir-caja.component';
import { CerrarCajaComponent } from './pages/cerrar-caja/cerrar-caja.component';
import { POSComponent } from './pages/pos.component';
import { VentasComponent } from './pages/ventas/ventas.component';

const routes: Routes = [ { path : '' , component : POSComponent
  ,children:[
   { path : 'abrir' , component : AbrirCajaComponent},
   { path : 'ventas' , component : VentasComponent},
   { path : 'cerrar' , component : CerrarCajaComponent},
   { path : '**' , pathMatch:'full' , redirectTo : 'abrir'}, 
  ]}, ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
