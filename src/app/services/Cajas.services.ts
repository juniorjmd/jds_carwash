import { Injectable } from '@angular/core'; 
import { caja } from '../interfaces/caja.interface';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { HttpClient } from '@angular/common/http';
import { PROCEDURE, TABLA } from '../models/app.db.tables';

import { loading } from 'src/app/models/app.loading'; 
import { cajaModel } from '../models/ventas/cajas.model';
import { establecimientoModel } from '../models/ventas/establecimientos.model';
import { TiposEstablecimientosModel } from '../models/ventas/tipos-establecimientos.model';
import { Establecimientos } from '../interfaces/establecimientos.interface';
import { Contador } from '../interfaces/contador';
import { MediosDePagoModel } from '../models/ventas/medios-de-pago.model';
import { DocpagosModel } from '../models/ventas/pagos.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { cajaRequest, DocumentoCierreRequest, establecimientosRequest } from '../interfaces/producto-request';


@Injectable({
    providedIn: 'root'
})
export class cajasServices { 
    urlVentas = url.action + "ventas/";

    private cajaSource = new BehaviorSubject<any>(null);
    currentCaja = this.cajaSource.asObservable();
    constructor(private http: HttpClient ,
        private loading : loading ){ 
        console.log('servicios cajas inicializado');  
    }

    asignarCaja(caja:cajaModel){
        this.cajaSource.next( caja) 
    }


