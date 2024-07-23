import { Injectable } from '@angular/core';
import { vwsucursal } from 'src/app/models/app.db.interfaces';
import { actions } from 'src/app/models/app.db.actions';
import { url } from 'src/app/models/app.db.url';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { cajaModel } from '../models/ventas/cajas.model';



@Injectable({
    providedIn: 'root'
})
export class DatosInicialesService {
    private sucursal:vwsucursal[] = [] ;


    private sucursalSource = new BehaviorSubject<any>(null);
    currentSucursal = this.sucursalSource.asObservable(); 
    private continue = new BehaviorSubject<boolean>(false);
    continueVenta = this.continue.asObservable();

    constructor(private http: HttpClient){}

    chageSucursal(sucursal:vwsucursal){
        this.sucursalSource.next(sucursal);
    }
    chageContinueVenta(val:boolean){
        this.continue.next(val);
    }


    validarCuentasContablesEstablecimiento(caja:cajaModel) {
        if (caja == undefined
            || caja!.idCCntCCobrar == 0
            || caja!.idCCntCPagar == 0
            || caja!.idCCntCompras == 0   
            || caja!.idCCntIvaCompra == 0 
            || caja!.idCCnttIvaVenta == 0  
            || caja!.idCCntCostoVenta == 0 
            || caja!.idCCntVenta == 0  
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
 