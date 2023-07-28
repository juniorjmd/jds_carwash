import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';

@Injectable({
  providedIn: 'root'
})
export class DomiciliosService { 

  constructor(private http: HttpClient ) {  
  }
  
  getListadosDomicilios(){
    let datos = {"action": actions.actionSelect ,
                 "_tabla" : vistas.domicilios ,                 
                 "_obj" : ['objetoDocumento'],  
                };
    console.log('servicios de domicilios - getListadosDomicilios' ,url.action , datos, httpOptions());
    return this.http.post(url.action , datos, httpOptions()) ;
} 
}
