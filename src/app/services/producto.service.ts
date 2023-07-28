import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loading } from 'src/app/models/app.loading';
import { DocumentoListado } from '../interfaces/documento.interface';
import { OdooPrd } from '../interfaces/odoo-prd';
import { Usuarios } from '../interfaces/usuario.interface';
import { actions } from '../models/app.db.actions';
import { PROCEDURE, TABLA } from '../models/app.db.tables';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { AuxIngresoInventarioModule } from '../models/aux-ingreso-inventario/aux-ingreso-inventario.module';
import { DocumentosModel } from '../models/documento.model';
import { ProductoModule } from '../models/producto/producto.module';
import { UsuarioModel } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient ,
    private loading : loading ){ 
    console.log('servicios productos inicializado');  
}
getTiposDeDocumentos(){
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.tiposDeDocumentos
              };
  console.log('servicios de usuarios activo - getCategorias' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 

getbodegas(){
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.prd_bodegas_inventario
              };
  console.log('servicios de usuarios activo - getbodegas' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 

getCategorias(){
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.categorias
              };
  console.log('servicios de usuarios activo - getCategorias' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 


getCategorias_marcas(){
  let datos = {"action": actions.actionSelects ,
               "_tablas" : [vistas.categorias , vistas.marcas]
              };
  console.log('servicios de productos activo - getCategorias_marcas' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
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

  console.log('servicios getProductosCodBarrasVCnt' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 
 
getProductosCodBarras(codPrd){
  let where = [{"columna" : "barcode" , "tipocomp" : '=' , "dato" : codPrd , "relacion" : 'or'  },
  {"columna" : "id" , "tipocomp" : '=' , "dato" : codPrd , "relacion" : 'or' },
  {"columna" : "idProducto" , "tipocomp" : '=' , "dato" : codPrd , "relacion" : 'or' }  
]
  let datos = {"action": actions.actionSelect , "_tabla" : vistas.productos,  "_where" : where  
              };
  console.log('servicios getProductosCodBarrasVCnt' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 
 
 
getPrecarguePorBodega(bodega:number){
  let where = [{"columna" : "bodega" , "tipocomp" : '=' , "dato" : bodega   } ]
  let datos = {"action": actions.actionSelectPorUsuario ,
   "_tabla" : vistas.aux_ingreso_inventario,  "_where" : where , "_columnaUsuario": 'cod_usuario' };

 


  console.log('servicios getProductosExistencia' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 

/**  arraydatos =  {  
            "codContador" : contador.codContador  ,
            "establecimiento" : contador.establecimiento,
            "tipoContador" : contador.tipoContador ,
            "desde" : contador.desde ,
            "hasta" : contador.hasta ,
            "USUARIO_LOGUEADO" : '0',
        }
            datos = {"action": actions.actionProcedure ,
            "_procedure" : PROCEDURE.insertaContador,
            "_arraydatos" : arraydatos
           }; */


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
  console.log('servicios CERRAR_INVENTARIO' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 

borrarPrecarguePorBodega(bodega:number){
  let datos = {"action": actions.action_cancelar_inventario , "_bodega_ingreso" : bodega };
  console.log('servicios getProductosExistencia' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 

getProductosExistencia(codPrd:ProductoModule){
  let where = [{"columna" : "idProducto" , "tipocomp" : '=' , "dato" : codPrd.id    } ]
  let datos = {"action": actions.actionSelect , "_tabla" : vistas.prd_inventario,  "_where" : where  
              };
  console.log('servicios getProductosExistencia' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 
getProductosPorCategoria(codCategoria){
  let where = [{"columna" : "idCategoria" , "tipocomp" : '=' , "dato" : codCategoria  }]
  let datos = {"action": actions.actionSelect , "_tabla" : vistas.productos,
      "_limit" : [0,100] , "_where" : where  
              };
  console.log('servicios getProductosPorCategoria' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 
 
getProductosGeneral(limit?:any[]  ){
  let datos;
  if( limit.length > 0 ){
      datos   = {"action": actions.actionSelect , "_tabla" : vistas.productos,
  "_limit" : limit  
          };}else{
      datos = {"action": actions.actionSelect , "_tabla" : vistas.productos,
              };
  }
  
  console.log('servicios getProductosPorMarca' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
}  
/*let where = [{"columna" : "id" , "tipocomp" : '=f' , "dato" :  "getIdTipoEmpleado('cleaner')"  }]
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.empleados,
               "_where" : where , 
               "_columnas" : ['objeto']   ,
               "_obj" : ['objeto'],             
              };*/


getProductosPorMarca(codMarca){
  let where = [{"columna" : "idMarca" , "tipocomp" : '=' , "dato" : codMarca  }]
  let datos = {"action": actions.actionSelect , "_tabla" : vistas.productos,
      "_limit" : [0,100] , "_where" : where  
              };
  console.log('servicios getProductosPorMarca' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 


getProductosPorNombre(texto:string , limit?:any[] ){
  let datos ;
  let where = [{"columna" : "nombre" , "tipocomp" : 'like' , "dato" : texto  }]
  if( limit.length > 0 ){ 
    datos = {"action": actions.actionSelect , "_tabla" : vistas.productos,
      "_limit" : limit , "_where" : where  
              }; }
              else{
                  datos = {"action": actions.buscarProducto  , "_tabla" : vistas.productos,
                    "_where" : where  
              };  
              }
  console.log('servicios getProductosPorMarca' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
} 
//actionStockMoveDevolucion

guardarPrdCompra(producto :ProductoModule , documentoActivo:DocumentosModel ){

  let datos = {"action": actions.action_insertar_producto_venta , 
  "_producto_enviado" : producto , 
  '_documento' : documentoActivo
};
  console.log('servicios guardarPrdCompra' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
}
guardarNuevoProducto(producto :ProductoModule  ){

  let datos = {"action": actions.action_insertar_new_producto , 
  "_producto_enviado" : producto  
};
  console.log('servicios guardarPrdCompra' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
}

guardarNuevoProductoPrecargue( precargue :AuxIngresoInventarioModule ){

  let datos = {"action": actions.action_ingreso_precargue , 
  "_ingreso" : precargue  
};
  console.log('servicios guardarNuevoProductoPrecargue' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
}

devolverPrdCompra(producto : DocumentoListado  ){

  let datos = {"action": actions.devolver_producto_venta , 
  "_producto_enviado" : producto  
};
  console.log('servicios getProductosCodBarrasVCnt' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos, httpOptions()) ;
}
}

