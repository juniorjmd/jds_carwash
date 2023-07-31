import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Categoria } from 'src/app/interfaces/nInterfaces/categoria';
import { ambiente } from 'src/app/modules/shared/shared.module';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

 

  URL = ambiente.urlBaseBack + 'categorias';
  headers = new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded');
  optHeader =  {headers : this.headers } ;

  constructor(private http: HttpClient) { 
    console.log('clientes service inicializado');
    
  }


  getCategorias(){
      
    return this.http.get<Categoria[]>( `${this.URL}` , this.optHeader);
 
  }

  editarElementoLinea( linea:any  , id:number){
   console.log("lineaModificada" , linea , "idLineaCambiada" , id);
   
  }


}
