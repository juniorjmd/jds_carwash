import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelBase } from '../ModelBase';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class BodegasModule extends ModelBase {
  constructor(
  @Inject(String) public nombre:string,  
  @Inject(String) public descripcion?:string ,  
  @Inject(Number) public tipo?:number,
  @Inject(String) public tipo_descripcion?:string ){
    super();
  }



 }
