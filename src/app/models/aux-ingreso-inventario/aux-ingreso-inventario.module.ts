import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AuxIngresoInventarioModule {
  constructor(

    @Inject(Number) public  cod_producto :number,
    @Inject(Number) public  cantidad:number, 
    @Inject(Number) public  bodega:number,
    @Inject(Number) public  cod_usuario ?:number ,
    @Inject(String) public  nombreUsuario ?:string ,
    @Inject(String) public  nombreProducto ?:string ,
    @Inject(String) public  nombreBodega ?:string ,
    @Inject(String) public  referencia ?:string ,
    @Inject(Number) public  id ?:number ,


  ){

  }
 }
