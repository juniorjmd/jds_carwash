import { Time } from "@angular/common";

export interface PagosEmpleados {
    idUsuario:number,
    codEmpleado:number, 
    totalParcial:number, 
    anticipos:number,
    totalPagado:number,
    estado:number, 
    diasTrabajados?:number, 
    serviciosTrabajados?:number, 
    idSucursal?:number, 
    porConceptoDe?:number,
    id?:number,
    hora?:Time, 
    descripcion?:string, 
    fecha?:Date
}
