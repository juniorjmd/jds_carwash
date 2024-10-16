import { inject, Injectable } from '@angular/core'; 
import { ciudad, datosMaestros, departamento, maestros, maestroSelect, pais } from '../interfaces/maestros.interface';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { HttpClient } from '@angular/common/http';
import { TABLA } from '../models/app.db.tables';
import { configService } from './config.service';
import { CustomConsole } from '../models/CustomConsole';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {


  // private _configService = inject(configService); 
constructor(private http: HttpClient){ 
    CustomConsole.log('servicios parametros inicializado');        
}

getParametros(){
  let datos = {"action": actions.actionSelect , "_tabla" : TABLA.PARAMETROS,  }
  CustomConsole.log('getParametros  ' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
}


getDatosParametrosTabla(tabla:any , col1:string, col2:string){
  let datos = {"action": actions.actionSelect , "_tabla" : tabla, "_columnas": [col1 , col2] }
  CustomConsole.log('getParametros  ' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
}

}
