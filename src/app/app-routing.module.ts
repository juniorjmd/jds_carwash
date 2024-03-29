import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
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
import { MiUsuarioComponent } from './components/mi-usuario/mi-usuario.component';
import { MaestrosComponent } from './components/clientes/maestros/maestros.component';
import { CiudadesComponent } from './components/clientes/maestros/ubicacion/ciudades.component';
import { DepartamentosComponent } from './components/clientes/maestros/ubicacion/departamentos.component';
import { PaisesComponent } from './components/clientes/maestros/ubicacion/paises.component';
import { DevolucionesComponent } from './components/devoluciones/devoluciones.component';
import { EnviosComponent } from './components/envios/envios.component';
import { EmpleadosComponent } from './components/modEmpleados/empleados/empleados.component';
import { CreacionEdicionComponent } from './components/modEmpleados/creacion-edicion/creacion-edicion.component';
import { PagosComponent } from './components/modEmpleados/pagos/pagos.component';
import { ParametrosComponent } from './components/parametros/parametros.component';
import { InicioReportesComponent } from './components/reportes/inicio-reportes/inicio-reportes.component';
import { ReimpimirFacturasComponent } from './components/reportes/reimpimir-facturas/reimpimir-facturas.component';
import { VerFacturasComponent } from './components/reportes/ver-facturas/ver-facturas.component';
 

 

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
         
         { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
         { path: 'vehiculos', loadChildren: () => import('./modules/vehiculos/vehiculos.module').then(m => m.VehiculosModule) },
       
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
     { path : '**' , pathMatch:'full' , redirectTo : 'login'},
] ;



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
