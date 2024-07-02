import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CntGruposModel { 

  id_grupo?: number;
  cod_clase: number;
  cod_grupo: number;
  nombre_grupo?: string;

  constructor() {
    this.id_grupo = 0;
    this.cod_clase = 0;
    this.cod_grupo = 0;
    this.nombre_grupo = '';
  }
}
