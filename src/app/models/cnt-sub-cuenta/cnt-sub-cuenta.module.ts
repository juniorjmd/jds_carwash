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


  export class vwCntSubCuentaModel { 
    id_scuenta?: number; 
     nro_scuenta?: number;  
     nombre_scuenta?: string; 
    modificar: string;
     digito?: number;

    cod_cuenta: number;
    nro_cuenta?: number; 
    nombre_cuenta?: string; 

     cod_clase?: number;
     nombre_clase?: string;
     cod_grupo?: number;
     nombre_grupo?: string; 
    constructor() {
      this.id_scuenta = 0;
      this.cod_cuenta = 0; 
      this.modificar = 'S';
      this.nombre_cuenta = '';
    }}