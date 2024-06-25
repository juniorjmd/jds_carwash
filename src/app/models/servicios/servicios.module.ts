import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelBase } from '../ModelBase';
import { TiposServiciosModule } from '../tipos-servicios/tipos-servicios.module';



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
  @Inject(String) public nombre_tipo_servicio?:string ,
  @Inject(TiposServiciosModule) public tipo_servicio_detalle?:TiposServiciosModule 
){  
  super() ;
this.estado = 0;
}
}
