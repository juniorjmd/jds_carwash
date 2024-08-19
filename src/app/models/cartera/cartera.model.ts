import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelBase } from '../ModelBase';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CarteraModel extends ModelBase {  
  valorInicial = 0;
  totalActual = 0;
  totalAbonos = 0;
  totalDevolucion = 0;
  abonoInicial = 0;
  idTercero = 0;
  idFacturaVenta = 0;
  comprobante = 0;
  fecha_ultimo_abono?:Date;
  descripcion='';cuotas:number= 0;plazos:number= 0;
  numero_plazos_vencidos:number= 0;
  suma_plazos_vencidos:number= 0;
  
}
