export class ModelBase {  
  id?:number|string;
  usuario_creacion ?:any;
  usuario_edicion ?:any;
  fecha_creacion ?:Date ;
  fecha_actualizacion ?:Date ; 
  estado ?:number ;  
  public nombre_estado ?: string = '';

  public name_usuario_creacion ?: string = '';

  public name_usuario_edicion ?: string = '';
}
