import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { loading } from 'src/app/models/app.loading';
import { cajaModel } from '../models/ventas/cajas.model';
import { ValuesFormuGasto } from '../interfaces/valuesFormularios';
import { CarteraRequest, DocumentoCierreRequest } from '../interfaces/producto-request';
import { CarteraModel } from '../models/cartera/cartera.model';
import { DocumentosModel } from '../models/ventas/documento.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(private http: HttpClient, private loading: loading) {
    console.log('servicio documentos');
  }

  getDocumentoActivo(): Observable<any> {
    let datos = {
      "action": actions.actionSelectPorUsuario,
      "_tabla": vistas.documento,
      "_columnas": ['objeto'],
      "_columnaUsuario": 'usuario',
      "_where": [{"columna": 'estado', "tipocomp": '=', "dato": 1}]
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

  getCuentasXCobrarByPersonaAbonos( idPersona :number): Observable<CarteraRequest> {
    let where = [{"columna": 'idTercero', "tipocomp": '=', "dato": idPersona},{"columna": 'totalActual', "tipocomp": '>', "dato": 0}];
    let datos = {
      "action": actions.actionSelect,
      "_tabla": vistas.cartera, 
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

  cambiarDocumento(documento: number): Observable<any> {
    let datos = {"action": actions.actionChangeDocumentos, "_docActual": documento};
    console.log('cambiarDocumento activo', url.actionDocumentos, datos, httpOptions());
    return this.http.post(url.actionDocumentos, datos, httpOptions());
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
}
