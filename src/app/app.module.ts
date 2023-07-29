import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';  

import { DialogoConfirmacionComponent } from 'src/app/components/shared/dialogo-confirmacion/dialogo-confirmacion.component'
 
//servicios

//componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioNuevoComponent } from './components/usuario/usuario-nuevo.component';
import { UsuarioEditarComponent } from './components/usuario/usuario-editar.component';
import { UsuarioDetalleComponent } from './components/usuario/usuario-detalle.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ReporteDiarioComponent } from './components/reportes/reporte-diario.component'; 
import { ReporteVentasPcajaComponent } from './components/reportes/reporte-ventas-pcaja.component';
import { POSComponent } from './components/pos/pos.component'; 
import { MenucardsComponent } from './components/shared/menucards/menucards.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteNuevoComponent } from './components/clientes/cliente-nuevo.component';
import { ClienteInicioComponent } from './components/clientes/cliente-inicio.component';
import { ClienteDetalleComponent } from './components/clientes/cliente-detalle.component';
import { BuscarProductosComponent } from './components/pos/buscar-productos/buscar-productos.component';
import { VentasComponent } from './components/pos/ventas/ventas.component';
import { AbrirCajaComponent } from './components/pos/abrir-caja/abrir-caja.component';
import { CerrarCajaComponent } from './components/pos/cerrar-caja/cerrar-caja.component';
import { CierresComponent } from './components/cierres/cierres.component';
import { MiUsuarioComponent } from './components/mi-usuario/mi-usuario.component';
import { Modal1Component } from './components/shared/modal1/modal1.component';
import { MaestrosComponent } from './components/clientes/maestros/maestros.component'; 
import { MaestrosNavComponent } from './components/clientes/maestros/navbar.component';
import { CiudadesComponent } from './components/clientes/maestros/ubicacion/ciudades.component';
import { DepartamentosComponent } from './components/clientes/maestros/ubicacion/departamentos.component';
import { PaisesComponent } from './components/clientes/maestros/ubicacion/paises.component';
import { NewCiudadComponent } from './components/clientes/maestros/ubicacion/new-ciudad.component';
import { NewPaisComponent } from './components/clientes/maestros/ubicacion/new-pais.component';
import { NewDepartamentoComponent } from './components/clientes/maestros/ubicacion/new-departamento.component'; 
import { LoadingComponent } from './components/shared/loading/loading.component'; 
import { loading } from './models/app.loading';
import { DefinirBaseCajaComponent } from './components/pos/definir-base-caja/definir-base-caja.component';
import { ResumenCajaComponent } from './components/pos/resumen-caja/resumen-caja.component';
import { UsuarioPerfilComponent } from './components/usuario/usuario-perfil.component';
import { MoverDocumentosComponent } from './components/pos/mover-documentos/mover-documentos.component';
import { MostrarProductoComponent } from './components/pos/mostrar-producto/mostrar-producto.component';
import { ImgB64Pipe } from './pipes/imgB64.pipe';
import { dataArrayOdooPipe } from './pipes/dataArrayOdoo.pipe';
import { booleanpPipe } from './pipes/booleanp.pipe';
import { PagosVentaComponent } from './components/pos/pagos-venta/pagos-venta.component';
import { BuscarProdDirectoComponent } from './components/pos/buscar-prod-directo/buscar-prod-directo.component';
import { EnviosComponent } from './components/envios/envios.component';
import { DevolucionesComponent } from './components/devoluciones/devoluciones.component';
import { FndClienteComponent } from './components/cliente/fnd-cliente/fnd-cliente.component';
import { EmpleadosComponent } from './components/modEmpleados/empleados/empleados.component';
import { PagosComponent } from './components/modEmpleados/pagos/pagos.component';
import { CreacionEdicionComponent } from './components/modEmpleados/creacion-edicion/creacion-edicion.component';
import { ParametrosComponent } from './components/parametros/parametros.component';
import { ReimpimirFacturasComponent } from './components/reportes/reimpimir-facturas/reimpimir-facturas.component';
import { InicioReportesComponent } from './components/reportes/inicio-reportes/inicio-reportes.component';
import { VerFacturasComponent } from './components/reportes/ver-facturas/ver-facturas.component'; 
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';  
import {  MatRadioModule } from '@angular/material/radio';
import { AppRoutingModule } from './app-routing.module';   


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ 
    booleanpPipe,
    ImgB64Pipe ,
    dataArrayOdooPipe,
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    InicioComponent,
    AdminLayoutComponent,
    UsuarioComponent,
    UsuarioNuevoComponent,
    UsuarioEditarComponent,
    UsuarioDetalleComponent,
    ReportesComponent,
    ReporteDiarioComponent, 
    ReporteVentasPcajaComponent,
    POSComponent, 
    MenucardsComponent,
    ClientesComponent,
    ClienteNuevoComponent,
    ClienteInicioComponent,
    ClienteDetalleComponent,
    BuscarProductosComponent,
    VentasComponent,
    AbrirCajaComponent,
    CerrarCajaComponent,
    CierresComponent,
    MiUsuarioComponent,
    Modal1Component,
    MaestrosComponent,
    MaestrosNavComponent,
    CiudadesComponent,
    DepartamentosComponent,
    PaisesComponent,
    NewCiudadComponent,
    NewPaisComponent,
    NewDepartamentoComponent,
    DialogoConfirmacionComponent,
    LoadingComponent,
    DefinirBaseCajaComponent,
    ResumenCajaComponent,
    UsuarioPerfilComponent,
    MoverDocumentosComponent,
    MostrarProductoComponent,
    PagosVentaComponent,
    BuscarProdDirectoComponent,
    EnviosComponent,
    DevolucionesComponent,
    FndClienteComponent,
    EmpleadosComponent,  
    PagosComponent, 
    CreacionEdicionComponent,  
       ParametrosComponent,
        ReimpimirFacturasComponent,
         InicioReportesComponent,
          VerFacturasComponent 
  ],
   imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule, MatRadioModule,
    BrowserModule,
    HttpClientModule, 
    MatDialogModule, 
    AppRoutingModule , 
    CommonModule,RouterModule
  ],
  providers: [ Title,  loading], 
  bootstrap: [AppComponent],
  exports:[  AppComponent 
    ]
 
})
export class AppModule { }
   