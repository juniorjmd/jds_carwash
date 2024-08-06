import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 

import { httpOptions, url } from '../models/app.db.url';
import { BehaviorSubject, Observable } from 'rxjs';
import {  cntClaseRequest, cntCuentaMayorRequest, cntDocOperacionesRequest, cntGrupoRequest, cntOperacionesRequest,  cntSubCuentaRequest, cntSubCuentaVwRequest, cntTipDocOperacionesRequest, cntTransaccionesRequest } from '../interfaces/producto-request';
import { actions } from '../models/app.db.actions';
import { vistas } from '../models/app.db.view';
import { CntGruposModel } from '../models/cnt-grupos/cnt-grupos.module';
import { CntClasesModel } from '../models/cnt-clases/cnt-clases.module';
import { CntCuentaMModel } from '../models/cnt-cuenta-m/cnt-cuenta-m.module';
import { vwCntSubCuentaModel } from '../models/cnt-sub-cuenta/cnt-sub-cuenta.module';
import { CntOperacionesModel } from '../models/cnt-operaciones/cnt-operaciones.module';
import { TABLA } from '../models/app.db.tables';
import { TransaccionesModel } from '../models/transacciones/transacciones.module';

@Injectable({
  providedIn: 'root'
})
export class CntContablesService {

  urlVentas = url.action + "ventas/";


  private grupoSource = new BehaviorSubject<CntGruposModel[]|null>(null);
  currentCntGrupo = this.grupoSource.asObservable();
  private claseSource = new BehaviorSubject<CntClasesModel[]|null>(null);
  currentCntClase = this.claseSource.asObservable();
  private cuentaMSource = new BehaviorSubject<CntCuentaMModel[]|null>(null);
  currentCntcuentaM = this.cuentaMSource.asObservable(); 
  private subcuentaSource = new BehaviorSubject<vwCntSubCuentaModel[]|null>(null);
  currentsubcuenta = this.subcuentaSource.asObservable();  
  private operacionSource = new BehaviorSubject<CntOperacionesModel|null>(null);
  currentoperacion = this.operacionSource.asObservable();

  constructor(private http: HttpClient  ) {  
    console.log('servicios cuentas contables inicializado');  
  }


  deleteListadoOprTmp(){ 
    let where =   [{"columna" : "usuario" , "tipocomp" : "=" , "dato" : 'USUARIO_LOGUEADO'}   ];
    let datos = {"action": actions.actionDelete ,
    "_tabla" : TABLA.transacciones_tmp,
    "_where" : where  
   };
   console.log('borrar tablas temporales por usuario ' ,url.action , datos, httpOptions());
   return this.http.post(url.action , datos, httpOptions()) ;
  }

  deleteItemListadoOprTmp(dato:any){ 
    let where =   [{"columna" : "cod_transaccion" , "tipocomp" : "=" , dato}   ];
    let datos = {"action": actions.actionDelete ,
    "_tabla" : TABLA.transacciones_tmp,
    "_where" : where  
   };
   console.log('borrar tablas temporales por id ' ,url.action , datos, httpOptions());
   return this.http.post(url.action , datos, httpOptions()) ;
  }

  changeOperacion(operacion: CntOperacionesModel) {
    this.operacionSource.next(operacion);
  }
  changeClase(clase: any) {
    this.claseSource.next(clase);
  }
  changeGrupo(grupo: any) {
    this.grupoSource.next(grupo);
  }
  changeCuentasM(cuenta: any) {
    this.cuentaMSource.next(cuenta);
  }
  changeSubCuenta(clase: any) {
    this.subcuentaSource.next(clase);
  }
  
