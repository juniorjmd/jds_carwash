
export class pagosModel{
   idMedioDePago !:number ; 
   valorPagado!:number ; 
   nombreMedio?:string;

    } 
    export class DocpagosModel{
    id ?:number ; 
    idDocumento !:number ; 
    nombreMedio ?:string ; 
    idMedioDePago !:number ; 
    valorPagado :number = 0; 
    valorTotalAPagar :number = 0 ; 
    valorRecibido :number = 0 ; 
    vueltos :number  = 0; 
    referencia!:string ;
    refDoc!:string ;
    soloLectura:boolean = false ;
   }