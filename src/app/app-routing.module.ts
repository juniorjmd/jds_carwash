import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DatosPosComponent } from './components/datos-pos/datos-pos.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioNuevoComponent } from './components/usuario/usuario-nuevo.component';
import { UsuarioDetalleComponent } from './components/usuario/usuario-detalle.component';
import { UsuarioEditarComponent } from './components/usuario/usuario-editar.component';
import { POSComponent } from './components/pos/pos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteNuevoComponent } from './components/clientes/cliente-nuevo.component';
import { ClienteInicioComponent } from './components/clientes/cliente-inicio.component';
import { ClienteDetalleComponent } from './components/clientes/cliente-detalle.component'; 
import { CerrarCajaComponent } from './components/pos/cerrar-caja/cerrar-caja.component';
import { AbrirCajaComponent } from './components/pos/abrir-caja/abrir-caja.component';
import { VentasComponent } from './components/pos/ventas/ventas.component';
import { CierresComponent } from './components/cierres/cierres.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { CajasComponent } from './components/datos-pos/cajas.component';
import { GeneralesComponent } from './components/datos-pos/generales.component';
import { CajasNuevaComponent } from './components/datos-pos/cajas-nueva.component';
import { CajasDetalleComponent } from './components/datos-pos/cajas-detalle.component';
import { MiUsuarioComponent } from './components/mi-usuario/mi-usuario.component';
import { MaestroClienteServices } from './services/MaestroCliente.services';
import { MaestrosComponent } from './components/clientes/maestros/maestros.component';
import { CiudadesComponent } from './components/clientes/maestros/ubicacion/ciudades.component';
import { DepartamentosComponent } from './components/clientes/maestros/ubicacion/departamentos.component';
import { PaisesComponent } from './components/clientes/maestros/ubicacion/paises.component';
import { CrearComponent } from './components/datos-pos/generales/establecimientos/crear.component';
import { CuentasCntComponent } from './components/datos-pos/generales/cuentas-cnt/cuentas-cnt.component';
import { ImpuestosComponent } from './components/datos-pos/generales/impuestos/impuestos.component';
import { ProductosComponent } from './components/datos-pos/generales/productos/productos.component';
import { InventariosComponent } from './components/datos-pos/generales/inventarios/inventarios.component';
import { CategoriasComponent } from './components/datos-pos/generales/categorias/categorias.component';
import { ContadoresComponent } from './components/datos-pos/generales/contadores/contadores.component';
import { MediosDePagoComponent } from './components/datos-pos/generales/medios-de-pago/medios-de-pago.component';
import { DevolucionesComponent } from './components/devoluciones/devoluciones.component';
import { EnviosComponent } from './components/envios/envios.component';
import { TiposDeDocumentosComponent } from './components/datos-pos/generales/tipos-de-documentos/tipos-de-documentos.component';
import { EmpleadosComponent } from './components/modEmpleados/empleados/empleados.component';
import { CreacionEdicionComponent } from './components/modEmpleados/creacion-edicion/creacion-edicion.component';
import { PagosComponent } from './components/modEmpleados/pagos/pagos.component';
import { HomeVhComponent } from './components/vehiculos/home/home.component';
import { IngresoComponent } from './components/vehiculos/ingreso/ingreso.component';
import { ServiciosComponent } from './components/vehiculos/servicios/servicios.component';
import { TiposComponent } from './components/vehiculos/tipos/tipos.component';
import { ServicioscostosComponent } from './components/vehiculos/servicioscostos/servicioscostos.component';
import { TiposServiciosComponent } from './components/vehiculos/tipos-servicios/tipos-servicios.component';
import { BodegasComponent } from './components/datos-pos/generales/bodegas/bodegas.component';
import { ParametrosComponent } from './components/parametros/parametros.component';
import { InicioReportesComponent } from './components/reportes/inicio-reportes/inicio-reportes.component';
import { ReimpimirFacturasComponent } from './components/reportes/reimpimir-facturas/reimpimir-facturas.component';
import { VerFacturasComponent } from './components/reportes/ver-facturas/ver-facturas.component';
 





