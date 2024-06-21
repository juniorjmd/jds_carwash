import { ProductoModule } from "../models/producto/producto.module";

export interface ProductoRequest { 
  data: ProductoModule[];
  query: string;
  numdata: number;
  error: string;
}
