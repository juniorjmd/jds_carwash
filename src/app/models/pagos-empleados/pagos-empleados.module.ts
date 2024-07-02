import { Inject, NgModule } from '@angular/core';
import { CommonModule, Time } from '@angular/common'; 
import { ModelBase } from '../ModelBase';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PagosEmpleadoModel extends ModelBase { 
   public codEmpleado:number = 0; 
   public totalParcial:number = 0; 
   public anticipos:number = 0;
   public totalPagado:number = 0; 
   public diasTrabajados?:number; 
   public serviciosTrabajados?:number; 
   public idSucursal?:number; 
  public porConceptoDe?:string;
  public descripcion?:string; 
  public nombreUsuario?:string; 
  public nombreEmpleado?:string; 
  public NombreEstado?:string; 
  public fecha?:Date
  public hora?:Time
  public numeroPagosPendientes?:number; 
  public numeroAdelantosPendientes?:number; 
  public numeroAcumuladosPendientes?:number; 
   
 }
