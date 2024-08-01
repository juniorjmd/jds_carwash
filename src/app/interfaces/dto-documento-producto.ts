import { DocumentosModel } from "../models/ventas/documento.model";
import { ProductoModel } from "../models/producto/producto.module";

export interface DtoDocumentoProducto {
    documento:DocumentosModel,
    producto?:ProductoModel
}
