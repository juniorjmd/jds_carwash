import { ActividadesDescuentoModel } from "../models/actividadesDescuentoModel";
import { CarteraModel } from "../models/cartera/cartera.model";
import { CategoriasModel } from "../models/categorias.model";
import { ClientesModel } from "../models/clientes/clientes.module";
import { CntClasesModel } from "../models/cnt-clases/cnt-clases.module";
import { CntCuentaMModel } from "../models/cnt-cuenta-m/cnt-cuenta-m.module";
import { CntGruposModel } from "../models/cnt-grupos/cnt-grupos.module";
import { CntOperacionesModel } from "../models/cnt-operaciones/cnt-operaciones.module";
import { CntSubCuentaModel, vwCntSubCuentaModel } from "../models/cnt-sub-cuenta/cnt-sub-cuenta.module";
import { DescuentoModule } from "../models/descuento/descuento.model";
import { EmpleadoModel } from "../models/empleados/empleados.module";
import { MarcasModel } from "../models/marcas/marcas.module";
import { ParametrosModel } from "../models/parametros/parametros.model";
import { PresentacionPrdModel } from "../models/presentacionPrdModel";
import { ProductoModel } from "../models/producto/producto.module";
import { TransaccionesModel, vwTransaccionesModel } from "../models/transacciones/transacciones.module";
import { cajaModel } from "../models/ventas/cajas.model";
import { DocumentosComprasModel, DocumentosModel } from "../models/ventas/documento.model";
import { establecimientoModel } from "../models/ventas/establecimientos.model";

export interface ProductoRequest { 
  data: ProductoModel[]; 
  producto: ProductoModel; 
  query: string;
  numdata: number;
  error: string;
}

export interface ProductoExitenciaRequest { 
  data: {idProducto:any , existencia:number , idBodega:number};  
  query: string;
  numdata: number;
  error: string;
}


export interface DocumentoCompraRequest { 
  data: {objeto: DocumentosComprasModel}[];
  query: string;
  numdata: number;
  error: string;
}
export interface DocumentoRequest { 
  data: {objeto: DocumentosModel}[];
  query: string;
  numdata: number;
  error: string;
}
export interface DescuentoRequest { 
  data:   DescuentoModule[];
  query: string;
  numdata: number;
  error: string;
}


export interface actividadesRequest { 
  data:   ActividadesDescuentoModel[];
  query: string;
  numdata: number;
  error: string;
}


export interface actividadesDetalleRequest { 
  data:  any[] ;
  query: string;
  numdata: number;
  error: string;
}

export interface DocumentoCierreRequest { 
  data: { documentoFinal: DocumentosModel };
  query?: string;
  numdata?: number;
  error: string;
}
export interface CarteraRequest { 
  data: CarteraModel[];
  query?: string;
  numdata?: number;
  error: string;
} 


export interface clienteRequest { 
  data: ClientesModel[];
  query: string;
  numdata: number;
  error: string;
}
export interface cajaRequest { 
  data: cajaModel[];
  query: string;
  numdata: number;
  error: string;
}

export interface cntClaseRequest { 
  data: CntClasesModel[];
  query: string;
  numdata: number;
  error: string;
}
export interface cntGrupoRequest { 
  data: CntGruposModel[];
  query: string;
  numdata: number;
  error: string;
}
export interface empleadoRequest { 
  data: EmpleadoModel[];
  query: string;
  numdata: number;
  error: string;
}

export interface parametroRequest { 
  data: ParametrosModel[];
  query: string;
  numdata: number;
  error: string;
}
export interface cntCuentaMayorRequest { 
  data: CntCuentaMModel[];
  query: string;
  numdata: number;
  error: string;
}
export interface cntSubCuentaRequest { 
  data: CntSubCuentaModel[]|vwCntSubCuentaModel[];
  query: string;
  numdata: number;
  error: string;
}



export interface cntSubCuentaVwRequest { 
  data: vwCntSubCuentaModel[];
  query: string;
  numdata: number;
  error: string;
}


export interface cntOperacionesRequest { 
  data: CntOperacionesModel[] ;
  query: string;
  numdata: number;
  error: string;
}


export interface cntTipDocOperacionesRequest { 
  data: {"tipoDocumentoFinal":number , "nombreTipoDocumentoFinal":string}[] ;
  query: string;
  numdata: number;
  error: string;
}
export interface cntDocOperacionesRequest { 
  data: {"idDocumento":number , "idDocumentoFinal":string}[] ;
  query: string;
  numdata: number;
  error: string;
}
export interface cntTransaccionesRequest { 
  data: TransaccionesModel[] |vwTransaccionesModel[];
  query: string;
  numdata: number;
  error: string;
}

export interface categoriaRequest { 
  data: CategoriasModel[] ;
  query: string;
  numdata: number;
  error: string;
}

export interface marcaRequest { 
  data: MarcasModel[] ;
  query: string;
  numdata: number;
  error: string;
}
export interface establecimientosRequest { 
  data: establecimientoModel[] ;
  query: string;
  numdata: number;
  error: string;
}
export interface presentacionPrdRequest { 
  data: PresentacionPrdModel[] ;
  query: string;
  numdata: number;
  error: string;
}