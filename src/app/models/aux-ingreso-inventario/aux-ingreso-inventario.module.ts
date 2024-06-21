import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelBase } from '../ModelBase';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AuxIngresoInventarioModule extends ModelBase{
  constructor(

    @Inject(Number) public  cod_producto :string | number,
    @Inject(Number) public  cantidad:number, 
    @Inject(Number) public  bodega:number,
    @Inject(Number) public  cod_usuario ?:number ,
    @Inject(String) public  nombreUsuario ?:string ,
    @Inject(String) public  nombreProducto ?:string ,
    @Inject(String) public  nombreBodega ?:string ,
    @Inject(String) public  referencia ?:string , 


  ){
     super();
  }
 }
