import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransaccionesModel, vwTransaccionesModel } from '../transacciones/transacciones.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CntOperacionesModel {
 
    id?: number;
    usuario?: string;
    fechaOperacion?: string;
    fechaCreacion?: string;
    totalDebito?: number;
    totalCredito?: number;
    nombre: string = '';
    descripcion: string = ''; 
    idDocumento:number = 0 ; 
    idPersona : number = 0 ;
    nombreUsuario : string = '';
    nombrePersona?: string;
    transacciones: TransaccionesModel[]| vwTransaccionesModel[] = []
  
 }
