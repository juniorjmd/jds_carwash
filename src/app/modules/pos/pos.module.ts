import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { AbrirCajaComponent } from './pages/abrir-caja/abrir-caja.component';
import { BuscarProdDirectoComponent } from './modals/buscar-prod-directo/buscar-prod-directo.component'; 
import { CerrarCajaComponent } from './pages/cerrar-caja/cerrar-caja.component';
import { DefinirBaseCajaComponent } from './modals/definir-base-caja/definir-base-caja.component';
import { MostrarProductoComponent } from './modals/mostrar-producto/mostrar-producto.component';
import { MoverDocumentosComponent } from './modals/mover-documentos/mover-documentos.component';
import { PagosVentaComponent } from './modals/pagos-venta/pagos-venta.component';
import { POSComponent } from './pages/pos.component';
import { ResumenCajaComponent } from './modals/resumen-caja/resumen-caja.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { FormsModule } from '@angular/forms';  
import { SharedModule } from '../shared/shared.module';
import { IngresarProductoVentaComponent } from './modals/ingresar-producto-venta/ingresar-producto-venta.component'; 
import { NewGastoComponent } from './modals/new-gasto/new-gasto.component';
import { GenerarCntPorCobrarComponent } from './modals/generar-cnt-por-cobrar/generar-cnt-por-cobrar.component';
 

@NgModule({
  declarations: [  
    POSComponent,  
    VentasComponent,
    AbrirCajaComponent,
    CerrarCajaComponent,
    DefinirBaseCajaComponent,
    ResumenCajaComponent,
    MoverDocumentosComponent,
    MostrarProductoComponent,
    PagosVentaComponent,
    BuscarProdDirectoComponent,
    IngresarProductoVentaComponent , 
    NewGastoComponent, GenerarCntPorCobrarComponent
  ],
  imports: [
    CommonModule,
    PosRoutingModule,
    FormsModule ,
    SharedModule,
  ]
})
export class PosModule { }
