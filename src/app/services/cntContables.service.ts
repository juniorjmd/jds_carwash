import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 

import { httpOptions, url } from '../models/app.db.url';
import { BehaviorSubject, Observable } from 'rxjs';
import {  cntClaseRequest, cntCuentaMayorRequest, cntGrupoRequest, cntOperacionesRequest, cntSubCuentaRequest, cntTransaccionesRequest } from '../interfaces/producto-request';
import { actions } from '../models/app.db.actions';
import { vistas } from '../models/app.db.view';
import { CntGruposModel } from '../models/cnt-grupos/cnt-grupos.module';
import { CntClasesModel } from '../models/cnt-clases/cnt-clases.module';
import { CntCuentaMModel } from '../models/cnt-cuenta-m/cnt-cuenta-m.module';
import { vwCntSubCuentaModel } from '../models/cnt-sub-cuenta/cnt-sub-cuenta.module';
import { CntOperacionesModel } from '../models/cnt-operaciones/cnt-operaciones.module';

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
      "_tabla" : vistas.vw_cnt_cuenta_mayores, 
     }; 
     return this.http.post<cntCuentaMayorRequest>(url.action , datos, httpOptions()) ;
  }
  getCntCuentas():Observable<cntSubCuentaRequest>{
    let datos = {"action": actions.actionSelect , 
      "_tabla" : vistas.vw_cnt_scuentas,
      "_where" : [{columna : 'digito' , tipocomp : '>' , dato : 0 }]
     }; 
     return this.http.post<cntSubCuentaRequest>(url.action , datos, httpOptions()) ;
  }
  getCntOperaciones():Observable<cntOperacionesRequest>{
    let datos = {"action": actions.actionSelect , 
      "_tabla" : vistas.vw_cnt_operaciones 
     }; 
     return this.http.post<cntOperacionesRequest>(url.action , datos, httpOptions()) ;
  }

  getCntTransacciones( idOperacion:number):Observable<cntTransaccionesRequest>{
    let datos = {"action": actions.actionSelect , 
      "_tabla" : vistas.vw_transacciones ,
    "_where" : [{columna : 'cod_comprobante' , tipocomp : '=' , dato : idOperacion }]     }; 
    console.log("getCntTransacciones" , url.action , datos, httpOptions())
     return this.http.post<cntTransaccionesRequest>(url.action , datos, httpOptions()) ;
  }
}
