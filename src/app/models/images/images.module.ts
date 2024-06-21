import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelBase } from '../ModelBase';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ImagesModule extends ModelBase {
  
  constructor( 
    @Inject(String) public id_producto: string,
    @Inject(String) public descripcion: string,
    @Inject(String) public url: string,
    @Inject(String) public name: string
  ) {
    super();
  }
}
