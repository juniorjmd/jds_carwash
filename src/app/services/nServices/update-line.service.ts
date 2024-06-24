import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { ambiente } from 'src/app/modules/shared/shared.module';

import { httpOptions } from 'src/app/models/app.db.url';
@Injectable({
  providedIn: 'root'
})
export class UpdateLineService {

 
  requestOptions:any;
  urlBase = ambiente.urlBaseBack; 
  optHeader = httpOptions()

  constructor(private http: HttpClient) { 
    console.log('clientes actualizar linea tabla inicializado'); 
    
  } 
  
 

editRegistro(id:number, modelo:any , origen:string){
  let urlBack = `${this.urlBase}${origen}/${id}`  ; 
  return this.http.put(urlBack, modelo); 
}


deleteRegistro(id:number, origen:string){
  let urlBack = `${this.urlBase}${origen}/${id}`  ; 
  return this.http.delete(urlBack); 
}
}
