import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class MarcasModule { 
   nombre!:string; 
   descripcion?:string ;  
   estado?:number ; 
   nombre_estado?:string;
   id?:number ; 

}
