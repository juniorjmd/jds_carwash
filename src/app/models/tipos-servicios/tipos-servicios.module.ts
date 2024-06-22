import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelBase } from '../ModelBase';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class TiposServiciosModule extends ModelBase {
  constructor(
    @Inject(String) public nombre: string,
    // @Inject(Number) public estado: number,
    @Inject(String) public estadoNombre: string,
    @Inject(String) public descripcion?: string
     // @Inject(Number) public id?: number
  ) {
    super();
  }
}
