export interface Establecimientos {
    id:number;
    nombre:string ;
    descripcion:string ;
    tipo:number ;
    fecha_creacion:Date ;
    usuario_creacion:number ;
    estado:number ;
//id, nombre, descripcion, tipo, fecha_creacion, usuario_creacion, estado, nombreTipo, nombreEstado, nombreUsuario, idAuxiliar, nombreAuxiliar, idBodegaStock, idBodegaVitual, NameBodegaStock, NameBodegaVirtual
idAuxiliar?:number ; 
nombreAuxiliar?:string ; 
idBodegaStock?:number ; 
idBodegaVitual?:number ;
 NameBodegaStock?:string ;
  NameBodegaVirtual?:string ;
    nombreTipo ?:string ;
    nombreEstado ?:string ;
    nombreUsuario ?:string ; 
    estockExistencia?:number ;
    NameBodegaExistencia?:string ;
    bodegaInventarioPgm?:number;
     
    nombreRetefuenteCompra?:string  ; 
    nombreCCntCCobrar?:string  ;  
    nombreCCntCPagar?:string  ;
    idRetefuenteCompra?:number  ;
    idCCntCCobrar?:number  ;
    idCCntCPagar?:number  ;
 
    idCCntVenta?:number  ;
    nombreCCnttIvaVenta:string   ;  
    nombreCCntIvaCompra:string  ;
    idCCntIvaCompra:number  ;
    idCCnttIvaVenta:number ;
    idCCntCostoVenta:number  ; 
    nombreCCntCostoVenta:string   ; 
    nombreCCntVentas:string   ; 
}
