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
import { ProductoModel } from '../models/producto/producto.module';
import { UsuarioModel } from '../models/usuario.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { categoriaRequest, categoriaVendidosRequest, DescuentoRequest, DocumentoCierreRequest, DocumentoRequest, marcaRequest, presentacionPrdRequest, ProductoExitenciaRequest, ProductoExitenciasRequest, ProductoRequest } from '../interfaces/producto-request';
import { PrdPreciosModule } from '../models/prd-precios/prd-precios.module';
import { CategoriasModel } from '../models/categorias.model';
import { MarcasModel } from '../models/marcas/marcas.module';
import { DescuentoModule } from '../models/descuento/descuento.model';
import { CustomConsole } from '../models/CustomConsole';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
 
private http = inject(HttpClient); 
private loading = inject(loading);  
private readonly baseUrl:string = url.action ;
private readonly   urlInventario =  `${this.baseUrl}inventario/`;
private readonly   urlVentas =  `${this.baseUrl}ventas/`;

private categoriasSource = new BehaviorSubject<CategoriasModel[]|null>(null);
currentCategorias = this.categoriasSource.asObservable();
private marcasSource = new BehaviorSubject<MarcasModel[]|null>(null);
currentMarcas = this.marcasSource.asObservable();

  // private _configService = inject(configService); 
constructor(  ){ 
    CustomConsole.log('servicios productos inicializado');  
}



asignarMarcas(marcas:MarcasModel[]){
    this.marcasSource.next( marcas) 
}

asignarCategorias(categoria:CategoriasModel[]){
    this.categoriasSource.next( categoria) 
}
deleteDescuento(desc:DescuentoModule){ 
    let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : desc.id }];
    let datos = {"action": actions.actionDelete ,
    "_tabla" : TABLA.inv_descuentos,
    "_where" : where  
   };
    return this.http.post(url.action , datos, httpOptions()) ;
} 
setDescuento(desc:DescuentoModule){
  let datos:any  = {"action": actions.actionInsert ,
      "_tabla" : TABLA.inv_descuentos,
     };

     let idaux = ( typeof(desc.id) == 'string' )? parseInt(desc.id):desc.id
     desc.usuario_creacion = 'USUARIO_LOGUEADO';
     desc.name_usuario_creacion = undefined;
     desc.name_usuario_edicion = undefined; 
     if (idaux != undefined &&  idaux > 0 ){
      datos = {
        ...datos,
        _where: [{ columna: "id", tipocomp: "=", dato: idaux }]
      }; 
      desc.id =  undefined;
       desc.usuario_creacion =   undefined;
       desc.usuario_edicion = 'USUARIO_LOGUEADO';
      
     datos.action=actions.actionUpdate                 
     } 
     desc.NombreTipo =  undefined;
     desc.nombre_estado =  undefined;
      desc.obj  =  undefined ; 
     datos = {
      ...datos, 
       _arraydatos  : desc 
    }; 

     CustomConsole.log(datos);
     
      return this.http.post(url.action , datos, httpOptions()) ;
      

       
}

getDescuentos():Observable<DescuentoRequest>{
  let datos:any  = {"action": actions.actionSelect ,
      "_tabla" : vistas.inv_descuentos,
     };
 
     CustomConsole.log(datos);
     
      return this.http.post<DescuentoRequest>(url.action , datos, httpOptions()) ;
       
}
setCategorias(CATEGORIA:CategoriasModel){
  CATEGORIA.nombre_estado = undefined;
  let datos  = {"action": actions.actionInsert ,
      "_tabla" : TABLA.categorias,
      "_arraydatos" : CATEGORIA
     };
     
 CustomConsole.log('crear nueva categoria' , url.action , datos, httpOptions());
 
  return this.http.post(url.action , datos, httpOptions()) ; 
}


// #region Métodos con selects genericos en el codigo

getProductosExistencia(codPrd:ProductoModel):Observable<ProductoExitenciasRequest>{
  let where = [{"columna" : "id_producto" , "tipocomp" : '=' , "dato" : codPrd.id    } ]
  let datos = {"action": actions.actionSelect , "_tabla" : vistas.prd_inventario,  "_where" : where  
              };
  CustomConsole.log('servicios getProductosExistencia' ,this.baseUrl, datos, httpOptions());
  return this.http.post<ProductoExitenciasRequest>(this.baseUrl, datos, httpOptions()) ;
} 

get_producto_simple(){ 
  let datos = {"action": actions.actionSelect , "_tabla" : vistas.inv_mst_producto ,  _limit: 300
              };
  CustomConsole.log('servicios getProductosExistencia' ,this.baseUrl, datos, httpOptions());
  return this.http.post(this.baseUrl, datos, httpOptions()) ;
}


