import { NgModule , Inject } from '@angular/core';
import { CommonModule, Time } from '@angular/common';  
import { timer } from 'rxjs';
import { ModelBase } from '../ModelBase';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class VehiculosIngresoServicioModule extends ModelBase {
  nombrePropietario:string = '';
  constructor(
    @Inject(String) public  placaVehiculo?:string , 
   @Inject(Number) public cod_servicio ?:number,
   @Inject(String) public propietario?:number, 
   @Inject(Number) public cod_tipo_vehiculo?:number, 
   @Inject(Number) public lavador?:number, 
   @Inject(String) public nombreEstado?:string,
   @Inject(Number) public cajaAsignada?:number, 
   @Inject(Number) public idDocumento?:number,
   @Inject(Number) public valor ?: number,  
   @Inject(String) public nombreCajaAsignada?:string,
  ){
    super();
    this.placaVehiculo = (this.placaVehiculo)? this.placaVehiculo: '';
    this.cod_servicio = (this.cod_servicio)?this.cod_servicio : 0 ; 
    this.propietario = (this.propietario)?this.propietario:0;
    this.cod_tipo_vehiculo = (this.cod_tipo_vehiculo)? this.cod_tipo_vehiculo:0;
  }
 }
