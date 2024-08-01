import { ModelBase } from "./ModelBase"

export class ActividadesDescuentoModel extends ModelBase {
 
  public nombre?: string;
  public descripcion?: string;
  public fechaInicial?: Date;
  public fechaFinal?: Date;
  public tipo: string = 'PRD';  

   nombreDescuento?: string;  cantidad?:number ;
    tipoDescuento?: string;
  constructor() {  
    super();
  }

}
