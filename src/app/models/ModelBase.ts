export class ModelBase {  
  id?:number|string;
  usuario_creacion ?:number;
  usuario_edicion ?:number;
  fecha_creacion ?:Date ;
  fecha_actualizacion ?:Date ; 
  estado ?:number ;  
  nombre_estado?:string; 
  name_usuario_creacion  ?:string = '';
  name_usuario_edicion  ?:string= '';

}
