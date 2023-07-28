import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class BodegasModule {
  constructor(
  @Inject(String) public nombre:string,
  @Inject(Number) public estado:number,
  
  @Inject(String) public descripcion?:string,
  @Inject(Number) public id?:number,
  @Inject(String) public nombre_estado?:string){}



 }