get_producto_simple_by_marca(marca:any){  
  let _where =  [{"columna" : "idMarca" , "tipocomp" : '=' , "dato" : marca   } ]
  let datos = {"action": actions.actionSelect , "_tabla" : vistas.inv_mst_producto ,  _limit: 300 , _where
              };
  CustomConsole.log('servicios getProductosExistencia' ,this.baseUrl, datos, httpOptions());
  return this.http.post(this.baseUrl, datos, httpOptions()) ;
}


get_producto_simple_by_nombre(name:any){  
  let _where =  [  {columna : 'nombre' , tipocomp : 'like' , dato : name , 'relacion' : 'or'},
    {columna : 'nombre2' , tipocomp : 'like' , dato : name , 'relacion' : 'or'},
    {columna : 'nombre3' , tipocomp : 'like' , dato : name, 'relacion' : 'or'} ,  
    {columna : 'upper(cod_prd_externo)' , tipocomp : '=f' , dato : `upper('${name}')` } 
     ]
  let datos = {"action": actions.actionSelect , "_tabla" : vistas.inv_mst_producto ,  _limit: 300 , _where
              };
  CustomConsole.log('servicios getProductosExistencia' ,this.baseUrl, datos, httpOptions());
  return this.http.post(this.baseUrl, datos, httpOptions()) ;
} 
get_producto_simple_by_categoria(categoria:any){ 
  let _where =  [{"columna" : "idCategoria" , "tipocomp" : '=' , "dato" : categoria   } ]
  let datos = {"action": actions.actionSelect , "_tabla" : vistas.inv_mst_producto ,  _limit: 300 , _where
              };
  CustomConsole.log('servicios getProductosExistencia' ,this.baseUrl, datos, httpOptions());
  return this.http.post(this.baseUrl, datos, httpOptions()) ;
}

getTiposDeDocumentos(){
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.tiposDeDocumentos
              };
  CustomConsole.log('servicios de usuarios activo - getCategorias' ,this.baseUrl, datos, httpOptions());
  return this.http.post(this.baseUrl, datos, httpOptions()) ;
}  
getbodegas(){
  let datos = {"action": actions.actionSelect ,
    "_columnas": ['obj'],
    "_obj": ['obj'],
    "_tabla" : vistas.prd_bodegas_inventario
              };
  CustomConsole.log('servicios de usuarios activo - getbodegas' ,this.baseUrl, datos, httpOptions());
  return this.http.post(this.baseUrl, datos, httpOptions()) ;
} 

getCategorias():Observable<categoriaRequest>{
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.categorias,
              "_columnas": ['obj'],
              "_obj": ['obj'],
              };
  CustomConsole.log('servicios de usuarios activo - getCategorias' ,this.baseUrl, datos, httpOptions());
  return this.http.post<categoriaRequest>(this.baseUrl, datos, httpOptions()) ;
} 
getCategoriasVendidas():Observable<categoriaVendidosRequest>{
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.categoriasVendidas,
              "_columnas": ['obj'],
              "_obj": ['obj'],
              };
  CustomConsole.log('servicios de usuarios activo - getCategorias' ,this.baseUrl, datos, httpOptions());
  return this.http.post<categoriaVendidosRequest>(this.baseUrl, datos, httpOptions()) ;
} 
getMarcas():Observable<marcaRequest>{
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.marcas 
              };
  CustomConsole.log('servicios de usuarios activo - getCategorias' ,this.baseUrl, datos, httpOptions());
  return this.http.post<categoriaRequest>(this.baseUrl, datos, httpOptions()) ;
} 

getProductosCodBarras(codPrd:any){
  let where = [{"columna" : "barcode" , "tipocomp" : '=' , "dato" : codPrd , "relacion" : 'or'  },
  {"columna" : "id" , "tipocomp" : '=' , "dato" : codPrd , "relacion" : 'or' },
  {"columna" : "idProducto" , "tipocomp" : '=' , "dato" : codPrd , "relacion" : 'or' }  
]
  let datos = {"action": actions.actionSelect , "_tabla" : vistas.productos,  "_where" : where  
              };
  CustomConsole.log('servicios getProductosCodBarrasVCnt' ,this.baseUrl, datos, httpOptions());
  return this.http.post(this.baseUrl, datos, httpOptions()) ;
} 

