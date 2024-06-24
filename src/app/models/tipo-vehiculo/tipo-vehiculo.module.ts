import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelBase } from '../ModelBase';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class TipoVehiculoModule extends ModelBase {
  constructor(
    @Inject(String) public nombre: string,
    @Inject(String) public descripcion?: string
  ) {
    super();
  }
}
