import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { AbrirCajaComponent } from './pages/abrir-caja/abrir-caja.component';
import { BuscarProdDirectoComponent } from './pages/buscar-prod-directo/buscar-prod-directo.component';
import { BuscarProductosComponent } from './pages/buscar-productos/buscar-productos.component';
import { CerrarCajaComponent } from './pages/cerrar-caja/cerrar-caja.component';
import { DefinirBaseCajaComponent } from './pages/definir-base-caja/definir-base-caja.component';
import { MostrarProductoComponent } from './pages/mostrar-producto/mostrar-producto.component';
import { MoverDocumentosComponent } from './pages/mover-documentos/mover-documentos.component';
import { PagosVentaComponent } from './pages/pagos-venta/pagos-venta.component';
import { POSComponent } from './pages/pos.component';
import { ResumenCajaComponent } from './pages/resumen-caja/resumen-caja.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { FormsModule } from '@angular/forms';
import { ImgB64Pipe } from 'src/app/pipes/imgB64.pipe';
 

@NgModule({
  declarations: [ 
    ImgB64Pipe ,
    POSComponent, 
    BuscarProductosComponent,
    VentasComponent,
    AbrirCajaComponent,
    CerrarCajaComponent,
    DefinirBaseCajaComponent,
    ResumenCajaComponent,
    MoverDocumentosComponent,
    MostrarProductoComponent,
    PagosVentaComponent,
    BuscarProdDirectoComponent 
  ],
  imports: [
    CommonModule,
    PosRoutingModule,
    FormsModule 
  ]
})
export class PosModule { }
