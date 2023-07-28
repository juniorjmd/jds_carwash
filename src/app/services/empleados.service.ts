import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fechaBusqueda } from '../interfaces/generales.interface';
import { actions } from '../models/app.db.actions';
import { TABLA } from '../models/app.db.tables';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { EmpleadosModule } from '../models/empleados/empleados.module';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private http: HttpClient ) { }
  
  getTiposEmpleados(){
    let datos = {"action": actions.actionSelect ,
                 "_tabla" : vistas.empleados_tipo ,   
                };
    console.log('servicios de empleados - getTiposEmpleados' ,url.action , datos, httpOptions());
    return this.http.post(url.action , datos, httpOptions()) ;
} 

getEmpleados(){
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.empleados,
               "_columnas" : ['objeto']   ,
               "_obj" : ['objeto'],             
              };
  console.log('servicios de empleados - getEmpleados' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
}


getEmpleadosLavador(){
  let where = [{"columna" : "id" , "tipocomp" : '=f' , "dato" :  "getIdTipoEmpleado('cleaner')"  }]
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.empleados,
               "_where" : where , 
               "_columnas" : ['objeto']   ,
               "_obj" : ['objeto'],             
              };
  console.log('servicios de empleados - getEmpleados' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 



getEmpleadosAcumulados( id:number , fechas:{  fechaInicio:Date,fechaFin:Date }){
  let where = [{"columna" : "cod_empleado" , "tipocomp" : '=' , "dato" :  id },
  {"columna" : "fecha" , "tipocomp" : '>=' , "dato" :  fechas.fechaInicio },
  {"columna" : "fecha" , "tipocomp" : '<=' , "dato" :  fechas.fechaFin }
]
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.acumulados_por_empleado,
               "_where" : where , 
               "_obj" : ['obj'],             
              };
  console.log('servicios de empleados - getEmpleadosAcumulados' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 




guardarAnticipoEmpleado(nuevoTipo:EmpleadosModule , valor , descripcion ){   let arrayDatos=new Object()  
  //id, cod_servicio, cod_tipo_vehiculo, valor, estado
  /* arraydatos =  {  "nombre" : newEsta.nombre  ,
  "descripcion" : newEsta.descripcion,
  "estado" : newEsta.estado ,
  "usuario_creador" : 'USUARIO_LOGUEADO' };
   codEmpleado, idUsuario, descripcion,  porConceptoDe,
 totalParcial,  totalPagado
  */
  arrayDatos['codEmpleado'] = nuevoTipo.id; 
  arrayDatos['idUsuario'] =  'USUARIO_LOGUEADO'; 
  arrayDatos['descripcion'] = descripcion; 
  arrayDatos['porConceptoDe'] = 'Anticipo Generado Desde la aplicacion';
  arrayDatos['totalParcial'] = valor; 
  arrayDatos['totalPagado'] = valor;  

  let datos = {"action": actions.actionInsert ,
    "_tabla" : TABLA.empleados_pagos_anticipos,
    "_arraydatos" : arrayDatos,
    "_where":null
   }; 
  
  console.log('servicios de creacion anticipos empleados' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
 }

guardarEmpleado(nuevoTipo:EmpleadosModule){ 
  let arrayDatos=new Object() 
  let where:any[] = []
  //id, cod_servicio, cod_tipo_vehiculo, valor, estado
  arrayDatos['apellido1'] = nuevoTipo.apellido1; 
  arrayDatos['apellido2'] = nuevoTipo.apellido2; 
  arrayDatos['nombre1'] = nuevoTipo.nombre1; 
  arrayDatos['nombre2'] = nuevoTipo.nombre2;
  arrayDatos['estado'] = nuevoTipo.estado; 
  arrayDatos['monto_dia'] = nuevoTipo.monto_dia; 
  arrayDatos['tipo'] = nuevoTipo.tipo; 

  let datos = {"action": actions.actionInsert ,
    "_tabla" : TABLA.empleados,
    "_arraydatos" : arrayDatos,
    "_where":null
   };
  if ( typeof( nuevoTipo.id )!== 'undefined' ){//actualiza
    where = [{"columna" : "id" , "tipocomp" : '=' , "dato" : nuevoTipo.id}]
    datos._where = where;
    datos.action = actions.actionUpdate
  }
  
  console.log('servicios de creacion servicios de vehiculos activo' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
 }


 guardarPagoEmpleado(empleado:EmpleadosModule , fechas:fechaBusqueda){ 

  /** "fecha1"=>$_FECHA_1 , 
 * "fecha2" =>  $_FECHA_2, 
 *  "empleadoId" =>  $_EMPLEADO_ID, 
 * "total_pago" =>  $_TOTAL_PAGO, 
 *  "total_descuento" =>  $_TOTAL_DESCUENTO*/

//INSERTAR_PAGO_EMPLEADO
  let arrayDatos=new Object() 
  let where:any[] = []
  //id, cod_servicio, cod_tipo_vehiculo, valor, estado 

  let datos = {"action": actions.action_insertar_pagos , 
  "_FECHA_1" : fechas.fechaInicio, 
  "_FECHA_2" : fechas.fechaFin,
  "_EMPLEADO_ID" : empleado.id , 
  "_TOTAL_PAGO" : empleado.TotalAcumuladoPendientes , 
  "_TOTAL_DESCUENTO" : empleado.valorADescontarEnPago  
   };
  
  
  console.log('servicios de creacion de pagos a empleados' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
 }


}
