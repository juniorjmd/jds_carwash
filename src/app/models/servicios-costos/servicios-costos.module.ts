import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ServiciosCostosModule {
//id, cod_servicio, cod_tipo_vehiculo, valor, estado
//vw_vehiculos_servicios_costos
constructor(  @Inject(Number) public cod_servicio:number,
              @Inject(Number) public cod_tipo_vehiculo : number , 
              @Inject(Number) public valor : number,  
              @Inject(Number) public estado :number,  
              @Inject(Number) public id ?:number,    
              @Inject(String) public estadoNombre ?:string,   
              @Inject(String) public nombreServicio ?:string,   
              @Inject(String) public descipcionServicio ?:string,  
              @Inject(Number) public tipo_servicio?:number,   
              @Inject(String) public nombre_tipo_servicio ?:string,   
              @Inject(String) public nombreTipoVehiculo ?:string,   
              @Inject(String) public descripcionTipoVehiculo ?:string
){}

 }