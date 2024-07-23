 
import { DecimalPipe } from "@angular/common";
import { caja } from "../../interfaces/caja.interface"; 

interface pagosCierre {
    nombrepago:string , total : number 
}

export class cajasResumenModel{

    id ?: number; 
    usuario_apertura  ?: number   ;
    usuario_cierre  ?: number   ; 
    fecha_apertura ?: Date   ; 
    fecha_cierre   ?: Date  ; 
    base :number = 0   ; 
    sub_total_venta   :number = 0   ;  ; 
    total_iva  :number  = 0   ;  ; 
    total_descuento    :number = 0   ; ; 
    total_venta  :number   = 0   ; ; 
    efectivo   :number = 0   ;  ; 
    caja?:caja;
    NusuarioApertura  :string = '';
    NusuarioCierre  :string = '';  
 
     pagos: number  = 0 ;
     creditos: number  = 0 ; 
     recaudos: number  = 0 ; 
     total_gastos: number  = 0 ;  
     id_cierre_total: number  = 0 ;
     ingresoEfectivo: number  = 0 ; 
     recaudos_externos: number  = 0 ; 
     arrPagos:pagosCierre[]   = [{nombrepago:'' , total : 0 } ] ; 
}