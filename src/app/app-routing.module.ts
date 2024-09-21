import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  
import { HomeComponent } from './components/home/home.component'; 
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuarioComponent } from './modules/admin/modules/usuarios/pages/usuario.component'; 
import { CierresComponent } from './components/cierres/cierres.component'; 
import { MiUsuarioComponent } from './components/mi-usuario/mi-usuario.component';  
import { EnviosComponent } from './components/envios/envios.component'; 
import { ParametrosComponent } from './components/parametros/parametros.component'; 

 const routes:  Routes = [ 
    { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
    { path : 'home' , 
    component : HomeComponent ,
      children : [             
        { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
        { path: 'vehiculos', loadChildren: () => import('./modules/vehiculos/vehiculos.module').then(m => m.VehiculosModule) },
        { path: 'pos', loadChildren: () => import('./modules/pos/pos.module').then(m => m.PosModule) }, 
        { path: 'clientes', loadChildren: () => import('./modules/personas/personas.module').then(m => m.PersonasModule) },
        { path : 'miUsuario' , component : MiUsuarioComponent}, 
        { path : 'parametrosDelSistema' , component : ParametrosComponent}, 
        { path : 'inicio' ,component : InicioComponent, },
        { path : 'empleados' , loadChildren: () => import('./modules/mod-empleados/mod-empleados.module').then(m => m.ModEmpleadosModule) },
        { path: 'devoluciones', loadChildren: () => import('./modules/notasCredito/devoluciones.module').then(m => m.DevolucionesModule) }        ,
        { path: 'compras', loadChildren: () => import('./modules/compras/compras.module').then(m => m.ComprasModule) },
        { path : 'envios' , component : EnviosComponent},
        { path : 'cierres' ,      component: CierresComponent}, 
        { path: 'reportes', loadChildren: () => import('./modules/reportes/reportes.module').then(m => m.ReportesModule) },
        { path: 'usuarios', loadChildren: () => import('./modules/admin/modules/usuarios/usuarios.module').then(m => m.UsuariosModule) }, 
        { path : '**' , pathMatch:'full' , redirectTo : 'inicio'} 
      ]
    },
    { path: 'permisos', loadChildren: () => import('./modules/admin/modules/permisos/permisos.module').then(m => m.PermisosModule) }, 
     { path : '**' , pathMatch:'full' , redirectTo : 'login'},
] ;



@NgModule({
  imports: [RouterModule.forRoot(routes,   { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
