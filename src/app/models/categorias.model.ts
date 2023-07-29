import { Categoria } from "../interfaces/categoria.interface";

 
export class CategoriasModel { 
  id!:number; 
  letra!:string; 
  nombre!:string; 
  descripcion!:string; 
  tipo!:string;
  contador?:number;
  tipoDescripcion ?:string;
  constructor( cat: Categoria){
    if (typeof (cat) !== 'undefined' ){
    this.id = cat.id ;
    this.letra= cat.letra; 
    this.nombre= cat.nombre; 
    this.descripcion = cat.descripcion ; 
    this.tipo= cat.tipo;
    this.tipoDescripcion= cat.tipoDescripcion ;
  this.contador = cat.contador;
  }
  }
} 