  getMediosCajaActiva(){
    let datos = {"action": actions.actionSelectPorUsuario ,
                 "_tabla" : vistas.mediosPorCajaActiva,
                 "_columnaUsuario": 'usuarioCaja'
                };
    console.log('servicios de cajas activo ' ,url.action , datos, httpOptions());
    return this.http.post(url.action , datos, httpOptions()) ;
} 
getCntTransaccionesTmp():Observable<cntTransaccionesRequest>{
  let datos = {"action": actions.actionSelectPorUsuario , 
    "_tabla" : vistas.vw_transacciones_tmp,
    "_columnaUsuario": 'usuario'
   }; 
   
   console.log('getCntTransaccionesTmp',url.action , datos, httpOptions()) ;
   return this.http.post<cntTransaccionesRequest>(url.action , datos, httpOptions()) ;
}

setCntTransaccionesTmp(data:TransaccionesModel):Observable<any>{
  
  let datos ;
  let  arraydatos ; 
  if (data.cod_transaccion !== undefined &&  data.cod_transaccion > 0 ){
    


    let where =   [{"columna" : "cod_transaccion" , "tipocomp" : "=" , "dato" : data.cod_transaccion }]
    arraydatos =  { 
      "id_cuenta" : data.id_cuenta  ,
      "valor_credito" : data.valor_credito,
      "valor_debito" : data.valor_debito,};
    datos = {"action": actions.actionUpdate ,
      "_tabla" : TABLA.transacciones_tmp, "_where" : where ,
      "_arraydatos" : arraydatos
     };
  }else{
    arraydatos =  {  
      "id_cuenta" : data.id_cuenta  ,
      "valor_credito" : data.valor_credito,
      "valor_debito" : data.valor_debito,
      "fecha_transaccion" : data.fecha_transaccion ,
      "relacion_tabla" : data.relacion_tabla,
      "usuario" : 'USUARIO_LOGUEADO'}
    datos = {"action": actions.actionInsert ,
      "_tabla" : TABLA.transacciones_tmp,
      "_arraydatos" : arraydatos
     };
  } 
   return this.http.post<any>(url.action , datos, httpOptions()) ;
}

 


  getCntGrupos():Observable<cntGrupoRequest>{
    let datos = {"action": actions.actionSelect , 
      "_tabla" : vistas.vw_cnt_grupos,
      "_where" : []
     }; 
     return this.http.post<cntGrupoRequest>(url.action , datos, httpOptions()) ;
  }
  getCntClases():Observable<cntClaseRequest>{
    let datos = {"action": actions.actionSelect , 
      "_tabla" : vistas.vw_cnt_clase,
      "_where" :[]
     }; 
     return this.http.post<cntClaseRequest>(url.action , datos, httpOptions()) ;
  }
  getCntCuentasMayores():Observable<cntCuentaMayorRequest>{
    let datos = {"action": actions.actionSelect , 
      "_tabla" : vistas.vw_cnt_cuenta_mayores
     }; 

    console.log('getCntCuentasMayores' , url.action , datos, httpOptions())
     return this.http.post<cntCuentaMayorRequest>(url.action , datos, httpOptions()) ;
  }
  setNewSubCuenta(subCnt:vwCntSubCuentaModel){
    let datos ;
    
    let  arraydatos ;
    
    if (subCnt.id_scuenta != undefined && subCnt.id_scuenta  > 0 ){
      
        let where =   [{"columna" : "id_cuenta" , "tipocomp" : "=" , "dato" : subCnt.id_scuenta }]
        arraydatos =
            { "nro_cuenta": `${subCnt.cod_cuenta}${subCnt.digitoShow}`, 
              "nombre_cuenta":   subCnt.nombre_scuenta        }
        
        datos = {"action": actions.actionUpdate ,
        "_tabla" : TABLA.subCuentasContables, "_where" : where ,
        "_arraydatos" : arraydatos
       };
    }
    else{
      arraydatos =
      { 
        "cod_cuenta": subCnt.cod_cuenta,
        "modificar": "S",   
        "nro_cuenta": `${subCnt.cod_cuenta}${subCnt.digitoShow}`, 
        "nombre_cuenta":   subCnt.nombre_scuenta   
    }
        datos = {"action": actions.actionInsert ,
        "_tabla" : TABLA.subCuentasContables,
        "_arraydatos" : arraydatos
       };

    } 
    
   console.log(datos);
   
    return this.http.post(url.action , datos, httpOptions()) ;
  }
  getCntCuentas():Observable<cntSubCuentaRequest>{
    let datos = {"action": actions.actionSelect , 
      "_tabla" : vistas.vw_cnt_scuentas,
       _limit: 300,  
      "_where" : [{columna : 'digito' , tipocomp : '>' , dato : 0 }]
     }; 
     return this.http.post<cntSubCuentaRequest>(url.action , datos, httpOptions()) ;
  }

  getCntCuentasByIdGrupo(id:number):Observable<cntSubCuentaRequest>{
    let datos = {"action": actions.actionSelect , 
      "_tabla" : vistas.vw_cnt_scuentas, 
      "_where" : [{columna : 'cod_grupo' , tipocomp : '=' , dato : id }
                ,{columna : 'digito' , tipocomp : '>' , dato : 0 }]
     }; 

     return this.http.post<cntSubCuentaRequest>(url.action , datos, httpOptions()) ;
  }

