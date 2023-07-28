import { Injectable } from '@angular/core'; 
import { ciudad, datosMaestros, departamento, maestros, maestroSelect, pais } from '../interfaces/maestros.interface';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { HttpClient } from '@angular/common/http';
import { TABLA } from '../models/app.db.tables';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {


  constructor(private http: HttpClient){ 
    console.log('servicios parametros inicializado');        
}

getParametros(){
  let datos = {"action": actions.actionSelect , "_tabla" : TABLA.PARAMETROS,  }
  console.log('getParametros  ' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
}


getDatosParametrosTabla(tabla){
  let datos = {"action": actions.actionSelect , "_tabla" : tabla,  }
  console.log('getParametros  ' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
}

}
