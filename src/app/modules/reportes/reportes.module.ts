import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReportesRoutingModule } from './reportes-routing.module'; 
import { InicioReportesComponent } from './pages/inicio-reportes/inicio-reportes.component';
import { ReimpimirFacturasComponent } from './pages/repVentas/reimpimir-facturas/reimpimir-facturas.component'; 
import { VerFacturasClienteComponent } from './pages/repVentas/ver-facturas/ver-facturasCliente.component';
import { SharedModule } from '../shared/shared.module';
import { ReportesComponent } from './pages/reportes.component';
import { MovimientosCuentaComponent } from './pages/movimientosCuenta/movimientosCuenta.component';
import { InicioRepVentasComponent } from './pages/repVentas/inicioRepVentas/inicioRepVentas.component';
import { BienvenidaRPComponent } from './pages/repVentas/bienvenidaRP/bienvenidaRP.component';
import { ventasDiariaComponent } from './pages/repVentas/ventasDiaria/ventasDiaria.component';
import { ventasPorProductoComponent } from './pages/repVentas/ventasPorProducto/ventasPorProducto.component';
import { ventasPorCategoriaComponent } from './pages/repVentas/ventasPorCategoria/ventasPorCategoria.component';
import { ventasPorVendedorComponent } from './pages/repVentas/ventasPorVendedor/ventasPorVendedor.component';
import { ventasDiariaHoraComponent } from './pages/repVentas/ventasDiariaHora/ventasDiariaHora.component';
import { devolucionesRepoComponent } from './pages/repVentas/Devoluciones/devoluciones.component';
import { BienvenidaRFComponent } from './pages/repFinanzas/bienvenidaRF/bienvenidaRF.component';
import { InicioRepFinansasComponent } from './pages/repFinanzas/inicioRepFinansas/inicioRepFinansas.component';
import { EstadoDeResultadoComponent } from './pages/repFinanzas/estadoDeResultado/estadoDeResultado.component';
import { flujoDeCajaComponent } from './pages/repFinanzas/flujoDeCaja/flujoDeCaja.component';
import { movimientosCuentasComponent } from './pages/repFinanzas/movimientos/movimientos.component';
import { movimientosGastosComponent } from './pages/repFinanzas/movimientosGastos/movimientosGastos.component';
import { CuentasPorPagarComponent } from './pages/repFinanzas/cuentasPorPagar/cuentasPorPagar.component';
import { CuentasPorCobrarComponent } from './pages/repFinanzas/cuentasPorCobrar/cuentasPorCobrar.component';
import { repClienteComponent } from './pages/repCliente/repCliente.component';
import { repProveedorComponent } from './pages/repProveedor/repProveedor.component';
import { RepInventarioComponent } from './pages/repInventario/repInventario.component';


@NgModule({
  declarations: [
    ReportesComponent, flujoDeCajaComponent,movimientosCuentasComponent,movimientosGastosComponent,
    ReimpimirFacturasComponent,repProveedorComponent,repClienteComponent,
    InicioReportesComponent,ventasPorCategoriaComponent,
     VerFacturasClienteComponent, ventasPorProductoComponent,ventasPorVendedorComponent,ventasDiariaHoraComponent,
       BienvenidaRPComponent,ventasDiariaComponent, MovimientosCuentaComponent, InicioRepVentasComponent, devolucionesRepoComponent
       ,BienvenidaRFComponent,InicioRepFinansasComponent, EstadoDeResultadoComponent, CuentasPorPagarComponent,CuentasPorCobrarComponent,
        RepInventarioComponent ],
  imports: [
    CommonModule,
    ReportesRoutingModule, 
    SharedModule
  ]
})
export class ReportesModule { }
