import { Categoria } from "../interfaces/categoria.interface";
import { ModelBase } from "./ModelBase";

 
export class CategoriasModel extends ModelBase {  
  letra!:string; 
  nombre!:string; 
  descripcion!:string; 
  tipo!:string;
  contador?:number;
  tipoDescripcion ?:string;
  idPadreCategoria ?:number;
  idCuentaContable?:number;
  NombreCuentaContable?:string;
  
  id_actividad?:number;
    

    constructor( cat: Categoria|null){

        super();
        if (typeof (cat) !== 'undefined' ){
        this.id = cat?.id ;
        this.letra= cat?.letra!; 
        this.nombre= cat?.nombre!; 
        this.descripcion = cat?.descripcion! ; 
        this.tipo= cat?.tipo!;
        this.tipoDescripcion= cat?.tipoDescripcion ;
        this.contador = cat?.contador;
        this.idCuentaContable = cat?.idCuentaContable;
        this.NombreCuentaContable =   cat?.NombreCuentaContable;
      } } 
} 