/*
const routes: Routes = 
[{ path: 'jds', component: JdsComponent , children : [
  { path: 'ventas', loadChildren: () => import('./modules/ventas/ventas.module').then(m => m.VentasModule) },
{ path: 'inventario', loadChildren:() => import('./modules/inventario/inventario.module').then(m => m.InventarioModule ) },
{ path:'**' , redirectTo : "ventas"}


]} ,
{ path:'**' , redirectTo : "jds"}




];
*/

 const routes:  Routes = [
    { path : 'login' , component : LoginComponent}, 
    { path : 'home' , 
    component : HomeComponent ,
      children : [       
        { path : 'miUsuario' , component : MiUsuarioComponent}, 
        { path : 'parametrosDelSistema' , component : ParametrosComponent}, 
        { path : 'inicio' ,component : InicioComponent, },
        { path : 'empleados' ,component : EmpleadosComponent, children:[
          { path : 'Mantenimiento' , component : CreacionEdicionComponent},
          { path : 'Pagos' , component : PagosComponent}, 
          { path : '**' , pathMatch:'full' , redirectTo : 'Mantenimiento'}, 
         ]},
         { path : 'Vehiculos' ,component : HomeVhComponent, children:[
           { path : 'Ingresos' , component : IngresoComponent},
           { path : 'Servicios' , component : ServiciosComponent}, 
           { path : 'Tipos' , component : TiposComponent}, 
           { path : 'Costos' , component : ServicioscostosComponent},   
           { path : 'TiposServicios' , component : TiposServiciosComponent},  
            { path : '**' , pathMatch:'full' , redirectTo : 'Ingresos'}, 
          ]},
        { path : 'pos' , component : POSComponent
           ,children:[
            { path : 'abrir' , component : AbrirCajaComponent},
            { path : 'ventas' , component : VentasComponent},
            { path : 'cerrar' , component : CerrarCajaComponent},
            { path : '**' , pathMatch:'full' , redirectTo : 'abrir'}, 
           ]}, 

           { path : 'devoluciones' , component : DevolucionesComponent},
           { path : 'envios' , component : EnviosComponent},

          { path : 'clientes' , component : ClientesComponent,
           children:[
            { path : 'listado' , component : ClienteInicioComponent},
            { path : 'nuevo' , component : ClienteNuevoComponent},
            { path : 'detalle/idCliente' , component : ClienteDetalleComponent},
            { path : 'maestros' , component : MaestrosComponent,
               children:[
                {   path : 'ciudades' , component: CiudadesComponent}, 
                {   path : 'departamentos' , component: DepartamentosComponent}, 
                {   path : 'paises' , component: PaisesComponent},     
                { path : '**' , pathMatch:'full' , redirectTo : 'ciudades'},  
                  
                ]},
            { path : '**' , pathMatch:'full' , redirectTo : 'listado'}, 
            ]}, 
        { path : 'DatosPos' , component: DatosPosComponent,
              children:[
                {path : 'bodegas' , component:BodegasComponent},
                { path : 'generales' ,      component: GeneralesComponent},
                { path : 'contadores' ,      component: ContadoresComponent},
                { path : 'Medios' ,      component: MediosDePagoComponent},
                { path : 'inventarios' ,      component: InventariosComponent},
                { path : 'categorias' ,      component: CategoriasComponent},
                { path : 'productos' ,      component: ProductosComponent},
                { path : 'tipoDocumentos' ,      component: TiposDeDocumentosComponent},
                { path : 'establecimientos' ,    component: CrearComponent},
                { path : 'cuentasContables', component:CuentasCntComponent},
                { path : 'impuestos', component:ImpuestosComponent},
                { path : 'caja' ,      component: CajasComponent},
                { path : 'cajaNueva' ,      component: CajasNuevaComponent},
                { path : 'cajaDetalle:id' ,      component: CajasDetalleComponent},
                { path : '**' , pathMatch:'full' , redirectTo : 'generales'}, 
              ]          
              }, 
        
        { path : 'cierres' ,      component: CierresComponent},
        { path : 'reportes' ,      component: InicioReportesComponent , children:[
          {path : 'reportesMenu' , component:ReportesComponent}, 
          {path : 'reimprimirFacturas' , component:ReimpimirFacturasComponent},
          {path : 'VerFacturas' , component: VerFacturasComponent},
          { path : '**' , pathMatch:'full' , redirectTo : 'reportesMenu'}, ]
        },
        { path : 'usuarios' ,  component: UsuarioComponent },
                  
        { path : '**' , pathMatch:'full' , redirectTo : 'inicio'} 
      ]
    },
    { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
    { path : '**' , pathMatch:'full' , redirectTo : 'login'},
] ;



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
