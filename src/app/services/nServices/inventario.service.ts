import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';  
import { Inventario } from 'src/app/interfaces/nInterfaces/inventario';
import { httpOptions } from 'src/app/models/app.db.url';
import { ambiente } from 'src/app/modules/shared/shared.module';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  URL = ambiente.urlBaseBack + 'inventario/'; 

  constructor(private http: HttpClient) { 
    console.log('inventario service inicializado');
    
  }
  
  getInventarios(){
      
    return this.http.get<Inventario[]>( `${this.URL}` , httpOptions());
 
  }

  setInventarios( data:Inventario){
      console.log( `${this.URL}`,data , httpOptions());
      
    return this.http.post<Inventario[]>( `${this.URL}`,data , httpOptions());
 
  }

  editarElementoLinea( linea:any  , id:number){
   console.log("lineaModificada" , linea , "idLineaCambiada" , id);
   
  }

}
