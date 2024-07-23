import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelBase } from '../ModelBase';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CarteraAbonosModel extends ModelBase {  
  totalAbonos = 0; 
  comprobante = 0; 
  descripcion='';  
}
