import { NgModule , Inject } from '@angular/core';
import { CommonModule, Time } from '@angular/common';  
import { timer } from 'rxjs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class VehiculosIngresoServicioModule {

  constructor(
    @Inject(String) public  placaVehiculo:string , 
   @Inject(Number) public cod_servicio :number,
   @Inject(String) public propietario:string,
   @Inject(String) public telefono:string,
   @Inject(Number) public cod_tipo_vehiculo:number, 
   @Inject(Number) public lavador:number,
   @Inject(Number)  public estado?:number,
   @Inject(String) public nombreEstado?:string,
   @Inject(Number) public cajaAsignada?:number, 
   @Inject(Number) public idDocumento?:number,
   @Inject(Number) public valor ?: number,
   @Inject(Number) public id?:number,
   @Inject(Date) public fecha?:Date,
   @Inject(timer) public hora?:Time,
   @Inject(String) public nombreCajaAsignada?:string,
  ){}
 }
