import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';  
import { Inventario } from 'src/app/interfaces/nInterfaces/inventario';
import { ambiente } from 'src/app/modules/shared/shared.module';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  URL = ambiente.urlBaseBack + 'inventarios';
  headers = new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded');
  optHeader =  {headers : this.headers } ;

  constructor(private http: HttpClient) { 
    console.log('inventario service inicializado');
    
  }
  
  getInventarios(){
      
    return this.http.get<Inventario[]>( `${this.URL}` , this.optHeader);
 
  }

  setInventarios( data:Inventario){
      console.log( `${this.URL}`,data , this.optHeader);
      
    return this.http.post<Inventario[]>( `${this.URL}`,data , this.optHeader);
 
  }

  editarElementoLinea( linea:any  , id:number){
   console.log("lineaModificada" , linea , "idLineaCambiada" , id);
   
  }

}
