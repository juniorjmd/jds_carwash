import { Injectable } from '@angular/core';
import { vwsucursal } from 'src/app/models/app.db.interfaces';
import { actions } from 'src/app/models/app.db.actions';
import { url } from 'src/app/models/app.db.url';
import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class DatosInicialesService {
    private sucursal:vwsucursal[]  ;

    constructor(private http: HttpClient){}

    getDatosIniSucursal(){
       
        let datos = {"action": actions.datosInicialesSucursal};
        console.log('servicios datos iniciales inicializado ' ,url.datosIniciales , datos, url.httpOptionsSinAutorizacion);
        return this.http.post(url.datosIniciales , datos, url.httpOptionsSinAutorizacion) ;
      
    }
}
 