  getCntCuentasByIdClase(id:number):Observable<cntSubCuentaRequest>{
    let datos = {"action": actions.actionSelect , 
      "_tabla" : vistas.vw_cnt_scuentas, 
      "_where" : [{columna : 'cod_clase' , tipocomp : '=' , dato : id }
                ,{columna : 'digito' , tipocomp : '>' , dato : 0 }]
     }; 

     return this.http.post<cntSubCuentaRequest>(url.action , datos, httpOptions()) ;
  }


  getCntCuentasByIdCM(id:number):Observable<cntSubCuentaVwRequest>{
    let datos = {"action": actions.actionSelect , 
      "_tabla" : vistas.vw_cnt_scuentas, 
      "_where" : [{columna : 'cod_cuenta' , tipocomp : '=' , dato : id }
                ,{columna : 'digito' , tipocomp : '>' , dato : 0 }]
     }; 

     return this.http.post<cntSubCuentaVwRequest>(url.action , datos, httpOptions()) ;
  }
  getCntCuentasById(id:number):Observable<cntSubCuentaVwRequest>{
    let datos = {"action": actions.actionSelect , 
      "_tabla" : vistas.vw_cnt_scuentas, 
      "_where" : [{columna : 'id_scuenta' , tipocomp : '=' , dato : id }
                ,{columna : 'digito' , tipocomp : '>' , dato : 0 }]
     }; 

     return this.http.post<cntSubCuentaVwRequest>(url.action , datos, httpOptions()) ;
  }
  getCntCuentasByName(id:string):Observable<cntSubCuentaRequest>{
    let datos = {"action": actions.actionSelect , 
      "_tabla" : vistas.vw_cnt_scuentas, 
      "_where" : [{columna : 'nombre_scuenta' , tipocomp : 'like' , dato : id }
                ,{columna : 'digito' , tipocomp : '>' , dato : 0 }]
     }; 

     return this.http.post<cntSubCuentaRequest>(url.action , datos, httpOptions()) ;
  }
  getCntOperaciones():Observable<cntOperacionesRequest>{
    let datos = {"action": actions.actionSelect , 
      "_tabla" : vistas.vw_cnt_operaciones 
     }; 
     return this.http.post<cntOperacionesRequest>(url.action , datos, httpOptions()) ;
  }
  getCntOperacionesManuales():Observable<cntOperacionesRequest>{
    let datos = {"action": actions.actionSelect , 
      "_tabla" : vistas.vw_cnt_oper_manuales 
     }; 
     return this.http.post<cntOperacionesRequest>(url.action , datos, httpOptions()) ;
  }
  getCntOperacionesAuto():Observable<cntOperacionesRequest>{
    let datos = {"action": actions.actionSelect , 
      "_tabla" : vistas.vw_cnt_oper_auto 
     }; 
     return this.http.post<cntOperacionesRequest>(url.action , datos, httpOptions()) ;
  } 
  getTipDocOperacionesAuto():Observable<cntTipDocOperacionesRequest>{
    let datos = {"action": actions.actionSelect ,  
      "_tabla": "vw_documento_operaciones",
      "_columnas": ["tipoDocumentoFinal" , "nombreTipoDocumentoFinal"]  ,
      "_groupby": ["tipoDocumentoFinal" , "nombreTipoDocumentoFinal"]  ,
      "_orderby": [["tipoDocumentoFinal" , "DESC"]] 
     }; 
     return this.http.post<cntTipDocOperacionesRequest>(url.action , datos, httpOptions()) ;
  }
 getDocumentosOperacionesAuto():Observable<cntDocOperacionesRequest>{
    let datos = {"action": actions.actionSelect , 
      "_tabla": "vw_documento_operaciones",
 
      "_columnas": ["idDocumento" , "idDocumentoFinal"]  ,
      "_groupby": ["idDocumento" , "idDocumentoFinal"]  ,
      "_orderby": [["idDocumento" , "DESC"]] 
     }; 
     return this.http.post<cntDocOperacionesRequest>(url.action , datos, httpOptions()) ;
  }
  getCntTransacciones( idOperacion:number):Observable<cntTransaccionesRequest>{
    let datos = {"action": actions.actionSelect , 
      "_tabla" : vistas.vw_transacciones ,
    "_where" : [{columna : 'cod_comprobante' , tipocomp : '=' , dato : idOperacion }]     }; 
    console.log("getCntTransacciones" , url.action , datos, httpOptions())
     return this.http.post<cntTransaccionesRequest>(url.action , datos, httpOptions()) ;
  }
}
