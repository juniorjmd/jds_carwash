import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelBase } from '../ModelBase';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PrdExistenciasModule extends ModelBase{ 
 
  public nombreBodega:string = '';
  public fecha_ultimo_cambio?:Date ;
  public nombreUsuario_ult_mov ?:string = ''
  public nombre_producto?:string = ''

  constructor(   
  @Inject(String) public id_producto: string | null,
  @Inject(Number) public id_bodega: number | null,
  @Inject(Number) public cant_inicial: number,
  @Inject(Number) public compras: number,
  @Inject(Number) public ventas: number,
  @Inject(Number) public devoluciones: number,
  @Inject(Number) public remisiones: number,
  @Inject(Number) public cant_actual: number,
  @Inject(Number) public stock: number, 
  @Inject(String) public ult_mov: string
    ){ 
     super();
     this.fecha_ultimo_cambio = this.fecha_actualizacion ?? this.fecha_creacion; 
     this.nombreUsuario_ult_mov= this.fecha_actualizacion ? this.name_usuario_edicion : this.name_usuario_creacion
    }
  
}
