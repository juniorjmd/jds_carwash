import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TransaccionesModel { 
  cod_transaccion?: number;
  id_cuenta: number;
  valor_credito: number;
  valor_debito: number;
  fecha_transaccion: string;
  relacion_tabla: string;
  ingreso_saldos: string;
  usuario?: string;
  fecha_ingreso?: string;
  cod_tercero?: string;
  cod_comprobante?:number;
  origen_comprobante: string;

  constructor() {
    this.cod_transaccion = 0;
    this.id_cuenta = 0;
    this.valor_credito = 0.00;
    this.valor_debito = 0.00;
    this.fecha_transaccion = '';
    this.relacion_tabla = '';
    this.ingreso_saldos = 'N';
    this.usuario = '';
    this.fecha_ingreso = '';
    this.cod_tercero = '';
    this.cod_comprobante = 0 ;
    this.origen_comprobante = 'NA';
  }
}
export class vwTransaccionesModel { 
  cod_transaccion?: number;
  id_cuenta: number;
  valor_credito: number;
  valor_debito: number;
  fecha_transaccion: string;
  relacion_tabla: string;
  ingreso_saldos: string;
  usuario?: string;
  fecha_ingreso?: string;
  cod_tercero?: string; 
  origen_comprobante: string;
  nro_cuenta?:number;
  nombre_cuenta?: string; 
  nro_subcuenta?:number;
   nombre_subcuenta?: string; 
    cod_comprobante?:number;  
    cod_clase?:number; 
     nombre_clase?: string; 
     cod_grupo?:number;  
     nombre_grupo?: string;
     digito?:number; 

  constructor() {
    this.cod_transaccion = 0;
    this.id_cuenta = 0;
    this.valor_credito = 0.00;
    this.valor_debito = 0.00;
    this.fecha_transaccion = '';
    this.relacion_tabla = '';
    this.ingreso_saldos = 'N';
    this.usuario = '';
    this.fecha_ingreso = '';
    this.cod_tercero = '';
    this.cod_comprobante = 0;
    this.origen_comprobante = 'NA';
  }
}