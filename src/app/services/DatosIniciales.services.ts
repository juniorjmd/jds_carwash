import { Injectable } from '@angular/core';
import { vwsucursal } from 'src/app/models/app.db.interfaces';
import { actions } from 'src/app/models/app.db.actions';
import { httpOptions, url } from 'src/app/models/app.db.url';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { cajaModel } from '../models/ventas/cajas.model';
import { vistas } from '../models/app.db.view';
import { cntGrupoRequest, empleadoRequest, parametroRequest } from '../interfaces/producto-request';
import { EmpleadoModel } from '../models/empleados/empleados.module';
import { table } from 'ngx-bootstrap-icons';
import { TABLA } from '../models/app.db.tables';
import { ParametrosModel } from '../models/parametros/parametros.model';



@Injectable({
    providedIn: 'root'
})
export class DatosInicialesService {
    private sucursal:vwsucursal[] = [] ;


    private sucursalSource = new BehaviorSubject<any>(null);
    currentSucursal = this.sucursalSource.asObservable(); 
    private continue = new BehaviorSubject<boolean>(false);
    continueVenta = this.continue.asObservable(); 
    private validarExistencia = new BehaviorSubject<any>(null);
    parmValExistencia =  this.validarExistencia.asObservable();
    
    private vendedores = new BehaviorSubject<EmpleadoModel[]|null>(null);
    currentVendedores = this.vendedores.asObservable();

    constructor(private http: HttpClient){}

    setArrayVendedores(sucursal:EmpleadoModel[]|null){ 
        this.vendedores.next(sucursal);
    }
    setParametroExistencia(sucursal:ParametrosModel|null){ 
        this.validarExistencia.next(sucursal);
    }
    chageParametroExistencia(sucursal:ParametrosModel){
        this.sucursalSource.next(sucursal);
    }
    chageSucursal(sucursal:vwsucursal){
        this.sucursalSource.next(sucursal);
    }
    chageContinueVenta(val:boolean){
        this.continue.next(val);
    }
    getParametroValidarExistencia():Observable<parametroRequest>{
        let datos = {"action": actions.actionSelect , 
            "_tabla" : TABLA.PARAMETROS,
            "_where" : [{columna : 'cod_parametro' , tipocomp : '=' , dato : 'VALIDAR_EXISTENCIA'}]     
           }; 
           return this.http.post<parametroRequest>(url.action , datos, httpOptions()) ;
      }
  getVendedores():Observable<empleadoRequest>{
    let datos = {"action": actions.actionSelect , 
        "_tabla" : vistas.vendedores,
        "_where" : []
       }; 
       return this.http.post<empleadoRequest>(url.action , datos, httpOptions()) ;
  }
    validarCuentasContablesEstablecimiento(caja:cajaModel) {
        if (caja == undefined
            || caja!.idCCntCCobrar == 0
            || caja!.idCCntCPagar == 0
            || caja!.idRetefuenteCompra == 0   
            || caja!.idCCntIvaCompra == 0 
            || caja!.idCCnttIvaVenta == 0  
            || caja!.idCCntCostoVenta == 0 
            || caja!.idCCntVenta == 0 
            || caja!.idCCntIngDifBonoRegalo == 0  
            || caja!.cuentaContableGastos == undefined  || caja!.cuentaContableGastos! == 0  
            || caja!.cuentaContableEfectivo == undefined  || caja!.cuentaContableEfectivo! == 0   )
        {
            this.chageContinueVenta(false) ;
          }else{
            this.chageContinueVenta(true) ;
          }
      
    }
    getDatosIniSucursal(){
       
        let datos = {"action": actions.datosInicialesSucursal};
        console.log('servicios datos iniciales inicializado ' ,url.datosIniciales , datos, url.httpOptionsSinAutorizacion);
        return this.http.post(url.datosIniciales , datos, url.httpOptionsSinAutorizacion) ;
      
    }
}
 