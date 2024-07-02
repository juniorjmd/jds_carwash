import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CntClasesModel { 

  id_clase?: number;
  cod_clase?: number;
  nombre_clase: string;

  constructor() {
    this.id_clase = 0;
    this.cod_clase = 0;
    this.nombre_clase = '';
  }
}


