import { Inject, NgModule } from '@angular/core';
import { CommonModule, Time } from '@angular/common';  
import { ModelBase } from '../ModelBase';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AcumuladosEmpleadoModel extends ModelBase {
  public cod_empleado!:number; 
  public cod_servicio!:number; 
  public valor!:number;   
   public nombreEmpleado?:string;
   public nombreServicio?:string;
   public fecha?:Date;  
   public hora?:Time 
 }
