import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TiposEmpleadoModule {
 constructor(
   @Inject(String) public nombre:string , 
   @Inject(Number) public estado:number = 1,
   @Inject(Number) public id?:number ,
   @Inject(String) public descripcion?:string ,
   @Inject(String) public nombre_estado?:string
 ){}

 }
