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
import { MenucardsComponent } from './components/shared/menucards/menucards.component';  


import { CierresComponent } from './components/cierres/cierres.component';
import { MiUsuarioComponent } from './components/mi-usuario/mi-usuario.component'; 
import { LoadingComponent } from './components/shared/loading/loading.component'; 
import { loading } from './models/app.loading';
import { UsuarioPerfilComponent } from './components/usuario/usuario-perfil.component'; 
import { booleanpPipe } from './pipes/booleanp.pipe';
import { EnviosComponent } from './components/envios/envios.component';
import { DevolucionesComponent } from './components/devoluciones/devoluciones.component'; 
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
import { AppRoutingModule } from './app-routing.module';   

 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal'; 
import { SharedModule } from './modules/shared/shared.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip'; 
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from './message-modal/message-modal.component';

@NgModule({
  declarations: [ 
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
    MenucardsComponent, 
    CierresComponent,
    MiUsuarioComponent, 
    DialogoConfirmacionComponent,
    LoadingComponent, 
    UsuarioPerfilComponent, 
    EnviosComponent,
    DevolucionesComponent, 
    EmpleadosComponent,  
    PagosComponent, 
    CreacionEdicionComponent,  
       ParametrosComponent,
        ReimpimirFacturasComponent,
         InicioReportesComponent,
          VerFacturasComponent,
          MessageModalComponent 
  ],
   imports: [
    NgbModule ,
    RouterModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule, 
    MatRadioModule,
    BrowserModule,
    HttpClientModule, 
    MatDialogModule, 
    AppRoutingModule , 
    CommonModule,RouterModule,
    SharedModule, 
    TypeaheadModule.forRoot(), 
    ModalModule.forRoot(),
    TooltipModule.forRoot(),

    
  ],
  providers: [ Title,  loading], 
  bootstrap: [AppComponent],
  exports:[  AppComponent  
    ]
 
})
export class AppModule { }
   