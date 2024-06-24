import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { loading } from 'src/app/models/app.loading';
import { DocumentoListado } from '../interfaces/documento.interface';
import { OdooPrd } from '../interfaces/odoo-prd';
import { Usuarios } from '../interfaces/usuario.interface';
import { actions } from '../models/app.db.actions';
import { PROCEDURE, TABLA } from '../models/app.db.tables';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { AuxIngresoInventarioModule } from '../models/aux-ingreso-inventario/aux-ingreso-inventario.module';
import { DocumentosModel } from '../models/ventas/documento.model';
import { ProductoModule } from '../models/producto/producto.module';
import { UsuarioModel } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { ProductoRequest } from '../interfaces/producto-request';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
 
private http = inject(HttpClient); 
private loading = inject(loading); 
private readonly baseUrl:string = url.action ;
private readonly   urlInventario =  `${this.baseUrl}inventario/`;
  constructor(  ){ 
    console.log('servicios productos inicializado');  
}


// #region Métodos con selects genericos en el codigo

getProductosExistencia(codPrd:ProductoModule){
  let where = [{"columna" : "idProducto" , "tipocomp" : '=' , "dato" : codPrd.id    } ]
  let datos = {"action": actions.actionSelect , "_tabla" : vistas.prd_inventario,  "_where" : where  
              };
  console.log('servicios getProductosExistencia' ,this.baseUrl, datos, httpOptions());
  return this.http.post(this.baseUrl, datos, httpOptions()) ;
} 


getTiposDeDocumentos(){
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.tiposDeDocumentos
              };
  console.log('servicios de usuarios activo - getCategorias' ,this.baseUrl, datos, httpOptions());
  return this.http.post(this.baseUrl, datos, httpOptions()) ;
}  
getbodegas(){
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.prd_bodegas_inventario
              };
  console.log('servicios de usuarios activo - getbodegas' ,this.baseUrl, datos, httpOptions());
  return this.http.post(this.baseUrl, datos, httpOptions()) ;
} 

getCategorias(){
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.categorias,
              "_columnas": ['obj'],
              "_obj": ['obj'],
              };
  console.log('servicios de usuarios activo - getCategorias' ,this.baseUrl, datos, httpOptions());
  return this.http.post(this.baseUrl, datos, httpOptions()) ;
} 

getProductosCodBarras(codPrd:any){
  let where = [{"columna" : "barcode" , "tipocomp" : '=' , "dato" : codPrd , "relacion" : 'or'  },
  {"columna" : "id" , "tipocomp" : '=' , "dato" : codPrd , "relacion" : 'or' },
  {"columna" : "idProducto" , "tipocomp" : '=' , "dato" : codPrd , "relacion" : 'or' }  
]
  let datos = {"action": actions.actionSelect , "_tabla" : vistas.productos,  "_where" : where  
              };
  console.log('servicios getProductosCodBarrasVCnt' ,this.baseUrl, datos, httpOptions());
  return this.http.post(this.baseUrl, datos, httpOptions()) ;
} 
// #endregion

// #region Métodos con multi-selects genericos en el codigo 
getCategorias_marcas(){
  let datos = {"action": actions.actionSelects ,
               "_tablas" : [vistas.categorias , vistas.marcas]
              };
  console.log('servicios de productos activo - getCategorias_marcas' ,this.baseUrl, datos, httpOptions());
  return this.http.post(this.baseUrl, datos, httpOptions()) ;
} 
// #endregion
 
// #region Métodos con procedimientos genericos en el codigo 

CERRAR_INVENTARIO(bodega:number , nombre:string , desc:string){
  let arraydatos =  {  
     "USUARIO_LOGUEADO" : '0',
     "_BODEGA" :bodega  ,
     "_NOMBRE" : nombre,
     "_DESCRIPCION" : desc
    
 }
   let  datos = {"action": actions.actionProcedure ,
   "_procedure" : PROCEDURE.sp_cerrar_inventario,
   "_arraydatos" : arraydatos
  };
   console.log('servicios CERRAR_INVENTARIO' ,this.baseUrl, datos, httpOptions());
   return this.http.post(this.baseUrl, datos, httpOptions()) ;
 } 

/*buscar producto por codigo de barra validando la existencia */
getProductosCodBarrasVCnt(codPrd:string , caja:number){
 
  let arraydatos =  {      
    "_id_producto" : codPrd  ,
    "_id_caja" : caja
}
  let  datos = {"action": actions.actionProcedure ,
    "_procedure" : PROCEDURE.getProductoConExistencia,
    "_arraydatos" : arraydatos
   };

  console.log('servicios getProductosCodBarrasVCnt' ,this.baseUrl, datos, httpOptions());
  return this.http.post(this.baseUrl, datos, httpOptions()) ;
} 
 
