import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { loading } from 'src/app/models/app.loading';
import { cajaModel } from '../models/cajas.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(private http: HttpClient ,
    private loading : loading ) { 
      console.log('servicio documentos');
      
    }

  getDocumentoActivo(){
    let datos = {"action": actions.actionSelectPorUsuario ,
                 "_tabla" : vistas.documento,
                 "_columnas" : ['objeto'], 
                 "_columnaUsuario" : 'usuario',
                 "_where": [{"columna" : 'estado' , "tipocomp" : '=' , "dato" : 1}]
                };
    console.log('servicios de usuarios activo - getDocumentoActivo' ,url.action , datos, httpOptions());
    return this.http.post(url.action , datos, httpOptions()) ;
} 

getDocumentos(){
  let where = [{"columna" : 'tipoDocumentoFinal' , "tipocomp" : '=' , "dato" : 1}]; 
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.documento,
               "_columnas" : ['objeto'], 
               "_obj" : ['objeto'], 
               "_columnaUsuario" : 'usuario',
               "_where":where
              };
  console.log('servicios de usuarios activo - getDocumentos' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 

getDocumentosUsuario(){
  let where = [{"columna" : 'tipoDocumentoFinal' , "tipocomp" : '=' , "dato" : 1}]; 
  let datos = {"action": actions.actionSelectPorUsuario ,
               "_tabla" : vistas.documento,
               "_columnas" : ['objeto'], 
               "_obj" : ['objeto'], 
               "_columnaUsuario" : 'usuario',
               "_where":where
              };
  console.log('servicios de usuarios activo - getDocumentos' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 

getCajasActivas(establecimiento:number){
  let where = [{"columna" : 'establecimiento' , "tipocomp" : '=' , "dato" : establecimiento}]; 
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.cajasActivas, 
               "_where":where
              };
  console.log('servicios de documentos - getCajasActivas' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 
getDocumentosUsuarioCaja( ){
  let where = [{"columna" : 'tipoDocumentoFinal' , "tipocomp" : '=' , "dato" : 1}]; 
  let datos = {"action": actions.actionSelectPorUsuario ,
               "_tabla" : vistas.documento, 
               "_columnas" : ['objeto'], 
               "_obj" : ['objeto'], 
               "_columnaUsuario" : 'usuario',
               "_where":where,
               "_datoUsuario" : {"columna" : 'caja' ,
               "tabla" : 'cajas' ,
               "nomColDato" : 'id' ,
               "datoWere" : [{"columna" : 'estadoCaja' , "tipocomp" : '=' , "dato" : 1},
               {"columna" : 'usuarioEstadoCaja' , "tipocomp" : '=' , "dato" : 'USUARIO_ACTIVO'}]
               }  };

              /* select  id into _esta ,_caja from  cajas where  
	   estadoCaja = 1 and 
	   usuarioEstadoCaja = _usuario*/
  console.log('servicios de usuarios activo - getDocumentosUsuarioCaja' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 

/*Get documentos tipo venta*/


getVentasFinalizadas(codVenta : string = ''){
  let datos:any; 
  let where = [{"columna" : 'idDocumentoFinal' , "tipocomp" : 'like' , "dato" : codVenta}]; 
  if(codVenta.trim() == ''){ where = [];
            }
            datos = {"action": actions.actionSelect , 
            "_columnas" : ['objeto'], 
            "_obj" : ['objeto'], 
                         "_tabla" : vistas.ventasCerradas, 
                         "_where":where
                        };
  console.log('servicios de documentos - getCajasActivas' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 
getVentasFinalizadasPorCliente(codVenta:string){
  let datos:any; 
  let where = [{"columna" : 'identificacionCliente' , "tipocomp" : 'like' , "dato" : codVenta , "relacion" : 'OR'},
  {"columna" : 'clienteNombre' , "tipocomp" : 'like' , "dato" : codVenta ,  "relacion" : 'OR'}

]; 
   
            datos = {"action": actions.actionSelect , 
            "_columnas" : ['objeto'], 
            "_obj" : ['objeto'], 
                         "_tabla" : vistas.ventasCerradas, 
                         "_where":where
                        };
  console.log('servicios de documentos - getCajasActivas' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 
getVentasFinalizadasPorFecha(fecha1:string, fecha2:string){
  let datos:any; 
  let where = [{"columna" : 'fecha' , "tipocomp" : '>=' , "dato" : fecha1 ,},
  {"columna" : 'fecha' , "tipocomp" : '<=' , "dato" : fecha2}

]; 
   
            datos = {"action": actions.actionSelect , 
            "_columnas" : ['objeto'], 
            "_obj" : ['objeto'], 
                         "_tabla" : vistas.ventasCerradas, 
                         "_where":where
                        };
  console.log('servicios de documentos - getCajasActivas' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 


cambiarDocumento(documento:number){
  let datos = {"action": actions.actionChangeDocumentos , "_docActual" : documento }
  console.log('cambiarDocumento activo ' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
}


cancelarDocumento(documento:number){
  let datos = {"action": actions.actionCancelarDocumentos , "_documento" : documento }
  console.log('cancelarDocumento activo ' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
}
generarDomicilioDocumento(documento:number){
  let datos = {"action": actions.actionCambiarDocADomicilio , "_documento" : documento }
  console.log('actionCambiarDocADomicilio ' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
}
cerrarDocumento(documento:number){
 /* {"action": "CREAR_STOCK_PICKING_FINAL"   ,
"_documento" : 17
 }*/
  let datos = {"action": actions.actionCerarDocumentos ,
  "_documento" : documento }
  console.log('crearDocumento activo ' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
}
//actionCambioCajaDocumento
crearDocumento(){
  let datos = {"action": actions.actionCrearDocumentos }
  console.log('crearDocumento activo ' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
}

cambiarDocumentoDeCaja(caja:cajaModel){
  let datos = {"action": actions.actionCambioCajaDocumento, "datos" : caja}
  console.log('crearDocumento activo ' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
}
}
