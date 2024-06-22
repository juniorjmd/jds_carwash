import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelBase } from '../ModelBase';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ServiciosModule extends ModelBase {   
  constructor( 
  @Inject(String) public nombre:string,  
  @Inject(Number) public  tipo_servicio:number,
  @Inject(Number) public  precio_general?:number,
  @Inject(String) public descripcion?:string,
  @Inject(String) public nombre_tipo_servicio?:string 
){ 
  super()

}
}
