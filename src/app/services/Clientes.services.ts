import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';  
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { DocumentosModel } from '../models/ventas/documento.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClientesModel } from '../models/clientes/clientes.module';
import { clienteRequest } from '../interfaces/producto-request';
import { TABLA } from '../models/app.db.tables';

@Injectable({
    providedIn: 'root'
})
export class ClientesService {
    private clientes:ClientesModel[] = []  ;
    private urlpersona = url.action+'personas/';
    private clienteSource = new BehaviorSubject<any>(null);
    currentUsuario = this.clienteSource.asObservable();
    constructor(private http: HttpClient ,
          ){  
        console.log('servicios datos iniciales inicializado'); 
    }

    changeCliente(cliente: any) {
        this.clienteSource.next(cliente);
      }





    asignarClienteAlDocumento(idDocumento:number , idPersona: number){
        let where =   [{"columna" : "orden" , "tipocomp" : "=" , "dato" : idDocumento }]
        let arraydatos =  {  "cliente" :idPersona  ,
            "id_cliente" : idPersona 
         };
        
        let datos = {"action": actions.actionUpdate ,
        "_tabla" : TABLA.documentos, "_where" : where ,
        "_arraydatos" : arraydatos
       };
       console.log(url.action , datos, httpOptions())
       return this.http.post<any>(url.action , datos, httpOptions()) ;
    }
    getDatosIniClientes(){
   
        return this.clientes;
      
    }
    getDatosCliente(id:number):ClientesModel{ 
        let clienteF:ClientesModel = new ClientesModel();
       for(let cliente of this.clientes){
           if ( cliente.id === id )
              clienteF = cliente;
       }
        return clienteF;
      
    }

    getClientes():Observable<ClientesModel>{
        let datos = {"action": actions.actionSelect , "_tabla" : vistas.vw_mst_per_clientes, _limit: 300 }
        console.log('getClientes  ' ,url.action , datos, httpOptions());
        return this.http.post<ClientesModel>(url.action , datos, httpOptions()) ;
    }
    getClientesByNumAndTipId( numId:string , tipId:number):Observable<clienteRequest>{
        let datos = {
            "_where" : [
            {columna : 'tipoIdentificacion' , tipocomp : '=' , dato : tipId},
            {columna : 'numIdentificacion' , tipocomp : '=' , dato : numId}
        ]   , 
        "action": actions.actionSelect , "_tabla" : vistas.vw_mst_per_clientes, _limit: 300 }
        console.log('getClientes  ' ,url.action , datos, httpOptions());
        return this.http.post<clienteRequest>(url.action , datos, httpOptions()) ;
    }

    getClientesByNombre(nombreCliente:string  ):Observable<clienteRequest>{
        let datos = {
            "_where" : [{columna : 'nombreCompleto' , tipocomp : 'like' , dato : nombreCliente} 
        ]   , 
        "action": actions.actionSelect , "_tabla" : vistas.vw_mst_per_clientes, _limit: 300 }
        console.log('getClientes  ' ,url.action , datos, httpOptions());
        return this.http.post<clienteRequest>(url.action , datos, httpOptions()) ;
    }

    getProveedorByNombre(nombreCliente:string  ):Observable<clienteRequest>{
        let datos = {
            "_where" : [{columna : 'nombreCompleto' , tipocomp : 'like' , dato : nombreCliente} 
        ]   , 
        "action": actions.actionSelect , "_tabla" : vistas.vw_proveedor, _limit: 300 }
        console.log('getClientes  ' ,url.action , datos, httpOptions());
        return this.http.post<clienteRequest>(url.action , datos, httpOptions()) ;
    }
    getMaestroClientes():Observable<any>{
        let datos = {"action": actions.MAESTROS_CLIENTES  }
        console.log('getMaestroClientes  ' ,this.urlpersona , datos, httpOptions());
        return this.http.post<any>(this.urlpersona , datos, httpOptions()) ;
    }
    
    getDatosClientePname(nombre:string){  
        let clienteF:ClientesModel = new ClientesModel();
       for(let cliente of this.clientes){
           if ( cliente.nombre === nombre )
              clienteF = cliente;
       }
        return clienteF;
      
    }
    getClientesModulePorCedula( cliente:ClientesModel , limit : number ){

        let datos = {"action": actions.actionSelectClienteOdoo ,
        "_tipo_busqueda" : "id" ,
        "_tipo_identificacion" : cliente.tipoIdentificacion ,
        "_dato" : cliente.numIdentificacion ,
        "_limit":limit
       }
        console.log('actionSelectClienteOdoo  ' ,JSON.stringify(cliente),url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
 
    setClienteOdoo( cliente:ClientesModel   ){
        cliente.name_usuario_creacion =  undefined    ;
        cliente.name_usuario_edicion =  undefined    ;
        cliente.nombreCompleto =  undefined    ;
        cliente.nombre_estado =  undefined    ;

        let datos:any  = {"action": actions.actionInsert ,
            _tabla : TABLA.personas ,
        _arraydatos : cliente       }
       if (cliente.id !== undefined){
        datos.action = actions.actionUpdate;
        datos._arraydatos.usuario_edicion = 'USUARIO_LOGUEADO' ;
        datos._where =   [     {columna : 'id' , tipocomp : '=' , dato : datos._arraydatos.id  }  ]  
        datos._arraydatos.id = undefined;
       } else{
        datos._arraydatos.usuario_creacion = 'USUARIO_LOGUEADO'
       }
        console.log('setClienteOdoo  ' ,JSON.stringify(cliente),url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }

    pasarClienteOdooACntYasignarDoc( cliente:ClientesModel , documento : DocumentosModel  ){

        let datos = {"action": actions.actionPasarClienteAControl ,
        _arraydatos : cliente ,
          "_agregar_a_documento" : true,
          "_documento_orden" : documento.orden 
       }
        console.log('setClienteOdoo  ' ,JSON.stringify(cliente),url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    updateClienteOdoo( cliente:ClientesModel   ){

        let datos = {"action": actions.actionActualizarClienteOdoo ,
        _arraydatos : cliente   
       }
        console.log('setClienteOdoo  ' ,JSON.stringify(cliente),url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    getClienteOdooPorCedula( cliente:ClientesModel ){

        let datos = {"action": actions.actionSelectClienteOdoo ,
        "_tipo_busqueda" : "id" ,
        "_tipo_identificacion" : cliente.tipoIdentificacion ,
        "_dato" : cliente.numIdentificacion,
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