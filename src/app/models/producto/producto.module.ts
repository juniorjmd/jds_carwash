import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PrdExistenciasModule } from '../prd-existencias/prd-existencias.module';
import { ModelBase } from '../ModelBase';
import { PrdPreciosModule } from '../prd-precios/prd-precios.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProductoModule extends ModelBase { 
  
  public precios  :PrdPreciosModule[]  = []
    
    precioVenta?:number; 
    PrecioSinIVA ?:number; 
    valorIVA?:number;
    descuento :number = 0;
    cantidad :number = 0;
    cantidadVendida  : number = 0;
  constructor( 
    @Inject(String) public nombre :string, 
    @Inject(String) public tipo_prod_nombre :string,  
    @Inject(Number) public porcent_iva?:number, 
    @Inject(Number) public precioCompra?:number,
    @Inject(String) public nombre2?:string,
    @Inject(String) public nombre3?:string, 
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
    @Inject(String) public nombreMarca?:string, 
    @Inject(String) public nombreCategoria?:string, 
    @Inject(String) public nombreCategoria2?:string, 
    @Inject(String) public nombreCategoria3?:string,
    @Inject(PrdExistenciasModule) public existencias?:PrdExistenciasModule[],
  ){
    super();
    if (this.precios?.length == 0 )
      {
        this.precios = [
          {valor_iva : 0 ,  precio_antes_de_iva  : 0 ,
            precio_con_iva : 0
          },
          {valor_iva : 0 ,  precio_antes_de_iva  : 0 ,
            precio_con_iva : 0
          },
          {valor_iva : 0 ,  precio_antes_de_iva  : 0 ,
            precio_con_iva : 0
          }
        ]
      }
  }
 }
