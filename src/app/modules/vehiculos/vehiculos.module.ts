import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculosRoutingModule } from './vehiculos-routing.module'; 
import { EstablecerCajaComponent } from './pages/establecer-caja/establecer-caja.component';
import { HomeVhComponent } from './pages/home/home.component';
import { IngresoComponent } from './pages/ingreso/ingreso.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ServicioscostosComponent } from './pages/servicioscostos/servicioscostos.component';
import { TiposServiciosComponent } from './pages/tipos-servicios/tipos-servicios.component';
import { TiposComponent } from './pages/tipos/tipos.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    HomeVhComponent,EstablecerCajaComponent,HomeVhComponent,
    IngresoComponent,ServiciosComponent,ServicioscostosComponent,
    TiposComponent,TiposServiciosComponent
  ],
  imports: [
    CommonModule,FormsModule,RouterModule, 
    VehiculosRoutingModule,
    
  ]
})
export class VehiculosModule { }
