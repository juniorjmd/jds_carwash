import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelBase } from '../ModelBase';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class MarcasModule extends ModelBase { 
   nombre!:string; 
   descripcion?:string ;  
}
