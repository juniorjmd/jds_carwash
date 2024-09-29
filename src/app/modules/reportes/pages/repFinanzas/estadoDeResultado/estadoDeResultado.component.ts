import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResumenVenta } from 'src/app/interfaces/resumenVenta.';
import { DocumentosModel } from 'src/app/models/ventas/documento.model';

@Component({
  selector: 'app-estado-de-resultado', 
  templateUrl:'./estadoDeResultado.component.html',
  styleUrls: ['./estadoDeResultado.component.css'], 
})
export class EstadoDeResultadoComponent { 
  resumenVenta?:ResumenVenta;
  resumen:boolean=false;
  hideR:boolean=true;
  hideF:boolean=true;
  documentos : DocumentosModel[] = [];
  codFactura:string='';
  codCliente:string='';
  fecha1:string;
  fecha2:string; 
  maximo:string; 
  constructor(){
    this.codFactura = ''; 
   let fecha = new Date();
    this.fecha1 = fecha.getFullYear().toString() +'-'+ (fecha.getMonth() + 1).toString().padStart(2,'0')+'-01' ;
    this.fecha2 = fecha.getFullYear().toString() +'-'+ (fecha.getMonth() + 1).toString().padStart(2,'0')+'-'+ (fecha.getDate()).toString().padStart(2,'0') ;
    this.maximo = this.fecha2 ;
  }
}
