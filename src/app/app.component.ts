import { Component, inject, OnInit } from '@angular/core';
import { Globals } from 'src/globales';
import { Title } from '@angular/platform-browser';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { loadConfig, printer, url } from './models/app.db.url';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ Globals ] 
})
export class AppComponent  implements OnInit {
  

  llaveIncio:string; 
  private http = inject( HttpClient ) ;
  constructor( private globals: Globals, private titleService: Title   ){
   
    this.llaveIncio = '';
    this.titleService.setTitle('JDS - sofdla.com.co'); 

  }
  async ngOnInit() {
    // Cargar la configuración una vez al iniciar la aplicación
    await loadConfig(this.http); 
    // Ahora la configuración está disponible para el resto de la aplicación
    console.log("Configuración cargada:", url , printer);
  }
 
}