import { Time } from "@angular/common"; 
import { Clientes } from "../../interfaces/clientes.interface";
import { DocumentoImpuestos, DocumentoListado } from "../../interfaces/documento.interface";
import { DocpagosModel } from "./pagos.model";
import { cajaModel } from "./cajas.model";
import { cajasServices } from "src/app/services/Cajas.services";
import { vwsucursal } from "../app.db.interfaces";

export class DocumentosModel {
        orden!:number;
        tipoDocumentoFinal!:string;
        descripcion1?:string; 
        descripcion2?:string;  
        idDocumentoFinal!:string;
        establecimiento!:number;
        caja?:number;
        cantidadVendida!:number;
        valorParcial!:number;
        descuento!:number;
        valorIVA!:number;
        valorTotal!:number;
        totalFactura!:number;
        ajusteAlpeso!:number;
        fecha!:Date;
        hora!:Time;
        usuario!:number;
        estado!:number;
        idCierre?:number; 
        pago_iva?:number;
        tipoDeVenta!:number;
        estadoFactura!:number;
        fecha_entrega?:Date;
        porc_retefuente?:number;
        retefuente?:number;
        remisiones?:number;
        cod_orden_compra!:string;
        COSTOS?:number;
        cod_vendedor?:number ;
        cliente?: number;
        nombreEsta?:string;
        nombreCaja?:string;
        vendedorNombre?:string;
        clienteNombre?:string;
        nombreDocumento?:string;  
        idStockOdooPrnc?:number; 
        nameStockOdooPrnc?:string;
        idStockOdooPOS?:number;
        nameStockOdooPOS?:string;
        idStockOdooVtl?:number;
        nameStockOdooVtl?:string;  
        clienteobj?: Clientes ;
        idConsecutivo?:number;
        estadoContador?:number;
        consecutivoDesde?:number;
        consecutivoHasta?:number;
        tipoContador?:number;
        nombreEstadoContador?:string;
        nombreTipoContador?:string;
        resolucion?:string;
        fechaInicioResolucion?:number|Date;
        fechaFinResolucion?:number|Date;
        nombreUsuarioResolucion ?:string; 
        sucursal?:vwsucursal;  
        campo_info_1?:string;
        campo_info_2?:string;
        campo_info_3?:string;
        campo_info_4?:string;
        campo_info_5?:string;
        campo_auxiliar_1:number = 0;  
        campo_auxiliar_2:number=0; 
        campo_auxiliar_3:number = 0; 
        campo_auxiliar_4:number = 0; 
        campo_auxiliar_5:number = 0; 
        campo_auxiliar_6:number = 0;
        
        cajaObj : cajaModel[];
        impuestos :DocumentoImpuestos[];
        listado :DocumentoListado[] = [];
        pagos :DocpagosModel[]; 

         // Método para generar el HTML de la tirilla de punto de venta
     constructor(){
        
        this.cajaObj = []
        this.impuestos = []
        this.listado = []
        this.pagos = []
     }
}

export interface arrRetorno {
    id:number,
    cnt:number
}
export interface documentoDev{
    idDocF:string,
    idEsta:number,
    exedente:number,
    payReturn:arrRetorno[],
    pdrReturn:arrRetorno[]
}
export interface cntPorPagar {  "cuotas": number,
    "plazos": number,
    "comprobante": number,
    "totalAbonos": number,
    "totalActual": number,
    "abonoInicial": number,
    "totalPagado": number,
    "valorInicial": number,
    "idCuentaPorPagar": number,
    "fecha_ultimo_abono": Date}
export class DocumentosComprasModel  extends DocumentosModel{
    cuentaPorPagar ?:cntPorPagar 
}
export class DevolucionModel extends DocumentosModel{
   /**
    * 
      (`jdpsoluc_ver_c11`.`vw_obj_documentos`.`valorTotal` - `jdpsoluc_ver_c11`.`vw_obj_documentos`.`campo_auxiliar_6`) AS `saldo_bono`,
        (CASE (`jdpsoluc_ver_c11`.`vw_obj_documentos`.`valorTotal` - `jdpsoluc_ver_c11`.`vw_obj_documentos`.`campo_auxiliar_6`)
            WHEN 0 THEN 'SinCupo'
            ELSE 'CupoActivo'
        END) AS `estado_bono`,
    */
        saldo_bono:number = 0;
        estado_bono:string = '';
        uso_del_bono:string = '';
}