getProductosById(codPrd:any):Observable<ProductoRequest>{
  let _where = [ {"columna" : "id" , "tipocomp" : '=' , "dato" : codPrd   }]
  let datos = {"action": actions.actionSelect , "_tabla" : vistas.productos_con_existencia,  _where   , 
    "_columnas": ['obj'],
    "_obj": ['obj'],
     };
  CustomConsole.log('servicios getProductosById' ,this.baseUrl, datos, httpOptions());
  return this.http.post<ProductoRequest>(this.baseUrl, datos, httpOptions()) ;
} 


getPresentacioProducto():Observable<presentacionPrdRequest>{
  let datos = {"action": actions.actionSelect , "_tabla" : TABLA.presentacionProducto  }
  CustomConsole.log('getPresentacioProducto  ' ,url.action , datos, httpOptions());
  return this.http.post<presentacionPrdRequest>(url.action , datos, httpOptions()) ;
}
// #endregion

// #region Métodos con multi-selects genericos en el codigo 
getCategorias_marcas():Observable<[categoriaRequest,marcaRequest]>{
  let datos = {"action": actions.actionSelects ,
               "_tablas" : [vistas.categorias , vistas.marcas]
              };
  CustomConsole.log('servicios de productos activo - getCategorias_marcas' ,this.baseUrl, datos, httpOptions());
  return this.http.post<[categoriaRequest,marcaRequest]>(this.baseUrl, datos, httpOptions()) ;
} 
// #endregion
 
// #region Métodos con procedimientos genericos en el codigo 

CERRAR_INVENTARIO(bodega:number , nombre:string , desc:string, tipo:number):Observable<any>{
  let arraydatos =  {  
     "USUARIO_LOGUEADO" : '0',
     "_BODEGA" :bodega  ,
     "_NOMBRE" : nombre,
     "_DESCRIPCION" : desc,
     "_tipo_inventario" : tipo
    
 }
   let  datos = {"action": actions.actionProcedure ,
   "_procedure" : PROCEDURE.sp_cerrar_inventario,
   "_arraydatos" : arraydatos
  };
   CustomConsole.log('servicios CERRAR_INVENTARIO' ,this.baseUrl, datos, httpOptions());
   return this.http.post<Observable<any>>(this.baseUrl, datos, httpOptions()) ;
 } 

/*buscar producto por codigo de barra validando la existencia */

getProductosCodBarrasVCnt(codPrd:string , caja:number){
 
  let arraydatos =  {      
    "_id_producto" : codPrd  ,
    "_id_caja" : caja,
    '_obj' : ['obj']
}
  let  datos = {"action": actions.actionProcedure ,
    "_procedure" : PROCEDURE.getProductoConExistencia,
    "_arraydatos" : arraydatos
   };

  CustomConsole.log('servicios getProductosCodBarrasVCnt' ,this.baseUrl, datos, httpOptions());
  return this.http.post(this.baseUrl, datos, httpOptions()) ;
} 
 
// #endregion

//#region Metodos con selects genericos por usuario logueado


getPrecarguePorBodega(bodega:number){
  let where = [{"columna" : "bodega" , "tipocomp" : '=' , "dato" : bodega   } ]
  let datos = {"action": actions.actionSelectPorUsuario ,
   "_tabla" : vistas.aux_ingreso_inventario,  "_where" : where , "_columnaUsuario": 'cod_usuario' };  
  CustomConsole.log('servicios getProductosExistencia' ,`${this.baseUrl}`, datos, httpOptions());
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
  CustomConsole.log('servicios getProductosExistencia' ,this.urlInventario, datos, httpOptions());
  return this.http.post(this.urlInventario, datos, httpOptions()) ;
} 



//actionStockMoveDevolucion

guardarPrdVentas(producto :ProductoModel , documentoActivo:DocumentosModel , precioVenta : PrdPreciosModule , _validarExistencia:boolean = true ){

  let datos = {"action": actions.action_insertar_producto_venta , 
  "_producto_enviado" : producto.id , 
  "_cantidadVenta" : producto.cantidadVendida ,
  '_documento' : documentoActivo.orden,
  '_precioVenta' : precioVenta , _validarExistencia
};
  CustomConsole.log('servicios guardarPrdCompra' ,this.urlVentas, datos, httpOptions());
  return this.http.post(this.urlVentas, datos, httpOptions()) ;
}
guardarNuevoProducto(producto :ProductoModel  ){

  let datos = {"action": actions.action_insertar_new_producto , 
  "_producto_enviado" : producto  
};
  CustomConsole.log('servicios guardarPrdCompra' ,this.urlInventario, datos, httpOptions());
  return this.http.post(this.urlInventario, datos, httpOptions()) ;
}

