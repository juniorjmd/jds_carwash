import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { actividadesDetalleRequest, actividadesRequest, categoriaRequest, clienteRequest, DescuentoRequest, DocumentoRequest, marcaRequest, ProductoRequest } from '../interfaces/producto-request';
import { BehaviorSubject } from 'rxjs';
import { ClientesModel } from '../models/clientes/clientes.module';
import { MarcasModel } from '../models/marcas/marcas.module';
import { CategoriasModel } from '../models/categorias.model';
import { ProductoModel } from '../models/producto/producto.module';
import { ActividadesDescuentoModel } from '../models/actividadesDescuentoModel';
import { TABLA } from '../models/app.db.tables';

@Injectable({
  providedIn: 'root'
})
export class ActiDescuentoService {
  
 
  private clientes = new BehaviorSubject<ClientesModel[]|null>(null);
  arrayClientes = this.clientes.asObservable();
  
  private marcas = new BehaviorSubject<MarcasModel[]|null>(null);
  arrayMarcas = this.marcas.asObservable();
  
  private categorias = new BehaviorSubject<CategoriasModel[]|null>(null);
  arrayCategorias = this.categorias.asObservable();
  
  private productos = new BehaviorSubject<ProductoModel[]|null>(null);
  arrayProductos = this.productos.asObservable();


  constructor(private http: HttpClient){}

  setProducto(idProducto:string){
    let arraydatos =  { 
			"id_producto" : idProducto    }
          let  datos = {"action": actions.actionInsert ,
            "_tabla" : TABLA.actividad_det_tmp,
            "_arraydatos" : arraydatos
           };  
       console.log(datos); 
        return this.http.post(url.action , datos, httpOptions()) ;
        
  }
  
  deleteProducto(idProducto:string){ 
    let where =   [{"columna" : "id_producto" , "tipocomp" : "=" , "dato" : idProducto}];
    let datos = {"action": actions.actionDelete ,
    "_tabla" : TABLA.actividad_det_tmp,
    "_where" : where  
   };
    return this.http.post(url.action , datos, httpOptions()) ;
}
  setArrayClientes(sucursal:ClientesModel[]|null){ 
    this.clientes.next(sucursal);
}
setArrayMarcas(marca:MarcasModel[]|null){ 
  this.marcas.next(marca);
}
setArrayCategorias(sucursal:CategoriasModel[]|null){ 
  this.categorias.next(sucursal);
}
setArrayProductos(sucursal:ProductoModel[]|null){ 
  this.productos.next(sucursal);
}

  

createDescuentoActividad(_datosInsert:ActividadesDescuentoModel){
  let datos = {"action": actions.set_actividad_descuento , 
              _datosInsert
   };  
   console.log('createDescuentoActividad', datos);
   
return this.http.post(url.inventario , datos, httpOptions()) ;
}
/**obtener productos, marcar, categorias y clientes disponibles para ingresar a la lista tmp de actividad */
getProductosDisponibles(){ 
  let datos = {"action": actions.actionSelect , 
    _limit: 1000,  
    "_tabla" : vistas.vw_actividad_disponible_producto, 
   }; 
return this.http.post<ProductoRequest>(url.action , datos, httpOptions()) ;
}

getCategoriasDisponibles(){ 
  let datos = {"action": actions.actionSelect , 
    "_tabla" : vistas.vw_actividad_disponible_categoria, 
   }; 
return this.http.post<categoriaRequest>(url.action , datos, httpOptions()) ;
}
getMarcasDisponibles(){ 
  let datos = {"action": actions.actionSelect , 
    "_tabla" : vistas.vw_actividad_disponible_marca, 
   }; 
return this.http.post<marcaRequest>(url.action , datos, httpOptions()) ;
}
getClientesDisponibles(){ 
  let datos = {"action": actions.actionSelect , 
    "_tabla" : vistas.vw_actividad_disponible_cliente, 
   }; 
return this.http.post<clienteRequest>(url.action , datos, httpOptions()) ;
}
/**obtener productos, marcar, categorias y clientes disponibles para ingresar a la lista tmp de actividad */


/**obtener productos, marcar, categorias y clientes  en la lista tmp de actividad */
 
getProductosActividadTmp(){ 
  let datos = {"action": actions.actionSelect ,  
    "_tabla" : vistas.act_det_tmp_producto, 
   }; 
return this.http.post<ProductoRequest>(url.action , datos, httpOptions()) ;
}

getCategoriaActividadTmp(){ 
  let datos = {"action": actions.actionSelect , 
    "_tabla" : vistas.act_det_tmp_categoria, 
   }; 
return this.http.post<categoriaRequest>(url.action , datos, httpOptions()) ;
}

getClienteActividadTmp(){ 
  let datos = {"action": actions.actionSelect ,  
    "_tabla" : vistas.act_det_tmp_cliente, 
   }; 
return this.http.post<clienteRequest>(url.action , datos, httpOptions()) ;
}

getMarcaActividadTmp(){ 
  let datos = {"action": actions.actionSelect ,  
    "_tabla" : vistas.act_det_tmp_marca, 
   }; 
return this.http.post<marcaRequest>(url.action , datos, httpOptions()) ;
}

/**obtener productos, marcar, categorias y clientes en la lista tmp de actividad */
getProductosDisponiblesByName(name:string){ 
  
  let datos = {"action": actions.actionSelect , 
    _limit: 1000,  
    "_tabla" : vistas.vw_actividad_disponible_producto, 
    "_where" : [
      {columna : 'nombre' , tipocomp : 'like' , dato : name , 'relacion' : 'or'},
      {columna : 'nombre2' , tipocomp : 'like' , dato : name , 'relacion' : 'or'},
      {columna : 'nombre3' , tipocomp : 'like' , dato : name}]
   }; 
return this.http.post<ProductoRequest>(url.action , datos, httpOptions()) ;
}


getDescuentos(){ 
  let datos = {"action": actions.actionSelect , 
    "_tabla" : vistas.inv_descuentos, 
   }; 
return this.http.post<DescuentoRequest>(url.action , datos, httpOptions()) ;
}
getActividades(){ 
  let datos = {"action": actions.actionSelect , 
    "_tabla" : vistas.vw_inv_descuentos_actividad,

   };
console.log('abrirCaja activo ' ,url.action , datos, httpOptions());
return this.http.post<actividadesRequest>(url.action , datos, httpOptions()) ;
}

getDetalleActividad(detalle:ActividadesDescuentoModel){ 
  let tabla = '';

  switch(detalle.tipo){
    case 'PRD' : 
       tabla =  vistas.act_det_producto;
    break;
    case 'CAT' : 
        tabla =  vistas.act_det_categoria;
    break;
    case 'CLI' : 
        tabla =  vistas.act_det_cliente;
    break;
    case 'BRD' : 
        tabla =  vistas.act_det_marca;
    break;
  }
  let datos = {"action": actions.actionSelect , 
    "_tabla" : tabla,
    "_where" : [
      {columna : 'id_actividad' , tipocomp : '=' , dato : detalle.id  }]

   };
console.log('getDetalleActividad ' ,url.action , datos, httpOptions());
return this.http.post<actividadesDetalleRequest>(url.action , datos, httpOptions()) ;
}

}
