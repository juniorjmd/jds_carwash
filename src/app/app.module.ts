import { BrowserModule, Title } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';  
//servicios

//componentes
import { AppComponent } from './app.component';  
import { HomeComponent } from './components/home/home.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';  
import { CierresComponent } from './components/cierres/cierres.component';
import { MiUsuarioComponent } from './components/mi-usuario/mi-usuario.component'; 
import { loading } from './models/app.loading';

import { EnviosComponent } from './components/envios/envios.component'; 

import { ParametrosComponent } from './components/parametros/parametros.component'; 
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';    
import { CommonModule } from '@angular/common'; 
import { ModalModule } from 'ngx-bootstrap/modal'; 
import { SharedModule } from './modules/shared/shared.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip'; 
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from './message-modal/message-modal.component'; 


import { ConfigService } from './services/config.service';

export function initializeApp(configService: ConfigService) {
  return () => configService.loadConfig();
}

@NgModule({
  declarations: [ 
    AppComponent, 
    HomeComponent,
    InicioComponent,
    AdminLayoutComponent, 
    CierresComponent,
    MiUsuarioComponent,    
    EnviosComponent, 
    ParametrosComponent,
    MessageModalComponent, 
  ],
   imports: [
    NgbModule , 
    FormsModule, 
    ReactiveFormsModule, 
    MatRadioModule,
    BrowserModule,
    HttpClientModule,  
    AppRoutingModule ,  
    SharedModule, 
    CommonModule, 
    TypeaheadModule.forRoot(), 
    ModalModule.forRoot(),
    TooltipModule.forRoot(),  
  ],
  providers: [ Title,  loading,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    }
  ], 
  bootstrap: [AppComponent],
  exports:[  AppComponent  
    ]
 
})
export class AppModule { }
   