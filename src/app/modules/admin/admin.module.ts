import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CajasDetalleComponent } from './pages/cajas/cajas-detalle.component';
import { CajasNuevaComponent } from './pages/cajas/cajas-nueva.component'; 
import { DatosPosComponent } from './pages/datos-pos.component';
import { GeneralesComponent } from './pages/generales.component';
import { BodegasComponent } from './pages/generales/bodegas/bodegas.component';
import { CategoriasComponent } from './pages/generales/categorias/categorias.component';
import { ContadoresComponent } from './pages/generales/contadores/contadores.component';
import { CuentasCntComponent } from './modules/cuentas-contables/cuentas-cnt.component';
import { CrearComponent } from './pages/generales/establecimientos/crear.component';
import { ImpuestosComponent } from './pages/generales/impuestos/impuestos.component';
import { MediosDePagoComponent } from './pages/generales/medios-de-pago/medios-de-pago.component';
import { ProductosComponent } from './pages/generales/productos/productos.component';
import { TiposDeDocumentosComponent } from './pages/generales/tipos-de-documentos/tipos-de-documentos.component';
import { TiposEstablComponent } from './pages/generales/establecimientos/tipos-establ.component'; 
import { SharedModule } from '../shared/shared.module';
import { AdminCategoriasComponent } from './modals/admin-categorias/admin-categorias.component';
import { DescuentosComponent } from './pages/descuentos/descuentos.component';
import { ActividadDescuentoComponent } from './pages/actividad-descuento/actividad-descuento.component'; 

 
@NgModule({
  declarations: [
    AdminComponent,
    DatosPosComponent,
    BodegasComponent,
    GeneralesComponent,
    ContadoresComponent,
    MediosDePagoComponent,
    CategoriasComponent,
    ProductosComponent,
    TiposEstablComponent,
    TiposDeDocumentosComponent,
    CrearComponent,
    CuentasCntComponent,
    ImpuestosComponent,
    CajasNuevaComponent,
    CajasDetalleComponent,
    AdminCategoriasComponent,
    DescuentosComponent,
    ActividadDescuentoComponent 
  ],
  imports: [
    CommonModule,
    RouterModule, 
    AdminRoutingModule,
    FormsModule, 
    SharedModule
  ]
})
export class AdminModule { }
