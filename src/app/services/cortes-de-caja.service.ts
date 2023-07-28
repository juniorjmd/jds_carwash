import { Injectable } from '@angular/core';
import { actions } from '../models/app.db.actions';
import { TABLA } from '../models/app.db.tables';
import { url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';


import { HttpClient } from '@angular/common/http';  
import { httpOptions } from '../models/app.db.url'; 

@Injectable({
  providedIn: 'root'
})
export class CortesDeCajaService {

  constructor(private http: HttpClient ) { }

  
  getCierresTotalesYparciales(){
    let datos = {"action": actions.actionSelects  ,
                // "_tabla" : vistas.cajasActivas       
                 "_tablas" : [vistas.corte_de_caja ,vistas.corte_de_caja_parcial ,vistas.corte_de_caja_pagos ]             
                };
    console.log('servicios de cierres getCierresTotalesYparciales' ,url.action , datos, httpOptions());
    return this.http.post(url.action , datos, httpOptions()) ;
} 

  
getProductosPorCierres(id:number){
  let datos = {"action": actions.actionSelect  ,
              "_tabla" : vistas.documentos_listado_productos_por_cierre  ,              
              "_where" : [{columna : 'id_cierre_caja' , tipocomp : '=' , dato : id}]     
                //"_tablas" : [vistas.corte_de_caja ,vistas.corte_de_caja_parcial ,vistas.corte_de_caja_pagos ]             
              };
  console.log('servicios de cierres getCierresTotalesYparciales' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 
}
