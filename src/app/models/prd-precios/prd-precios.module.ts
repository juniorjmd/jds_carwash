import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelBase } from '../ModelBase';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PrdPreciosModule extends ModelBase {  

   id_producto ?:string;
   estado_nombre ?:string;
  constructor(    
    @Inject(Number) public valor_iva?:number, 
    @Inject(Number) public precio_antes_de_iva?:number, 
    @Inject(Number) public precio_con_iva?:number  
  ){
      super();
    }

}
