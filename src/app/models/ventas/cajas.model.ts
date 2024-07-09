 
import { caja } from "../../interfaces/caja.interface";

export class cajaModel{
    id ?: number; 
    nombre ?: string;
    descripcion ?:string;
    estadoGeneral ?: number;
    estadoCaja ?: number;
    fechaEstadoGeneral ?: Date;
    fechaEstadoCaja ?: Date;
    usuarioEstadoCaja ?: number;
    usuarioEstadoGeneral ?: number;
    nombreEstadoGeneral ?: string;
    nombreEstado?: string; 
    asignada ?:boolean;
    idUsuario ?:number;
    establecimiento?:number;
    nombreEstablecimiento?:string;
    estadoEsta?:number;
    nombreUsuarioEstadoCaja?:string;
    documentoActivoCaja?:number;  
 cuentaContableGastos?:number;
 cuentaContableEfectivo?:number;
 nro_scuenta_venta?:number;
 nombre_scuenta_venta?:string;
 cod_cuenta_venta?:number;
 nombre_cuenta_venta?:string;
 nro_scuenta_gastos?:number;
 nombre_scuenta_gastos?:string;
 cod_cuenta_gastos?:number;
 nombre_cuenta_gastos?:string;  
    constructor(cargaCaja : caja|undefined){
        this.estadoCaja = 0 ;
        this.estadoGeneral = 0;
        this.establecimiento = 0; 
        if (typeof (cargaCaja) !== 'undefined' ){
            this.estadoEsta = cargaCaja.estadoEsta;
            this.id = cargaCaja.id ;
            this.establecimiento = cargaCaja.establecimiento;
            this.nombre = cargaCaja.nombre ;
            this.descripcion  = cargaCaja.descripcion ;
            this.estadoGeneral  = cargaCaja.estadoGeneral ;
            this.estadoCaja = cargaCaja.estadoCaja ;
            this.fechaEstadoGeneral  = cargaCaja.fechaEstadoGeneral ;
            this.fechaEstadoCaja  = cargaCaja.fechaEstadoCaja ;
            this.usuarioEstadoCaja  = cargaCaja.usuarioEstadoCaja ;
            this.usuarioEstadoGeneral  = cargaCaja.usuarioEstadoGeneral ; 
            this.asignada  = cargaCaja.asignada ;  
            this.idUsuario = cargaCaja.idUsuario; 
            this.nombreEstablecimiento = cargaCaja.nombreEstablecimiento;
            this.nombreUsuarioEstadoCaja = cargaCaja.nombreUsuarioEstadoCaja;
            this.documentoActivoCaja = cargaCaja.documentoActivoCaja;
             
        } 
       

    }
     
}