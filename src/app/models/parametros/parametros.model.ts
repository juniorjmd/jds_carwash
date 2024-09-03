import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ParametrosModel {
  public datosTabla:datoTabla[] = [{
    "id" : 0,
    "nombre" : 'ninguno'
  }]
  constructor(
   @Inject(String) public  cod_parametro:string,
   @Inject(String)  public tip_parametro:string,
   @Inject(String)  public descripcion?:string,
   @Inject(Number)  public par_numerico?:number,
   @Inject(String)  public par_string?:string ,
   @Inject(String)  public par_id?:number ,
   @Inject(Boolean)  public par_boolean?:boolean, 
   @Inject(String)  public nombreTabla?:string, 
   @Inject(String)  public columnaDescripcion?:string, 
   @Inject(String)  public columnaId?:string, 
   @Inject(Number)   public  idparametros?:number
  ){}
 }

 export  interface datoTabla { 
   "id" : any,
   "nombre" : string
 }
