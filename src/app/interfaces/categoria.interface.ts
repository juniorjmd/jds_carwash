export interface Categoria {
    'id':number, 
    'letra':string, 
    'nombre':string, 
    'descripcion':string, 
    'tipo':string,
    'tipoDescripcion' ?:string,
    'contador'?:number, 
    'idPadreCategoria':number,
  'idCuentaContable'?:number,
  'NombreCuentaContable'?:string,
}
