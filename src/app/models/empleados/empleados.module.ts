import { PagosEmpleadoModel } from '../pagos-empleados/pagos-empleados.module';
import { AcumuladosEmpleadoModel } from '../acumulados-empleados/acumulados-empleados.module'; 
import { ClientesModel } from '../clientes/clientes.module';
import { ModelBase } from '../ModelBase';
import { cliente } from 'src/app/services/Clientes.services';

export class EmpleadoModel extends ModelBase {  
    
public tipo?:number;  
public idPersona :number = 0;  //relacion con la tabla mst_per_clientes (id) 
public monto_dia :number= 0;   
public porcentaje_servicio :number= 0;  
public porcentaje_productos:number= 0;   
public nombretipo?:string; 
public AcumuladosEmpleados  ?:AcumuladosEmpleadoModel[] ;
public pagosEmpleados  ?:PagosEmpleadoModel[]  ;
public pagosAnticiposEmpleados  ?:PagosEmpleadoModel[]  ; 
public persona  ?:ClientesModel  ; 
public maximoDescuento  ?:number= 0; 
public valorADescontarEnPago  ?:number= 0; 
public TotalAnticiposPendientes  ?:number= 0;
public numeroPagosPendientes  ?:number= 0; 
public numeroAdelantosPendientes  ?:number= 0; 
public numeroAcumuladosPendientes  ?:number= 0; 
public TotalAcumuladoPendientes  ?:number= 0; 
public fechaMinimaAcumulados ?: Date;
public fechaMaximaAcumulados?: Date;

nombreCompleto:string = '' ; 
nombreTipo:string = '' ; 
descripcionTipo:string = '' ;

constructor(){
    super();
    this.estado = this.estado? this.estado : 0 ;
    this.tipo = this.tipo? this.tipo : 0 ;
    
this.AcumuladosEmpleados = (this.AcumuladosEmpleados == undefined ) ?  [] : this.AcumuladosEmpleados ;
this.pagosEmpleados = (this.pagosEmpleados== undefined ) ?  [] :this.pagosEmpleados
this.pagosAnticiposEmpleados = (this.pagosAnticiposEmpleados== undefined ) ?  [] :  this.pagosAnticiposEmpleados; 
}
}


export class VendedorModel extends EmpleadoModel{
    firstDate?:Date =  new Date();
    lastDate?:Date =  new Date();
    constructor(){
        super();}
}