import { Inject, NgModule } from '@angular/core';
import { CommonModule, Time } from '@angular/common';  



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AcumuladosEmpleadoModel {
  public cod_empleado!:number; 
  public cod_servicio!:number; 
  public valor!:number; 
  public estado!:number;
   public nombreEstado?:string;
   public nombreEmpleado?:string;
   public nombreServicio?:string;
   public fecha?:Date; 
  public id?:number;
  public hora?:Time 
 }