    abrirCaja(caja : cajaModel,  valorIngresar : number){
        let datos = {"action": actions.actionAbrirCaja ,
                     "_parametro" : {"idCaja" : caja.id } , 
                     "_valorIngresar" : valorIngresar
                    };
        console.log('abrirCaja activo ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }

    
    resumenCaja(caja : cajaModel){
        let datos = {"action": actions.actionResumenCaja ,
                     "_parametro" : {"idCaja" : caja.id }  
                    };
        console.log('resumenCaja activo ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    cerrarCaja(caja : cajaModel){
        let datos = {"action": actions.actionCerarCaja ,
                     "_parametro" : {"idCaja" : caja.id } 
                    };
        console.log('cerrarCaja activo ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }

    getCuentasContablesEstablecimientoUsuario():Observable<cajaRequest>{
       
        let datos = {"action": actions.actionSelectPorUsuario ,
            "_tabla" : vistas.cajasActivas,
            "_columnaUsuario": 'usuarioEstadoCaja'  
           };
console.log('servicios de cajas activo ' ,url.action , datos, httpOptions());
return this.http.post<cajaRequest>(url.action , datos, httpOptions()) ;
    }
    cerrarCajaParcial(caja : cajaModel){
        let datos = {"action": actions.actionCerarCajaParcial ,
                     "_parametro" : {"idCaja" : caja.id } 
                    };
        console.log('cerrarCaja activo ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    
    getTiposDocumentosConContadores(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.tipos_documentos_con_cont,
                     "_where" : [{columna : 'estado' , tipocomp : '=' , dato : 1}]
                    };
        console.log('servicios cajas - getTiposDocumentosConContadores ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }

    getEstablecimientos():Observable<establecimientosRequest>{
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.establecimiento,
                     "_where" : [{columna : 'estado' , tipocomp : '=' , dato : 1}]
                    };
        console.log('servicios cajas - get establecimiento ' ,url.action , datos, httpOptions());
        return this.http.post<establecimientosRequest>(url.action , datos, httpOptions()) ;
    }
    getAllEstablecimientos():Observable<establecimientosRequest>{
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.establecimiento
                    };
        console.log('servicios cajas - get establecimiento ' ,url.action , datos, httpOptions());
        return this.http.post<establecimientosRequest>(url.action , datos, httpOptions()) ;
    }
    
    getAllTiposEstablecimientos(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.tipo_establecimiento 
                    };
        console.log('servicios cajas - get vw_tipo_establecimiento ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }

    getLocacionesExternas(){
        let datos = {"action": actions.actionBuscarLocacionesExternas  };
        console.log('servicios cajas - getLocacionesExternas ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    getLocacionesPrincipales(){
        let datos = {"action": actions.actionBuscarLocacionesExternas  ,
        "_principal" : true
                    };
        console.log('servicios cajas - getLocacionesPrincipales ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    getLocacionesVirtuales(){
        let datos = {"action": actions.actionBuscarLocacionesExternas  ,
        "_virtual" : true
                    };
        console.log('servicios cajas - getLocacionesVirtuales ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }


    getBodegasDisponibles(){ 
         let datos = {"action": actions.actionSelect ,
                        "_tabla" : vistas.prd_bodegas_inventario, 
                        "_columnas": ['obj'],
                        "_obj": ['obj'],
                        "_where" : [{columna : 'estado' , tipocomp : '=' , dato : 1}]
                       };
           console.log('servicios cajas - getTiposDocumentosConContadores ' ,url.action , datos, httpOptions());
           return this.http.post(url.action , datos, httpOptions()) ;

        console.log('servicios cajas - getLocacionesFisicas ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    getLocacionesFisicas(){
        let datos = {"action": actions.actionBuscarLocacionesExternas  ,
        "_fisicas" : true
                    };
        console.log('servicios cajas - getLocacionesFisicas ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    getLocacionesExistencias(id:number){
        let datos = {"action": actions.actionBuscarLocacionesExternas  ,
        "_principal" : false,"_fisicas" : false,"_existencia" : true,
             "_id_principal" : id
             };
        console.log('servicios cajas - getLocacionesExistencias ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    getLocacionesSecundarias(id:number){
        let datos = {"action": actions.actionBuscarLocacionesExternas  ,
        "_principal" : false,"_fisicas" : false,
             "_id_principal" : id
             };
        console.log('servicios cajas - getLocacionesSecundarias ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    getTiposEstablecimientos(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.tipo_establecimiento,
                     "_where" : [{columna : 'estado' , tipocomp : '=' , dato : 1}]
                    };
        console.log('servicios cajas - get vw_tipo_establecimiento ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    getCajas():Observable<cajaRequest>{
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.cajas
                    };
        console.log('servicios de cajas activo ' ,url.action , datos, httpOptions());
        return this.http.post<cajaRequest>(url.action , datos, httpOptions()) ;
    } 
    getMediosCajaActiva(){
        let datos = {"action": actions.actionSelectPorUsuario ,
                     "_tabla" : vistas.mediosPorCajaActiva,
                     "_columnaUsuario": 'usuarioCaja' , 
                     "_orderBy" : [['nombre', 'DESC']]
                    };
        console.log('servicios de cajas activo ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    } 
    getMedios(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.medios
                    };
        console.log('servicios de cajas activo ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    } 
    getContadores(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.contadores
                    };
        console.log('servicios de cajas activo ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    } 




    
    getCajasActivas(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.cajasActivas                    
                    };
        console.log('servicios de cajas - optener cajas activas ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    } 
    
 
    getCajasActivasYparametros(){
        let datos = {"action": actions.actionSelects  ,
                    // "_tabla" : vistas.cajasActivas       
                     "_tablas" : [vistas.cajasActivas , TABLA.PARAMETROS]             
                    };
        console.log('servicios de cajas - optener cajas activas ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    } 
    
    getCajasUsuario():Observable<cajaRequest>{
        let datos = {"action": actions.actionSelectPorUsuario ,
                     "_tabla" : vistas.cajas_por_usuario,
                     "_columnaUsuario": 'idUsuario',
                     "_where" : [{columna : 'estadoEsta' , tipocomp : '=' , dato : 1}]
                    };
        console.log('servicios de cajas activo ' ,url.action , datos, httpOptions());
        return this.http.post<cajaRequest>(url.action , datos, httpOptions()) ;
    } 
    
    getCajasPorUsuario(usuario:number){
        let datos = {"action": actions.actionSelCajaXuser ,
                     "_usuario" :usuario
                    };
        console.log('servicios de cajas activo - getCajasPorUsuario' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    } 

    setPagoDocumento(idDocumento:number , pagos:DocpagosModel[] ){
        let datos = {"action": actions.actionAsignarDocumentosPagos ,
        "_ordenDocumento" : idDocumento, 
         "_pagos" : pagos
       };
       console.log('setPagoDocumento',this.urlVentas , datos, httpOptions())
        return this.http.post(this.urlVentas  , datos, httpOptions()) ;
    }
    setPagoDocumentoCredito(idDocumento:number , pagos:DocpagosModel[] ):Observable<DocumentoCierreRequest>{
        let datos = {"action": actions.actionAsignarNewCredito ,
        "_ordenDocumento" : idDocumento, 
         "_pagos" : pagos
       };
       console.log('setPagoDocumento',this.urlVentas , datos, httpOptions())
        return this.http.post<DocumentoCierreRequest>(this.urlVentas  , datos, httpOptions()) ;
    }
    setCajasAUsuarios(idUsuario:number , cajas:number[] ){
        let datos = {"action": actions.actionAsignarCajas ,
        "_idUsuario" : idUsuario, 
         "_cajas" : cajas
       };
       console.log('setCajasAUsuarios',url.action , datos, httpOptions())
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    setCaja(caja:cajaModel){
        let datos ;
        let  arraydatos ;
        if (caja.id != undefined &&  caja.id  > 0 ){
            let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : caja.id }]
            arraydatos =  {  "nombre" : caja.nombre  ,
            "descripcion" : caja.descripcion,
            "estadoGeneral" : caja.estadoGeneral,
            "estadoCaja" : caja.estadoCaja ,
            "fechaEstadoGeneral" : caja.fechaEstadoGeneral,
            "fechaEstadoCaja" : caja.fechaEstadoCaja ,
            "usuarioEstadoCaja" : caja.usuarioEstadoCaja,
            "usuarioEstadoGeneral" : caja.usuarioEstadoGeneral,
            "cuentaContableGastos" : caja.cuentaContableGastos,
            "cuentaContableEfectivo" : caja.cuentaContableEfectivo,
            "establecimiento" : caja.establecimiento};
            
            datos = {"action": actions.actionUpdate ,
            "_tabla" : TABLA.caja, "_where" : where ,
            "_arraydatos" : arraydatos
           };
        }
        else{
            arraydatos =  { "id" : caja.id  ,
            "nombre" : caja.nombre  ,
            "descripcion" : caja.descripcion,
            "estadoGeneral" : caja.estadoGeneral,
            "estadoCaja" : caja.estadoCaja ,
            "fechaEstadoGeneral" : caja.fechaEstadoGeneral,
            "fechaEstadoCaja" : caja.fechaEstadoCaja ,
            "usuarioEstadoCaja" : caja.usuarioEstadoCaja,
            "cuentaContableGastos" : caja.cuentaContableGastos,
            "cuentaContableEfectivo" : caja.cuentaContableEfectivo,
            "usuarioEstadoGeneral" : caja.usuarioEstadoGeneral}
            datos = {"action": actions.actionInsert ,
            "_tabla" : TABLA.caja,
            "_arraydatos" : arraydatos
           };
        } 
        
       console.log(datos);
       
        return this.http.post(url.action , datos, httpOptions()) ;
        

        
    }
    setConsecutivo(contador:Contador){
        let datos ;
        let  arraydatos ;
        if (typeof(contador.desde ) === 'undefined' ) 
        contador.desde = 0;

        if (typeof(contador.hasta ) === 'undefined' ) 
        contador.hasta = 0;
 
            arraydatos =  {  
            "codContador" : contador.codContador  ,
            "establecimiento" : contador.establecimiento,
            "tipoContador" : contador.tipoContador ,
            "desde" : contador.desde ,
            "hasta" : contador.hasta ,
            "USUARIO_LOGUEADO" : '0',
        }
            datos = {"action": actions.actionProcedure ,
            "_procedure" : PROCEDURE.insertaContador,
            "_arraydatos" : arraydatos
           };
          
        
       console.log(JSON.stringify( datos ));
       
        return this.http.post(url.action , datos, httpOptions()) ;
        

        
    }

    
    setTipoEstablecimiento(newEsta:TiposEstablecimientosModel){
        let datos ;
        let  arraydatos ;
        if (newEsta.estado === 0) newEsta.estado = 1;
        //id, nombre, descripcion, tipo, fecha_creacion, usuario_creacion, estado
        if (newEsta.id > 0 ){
            let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : newEsta.id }]
            arraydatos =  {  "nombre" : newEsta.nombre  ,
            "descripcion" : newEsta.descripcion,
            "estado" : newEsta.estado ,
            "usuario_creador" : 'USUARIO_LOGUEADO' };
            
            datos = {"action": actions.actionUpdate ,
            "_tabla" : TABLA.tipoEstablecimiento, "_where" : where ,
            "_arraydatos" : arraydatos
           };
        }
        else{
            arraydatos =  { "id" : newEsta.id  , 
			"nombre" : newEsta.nombre  ,
            "descripcion" : newEsta.descripcion,
            "estado" : newEsta.estado ,
            "usuario_creador" : 'USUARIO_LOGUEADO' }
            datos = {"action": actions.actionInsert ,
            "_tabla" : TABLA.tipoEstablecimiento,
            "_arraydatos" : arraydatos
           };
        } 
        
       console.log(datos);
       
        return this.http.post(url.action , datos, httpOptions()) ;
        

        
    }
    setEstablecimiento(newEsta:establecimientoModel){
        let datos ;
        let  arraydatos ;
        //id, nombre, descripcion, tipo, fecha_creacion, usuario_creacion, estado
        if (newEsta.id > 0 ){
            let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : newEsta.id }]
            arraydatos =  {  "nombre" : newEsta.nombre  ,
            "descripcion" : newEsta.descripcion,
            "tipo" : newEsta.tipo,
            "estado" : newEsta.estado ,
            "idAuxiliar" : newEsta.idAuxiliar ,
            "idBodegaStock" : newEsta.idBodegaStock ,
            "idBodegaVitual" : newEsta.idBodegaVitual ,
            "nombreAuxiliar" : newEsta.nombreAuxiliar ,
            "NameBodegaStock" : newEsta.NameBodegaStock ,
            "NameBodegaVirtual" : newEsta.NameBodegaVirtual ,
            "idCCntCompras" : newEsta.idCCntCompras ,
            "idCCntCCobrar" : newEsta.idCCntCCobrar ,
            "idCCntCPagar" : newEsta.idCCntCPagar , 
            "idCCntIvaCompra" :newEsta.idCCntIvaCompra,
            "idCCnttIvaVenta" :newEsta.idCCnttIvaVenta,
            "idCCntCostoVenta" :newEsta.idCCntCostoVenta,
            'idCCntVenta':newEsta.idCCntVenta,
            "usuario_creacion" : 'USUARIO_LOGUEADO' };
        
            
            datos = {"action": actions.actionUpdate ,
            "_tabla" : TABLA.establecimiento, "_where" : where ,
            "_arraydatos" : arraydatos
           };
        }
        else{
            arraydatos =  {  
			"nombre" : newEsta.nombre  ,
            "descripcion" : newEsta.descripcion,
            "idAuxiliar" : newEsta.idBodegaStock ,
            "idBodegaStock" : newEsta.idBodegaStock ,
            "idBodegaVitual" :newEsta.idBodegaStock ,
            "idCCntCompras" : newEsta.idCCntCompras ,
            "idCCntCCobrar" : newEsta.idCCntCCobrar ,
            "idCCntCPagar" : newEsta.idCCntCPagar ,  
            "idCCntIvaCompra" :newEsta.idCCntIvaCompra,
            "idCCnttIvaVenta" :newEsta.idCCnttIvaVenta,
            "idCCntCostoVenta" :newEsta.idCCntCostoVenta,
            'idCCntVenta':newEsta.idCCntVenta,
            "tipo" : newEsta.tipo,
            "estado" : newEsta.estado ,
            "usuario_creacion" : 'USUARIO_LOGUEADO' }
            datos = {"action": actions.actionInsert ,
            "_tabla" : TABLA.establecimiento,
            "_arraydatos" : arraydatos
           };
        } 
        
       console.log(datos);
       
        return this.http.post(url.action , datos, httpOptions()) ;
        

        
    }

/////////////////////////////////////////////////
setMedioDePago(newMedio:MediosDePagoModel){
    let datos ;
    let  arraydatos ;
    let  action ;
    let where = null;
    //id, nombre, descripcion, tipo, fecha_creacion, usuario_creacion, estado
    if (newMedio.id > 0 ){
          where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : newMedio.id }] ;
        action = actions.actionUpdate ;
    }
    else{ 
        action =  actions.actionInsert;
    } 
    arraydatos =  {  "nombre" : newMedio.nombre  ,
    "descripcion" : newMedio.descripcion, 
    "estado" : newMedio.estado , 
    "cuentaContable" : newMedio.cuentaContable ,
    "establecimiento" : newMedio.establecimiento  ,
    "usuario_creacion" : 'USUARIO_LOGUEADO' };
    datos = {"action":action ,
    "_tabla" : TABLA.medios, "_where" : where,
    "_arraydatos" : arraydatos
   };
   console.log(datos);
   
    return this.http.post(url.action , datos, httpOptions()) ;
    

    
}
////////////////////////////////////////////////////////////

 PadLeft(value:any, length:number):string {
    return (value.toString().length < length) ? this.PadLeft("0" + value, length) : 
    value;
}
  
 
      
}
 
