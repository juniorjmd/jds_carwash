import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';  
import { Inventario } from 'src/app/interfaces/nInterfaces/inventario';
import { httpOptions } from 'src/app/models/app.db.url';
import { CustomConsole } from 'src/app/models/CustomConsole';
import { ambiente } from 'src/app/modules/shared/shared.module';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  URL = ambiente.urlBaseBack + 'inventario/'; 

  constructor(private http: HttpClient) { 
    CustomConsole.log('inventario service inicializado');
    
  }
  
  getInventarios(){
      
    return this.http.get<Inventario[]>( `${this.URL}` , httpOptions());
 
  }

  setInventarios( data:Inventario){
      CustomConsole.log( `${this.URL}`,data , httpOptions());
      
    return this.http.post<Inventario[]>( `${this.URL}`,data , httpOptions());
 
  }

  editarElementoLinea( linea:any  , id:number){
   CustomConsole.log("lineaModificada" , linea , "idLineaCambiada" , id);
   
  }

}
