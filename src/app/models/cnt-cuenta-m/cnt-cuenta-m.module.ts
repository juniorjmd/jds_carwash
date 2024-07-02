import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CntCuentaMModel { 
  id_cuenta?: number;
  cod_grupo: number;
  cod_cuenta: number;
  nombre_cuenta: string; 
  id_grupo?: number; 
  cod_clase?: number;
   nombre_grupo?: string; 
   id_clase?: number;
   nombre_clase?: string;
   digito?: number; 

  constructor() {
    this.id_cuenta = 0;
    this.cod_grupo = 0;
    this.cod_cuenta = 0;
    this.nombre_cuenta = '';
  }
}
