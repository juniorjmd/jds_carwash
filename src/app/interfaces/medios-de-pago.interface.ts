export interface MediosDePago {
    id:number, 
    nombre:string,
    descripcion:string,
    estado:number, 
    cuentaContable:number,
    nombreCuentaContable:string,
    establecimiento:number,
    nombreEsta?:string,
    nombreEstado?:string,
    idCaja?:number,
    nombreCaja?:string,
    usuarioCaja?:number,
    usuarioCajaNombre?:string,
    valor_aux?:number,
}
