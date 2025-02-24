import { Component, inject, OnInit } from '@angular/core';
import { Globals } from 'src/globales';
import { Title } from '@angular/platform-browser';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { enviroment, loadConfig, printer, url } from './models/app.db.url';
import { CustomConsole } from './models/CustomConsole';
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
   // CustomConsole.setEnvironment('dev');  
    this.llaveIncio = '';
    this.titleService.setTitle('JDS - sofdla.com.co');  
  }
  async ngOnInit() { 
    await loadConfig(this.http);  
    CustomConsole.setEnvironment( enviroment);  
    CustomConsole.log(enviroment); 
    CustomConsole.log(url);  
  }
 
}