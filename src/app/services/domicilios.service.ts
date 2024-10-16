import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { configService } from './config.service';
import { CustomConsole } from '../models/CustomConsole';

@Injectable({
  providedIn: 'root'
})
export class DomiciliosService { 

  // private _configService = inject(configService); 
constructor(private http: HttpClient ) {  
  }
  
  getListadosDomicilios(){
    let datos = {"action": actions.actionSelect ,
                 "_tabla" : vistas.domicilios ,                 
                 "_obj" : ['objetoDocumento'],  
                };
    CustomConsole.log('servicios de domicilios - getListadosDomicilios' ,url.action , datos, httpOptions());
    return this.http.post(url.action , datos, httpOptions()) ;
} 
}
