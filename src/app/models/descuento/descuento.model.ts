import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelBase } from '../ModelBase';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DescuentoModule extends ModelBase { 
  public tipo: string = 'P';
  public cantidad: number = 0.0;
  public nombre: string = '';
  public descripcion: string = '';

  public obj?:any;

  public NombreTipo ?: string = 'PORCENTAJE';
  constructor(){
    super()
  }
 }
