import { Inject, NgModule } from '@angular/core';
import { CommonModule, Time } from '@angular/common'; 



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PagosEmpleadosModule {
   public idUsuario:number = 0;
   public codEmpleado:number = 0; 
   public totalParcial:number = 0; 
   public anticipos:number = 0;
   public totalPagado:number = 0;
   public estado:number = 1; 
   public id?:number;
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
