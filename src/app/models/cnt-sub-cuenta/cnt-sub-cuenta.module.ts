import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CntSubCuentaModel { 
  id_cuenta?: number;
  cod_cuenta: number;
  nro_cuenta?: number;
  modificar: string;
  nombre_cuenta?: string;

  constructor() {
    this.id_cuenta = 0;
    this.cod_cuenta = 0; 
    this.modificar = 'S';
    this.nombre_cuenta = '';
  }}
