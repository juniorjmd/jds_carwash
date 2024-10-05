import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { loading } from 'src/app/models/app.loading';
import { cajaModel } from '../models/ventas/cajas.model';
import { ValuesFormuGasto } from '../interfaces/valuesFormularios';
import { CarteraRequest, CreditosResumenRequest, DocumentoCierreRequest, DocumentoRequest } from '../interfaces/producto-request'; 
import { documentoDev, DocumentosModel } from '../models/ventas/documento.model';
import { TABLA } from '../models/app.db.tables';
import { EmpleadoModel } from '../models/empleados/empleados.module';
import { DocumentoListado } from '../interfaces/documento.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
 
constructor(private http: HttpClient, private loading: loading) {
    console.log('servicio documentos');
  }

  


  getDocumentoActivo(): Observable<DocumentoRequest> {
    let datos = {
      "action": actions.actionSelectPorUsuario,
      "_tabla": vistas.documento,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_columnaUsuario": 'usuario',
      "_where": [{"columna": 'estado', "tipocomp": '=', "dato": 1}]
    };
    console.log('servicios de usuarios activo - getDocumentoActivo', url.action, datos, httpOptions());
    return this.http.post<DocumentoRequest>(url.action, datos, httpOptions());
  }

   getCompras(): Observable<any> {
    let datos = {
      "action": actions.actionSelect,
      "_tabla": vistas.documentosCompra, 
      "_obj": ['objeto'],
      "_columnas": ['objeto'] 
    };
    console.log('servicios de usuarios activo - getDocumentoActivo', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }
  getPagosCPP(): Observable<any> {
    let datos = {
      "action": actions.actionSelect,
      "_tabla": vistas.documentosPagosCPP, 
      "_obj": ['objeto'],
      "_columnas": ['objeto'] 
    };
    console.log('servicios de usuarios activo - getDocumentoActivo', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  getPlazoCreditoPorDocumentoBase(orden:number): Observable<any> {
    
    
    let _where = [{"columna": 'idFacturaVenta', "tipocomp": '=', "dato": orden}];
    let datos = {
      "action": actions.actionSelect,
      "_tabla": TABLA.mst_mov_credito, _where , 
      "_columnas": ['cuotas','plazos'] 
    };
    console.log('getPlazoCreditoPorDocumentoBase', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }
  getCxPProveedores(): Observable<any> {
    let datos = {
      "action": actions.actionSelect,
      "_tabla": vistas.documentosCuentasPorPagar, 
      "_obj": ['objeto'],
      "_columnas": ['objeto'] 
    };
    console.log('servicios de usuarios activo - getDocumentoActivo', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }
  getDevoluciones(): Observable<any> {
    let datos = {
      "action": actions.actionSelect,
      "_tabla": vistas.documentoDev, 
      "_obj": ['objeto'],
      "_columnas": ['objeto'] 
    };
    console.log('servicios de usuarios activo - getDocumentoActivo', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  
  getDevolucionesSinUso(): Observable<any> {
    
    let _where = [{"columna": 'uso_del_bono', "tipocomp": '=', "dato": 'SinUso'}];
    let datos = {
      "action": actions.actionSelect,
      "_tabla": vistas.documentoDev, 
      "_obj": ['objeto'],
      "_columnas": ['objeto'] , _where
    };
    console.log('servicios de usuarios activo - getDocumentoActivo', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  getCuentasXCobrarByPersona( idPersona :number): Observable<CarteraRequest> {
    let where = [{"columna": 'idTercero', "tipocomp": '=', "dato": idPersona}];
    let datos = {
      "action": actions.actionSelect,
      "_tabla": vistas.cartera, 
      "_where": where
    };
    console.log('servicios de usuarios activo - getDocumentos', url.action, datos, httpOptions());
    return this.http.post<CarteraRequest>(url.action, datos, httpOptions());
  }

  getCuentasXCobrarByfecha(_fechaInicio:string, _fechaFin:string): Observable<CreditosResumenRequest> { 
    let datos = {
      "action": actions.resumenCuentaporCobra, 
      _fechaInicio , _fechaFin
    };
    console.log('servicios de getCuentasXCobrarByfecha', url.actionDocumentos, datos, httpOptions());
    return this.http.post<CreditosResumenRequest>(url.actionDocumentos, datos, httpOptions());
  }
getCuentasXPagarByfecha(_fechaInicio:string, _fechaFin:string): Observable<CreditosResumenRequest> { 
    let datos = {
      "action": actions.resumenCuentaporPagar, 
      _fechaInicio , _fechaFin
    };
    console.log('servicios de getCuentasXCobrarByfecha', url.actionDocumentos, datos, httpOptions());
    return this.http.post<CreditosResumenRequest>(url.actionDocumentos, datos, httpOptions());
  } 
  
  getCuentasXCobrarClienteByfecha(_proveedor:number , _fechaInicio:string, _fechaFin:string): Observable<CreditosResumenRequest> { 
    let datos = {
      "action": actions.resumenCuentaporPagarProveedor, 
      _fechaInicio , _fechaFin , _proveedor
    };
    console.log('servicios de getCuentasXCobrarByfecha', url.actionDocumentos, datos, httpOptions());
    return this.http.post<CreditosResumenRequest>(url.actionDocumentos, datos, httpOptions());
  }
  getCuentasXPagarProveedorByfecha(_cliente:number , _fechaInicio:string, _fechaFin:string): Observable<CreditosResumenRequest> { 
    let datos = {
      "action": actions.resumenCuentaporCobrarCliente, 
      _fechaInicio , _fechaFin , _cliente
    };
    console.log('servicios de getCuentasXCobrarByfecha', url.actionDocumentos, datos, httpOptions());
    return this.http.post<CreditosResumenRequest>(url.actionDocumentos, datos, httpOptions());
  }
  getCuentasXCobrarByPersonaAbonos( idPersona :number): Observable<CarteraRequest> {
    let where = [{"columna": 'idTercero', "tipocomp": '=', "dato": idPersona},
      {"columna": 'totalActual', "tipocomp": '>', "dato": 0}];
    let datos = {
      "action": actions.actionSelect,
      "_tabla": vistas.cartera, 
      "_where": where
    };
    console.log('servicios de usuarios activo - getDocumentos', url.action, datos, httpOptions());
    return this.http.post<CarteraRequest>(url.action, datos, httpOptions());
  }
  getCuentasXPagarByPersonaAbonos( idPersona :number , idEstablecimiento:any): Observable<CarteraRequest> {
    let where = [{"columna": 'idTercero', "tipocomp": '=', "dato": idPersona},
      {"columna": 'establecimiento', "tipocomp": '=', "dato": idEstablecimiento},
      {"columna": 'totalActual', "tipocomp": '>', "dato": 0}];
    let datos = {
      "action": actions.actionSelect,
      "_tabla": vistas.credito, 
      "_where": where
    };
    console.log('servicios de usuarios activo - getDocumentos', url.action, datos, httpOptions());
    return this.http.post<CarteraRequest>(url.action, datos, httpOptions());
  }

  getCuentasXCobrar(): Observable<CarteraRequest> { 
    let datos = {
      "action": actions.actionSelect,
      "_tabla": vistas.cartera  ,
      "_limit" : 300
    };
    console.log('servicios de usuarios activo - getDocumentos', url.action, datos, httpOptions());
    return this.http.post<CarteraRequest>(url.action, datos, httpOptions());
  }


  getDocumentos(): Observable<any> {
    let where = [{"columna": 'tipoDocumentoFinal', "tipocomp": '=', "dato": 1}];
    let datos = {
      "action": actions.actionSelect,
      "_tabla": vistas.documento,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_columnaUsuario": 'usuario',
      "_where": where
    };
    console.log('servicios de usuarios activo - getDocumentos', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  
  getDocumentosByOrden(orden:number): Observable<any> {
    let where = [{"columna": 'orden', "tipocomp": '=', "dato": orden}];
    let datos = {
      "action": actions.actionSelect,
      "_tabla": vistas.documento,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_columnaUsuario": 'usuario',
      "_where": where
    };
    console.log('servicios de usuarios activo - getDocumentosByOrden', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  getDocumentosByNumFactura( codFactura : string): Observable<any> {
    let where = [{"columna": 'idDocumentoFinal', "tipocomp": '=', "dato": codFactura}];
    let datos = {
      "action": actions.actionSelect,
      "_tabla": vistas.documento,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_columnaUsuario": 'usuario',
      "_where": where
    };
    console.log('servicios de usuarios activo - getDocumentos', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  } 
  getVentasByNumFactura( codFactura : string): Observable<any> {
    let where = [{"columna": 'idDocumentoFinal', "tipocomp": '=', "dato": codFactura}];
    let datos = {
      "action": actions.actionSelect,
      "_tabla": vistas.ventasCerradas,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_columnaUsuario": 'usuario',
      "_where": where
    };
    console.log('servicios de usuarios activo - getDocumentos', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  } 
   getDocComprasByNumFactura( codFactura : string): Observable<any> {
    let where = [{"columna": 'idDocumentoFinal', "tipocomp": '=', "dato": codFactura}];
    let datos = {
      "action": actions.actionSelect,
      "_tabla": vistas.documentosCompra,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_columnaUsuario": 'usuario',
      "_where": where
    };
    console.log('servicios de usuarios activo - getDocumentos', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }
  getDocumentosUsuario(): Observable<any> {
    let where = [{"columna": 'tipoDocumentoFinal', "tipocomp": '=', "dato": 1}];
    let datos = {
      "action": actions.actionSelectPorUsuario,
      "_tabla": vistas.documento,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_columnaUsuario": 'usuario',
      "_where": where
    };
    console.log('servicios de usuarios activo - getDocumentos', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  getCajasActivas(establecimiento: number): Observable<any> {
    let where = [{"columna": 'establecimiento', "tipocomp": '=', "dato": establecimiento}];
    let datos = {
      "action": actions.actionSelect,
      "_tabla": vistas.cajasActivas,
      "_where": where
    };
    console.log('servicios de documentos - getCajasActivas', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }
 

  getDocumentosCaja():Observable<any>{
    let datos = { 
            "action": actions.action_get_documentos_caja  
          }
          console.log('servicios de documentos - getDocumentosCaja', url.actionDocumentos, datos, httpOptions());
 
      return this.http.post<any>(url.actionDocumentos, datos, httpOptions());
  }

  getDocumentosCompraBlanco():Observable<any>{
    let _where = [{"columna": 'tipoDocumentoFinal', "tipocomp": '=f', "dato": "getIdTipoDocumentoPorNombre('compra_activa') "}];
    let datos = {
      "action": actions.actionSelect,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_tabla": vistas.documentos_por_tip_documento , _where
    };
    console.log('servicios de documentos - getCajasActivas', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  getDocumentosCompra( idCliente?:any):Observable<any>{
    let _tabla = vistas.documentos_por_tip_documento;
    let _where = [{"columna": 'tipoDocumentoFinal', "tipocomp": '=f', "dato": "getIdTipoDocumentoPorNombre('comprobante_compras') " }];
    if(idCliente !=undefined){
      _where.push({"columna": 'cliente', "tipocomp": '=', "dato": idCliente})
      _tabla = vistas.vw_obj_documentos_por_cliente
    }
    //vw_obj_documentos_por_usuario
    let datos = {
      "action": actions.actionSelect,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],_tabla ,  _where
    };
    console.log('servicios de documentos - getCajasActivas', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  getDocumentosCompraById( idDocumentoFinal?:any):Observable<any>{
    let _tabla = vistas.documento;
    let _where = [{"columna": 'tipoDocumentoFinal', "tipocomp": '=f', "dato": "getIdTipoDocumentoPorNombre('comprobante_compras') " } ,
                 {"columna": 'idDocumentoFinal', "tipocomp": '=', "dato": idDocumentoFinal}]
    let datos = {
      "action": actions.actionSelect,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],_tabla ,  _where
    };
    console.log('servicios de documentos - getCajasActivas', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  getVentasFinalizadas(codVenta: string = ''): Observable<any> {
    let where = [{"columna": 'idDocumentoFinal', "tipocomp": 'like', "dato": codVenta}];
    if (codVenta.trim() === '') {
      where = [];
    }
    let datos = {
      "action": actions.actionSelect,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_tabla": vistas.ventasCerradas,
      "_where": where
    };
    console.log('servicios de documentos - getVentasFinalizadas', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  getVentasFinalizadasPorCliente(codVenta: string): Observable<any> {
    let where = [
      {"columna": 'identificacionCliente', "tipocomp": 'like', "dato": codVenta, "relacion": 'OR'},
      {"columna": 'clienteNombre', "tipocomp": 'like', "dato": codVenta, "relacion": 'OR'}
    ];
    let datos = {
      "action": actions.actionSelect,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_tabla": vistas.ventasCerradas,
      "_where": where
    };
    console.log('servicios de documentos - getVentasFinalizadasPorCliente', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }
  getVentasFinalizadasPorClienteFecha(codVenta: string, fecha1: string, fecha2: string): Observable<any> {
    let where = [
      {"columna": 'fecha', "tipocomp": '>=', "dato": fecha1},
      {"columna": 'fecha', "tipocomp": '<=', "dato": fecha2},
      {"columna": 'identificacionCliente', "tipocomp": 'like', "dato": codVenta, "relacion": 'OR'},
      {"columna": 'clienteNombre', "tipocomp": 'like', "dato": codVenta, },
    ];
    let datos = {
      "action": actions.actionSelect,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_tabla": vistas.ventasCerradas,
      "_where": where
    };
    console.log('servicios de documentos - getVentasFinalizadasPorCliente', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }
  getVentasFinalizadasPorFecha(fecha1: string, fecha2: string): Observable<any> {
    let where = [
      {"columna": 'fecha', "tipocomp": '>=', "dato": fecha1},
      {"columna": 'fecha', "tipocomp": '<=', "dato": fecha2}
    ];
    let datos = {
      "action": actions.actionSelect,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_tabla": vistas.ventasCerradas,
      "_where": where
    };
    console.log('servicios de documentos - getVentasFinalizadasPorFecha', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  
  getDevolucionesPorFecha(fecha1: string, fecha2: string): Observable<any> {
    let where = [
      {"columna": 'fecha', "tipocomp": '>=', "dato": fecha1},
      {"columna": 'fecha', "tipocomp": '<=', "dato": fecha2}
    ];
    let datos = {
      "action": actions.actionSelect,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_tabla":vistas.documentoDev, 
      "_where": where
    };
    console.log('servicios de documentos - getDevolucionesPorFecha', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  getVentasFinalizadasPorFechaHora(fecha1: string, fecha2: string , 
    horaIni: string, horaFin: string  ): Observable<any> {
    let where = [
      {"columna": 'fecha', "tipocomp": '>=', "dato": fecha1},
      {"columna": 'fecha', "tipocomp": '<=', "dato": fecha2},
      {"columna": 'hora', "tipocomp": '>=', "dato": horaIni},
      {"columna": 'hora', "tipocomp": '<=', "dato": horaFin}
    ];
    let datos = {
      "action": actions.actionSelect,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_tabla": vistas.ventasCerradas,
      "_where": where
    };
    console.log('servicios de documentos - getVentasFinalizadasPorFecha', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  getVentasFinalizadasPorProductoFecha(idProducto:string , fecha1: string, fecha2: string): Observable<any> {
    /* $_dato = "( Select {$valor['dato']['columna']} from {$valor['dato']['tabla']} WHERE "
                 . " {$valor['dato']['colValidacion']} =  {$valor['dato']['datoValidacion']} )"; */
    let where = [
      {"columna": 'fecha', "tipocomp": '>=', "dato": fecha1},
      {"columna": 'fecha', "tipocomp": '<=', "dato": fecha2},
      {"columna": 'orden', "tipocomp": 'inS', "dato": {
        columna: 'orden',
        tabla: 'vw_documentos_listado_productos_ventas',
        colValidacion: 'idProducto',
        datoValidacion : `'${idProducto}'`
      } }
    ];
    let datos = {
      "action": actions.actionSelect,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_tabla": vistas.ventasCerradas,
      "_where": where
    };
    console.log('servicios de documentos - getVentasFinalizadasPorProductoFecha', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  getVentasFinalizadasPorCarteraFecha( fecha1: string, fecha2: string): Observable<any> {
    /* $_dato = "( Select {$valor['dato']['columna']} from {$valor['dato']['tabla']} WHERE "
                 . " {$valor['dato']['colValidacion']} =  {$valor['dato']['datoValidacion']} )"; */
    let where = [
      {"columna": 'date(fecha_creacion)', "tipocomp": '>=', "dato": fecha1},
      {"columna": 'date(fecha_creacion)', "tipocomp": '<=', "dato": fecha2} ]
    ;
    let datos = {
      "action": actions.actionSelect,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_tabla": vistas.ventasACreditoCerradas,
      "_where": where
    };
    console.log('servicios de documentos - getVentasFinalizadasPorProductoFecha', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  
  getVentasFinalizadasPorCarteraFechaPorCliente( id:number ,   fecha1: string, fecha2: string): Observable<any> {
    /* $_dato = "( Select {$valor['dato']['columna']} from {$valor['dato']['tabla']} WHERE "
                 . " {$valor['dato']['colValidacion']} =  {$valor['dato']['datoValidacion']} )"; */
    let where = [
      {"columna": 'date(fecha_creacion)', "tipocomp": '>=', "dato": fecha1},
      {"columna": 'date(fecha_creacion)', "tipocomp": '<=', "dato": fecha2} , 
      {"columna": 'cliente', "tipocomp": '=', "dato": id} ]
    ;
    let datos = {
      "action": actions.actionSelect,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_tabla": vistas.ventasACreditoCerradas,
      "_where": where
    };
    console.log('servicios de documentos - getVentasFinalizadasPorProductoFecha', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  getComprasFinalizadasPorCreditoFechaPorProveedor( id:number ,  fecha1: string, fecha2: string): Observable<any> {
    /* $_dato = "( Select {$valor['dato']['columna']} from {$valor['dato']['tabla']} WHERE "
                 . " {$valor['dato']['colValidacion']} =  {$valor['dato']['datoValidacion']} )"; */
    let where = [
      {"columna": 'date(fecha_creacion)', "tipocomp": '>=', "dato": fecha1},
      {"columna": 'date(fecha_creacion)', "tipocomp": '<=', "dato": fecha2} ,
      {"columna": 'cliente', "tipocomp": '=', "dato": id} ]
    ;
    let datos = {
      "action": actions.actionSelect,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_tabla": vistas.comprasACreditoCerradas,
      "_where": where
    };
    console.log('servicios de documentos - getComprasFinalizadasPorCreditoFecha', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }
  
  getComprasFinalizadasPorCreditoFecha( fecha1: string, fecha2: string): Observable<any> {
    /* $_dato = "( Select {$valor['dato']['columna']} from {$valor['dato']['tabla']} WHERE "
                 . " {$valor['dato']['colValidacion']} =  {$valor['dato']['datoValidacion']} )"; */
    let where = [
      {"columna": 'date(fecha_creacion)', "tipocomp": '>=', "dato": fecha1},
      {"columna": 'date(fecha_creacion)', "tipocomp": '<=', "dato": fecha2} ]
    ;
    let datos = {
      "action": actions.actionSelect,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_tabla": vistas.comprasACreditoCerradas,
      "_where": where
    };
    console.log('servicios de documentos - getComprasFinalizadasPorCreditoFecha', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }
  getResumenCategoriaVentas(_idPrd:any , _fechaInicio: string, _fechaFin: string): Observable<any> { 
    let datos = {
      "action": actions.resumenVentaCategoria, _idPrd,_fechaInicio,_fechaFin
    };
    console.log('servicios de documentos - getResumenCategoriaVentas', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }

  getResumenUsuarioVentas(_idPrd:any , _fechaInicio: string, _fechaFin: string): Observable<any> { 
    let datos = {
      "action": actions.resumenVentaUsuarioCajero, _idPrd,_fechaInicio,_fechaFin
    };
    console.log('servicios de documentos - getResumenUsuarioVentas', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }
  getResumenVendedorVentas(_idPrd:any , _fechaInicio: string, _fechaFin: string): Observable<any> { 
    let datos = {
      "action": actions.resumenVentaVendedor, _idPrd,_fechaInicio,_fechaFin
    };
    console.log('servicios de documentos - getResumenVendedorVentas', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }

  getResumenVendedorCliente(_idPrd:any , _fechaInicio: string, _fechaFin: string): Observable<any> { 
    let datos = {
      "action": actions.resumenVentaCliente, _idPrd,_fechaInicio,_fechaFin
    };
    console.log('servicios de documentos - getResumenVendedorVentas', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }
  getResumenVentas(  _fechaInicio: string, _fechaFin: string): Observable<any> { 
    let datos = {
      "action": actions.resumenVentas, _fechaInicio,_fechaFin
    };
    console.log('servicios de documentos - getResumenVentas', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }

  
  getResumenDevoluciones(  _fechaInicio: string, _fechaFin: string): Observable<any> { 
    let datos = {
      "action": actions.resumenDevolucion, _fechaInicio,_fechaFin
    };
    console.log('servicios de documentos - getResumenVentas', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }
  getResumenVentasPorHora(  _fechaInicio: string, _fechaFin: string , _horaInicio: string, _horaFin: string  ): Observable<any> { 
    let datos = {
      "action": actions.resumenVentas, _fechaInicio,_fechaFin, _horaInicio, _horaFin
    };
    console.log('servicios de documentos - getResumenVentasPorHora', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }
  getResumenProductosVentas(_idPrd:string , _fechaInicio: string, _fechaFin: string): Observable<any> {
    /* $_dato = "( Select {$valor['dato']['columna']} from {$valor['dato']['tabla']} WHERE "
                 . " {$valor['dato']['colValidacion']} =  {$valor['dato']['datoValidacion']} )"; */
    
    let datos = {
      "action": actions.resumenVentaProducto, _idPrd,_fechaInicio,_fechaFin
    };
    console.log('servicios de documentos - getResumenProductosVentas', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }

  getVentasFinalizadasPorCategoriasFecha(categoriaId:any , fecha1: string, fecha2: string): Observable<any> {
    /* $_dato = "( Select {$valor['dato']['columna']} from {$valor['dato']['tabla']} WHERE "
                 . " {$valor['dato']['colValidacion']} =  {$valor['dato']['datoValidacion']} )"; */
    let where = [
      {"columna": 'fecha', "tipocomp": '>=', "dato": fecha1},
      {"columna": 'fecha', "tipocomp": '<=', "dato": fecha2},
      {"columna": 'orden', "tipocomp": 'inS', "dato": {
        columna: 'orden',
        tabla: 'vw_documentos_listado_productos_ventas',
        colValidacion: 'idCategoria',
        datoValidacion :  categoriaId 
      } }
    ];
    let datos = {
      "action": actions.actionSelect,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_tabla": vistas.ventasCerradas,
      "_where": where
    };
    console.log('servicios de documentos - getVentasFinalizadasPorFecha', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }


  getVentasFinalizadasPorVendedorFecha(id:any , fecha1: string, fecha2: string): Observable<any> {
    /* $_dato = "( Select {$valor['dato']['columna']} from {$valor['dato']['tabla']} WHERE "
                 . " {$valor['dato']['colValidacion']} =  {$valor['dato']['datoValidacion']} )"; */
    let where = [
      {"columna": 'fecha', "tipocomp": '>=', "dato": fecha1},
      {"columna": 'fecha', "tipocomp": '<=', "dato": fecha2},
      {"columna": 'cod_vendedor', "tipocomp": '=', "dato": id  }
    ];
    let datos = {
      "action": actions.actionSelect,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_tabla": vistas.ventasCerradas,
      "_where": where
    };
    console.log('servicios de documentos - getVentasFinalizadasPorFecha', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  getVentasFinalizadasPorUsuarioFecha(id:any , fecha1: string, fecha2: string): Observable<any> {
    /* $_dato = "( Select {$valor['dato']['columna']} from {$valor['dato']['tabla']} WHERE "
                 . " {$valor['dato']['colValidacion']} =  {$valor['dato']['datoValidacion']} )"; */
    let where = [
      {"columna": 'fecha', "tipocomp": '>=', "dato": fecha1},
      {"columna": 'fecha', "tipocomp": '<=', "dato": fecha2},
      {"columna": 'usuario', "tipocomp": '=', "dato": id } 
    ];
    let datos = {
      "action": actions.actionSelect,
      "_columnas": ['objeto'],
      "_obj": ['objeto'],
      "_tabla": vistas.ventasCerradas,
      "_where": where
    };
    console.log('servicios de documentos - getVentasFinalizadasPorFecha', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }
  cambiarDocumento(documento: number): Observable<any> {
    let datos = {"action": actions.actionChangeDocumentos, "_docActual": documento};
    console.log('cambiarDocumento activo', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }

  cambiarDocumentoCompra(documento: number): Observable<any> {
    let datos = {"action": actions.actionChangeCompraDocumentos, "_docActual": documento};
    console.log('cambiarDocumento activo', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }

  
  editarLineaDocumento(item:DocumentoListado): Observable<any> {
   
    let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : item.id }]
    
     let arraydatos:any =  {  
      "tipoDescuento" :item.tipoDescuento , 
      "descuento"  :item.descuento ,  
      "descuentoAplicado"  :item.descuentoAplicado , 
      "nombreActividadDescuento"  :item.nombreActividadDescuento , 
      "IVA"  :item.IVA , 
      "valorTotal"  :item.valorTotal , 
      "presioVenta"  :item.presioVenta , 
      "presioSinIVa"  :item.presioSinIVa , 
      "nombreProducto"  :item.nombreProducto , 
      "cant_real_descontada"  :item.cant_real_descontada , 
      "cantidadVendida"  :item.cant_real_descontada , 
      val_aux_1 : item.val_aux_1,
      val_aux_2 : item.val_aux_2 
    }
    let    datos = {"action": actions.actionUpdate ,
      "_tabla" : TABLA.documentosListado, 
      "_where" : where ,
      "_arraydatos" : arraydatos
     };
     if((item.id||0) == 0 ){
      item.cant_devuelta = undefined;
      item.idDocumento = item.orden;
      item.usuario = 'USUARIO_LOGUEADO';
      datos.action = actions.actionInsert ;
      datos._where = [] ; 
      datos._arraydatos = item ;

    }
    console.log('editarLineaDocumento activo', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }
  cambiarVendedorDocumento(documento: number , vendedor : EmpleadoModel): Observable<any> {
    let where =   [{"columna" : "orden" , "tipocomp" : "=" , "dato" : documento }]
    let arraydatos =  {  "cod_vendedor" : vendedor.id ,

      "vendedor" :  vendedor.id 
    }
    let    datos = {"action": actions.actionUpdate ,
      "_tabla" : TABLA.documentos, "_where" : where ,
      "_arraydatos" : arraydatos
     };
    console.log('cambiarDocumento activo', url.action, datos, httpOptions());
    return this.http.post(url.action, datos, httpOptions());
  }

  cancelarDocumento(documento: number): Observable<any> {
    let datos = {"action": actions.actionCancelarDocumentos, "_documento": documento};
    console.log('cancelarDocumento activo', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }

  convertirDocumentoEnCotizacion(documento: number): Observable<DocumentoCierreRequest> {
    let datos = {"action": actions.actionCambiarDocumentosACotizacion, "_documento": documento};
    console.log('generar cotizacion activo', url.actionDocumentos, datos, httpOptions());
    return this.http.post<DocumentoCierreRequest>(url.actionDocumentos, datos, httpOptions());
  }
  generarDomicilioDocumento(documento: number): Observable<any> {
    let datos = {"action": actions.actionCambiarDocADomicilio, "_documento": documento};
    console.log('actionCambiarDocADomicilio', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }

  cerrarDocumento(documento: number): Observable<any> {
    let datos = {"action": actions.actionCerarDocumentos, "_documento": documento};
    console.log('crearDocumento activo', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }

  cerrarDocumentoRemision(documento: number): Observable<any> {
    let datos = {"action": actions.actionCerarDocumentosRemision, "_documento": documento};
    console.log('crearDocumento activo', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }
  cambiarDocumentoDeCaja(caja: cajaModel): Observable<any> {
    let datos = {"action": actions.actionCambioCajaDocumento, "datos": caja};
    console.log('crearDocumento activo', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }

  crearDocumento(): Observable<any> {
    let datos = {"action": actions.actionCrearDocumentos};
    console.log('crearDocumento activo', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }
  crearDocumentoCompraEnBlanco(_establecimiento:number): Observable<any> {
    let datos = {"action": actions.actionCrearDocumentosCompraBlank , _establecimiento};
    console.log('crearDocumento activo', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }
   crearDocumentoGasto(nuevoGasto:ValuesFormuGasto): Observable<any> {
    let datos = {"action": actions.actionCrearNewGasto ,"_arraydatos" : nuevoGasto};
    console.log('crearDocumentoGasto activo', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }
  crearDocumentoAbono(nuevoGasto:DocumentosModel): Observable<any> {
    let datos = {"action": actions.actionCrearNewAbono ,"_documentoAbono" : nuevoGasto};
    console.log('crearDocumentoGasto activo', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }
  crearDocumentoAbonoCredito(nuevoGasto:DocumentosModel): Observable<DocumentoCierreRequest> {
    let datos = {"action": actions.actionCrearNewAbonoCredito ,"_documentoAbono" : nuevoGasto};
    console.log('crearDocumentoGasto activo', url.actionDocumentos, datos, httpOptions());
    return this.http.post<DocumentoCierreRequest>(url.actionDocumentos, datos, httpOptions());
  }
  crearDocumentoDevolucion(nuevoGasto:DocumentosModel): Observable<any> {
    let datos = {"action": actions.actionCrearNewDevolucion ,"_documentoAbono" : nuevoGasto};
    console.log('crearDocumentoGasto activo', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }
  
  crearNotaDebito(nuevoGasto:documentoDev): Observable<any> {
    let datos = {"action": actions.actionCrearNewNotaDebito ,"_documentoAbono" : nuevoGasto};
    console.log('crearDocumentoGasto activo', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
  }
}
