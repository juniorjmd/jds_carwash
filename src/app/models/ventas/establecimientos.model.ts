 
import { Establecimientos } from "../../interfaces/establecimientos.interface";

export class establecimientoModel{
    id!:number;
    nombre!:string ;
    descripcion!:string ;
    tipo!:number ;
    fecha_creacion!:Date ;
    usuario_creacion!:number ;
    estado!:number ;
    nombreTipo ?:string ;
    nombreEstado ?:string ;
    nombreUsuario ?:string ;
    idAuxiliar?:number ; 
    nombreAuxiliar?:string ; 
    idBodegaStock?:number ; 
    idBodegaVitual?:number ;
    NameBodegaStock?:string ;
    NameBodegaVirtual?:string ;
    estockExistencia?:number ;
    bodegaInventarioPgm?:number;
    NameBodegaExistencia?:string ; 
    
    
    nombreCCntCompras:string = ''; 
    nombreCCntCCobrar:string  = '';  
    nombreCCntCPagar:string  = '';
    idCCntCompras:number = 0;
    idCCntCCobrar:number = 0;
    idCCntCPagar:number = 0; 
    
    idCCntIngDifBonoRegalo:number = 0; 
    nombreCCntIngDifBonoRegalo:string = ''; 

    nombreCCnttIvaVenta:string  = '';  
    nombreCCntIvaCompra:string  = '';
    idCCntIvaCompra:number = 0;
    idCCnttIvaVenta:number = 0;
    idCCntCostoVenta:number = 0; 
    idCCntVenta:number = 0; 
    nombreCCntCostoVenta:string  = '';  
    nombreCCntVentas:string  = ''; 
    nombreCCntCajaGeneral : string  = ''; 
    idCCntCajaGeneral:number = 0 ;
    constructor(cargaEsta : Establecimientos|undefined){
        this.estado = 0;
        this.tipo = 0;
        this.idAuxiliar = 0;
        this.idBodegaStock = 0;
        this.idBodegaVitual = 0;
        if (typeof (cargaEsta) !== 'undefined' ){
            this.id = cargaEsta.id ; 
            this.nombre = cargaEsta.nombre ;
            this.descripcion  = cargaEsta.descripcion ;
            this.estado  = cargaEsta.estado ; 
            this.tipo  = cargaEsta.tipo ; 
            this.fecha_creacion  = cargaEsta.fecha_creacion ; 
            this.usuario_creacion = cargaEsta.usuario_creacion;
            this.nombreTipo  = cargaEsta.nombreTipo ; 
            this.nombreEstado  = cargaEsta.nombreEstado ; 
            this.nombreUsuario = cargaEsta.nombreUsuario;
            this.idAuxiliar = cargaEsta.idAuxiliar;
            this.nombreAuxiliar = cargaEsta.nombreAuxiliar;
            this.idBodegaStock = cargaEsta.idBodegaStock;
            this.idBodegaVitual = cargaEsta.idBodegaVitual;
            this.NameBodegaStock= cargaEsta.NameBodegaStock;
            this.NameBodegaVirtual = cargaEsta.NameBodegaVirtual;
            this.estockExistencia = cargaEsta.estockExistencia;
            this.NameBodegaExistencia = cargaEsta.NameBodegaExistencia; 
            this.bodegaInventarioPgm = cargaEsta.bodegaInventarioPgm;
            
        } 
    }
}