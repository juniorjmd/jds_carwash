import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ParametrosModule {
  public datosTabla = [{
    "id" : 0,
    "nombre" : 'ninguno'
  }]
  constructor(
   @Inject(String) public  cod_parametro:string,
   @Inject(String)  public tip_parametro:string,
   @Inject(String)  public descripcion?:string,
   @Inject(Number)  public par_numerico?:number,
   @Inject(String)  public par_string?:string ,
   @Inject(Boolean)  public par_boolean?:boolean, 
   
   @Inject(String)  public par_tabla?:string, 
   @Inject(Number)   public  idparametros?:number
  ){}
 }
