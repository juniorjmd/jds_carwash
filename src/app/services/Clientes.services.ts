import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as internal from 'events';
import { ClientesOdoo } from '../interfaces/clientes-odoo';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { DocumentosModel } from '../models/documento.model';

@Injectable({
    providedIn: 'root'
})
export class ClientesService {
    private clientes:cliente[]  ;
    

    constructor(private http: HttpClient ,
          ){  
        console.log('servicios datos iniciales inicializado'); 
    }
    getDatosIniClientes(){
   
        return this.clientes;
      
    }
    getDatosCliente(id:number){ 
        let clienteF:cliente; 
       for(let cliente of this.clientes){
           if ( cliente.id === id )
              clienteF = cliente;
       }
        return clienteF;
      
    }

    getClientesOdoo(){
        let datos = {"action": actions.actionSelect , "_tabla" : vistas.documentos_clientes,  }
        console.log('getClientesOdoo  ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    
    getDatosClientePname(nombre:string){ 
        let clienteF:cliente; 
       for(let cliente of this.clientes){
           if ( cliente.nombre === nombre )
              clienteF = cliente;
       }
        return clienteF;
      
    }
    getClientesOdooPorCedula( cliente:ClientesOdoo , limit : number ){

        let datos = {"action": actions.actionSelectClienteOdoo ,
        "_tipo_busqueda" : "id" ,
        "_tipo_identificacion" : cliente.l10n_latam_identification_type_id[0] ,
        "_dato" : cliente.vat ,
        "_limit":limit
       }
        console.log('actionSelectClienteOdoo  ' ,JSON.stringify(cliente),url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }

    setClienteOdooEinsertarDocumento( cliente:ClientesOdoo , documento:DocumentosModel ){

        let datos = {"action": actions.actionCrearClienteOdooPlusDoc ,
        "_datos_insert" : cliente  ,
        "_datos_insert_doc" : documento
       }
        console.log('actionSelectClienteOdoo  ' ,JSON.stringify(cliente),url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    setClienteOdoo( cliente:ClientesOdoo   ){

        let datos = {"action": actions.actionCrearClienteOdoo ,
        "_datos_insert" : cliente   
       }
        console.log('setClienteOdoo  ' ,JSON.stringify(cliente),url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }

    pasarClienteOdooACntYasignarDoc( cliente:ClientesOdoo , documento : DocumentosModel  ){

        let datos = {"action": actions.actionPasarClienteAControl ,
        "_datos_insert" : cliente ,
          "_agregar_a_documento" : true,
          "_documento_orden" : documento.orden 
       }
        console.log('setClienteOdoo  ' ,JSON.stringify(cliente),url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    updateClienteOdoo( cliente:ClientesOdoo   ){

        let datos = {"action": actions.actionActualizarClienteOdoo ,
        "_datos_insert" : cliente   
       }
        console.log('setClienteOdoo  ' ,JSON.stringify(cliente),url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    getClienteOdooPorCedula( cliente:ClientesOdoo ){

        let datos = {"action": actions.actionSelectClienteOdoo ,
        "_tipo_busqueda" : "id" ,
        "_tipo_identificacion" : cliente.l10n_latam_identification_type_id[0] ,
        "_dato" : cliente.vat ,
        "_limit":1
       }
        console.log('actionSelectClienteOdoo  ' ,JSON.stringify(cliente),url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }

}
export interface cliente{
    id:number ,
    nombre:string,
    identificacion:number,
    tipoIdentificacion:string,  
    calle:string,
    calle2:string,
    ciudad:string,
    provincia:string,
    pais:string,
    cp:string,
    direRecibo:string,
    puestoTrabajo:string,
    tel1:string,
    tel2:string,
    mail:string,
    enlace:string,
    titulo:string,
    categoria:string


}