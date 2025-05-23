import { CntOperacionPrestablecidas } from "../interfaces/traslados_cnt/cnt_operacion_prestablecidas.";

export class TrasladosCuentasModel {

  public  cuentas:TrasladosCuentasArrModel[]=[]
  constructor(public  id:number=0,
    public  nombre:string='',
    public descripcion:string='',
    public tipo:string='',
    public idEstablecimiento:number=0,
 ) { }
  createTraslado( a:CntOperacionPrestablecidas){
    return new TrasladosCuentasModel(a.id , a.nombre_preforma , a.descripcion , a.tipo)
  }

}


export class TrasladosCuentasArrModel {

  id:number=0;
  constructor( public cuenta:number=0,
               public idCuenta:number=0,
               public nombre:string='',
               public tipo:string='',
               public valor:number = 0,
               public saldo:number = 0,
   ) { }
}