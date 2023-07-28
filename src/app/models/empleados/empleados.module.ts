import { PagosEmpleadoModel } from '../pagos-empleados/pagos-empleados.module';
import { AcumuladosEmpleadoModel } from '../acumulados-empleados/acumulados-empleados.module'; 

export class EmpleadoModel { 
//vw_empleados_pagos_por_empleados_obj
public  nombre1!:string; 
public apellido1!:string;
public tipo!:number;  
public nombre2 :string = ''; 
public apellido2 :string = ''; 
public monto_dia :number= 0; 
public estado   :number= 0; 
 public id ?: number = 0; 
public nombreCompleto?:string = 'Seleccione el empleado';
public nombretipo?:string;
public nombreEstado?:string;
public AcumuladosEmpleados  !:AcumuladosEmpleadoModel[] ;
public pagosEmpleados  !:PagosEmpleadoModel[]  ;
public pagosAnticiposEmpleados  !:PagosEmpleadoModel[]  ;

public maximoDescuento  ?:number= 0; 
public valorADescontarEnPago  ?:number= 0; 
public TotalAnticiposPendientes  ?:number= 0;
public numeroPagosPendientes  ?:number= 0; 
public numeroAdelantosPendientes  ?:number= 0; 
public numeroAcumuladosPendientes  ?:number= 0; 
public TotalAcumuladoPendientes  ?:number= 0; 
public fechaMinimaAcumulados ?: Date;
public fechaMaximaAcumulados?: Date;

}
