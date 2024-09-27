import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { InicioReportesComponent } from './pages/inicio-reportes/inicio-reportes.component';
import { ReimpimirFacturasComponent } from './pages/repVentas/reimpimir-facturas/reimpimir-facturas.component';
import { VerFacturasClienteComponent } from './pages/repVentas/ver-facturas/ver-facturasCliente.component';
import { ReportesComponent } from './pages/reportes.component';
import { MovimientosCuentaComponent } from './pages/movimientosCuenta/movimientosCuenta.component';
import { productosVendidosComponent } from './pages/productosVendidos/productosVendidos.component';
import { InicioRepVentasComponent } from './pages/repVentas/inicioRepVentas/inicioRepVentas.component';
import { BienvenidaRPComponent } from './pages/repVentas/bienvenidaRP/bienvenidaRP.component';
import { ventasDiariaComponent } from './pages/repVentas/ventasDiaria/ventasDiaria.component';
import { ventasPorProductoComponent } from './pages/repVentas/ventasPorProducto/ventasPorProducto.component';
import { ventasPorCategoriaComponent } from './pages/repVentas/ventasPorCategoria/ventasPorCategoria.component';
import { ventasPorVendedorComponent } from './pages/repVentas/ventasPorVendedor/ventasPorVendedor.component';
import { ventasDiariaHoraComponent } from './pages/repVentas/ventasDiariaHora/ventasDiariaHora.component';

const routes: Routes = [{ path: '', component: InicioReportesComponent ,   children:[
    {path : 'reportesMenu' , component:ReportesComponent}, 
   
    {path : 'movimientosCuentas' , component: MovimientosCuentaComponent},
    {path : 'productosVendidos' , component: productosVendidosComponent},



    { path: 'reporteVentas', component: InicioRepVentasComponent ,   children:[ 
      {path : '' , component:BienvenidaRPComponent},
      {path : 'diarias' , component:ventasDiariaComponent},
      {path : 'productos' , component:ventasPorProductoComponent},
      {path : 'categorias' , component:ventasPorCategoriaComponent},
      {path : 'vendedorCajero' , component:ventasPorVendedorComponent},
      {path : 'reimprimirFacturas' , component:ReimpimirFacturasComponent},
      {path : 'cliente' , component: VerFacturasClienteComponent} ,
      {path : 'horas' , component: ventasDiariaHoraComponent} ,
      { path : '**' , pathMatch:'full' , redirectTo : ''}
    ] } ,


    { path : '**' , pathMatch:'full' , redirectTo : 'reportesMenu'}, ]
 


}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
