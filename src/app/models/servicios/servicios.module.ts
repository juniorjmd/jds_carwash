import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ServiciosModule {   
  constructor( 
  @Inject(String) public nombre:string,
  @Inject(Number) public estado:number,
  @Inject(String) public estadoNombre:string,
  @Inject(Number) public  tipo_servicio:number,
  @Inject(Number) public  precio_general?:number,
  @Inject(String) public descripcion?:string,
  @Inject(String) public nombre_tipo_servicio?:string,
  @Inject(Number) public id?:number  
){}
}
