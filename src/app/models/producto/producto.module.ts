import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProductoModule {
   existencias?:any[] ;  
  constructor( 
    @Inject(String) public nombre :string,
    @Inject(Number) public precioVenta:number, 
    @Inject(Number) public PrecioSinIVA?:number, 
    @Inject(Number) public valorIVA?:number, 
    @Inject(Number) public porcent_iva?:number, 
    @Inject(Number) public precioCompra?:number,
    @Inject(String) public nombre2?:string,
    @Inject(String) public nombre3?:string,
    @Inject(Number) public id?:number, 
    @Inject(String) public idProducto?:string, 
    @Inject(Number) public idCategoria?:number, 
    @Inject(Number) public idCategoria2?:number,
    @Inject(Number) public idCategoria3?:number, 
    @Inject(Number) public categoria4?:number, 
    @Inject(Number) public idMarca?:number,  
    @Inject(String) public imagen?:string, 
    @Inject(String) public barcode?:string, 
    @Inject(String) public descripcion?:string, 
    @Inject(Number) public tipo_producto?:number, 
    @Inject(Number) public cantidad?:number, 
    @Inject(Date) public fecha_creacion?:Date,
    @Inject(String) public nombreMarca?:string, 
    @Inject(String) public nombreCategoria?:string, 
    @Inject(String) public nombreCategoria2?:string, 
    @Inject(String) public nombreCategoria3?:string, 
    @Inject(String) public nombreCategoria4 ?:string,
    @Inject(Number) public cantidadVendida?:number, 
    @Inject(Number) public descuento?:number,  
    @Inject(String) public nombre_completo?:string,  
    @Inject(String) public tipo_prod_nombre?:string,  
  ){
this.existencias = []; 
  }
 }