// #endregion

//#region Metodos con selects genericos por usuario logueado


getPrecarguePorBodega(bodega:number){
  let where = [{"columna" : "bodega" , "tipocomp" : '=' , "dato" : bodega   } ]
  let datos = {"action": actions.actionSelectPorUsuario ,
   "_tabla" : vistas.aux_ingreso_inventario,  "_where" : where , "_columnaUsuario": 'cod_usuario' };  
  console.log('servicios getProductosExistencia' ,`${this.baseUrl}`, datos, httpOptions());
  return this.http.post(this.baseUrl, datos, httpOptions()) ;
} 
 
//#endregion

// #region metodos delete genericos
eliminaritemIngresoInventario(idDato:string | number | undefined){ 
  let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : idDato }];
  let datos = {"action": actions.actionDelete ,
  "_tabla" : TABLA.inv_inventario_ingreso_auxiliar,
  "_where" : where  
 };
  return this.http.post(url.action , datos, httpOptions()) ;
}
//#endregion
// #region metodos de inventarioController

 

borrarPrecarguePorBodega(bodega:number){
  let datos = {"action": actions.action_cancelar_inventario , "_bodega_ingreso" : bodega };
  console.log('servicios getProductosExistencia' ,this.urlInventario, datos, httpOptions());
  return this.http.post(this.urlInventario, datos, httpOptions()) ;
} 



//actionStockMoveDevolucion

guardarPrdCompra(producto :ProductoModule , documentoActivo:number ){

  let datos = {"action": actions.action_insertar_producto_venta , 
  "_producto_enviado" : producto , 
  '_documento' : documentoActivo
};
  console.log('servicios guardarPrdCompra' ,this.urlInventario, datos, httpOptions());
  return this.http.post(this.urlInventario, datos, httpOptions()) ;
}
guardarNuevoProducto(producto :ProductoModule  ){

  let datos = {"action": actions.action_insertar_new_producto , 
  "_producto_enviado" : producto  
};
  console.log('servicios guardarPrdCompra' ,this.urlInventario, datos, httpOptions());
  return this.http.post(this.urlInventario, datos, httpOptions()) ;
}

guardarNuevoProductoPrecargue( precargue :AuxIngresoInventarioModule ){

  let datos = {"action": actions.action_ingreso_precargue , 
  "_ingreso" : precargue  
};
  console.log('servicios guardarNuevoProductoPrecargue' ,this.urlInventario, datos, httpOptions());
  return this.http.post(this.urlInventario, datos, httpOptions()) ;
}

devolverPrdCompra(producto : DocumentoListado  ){

  let datos = {"action": actions.devolver_producto_venta , 
  "_producto_enviado" : producto  
};
  console.log('servicios getProductosCodBarrasVCnt' ,this.urlInventario, datos, httpOptions());
  return this.http.post(this.urlInventario, datos, httpOptions()) ;
}


 
getProductosGeneral(limit?:any): Observable<ProductoRequest|any>  {
  let datos;
  if( limit.length > 0 ){
      datos   = {"action": actions.get_all_products , 
  "_limit" : limit  
          };}else{
      datos = {"action": actions.get_all_products ,  
              };
  }
  
  console.log('servicios getProductosPorMarca' ,this.urlInventario, datos, httpOptions());
  return this.http.post<ProductoRequest|any>(this.urlInventario, datos, httpOptions()) ;
} 

getProductosPorCategoria(codCategoria:any){ 
  let datos = {"action": actions.get_all_products_by_category , "_id_cate" : codCategoria,
      "_limit" : [0,100]   
              };
  console.log('servicios getProductosPorCategoria' ,this.urlInventario, datos, httpOptions());
  return this.http.post(this.urlInventario, datos, httpOptions()) ;
} 

getProductosPorNombre(texto:string , limit?:any  ){
  let datos  = {"action": actions.get_all_products_by_name ,"_dato_busqueda" : texto ,
    "_limit" : limit
  }; 
  console.log('servicios getProductosPorMarca' ,this.urlInventario, datos, httpOptions());
  return this.http.post(this.urlInventario, datos, httpOptions()) ;
} 

getProductosPorMarca(codMarca : any){ 
  let datos = {"action": actions.get_all_products_by_brand , "_id_brand" :codMarca,
      "_limit" : [0,100] 
              };
  console.log('servicios getProductosPorMarca' ,this.urlInventario, datos, httpOptions());
  return this.http.post(this.urlInventario, datos, httpOptions()) ;
} 

// #endregion
 
}

