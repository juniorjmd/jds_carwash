import { Time } from "@angular/common";

export interface AcumuladosEmpleados {
     cod_empleado:number, 
     cod_servicio:number, 
     valor:number, 
     estado:number,
     nombreEstado?:string,
     nombreEmpleado?:string,
     nombreServicio?:string,
     fecha?:Date,
     hora?:Time ,
     id?:number
}
