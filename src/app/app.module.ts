import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';  
//servicios

//componentes
import { AppComponent } from './app.component';  
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


import { CierresComponent } from './components/cierres/cierres.component';
import { MiUsuarioComponent } from './components/mi-usuario/mi-usuario.component'; 
import { loading } from './models/app.loading';
import { UsuarioPerfilComponent } from './components/usuario/usuario-perfil.component';  
import { EnviosComponent } from './components/envios/envios.component'; 

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
    CierresComponent,
    MiUsuarioComponent,   
    UsuarioPerfilComponent, 
    EnviosComponent, 
       ParametrosComponent,
        ReimpimirFacturasComponent,
         InicioReportesComponent,
          VerFacturasComponent,
          MessageModalComponent 
  ],
   imports: [
    SharedModule, 
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
   