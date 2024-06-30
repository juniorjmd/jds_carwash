import { ClientesModule } from "../models/clientes/clientes.module";
import { ProductoModule } from "../models/producto/producto.module";

export interface ProductoRequest { 
  data: ProductoModule[];
  query: string;
  numdata: number;
  error: string;
}


export interface clienteRequest { 
  data: ClientesModule[];
  query: string;
  numdata: number;
  error: string;
}