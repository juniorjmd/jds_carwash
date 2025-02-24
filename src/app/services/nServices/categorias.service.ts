import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 
import { actions } from 'src/app/models/app.db.actions';
import { httpOptions } from 'src/app/models/app.db.url';
import { CustomConsole } from 'src/app/models/CustomConsole';
import { ambiente } from 'src/app/modules/shared/shared.module';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

 

  URL = ambiente.urlBaseBack + 'inventario/'; 

  constructor(private http: HttpClient) { 
    CustomConsole.log('clientes service inicializado');
    
  }


  getCategorias():Observable<any>{ 
      let datos = { 
              "action": actions.get_categorias  
            }
            CustomConsole.log('servicios de categorias - getCategorias', this.URL, datos, httpOptions());
   
        return this.http.post<any>(this.URL, datos, httpOptions());
    
 
  }

  editarElementoLinea( linea:any  , id:number){
   CustomConsole.log("lineaModificada" , linea , "idLineaCambiada" , id);
   
  }


}