updateProducto(producto :ProductoModel  ){

  let datos = {"action": actions.action_update_producto , 
  "_producto_enviado" : producto  
};
  CustomConsole.log('servicios guardarPrdCompra' ,this.urlInventario, datos, httpOptions());
  return this.http.post(this.urlInventario, datos, httpOptions()) ;
}

updateDocumento(documento :DocumentosModel  ){
  let _where =   [{"columna" : "orden" , "tipocomp" : "=" , "dato" : documento.orden }]
       let  _arraydatos =  {
         "establecimiento" : documento.establecimiento,
         "id_cliente" :  documento.cliente,
         "cliente" :  documento.cliente,
         "fecha" :  documento.fecha,
         "campo_info_3" :  documento.campo_info_3,
         vendedor :   documento.cod_vendedor,
         cod_vendedor :   documento.cod_vendedor,
         cod_orden_compra :   documento.cod_orden_compra,
        };
            
           let datos = {"action": actions.actionUpdate ,
            "_tabla" : TABLA.documentos,
            _where ,
           _arraydatos
           };
  CustomConsole.log('servicios updateDocumento' ,url.action, datos, httpOptions());
  return this.http.post<DocumentoRequest>(url.action, datos, httpOptions()) ;
}
guardarNuevoProductoPrecargue( precargue :AuxIngresoInventarioModule ){

  let datos = {"action": actions.action_ingreso_precargue , 
  "_ingreso" : precargue  
};
  CustomConsole.log('servicios guardarNuevoProductoPrecargue' ,this.urlInventario, datos, httpOptions());
  return this.http.post(this.urlInventario, datos, httpOptions()) ;
}

devolverPrdCompra(producto : DocumentoListado  ){

  let datos = {"action": actions.devolver_producto_venta , 
  "_producto_enviado" : producto  
};
  CustomConsole.log('servicios getProductosCodBarrasVCnt' ,this.urlInventario, datos, httpOptions());
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
  
  CustomConsole.log('servicios getProductosPorMarca' ,this.urlInventario, datos, httpOptions());
  return this.http.post<ProductoRequest|any>(this.urlInventario, datos, httpOptions()) ;
} 

getProductosPorCategoria(codCategoria:any){ 
  let datos = {"action": actions.get_all_products_by_category , "_id_cate" : codCategoria,
      "_limit" : [0,100]   
              };
  CustomConsole.log('servicios getProductosPorCategoria' ,this.urlInventario, datos, httpOptions());
  return this.http.post(this.urlInventario, datos, httpOptions()) ;
} 

getProductosPorNombre(texto:string , limit?:any  ){
  let datos  = {"action": actions.get_all_products_by_name ,"_dato_busqueda" : texto ,
    "_limit" : limit
  }; 
  CustomConsole.log('servicios getProductosPorMarca' ,this.urlInventario, datos, httpOptions());
  return this.http.post(this.urlInventario, datos, httpOptions()) ;
} 

getProductosPorMarca(codMarca : any){ 
  let datos = {"action": actions.get_all_products_by_brand , "_id_brand" :codMarca,
      "_limit" : [0,100] 
              };
  CustomConsole.log('servicios getProductosPorMarca' ,this.urlInventario, datos, httpOptions());
  return this.http.post(this.urlInventario, datos, httpOptions()) ;
} 

getProductoById(idprd:any):Observable<ProductoRequest|any>{ 
  
  let  datos = {"action": actions.buscarProducto ,
    "_id_producto" : idprd 
   };

  CustomConsole.log('servicios getProductosCodBarrasVCnt' ,this.urlInventario, datos, httpOptions());
  return this.http.post<Observable<ProductoRequest|any>>(this.urlInventario, datos, httpOptions()) ;
}


getProductoExtistenciaDocById(idprd:any , orden:number):Observable<ProductoExitenciaRequest|any>{ 
  
  let  datos = {"action": actions.buscarExistenciaProducto ,
    "_id_producto" : idprd ,
    "_orden_documento" : orden 
   };

  CustomConsole.log('servicios getProductosCodBarrasVCnt' ,this.urlInventario, datos, httpOptions());
  return this.http.post<Observable<ProductoExitenciaRequest|any>>(this.urlInventario, datos, httpOptions()) ;
}
 
getProductoByIdOrCodBarra(idprd:any):Observable<ProductoRequest|any>{ 
  
  let  datos = {"action": actions.buscarProductoCodBarras ,
    "_id_producto" : idprd 
   };

  CustomConsole.log('servicios getProductosCodBarrasVCnt' ,this.urlInventario, datos, httpOptions());
  return this.http.post<Observable<ProductoRequest|any>>(this.urlInventario, datos, httpOptions()) ;
}
// #endregion
 
}

