import { DocumentosModel } from "../models/ventas/documento.model";
import { ProductoModule } from "../models/producto/producto.module";

export interface DtoDocumentoProducto {
    documento:DocumentosModel,
    producto?:ProductoModule
}
