import Swal from "sweetalert2";
import { vwsucursal } from "./app.db.interfaces";
import { DevolucionModel, DocumentosModel } from "./ventas/documento.model";
import { cajasResumenModel } from "./ventas/cajasResumen.model";
import { currencyDollar } from "ngx-bootstrap-icons";
import { Inject, inject, Injectable } from "@angular/core";
import { cajasServices } from "../services/Cajas.services";
import { establecimientoModel } from "./ventas/establecimientos.model";
import { SoporteOperacion } from "../interface/soporte-operacion";
import { DatePipe } from "@angular/common";
import { ResumenVenta } from "../interfaces/resumenVenta.";
import { MovimientoResumen, ReporteMovimientoCuentas } from "../interfaces/reporteMovimientoCuentas.";
import { ResumenCreditos } from "../interfaces/resumenCuentas";
@Injectable({
  providedIn: 'root',
})
export class PrinterManager {
  movimiento!:SoporteOperacion
  resumenVenta!:ResumenVenta
  resumenCreditos!:ResumenCreditos
  resumenCuentas!:ReporteMovimientoCuentas
  private doc :DocumentosModel = new DocumentosModel() ; 
  private docDev :DevolucionModel = new DevolucionModel() ; 
  private static sucursal?: vwsucursal;
  private cierre:cajasResumenModel = new cajasResumenModel();
  private tipoImpresora : String = '';
  private establecimientos :establecimientoModel[] = [] ;
  // private serviceCaja =  inject(cajasServices);
  public establecimiento?:establecimientoModel;
  // Método estático para establecer la sucursal
  public static setSucursal(sucursal: vwsucursal) {
    PrinterManager.sucursal = sucursal;
  }

  constructor(private serviceCaja: cajasServices ) { 
    this.serviceCaja.currentArrEsta.subscribe({next:(value=>{
      //console.log('establecimiento ',value);
      
      if(value) this.establecimientos = value 
    })
  });
   } 


  public printBonoDevolucion(impresoraPos = true) {
      this.tipoImpresora = (impresoraPos)?'POS' : 'NO_POS' ; 
    if(this.docDev.orden ==  undefined){
      Swal.fire('error' , 'no existe un documento a imprimir' , 'error')
  
    }else{ 
      const printContent = this.generateBonoHTML();
      this.openPrintWindows(printContent);
    }
  
  } 
  setDocumentoDevolucion( doc :DevolucionModel ){
    this.docDev =  doc ; 
   }  
  private generateCabeceraBono(){
    let cabecera = ` <div style="text-align: center;">
    <h2>${this.docDev.nombreEsta}</h2>
    <h2>${PrinterManager.sucursal?.nombre_suc}</h2>`; 
      if(PrinterManager.sucursal?.nombre_sucursal_sec.trim() != '')
        cabecera += `<h2>${PrinterManager.sucursal?.nombre_sucursal_sec}</h2> ` 
      cabecera += ` <p>Nit: ${PrinterManager.sucursal?.nit_sucursal}</p>`;
    return cabecera
  } 
  getResolucion():string{
    let HTML =` <div style="text-align: left;">
    <p>Resolución: ${this.doc.resolucion}</p>
    <p>Desde: ${this.doc.consecutivoDesde} Hasta: ${this.doc.consecutivoHasta}</p>
    <p>Fecha: ${this.doc.fechaInicioResolucion} Hasta: ${this.doc.fechaFinResolucion}</p>
  </div>`;
  if (this.doc.resolucion == undefined || this.doc.resolucion! <= ''){HTML='';}
    return HTML;
  } 

  getResolucionBono():string{
    let HTML =` <div style="text-align: left;">
    <p>Resolución: ${this.docDev.resolucion}</p>
    <p>Desde: ${this.docDev.consecutivoDesde} Hasta: ${this.docDev.consecutivoHasta}</p>
    <p>Fecha: ${this.docDev.fechaInicioResolucion} Hasta: ${this.docDev.fechaFinResolucion}</p>
  </div>`;
    return HTML;
  } 
generateBonoHTML(): string {
  let receiptHTML = ''; 
  receiptHTML = (this.tipoImpresora == 'POS')?`<div style="font-family: Arial, sans-serif; width: 300px;"> ` : 
  `<div style="font-family: Arial, sans-serif; width: 100%;"> `;
  receiptHTML += this.generateCabeceraBono() ; 
  receiptHTML += this.infoGeneralBono(); 
  receiptHTML += this.detalleBono();
  receiptHTML += this.totalesBono(); 
  receiptHTML += this.pagosBono() ; 
  receiptHTML += this.footerBono() ; 
  receiptHTML += ` </div> `;

  return receiptHTML;
} 
private infoGeneralBono():string{
  let receiptHTML = '';
  if(this.docDev.nombreDocumento == 'venta' )   receiptHTML += this.getResolucionBono() ;

  let nombreDocumento = "";
     switch(this.docDev.nombreDocumento ){
        case 'venta' : nombreDocumento = "Factura No." ; break;
        case 'cotizacion' : nombreDocumento = "Cotización No."; break;
        case 'gasto' : nombreDocumento = "Gasto No."; break;
        case 'cuentas_por_cobrar' : nombreDocumento = "Venta a credito No."; break;
        case 'remision_cuentas_por_cobrar' : nombreDocumento = "Remision a credito No."; break;
        case 'RecaudosCuentaXCobrar' : nombreDocumento = "Abono a cartera No."; break;
        case 'comprobante_devolucion' : nombreDocumento = "Devolucion No."; break;
     }
     receiptHTML +=`<div> <p>Usuario: ${this.docDev.vendedorNombre}</p>
                          <p>Fecha/Hora: ${this.docDev.fecha}</p>
                          </div><hr>
        <div  >
          <p>${nombreDocumento} ${this.docDev.idDocumentoFinal}</p>
          <p>cliente ${this.docDev.clienteobj!.nombreCompleto!}</p>
        </div>`;
        return receiptHTML;
}
private detalleBono():string{
   
let receiptHTML  = ` <hr> 
<div style="text-align: left;" name="detalleBono"><table  style="font-family: Arial, sans-serif; width: 100%;">`
//console.log('listado',this.docDev.listado);
    this.docDev.listado?.forEach((lista) => {
      const presioVenta = typeof lista.presioVenta === 'number' ? lista.presioVenta : parseFloat(lista.presioVenta??'0');
      const cantidadVendida = typeof lista.cantidadVendida === 'number' ? lista.cantidadVendida : parseFloat(lista.cantidadVendida??'0');
      const descuento = typeof lista.descuento === 'number' ? lista.descuento : parseFloat(lista.descuento??'0');
      const valorTotal = typeof lista.valorTotal === 'number' ? lista.valorTotal : parseFloat(lista.valorTotal??'0');

      receiptHTML += `
       <tr> <th colspan = '4'  style="text-align: left;" >${lista.nombreProducto}</p> </th> </tr>
       <tr><td>Precio </td><td>Cant</td><td>Desc</td><td>Total </td></tr>
       <tr><td>${presioVenta.toFixed(2).padStart(13)} </td>
       <td>${cantidadVendida.toFixed(2).padStart(6)}</td>
       <td>${descuento.toFixed(2).padStart(14)}</td>
       <td>${valorTotal.toFixed(2).padStart(14)} </td></tr> 
       <hr>
      `;
  });
receiptHTML += `</table></div>`

  return receiptHTML; 
} 
private totalesBono():string{
  
  const valorParcial = typeof this.docDev.valorParcial  === 'number' ? this.docDev.valorParcial : parseFloat(this.docDev.valorParcial??'0'); 
  const valorIVA = typeof this.docDev.valorIVA  === 'number' ? this.docDev.valorIVA : parseFloat(this.docDev.valorIVA??'0'); 
  const totalFactura = typeof this.docDev.totalFactura  === 'number' ? this.docDev.totalFactura : parseFloat(this.docDev.totalFactura??'0'); 
 
  return  ` 
  <div style="text-align: right;">
    <p>Valor Parcial: ${valorParcial.toFixed(2)}</p>
    <p>IVA: ${valorIVA.toFixed(2)}</p>
    <p>Total Factura: ${totalFactura.toFixed(2)}</p>
  </div> 
`;
}
private footerBono():string{

  switch(this.docDev.nombreDocumento ){
    case 'venta' : return  ` <div name='footerBono' style="text-align: center;"><p>*** Gracias por su compra ***</p></div>`;
    case 'cotizacion' : return  ` <div name='footerBono' style="text-align: center;"><p>*** Este documento es una cotizacion  ***</p><p>***  esperamos vuelva pronto  ***</p></div>`;
    case 'gasto' : return  ` <div name='footerBono' style="text-align: center;"><p>*** Gracias por su compra ***</p></div>`;
    case 'cuentas_por_cobrar' : return  ` <div name='footerBono' style="text-align: center;"><p>*** Gracias por su compra ***</p></div>`;
    case 'remision_cuentas_por_cobrar' : return  ` <div name='footerBono' style="text-align: center;"><p>*** Gracias por su compra ***</p></div>`;
    case 'RecaudosCuentaXCobrar' : return  ` <div name='footerBono' style="text-align: center;"><p>*** Gracias por su compra ***</p></div>`;
    case 'comprobante_devolucion' : return  ` <div name='footerBono' style="text-align: center;">
    <p>Devolucion generada desde factura #${this.docDev.campo_info_3}, este documento sirve como canje en su totalidad en cualquier otra compra o servicio</p></div>`;
    default:
      return  '' ; 
  }


  
}
private pagosBono():string{
  let html = '';
  const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', 
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 });

  if(this.docDev.pagos?.length! > 0 ){
    html += ` <hr>
     <div style="text-align: left;" name='pagosBono' >
       <p>pagosBono : </p>
       <hr>
       <div style="text-align: left;"><table style="with:100%">`;

        this.docDev.pagos?.forEach((pago) => {
          const valorPagado = typeof pago.valorPagado  === 'number' ? pago.valorPagado : parseFloat(pago.valorPagado??'0'); 
          const valorRecibido = typeof pago.valorRecibido  === 'number' ? pago.valorRecibido : parseFloat(pago.valorRecibido??'0'); 
          const vueltos = typeof pago.vueltos  === 'number' ? pago.vueltos : parseFloat(pago.vueltos??'0'); 

          html += `<tr>
              <td style="width:95%">${pago.nombreMedio!.trim()}</td>
              <td style="    text-align: right;"> ${currencyFormatter.format(valorPagado)}</td></tr>
            `;
            if (valorRecibido> 0) {
              html += `<tr> <td colspan='2'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Recibido ${currencyFormatter.format(valorRecibido)}<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vueltos ${currencyFormatter.format(vueltos) }</p></td></tr>
                `;
            } else {
              html += `
                  <tr> <td colspan='2'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Venta # ==> ${pago.refDoc }</td></tr>
                `;
            }
 });

 html += `</table><hr></div></div>`;
}
  return html;
}



  // Método para imprimir la tirilla de punto de venta
public printClose( cierre:cajasResumenModel){
  this.cierre =  cierre
  const printContent = this.generateCierreHTML();
  //console.log(printContent);
  this.openPrintWindows(printContent);
  }
    generateCierreHTML(): string {


    let receiptHTML = `<div style="font-family: Arial, sans-serif; width: 300px;"> `
    receiptHTML += this.generateCabeceraCierre() ;  
    receiptHTML += this.detalleCierre();  
    receiptHTML += this.footerCierre() ; 
    receiptHTML += ` </div> <style>
    body table td {    font-size: xx-small !important    }
</style>`;

    return receiptHTML;
}
    private generateCabeceraCierre(){
    let cabecera = ` <div style="text-align: center;"> 
    <h2>${PrinterManager.sucursal?.nombre_suc}</h2>`; 
      if(PrinterManager.sucursal?.nombre_sucursal_sec.trim() != '')
        cabecera += `<h2>${PrinterManager.sucursal?.nombre_sucursal_sec}</h2> ` 
      cabecera += ` <p>Nit: ${PrinterManager.sucursal?.nit_sucursal}</p>`;

 cabecera += ` <p>Apertura : ${this.cierre?.NusuarioApertura}</p>
 <p>${this.cierre?.fecha_apertura}</p>
  <p>Cierre : ${this.cierre?.NusuarioCierre}</p>
  <p>${this.cierre?.fecha_cierre}</p> 
 <hr>
 `;

      
    return cabecera
  } 

  private detalleCierre():string{
    const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', 
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 });
  
    return  ` <div name='detalle' style="text-align: left;">
             <p>base           : ${currencyFormatter.format(this.cierre.base)}</p>
             <p>total efectivo : ${currencyFormatter.format(this.cierre?.efectivo)}</p>
             <hr>
             <p>venta    </p>
             <hr>
             <p>&nbsp;&nbsp;&nbsp;&nbsp;Subtotal   : ${currencyFormatter.format(this.cierre?.sub_total_venta)}</p>
             <p>&nbsp;&nbsp;&nbsp;&nbsp;IVA        : ${currencyFormatter.format(this.cierre?.total_iva)}</p>
             <p>&nbsp;&nbsp;&nbsp;&nbsp;Descuentos : ${currencyFormatter.format(this.cierre?.total_descuento)}</p>
             <p>&nbsp;&nbsp;&nbsp;&nbsp;Total      : ${currencyFormatter.format(this.cierre?.total_venta)}</p>
             <hr>
             <p>ventas a credito : ${currencyFormatter.format(this.cierre?.creditos)}</p>
             <p>Gastos           : ${currencyFormatter.format(this.cierre?.total_gastos)}</p>
             <p>Recaudos         : ${currencyFormatter.format(this.cierre?.recaudos)}</p>
                     ${this.pagosCierre()}
    </div>`;
    
  }
private pagosCierre():string{
  const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', 
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 });
  let html = '';
  if(this.cierre.arrPagos != undefined && this.cierre.arrPagos.length > 0 ) {
   html = `<div><hr><p>Pagos</p><table style='width: 100%;' >`; 
  this.cierre.arrPagos.forEach(pago=>{
     html += `<tr><td>${pago.nombrepago} </td><td>:</td> <td>${currencyFormatter.format(pago.total)}</td></tr> `
  })
  html +='</table></div>'
  }
  return html;
}
private footerCierre():string{
  return  ` <div name='footer' style="text-align: center;"><p>*** Gracias***</p></div>`;
}

/**imprimir soporte de cuenta contable */
public printSoporteMovimiento(impresoraPos = true , movimiento:SoporteOperacion) {
  this.tipoImpresora = (impresoraPos)?'POS' : 'NO_POS' ;  
  this.movimiento = movimiento;
    const printContent = this.generateSoporteHTML();
    this.openPrintWindows(printContent);
  

} 
/**imprimir resumen de ventas */
public printResumenCuentas(impresoraPos = true , resumen:ReporteMovimientoCuentas) { 
  this.establecimiento = this.establecimientos[0]
    this.resumenCuentas =  resumen; 
  this.tipoImpresora = (impresoraPos)?'POS' : 'NO_POS' ;   
    const printContent = this.generateRMCHTML();
    this.openPrintWindows(printContent);
} 

public exportResumenCuentas(  resumen:ReporteMovimientoCuentas , nombre:string) { 
  this.establecimiento = this.establecimientos[0]
    this.resumenCuentas =  resumen; 
  this.tipoImpresora =   'NO_POS' ;   
    const printContent = this.generateRMCHTML();
    this.openExcelWindows(printContent , 'ResumenCuentas'+nombre);
} 

/*************************************************************************************************/
generateRMCHTML(): string {

  let receiptHTML = ''; 
  receiptHTML = (this.tipoImpresora == 'POS')?`<div style="font-family: Arial, sans-serif; width: 219.24px;"> ` : 
  `<div style="font-family: Arial, sans-serif; border: 1px solid gray;margin: 10px; border-radius: 10px; padding: 15px;">`;
  receiptHTML += this.generateCabecera() ; 
   
    receiptHTML += this.infoRMCGeneral(); 
    receiptHTML += this.detalleRMC(); 
    receiptHTML += this.footerRMC() ; 
  
  receiptHTML += ` </div> 
  <style>  body table td { font-size: xx-small !important     } </style>`;

  return receiptHTML;
} 

private footerRMC():string{
  return  '<div style="font-size: 10px;margin: 10px;">Documento de soporte de movimiento de una o mas cuentas en un rango de fecha</div>' ; 
}

private detalleRMC():string{
  const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', 
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 });
let receiptHTML  = ` <hr> 
<div style="text-align: left;" name="detalle"> `;

this.resumenCuentas.movimientos?.forEach((movimiento)=>{
  receiptHTML += `<table  style="font-family: Arial, sans-serif; width: 100%; font-size: xx-small;">`;
  receiptHTML +=(this.tipoImpresora != 'POS')? `<tr><th colspan='6'  style=" font-size: small !important ">
  cuenta : ${movimiento.cuenta}   Saldo :${currencyFormatter.format(movimiento.saldo)}  <hr></th></tr><tr>
                  <th>Fecha</th>
                  <th>cliente</th>
                  <th>vendedor</th>
                  <th>operacion</th>
                  <th>débito</th>
                  <th>crédito</th>
                  </tr>` :`<tr><th colspan='3' style=" font-size: small !important ">cuenta : ${movimiento.cuenta}   
                  Saldo :${currencyFormatter.format(movimiento.saldo)}<hr></th></tr>` ;
   movimiento.movimientos.forEach((lista) => {   
    receiptHTML +=(this.tipoImpresora != 'POS')? ` <tr> 
    <td style="text-align: left;" nowrap >${lista.fecha} </td>     
    <td style="text-align: left;" >${lista.tercero} </td>
    <td style="text-align: left;" >${lista.vendedor} </td>
    <td style="text-align: left;" >${lista.operacion} </td>  
    <td style="text-align: right;" >${currencyFormatter.format(lista.debito)}</td>
    <td style="text-align: right;" >${currencyFormatter.format(lista.credito)}</td>
    </tr>     `:`<tr ><td colspan='3'> cuenta : ${lista.operacion} </td></tr>
    <tr><td style="text-align: left;" nowrap >${lista.fecha} </td> 
            <td style="text-align: right;" nowrap >D: ${currencyFormatter.format(lista.debito)}</td>
            <td style="text-align: right;" nowrap >C: ${currencyFormatter.format(lista.credito)}</td>
    </tr>
    `  ;   
});
receiptHTML += `</table ><hr>`;
});
receiptHTML += `</div>`

  return receiptHTML; 
} 
 
private   infoRMCGeneral():string{
  let receiptHTML = ''; 
  const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', 
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 }); 
     receiptHTML += (this.tipoImpresora != 'POS')?
         `<div> 
         <table style='width: 100%;'>
         <tr> 
              <th colspan="4">RESUMEN DE MOVIMIENTO EN CUENTAS CONTABLES</th>  
         </tr>
          <tr> 
              <th>Usuario </th><td  style=" font-size: small !important ">  ${this.resumenCuentas.usuarioGenerador}</td> 
              <th> </th><td>  </td> 
         </tr>
         <tr> <th colspan='4'  style=" font-size: small !important ">${this.resumenCuentas.descripcion} </th> </tr> 
         <tr>
         <th> Desde </th><td  style=" font-size: small !important "> ${this.resumenCuentas.fechaInicial}</td> <th> 
        hasta</th><td  style=" font-size: small !important ">  ${this.resumenCuentas.fechaFinal}</td> 
         </tr> 
         <tr> 
              <th>Débito</th><td style=" font-size: small !important "> ${currencyFormatter.format(this.resumenCuentas.debito)}</td> 
              <th>Crédito</th><td style=" font-size: small !important "> ${currencyFormatter.format(this.resumenCuentas.credito)}</td> 
         </tr>
         <tr> 
              <th>Saldo</th><td style=" font-size: small !important "> ${currencyFormatter.format(this.resumenCuentas.saldo)}</td> 
              <th>Numero de Movimientos</th><td style=" font-size: small !important "> ${ this.resumenCuentas.cantidadMovimientos }</td> 
         </tr>
         </table></div> `:
          `<div>
           <p style=" font-size: small !important ">Usuario: ${this.resumenCuentas.usuarioGenerador}</p> 
           <p style=" font-size: small !important ">Rango: desde el ${this.resumenCuentas.fechaInicial} hasta el  ${this.resumenCuentas.fechaFinal} </p>
                          </div><hr>
        <div  style=" font-size: small !important ">
          <p>${this.resumenCuentas.descripcion}</p>  
               <p>Débito  ${currencyFormatter.format(this.resumenCuentas.debito)} </p>  
              <p>Crédito  ${currencyFormatter.format(this.resumenCuentas.credito)} </p>  
          <p>Saldo  ${currencyFormatter.format(this.resumenCuentas.saldo)} </p>  
            <p>Numero de Movimientos   ${ this.resumenCuentas.cantidadMovimientos } </p>   
        </div><hr>`
        
        ;
        return receiptHTML;
}
/**imprimir resumen de ventas */
public printResumenVenta(impresoraPos = true , resumen:ResumenVenta) { 
  this.establecimiento = this.establecimientos[0]
    this.resumenVenta =  resumen; 
  this.tipoImpresora = (impresoraPos)?'POS' : 'NO_POS' ;   
    const printContent = this.generateRVHTML();
    this.openPrintWindows(printContent);
} 
public printResumenCredito(impresoraPos = true , resumen:ResumenCreditos) { 
  this.establecimiento = this.establecimientos[0]
    this.resumenCreditos =  resumen; 
  this.tipoImpresora = (impresoraPos)?'POS' : 'NO_POS' ;   
    const printContent = this.generateResumenCreditosHTML();
    this.openPrintWindows(printContent);
}   
public exportResumenVentas(  resumen:ResumenVenta , nombre:string) { 
  this.establecimiento = this.establecimientos[0]
    this.resumenVenta =  resumen; 
  this.tipoImpresora =   'NO_POS' ;   
    const printContent = this.generateRVHTML();
    this.openExcelWindows(printContent , 'ResumenVentas'+nombre);
} 

public exportResumenCreditos(  resumen:ResumenCreditos , nombre:string) { 
  this.establecimiento = this.establecimientos[0]
    this.resumenCreditos =  resumen; 
  this.tipoImpresora =   'NO_POS' ;   
    const printContent = this.generateResumenCreditosHTML();
    this.openExcelWindows(printContent , 'Resumen '+nombre);
} 
  public printReceipt(impresoraPos = true) {
    this.tipoImpresora = (impresoraPos)?'POS' : 'NO_POS' ; 
    if(this.doc.orden ==  undefined){
      Swal.fire('error' , 'no existe un documento a imprimir' , 'error')
  
    }else{
       this.doc 
      const printContent = this.generateReceiptHTML();
      this.openPrintWindows(printContent);
    }
  
  } 
  setDocumento( doc :DocumentosModel ){
    this.doc =  doc ; 
    if(this.doc.establecimiento != undefined){
     this.establecimiento = this.establecimientos.find( (x:establecimientoModel)=>x.id == this.doc.establecimiento )
    }else{
      this.establecimiento = this.establecimientos[0]
    }

   }  
  private generateCabecera(){
   
    let cabecera = '';
    if (this.tipoImpresora == 'POS'){
      cabecera = ` <div style="text-align: center;">   ` ;
      if(PrinterManager.sucursal?.nombre_sucursal_sec.trim() != '')
        cabecera += `<h2 style="padding: 0px; margin: 0px;">${PrinterManager.sucursal?.nombre_sucursal_sec}</h2> ` ; 

      cabecera += ` <h2 style="padding: 0px; margin: 0px;">${this.establecimiento?.nombre}</h2>  `; 
      cabecera += (this.establecimiento?.nit.trim() == '' )? ` <p style="padding: 0px; margin: 0px;">Nit: ${PrinterManager.sucursal?.nit_sucursal}</p>`: ` <p style="padding: 0px; margin: 0px;">Nit: ${this.establecimiento?.nit}</p>`  ;
    
      cabecera += (this.establecimiento?.direccion.trim() == '' )?  ` <p style="padding: 0px; margin: 0px;"> ${PrinterManager.sucursal?.dir}</p>`:  ` <p style="padding: 0px; margin: 0px;"> ${this.establecimiento?.direccion}</p>` ;
      cabecera += '<p style="padding: 0px; margin: 0px;"> '
      cabecera += (this.establecimiento?.ciudad.trim() == '' )?  ` ${PrinterManager.sucursal?.ciudad} `:  ` ${this.establecimiento?.ciudad} ` ;
      cabecera += ' - '
      cabecera += (this.establecimiento?.tel1.trim() == '' )?  `Tel: ${PrinterManager.sucursal?.tel1}`:  `Tel: ${this.establecimiento?.tel1} ` ;
      cabecera += '</p> '; 

    }else{
      cabecera = `<div><table style='width: 100%;'><tr><td><h2>`;
      if(PrinterManager.sucursal?.nombre_sucursal_sec.trim() != '')
        cabecera +=   PrinterManager.sucursal?.nombre_sucursal_sec + ' - ' ; 

      cabecera += `${this.establecimiento?.nombre}</h2></td> <td></td></tr><tr><td>`;  
      cabecera += `</td> <td></td></tr></div>`; 

      cabecera = `<div >     <table style='width: 100%;'><tr><td><h2  style=" margin: 0;">`;
      if((PrinterManager.sucursal?.nombre_sucursal_sec||'').trim() != '')
        cabecera +=   PrinterManager.sucursal?.nombre_sucursal_sec + ' - ' ; 

      cabecera += `${this.establecimiento?.nombre}</h2>`;  
      cabecera += (this.establecimiento?.nit.trim() == '' )? `Nit: ${PrinterManager.sucursal?.nit_sucursal} `: `Nit: ${this.establecimiento?.nit} `  ;
      cabecera += '<br> '
     cabecera += (this.establecimiento?.ciudad.trim() == '' )?  `${PrinterManager.sucursal?.ciudad} `:  `${this.establecimiento?.ciudad} ` ;
     
      cabecera += (this.establecimiento?.direccion.trim() == '' )?  ` ${PrinterManager.sucursal?.dir} `:  ` ${this.establecimiento?.direccion} ` ;
      cabecera += '<br> '
      cabecera += (this.establecimiento?.tel1.trim() == '' )?  `Tel: ${PrinterManager.sucursal?.tel1}`:  `Tel: ${this.establecimiento?.tel1} ` ;
      
      cabecera += (this.establecimiento?.tel2.trim() == '' )?  `- ${PrinterManager.sucursal?.tel2}`:  `- ${this.establecimiento?.tel2} ` ;
      cabecera += `</td> <td></td></tr><tr><td></td> <td></td></tr></table><hr></div>`; 

    }
    return cabecera
  } 

/*********************************************************************************************** */
generateResumenCreditosHTML(): string {

  let receiptHTML = ''; 
  receiptHTML = (this.tipoImpresora == 'POS')?`<div style="font-family: Arial, sans-serif; width: 219.24px;"> ` : 
  `<div style="font-family: Arial, sans-serif; border: 1px solid gray;margin: 10px; border-radius: 10px; padding: 15px;">`;
  receiptHTML += this.generateCabecera() ;  
  receiptHTML += this.infoRepCreditoGeneral(); 
    receiptHTML += this.detalleRepCredito(); 
    receiptHTML += this.footerRepCredito() ;  
  receiptHTML += ` </div> 
  <style>  body table td { font-size: xx-small !important } </style>`;

  return receiptHTML;
} 
/*************************************************************************************************/
generateRVHTML(): string {

  let receiptHTML = ''; 
  receiptHTML = (this.tipoImpresora == 'POS')?`<div style="font-family: Arial, sans-serif; width: 219.24px;"> ` : 
  `<div style="font-family: Arial, sans-serif; border: 1px solid gray;margin: 10px; border-radius: 10px; padding: 15px;">`;
  receiptHTML += this.generateCabecera() ; 
  if (this.resumenVenta.reporte != undefined &&  this.resumenVenta.reporte == 'devolucion'){
    receiptHTML += this.infoDevGeneral(); 
    receiptHTML += this.detalleDev(); 
    receiptHTML += this.footerDev() ; 
  }else{
    receiptHTML += this.infoRVGeneral(); 
    receiptHTML += this.detalleRV(); 
    receiptHTML += this.footerRV() ; 
  } 
  receiptHTML += ` </div> 
  <style>  body table td { font-size: xx-small !important } </style>`;

  return receiptHTML;
} 
private detalleDev():string{
  const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', 
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 });
let receiptHTML  = ` <hr> 
<div style="text-align: left;" name="detalle">
<table  style="font-family: Arial, sans-serif; width: 100%;"><tr>`;

let cont = 0;
receiptHTML  += (this.tipoImpresora == 'POS')?`<td>` :`<td style="width: 50%; vertical-align: top;">`; 

if(this.resumenVenta.mayorDiaVenta != undefined){
receiptHTML +=`<h5>Dia con mas devoluciones</h5>
<table  style="font-family: Arial, sans-serif; width: 100%;">`;
 
receiptHTML += `<tr><th>FECHA </th><th>CNT</th><th>TOTAL</th></tr>`  ; 
receiptHTML += `<tr><td>${this.resumenVenta.mayorDiaVenta.fecha} </td>
                    <td>${this.resumenVenta.mayorDiaVenta.cantidad}</td>
                    <td style="text-align: right;">${currencyFormatter.format(this.resumenVenta.mayorDiaVenta.totalVendido)}</td></tr>`  ;  
 receiptHTML += `</table>`  ;
}

if(this.resumenVenta.menorDiaVenta != undefined){
  receiptHTML +=`<h5>Dia con menos devoluciones</h5>
  <table  style="font-family: Arial, sans-serif; width: 100%;">`;
   
  receiptHTML += `<tr><th>FECHA </th><th>CNT</th><th>TOTAL</th></tr>`  ; 
  receiptHTML += `<tr><td>${this.resumenVenta.menorDiaVenta.fecha} </td>
                      <td>${this.resumenVenta.menorDiaVenta.cantidad}</td>
                      <td style="text-align: right;">${currencyFormatter.format(this.resumenVenta.menorDiaVenta.totalVendido)}</td></tr>`  ;  
   receiptHTML += `</table>`  ;
  }

  
if(this.resumenVenta.productoMasVendido != undefined){
  receiptHTML +=`<h5>Producto con mas devoluciones</h5>
  <table  style="font-family: Arial, sans-serif; width: 100%;">`;
   
  receiptHTML += `<tr><th>PRODUCTO </th><th>CNT</th><th>TOTAL</th></tr>`  ; 
  receiptHTML += `<tr><td>${this.resumenVenta.productoMasVendido.nombre} </td>
                      <td >${this.resumenVenta.productoMasVendido.cantidad}</td>
                      <td style="text-align: right;">${currencyFormatter.format(this.resumenVenta.productoMasVendido.total)}</td></tr>`  ;  
   receiptHTML += `</table>`  ;
  }

  if(this.resumenVenta.productoMenosVendido != undefined){
    receiptHTML +=`<h5>Producto con menos devoluciones</h5>
    <table  style="font-family: Arial, sans-serif; width: 100%;">`;
     
    receiptHTML += `<tr><th>PRODUCTO </th><th>CNT</th><th>TOTAL</th></tr>`  ; 
    receiptHTML += `<tr><td>${this.resumenVenta.productoMenosVendido.nombre} </td>
                        <td>${this.resumenVenta.productoMenosVendido.cantidad}</td>
                        <td style="text-align: right;">${currencyFormatter.format(this.resumenVenta.productoMenosVendido.total)}</td></tr>`  ;  
     receiptHTML += `</table>`  ;
    }
let arrayStrPrd:string[]=[];
let contPRD = 0;
//listado de dias vendidos
 if  (this.tipoImpresora == 'POS'){ 
    this.resumenVenta.resumen?.forEach((lista) => {  
      cont++;
      receiptHTML += ` <tr> 
      <td style="text-align: left;" >${lista.fecha} </td>     
      <td style="text-align: right;" >${lista.cantidad} </td>
      <td style="text-align: right;" >${currencyFormatter.format(lista.totalVendido)}</td>
      </tr>     `  ;  
    if (cont == 40){
       receiptHTML += ` <tr> <td colspan='4'></td>   </tr><tr> <td colspan='4'></td></tr></table></table></div></div><br>
       <div style="font-family: Arial, sans-serif; border: 1px solid gray;margin: 10px; border-radius: 10px; padding: 15px;">
       ${this.generateCabecera() }${this.infoRVGeneral() }<div style="text-align: left;border-top: 1px solid black;" name="detalle"> 
       <table style="font-family: Arial, sans-serif; width: 100%;"><tbody><tr><td style="width: 50%; vertical-align: top;"></td><td>   `  
        ;
      receiptHTML +=`<h5>Resumen de devoluciones</h5> 
               <table  style="font-family: Arial, sans-serif; width: 100%;">
               <tr><th>FECHA </th><th>CANTIDAD</th><th>TOTAL</th></tr>`  ;
               cont = 0 ;  }
  }); 
  receiptHTML += `</table>`;
   if(this.resumenVenta.productos != undefined){
  
    receiptHTML +=`<h5>Resumen de devoluciones</h5>
    <table  style="font-family: Arial, sans-serif; width: 100%;">`;
     
     receiptHTML += `<tr><th>PRODUCTO </th><th>CNT</th><th>TOTAL</th></tr>`  ;
    
        this.resumenVenta.productos?.forEach((lista) => {  
          receiptHTML += ` <tr> 
          <td style="text-align: left;" >${lista.nombre} </td>     
          <td style="text-align: right;" >${lista.cantidad} </td>
          <td style="text-align: right;" >${currencyFormatter.format(lista.total)}</td>
          </tr>  
         `;
         if (cont == 40){
          receiptHTML += ` <tr> <td colspan='3'></td>   </tr><tr> <td colspan='3'></td></tr></table></table></div></div><br>
          <div style="font-family: Arial, sans-serif; border: 1px solid gray;margin: 10px; border-radius: 10px; padding: 15px;">
          ${this.generateCabecera() }${this.infoRVGeneral() }<div style="text-align: left;border-top: 1px solid black;" name="detalle"> 
          <table style="font-family: Arial, sans-serif; width: 100%;"><tbody><tr><td style="width: 50%; vertical-align: top;"></td><td>   `  
           ;
         receiptHTML +=`<h5>Resumen de devoluciones</h5> 
                  <table  style="font-family: Arial, sans-serif; width: 100%;">
                  <tr><th>PRODUCTO </th><th>CNT</th><th>TOTAL</th></tr>`  ;
                  cont = 0 ;  }   
      });
      
    receiptHTML += `</table>`
    }
   
 }else{ 
  let htmlPrd = '' 
  if(this.resumenVenta.productos != undefined){ 
        cont = 18; 
        this.resumenVenta.productos?.forEach((lista) => {
             cont++
          htmlPrd += `<tr><td style="text-align: left;" >${lista.nombre} </td><td style="text-align: right;" >${lista.cantidad}
           </td><td style="text-align: right;" >${currencyFormatter.format(lista.total)}</td></tr>`;
         if (cont == 40){
          htmlPrd =`<h5>Resumen de productos devueltos</h5>
          <table  style="font-family: Arial, sans-serif; width: 100%;">
          <tr><th>PRODUCTO </th><th>CNT</th><th>TOTAL</th></tr>
          ${htmlPrd}</table>`; 
          arrayStrPrd.push(htmlPrd); 
          htmlPrd = ''
                  cont = 0 ;  }   
      });

      
      if (cont > 0){
        
        htmlPrd =`<h5>Resumen de productos devueltos</h5>
        <table  style="font-family: Arial, sans-serif; width: 100%;">
        <tr><th>PRODUCTO </th><th>CNT</th><th>TOTAL</th></tr>
        ${htmlPrd}</table>`; 
        arrayStrPrd.push(htmlPrd); 
        cont = 0 ;  }   
    }
    //console.log('arrayStrPrd',arrayStrPrd);

    this.resumenVenta.resumen?.forEach((lista , index) => {  
      if(cont==0){
        receiptHTML +=  (arrayStrPrd[contPRD]!= undefined)? `${arrayStrPrd[contPRD]}`:``;
        receiptHTML +=`</td><td style="width: 50%; vertical-align: top;"><h5>Resumen de devoluciones</h5> 
        <table  style="font-family: Arial, sans-serif; width: 100%;">
        <tr><th>FECHA </th><th>CANTIDAD</th><th>TOTAL</th></tr>`  ;
        contPRD++;
      }
      cont++;
      receiptHTML += ` <tr> 
      <td style="text-align: left;" >${lista.fecha} </td>     
      <td style="text-align: right;" >${lista.cantidad} </td>
      <td style="text-align: right;" >${currencyFormatter.format(lista.totalVendido)}</td>
      </tr>     `  ;  
    if (cont == 40){

       receiptHTML +=(this.resumenVenta.resumen[index+1] != undefined)? ` <tr> <td colspan='4'></td></tr>
       <tr> <td colspan='4'></td></tr></table></table></div></div><br> 
       <div style="font-family: Arial, sans-serif; border: 1px solid gray;margin: 10px; border-radius: 10px; padding: 15px;">
       ${this.generateCabecera() }${this.infoRVGeneral() }<div style="text-align: left;border-top: 1px solid black;" name="detalle">  
       <table style="font-family: Arial, sans-serif; width: 100%;"><tbody><tr><td style="width: 50%; vertical-align: top;">   ` : ''; 
        cont = 0 ; 
      }
  });
}
//alert(contPRD +'-'+ arrayStrPrd.length + '--' + cont)
if(contPRD < (arrayStrPrd.length) ) {
   for (let i=contPRD ; i< arrayStrPrd.length ; i++ ){
    receiptHTML += ` <tr> <td colspan='4'></td>   </tr><tr> <td colspan='4'></td></tr></table></table></div></div><br> 
    <div style="font-family: Arial, sans-serif; border: 1px solid gray;margin: 10px; border-radius: 10px; padding: 15px;">
    ${this.generateCabecera() }${this.infoRVGeneral() }<div style="text-align: left;border-top: 1px solid black;" name="detalle">  
    <table style="font-family: Arial, sans-serif; width: 100%;"><tbody><tr><td style="width: 50%; vertical-align: top;">  
    ${arrayStrPrd[contPRD]}<br><br><br></td><td style="width: 50%; vertical-align: top;">
            <h5>Resumen de devoluciones</h5> 
            <table  style="font-family: Arial, sans-serif; width: 100%;">
            <tr><th>FECHA </th><th>CANTIDAD</th><th>TOTAL</th></tr> `
     ;
   }
}
if(cont> 0 ){receiptHTML += `</table>`}
receiptHTML += `</td></tr></table></div>` 
  return receiptHTML; 
} 
private detalleRV():string{
  const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', 
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 });
let receiptHTML  = ` <hr> 
<div style="text-align: left;" name="detalle">
<table  style="font-family: Arial, sans-serif; width: 100%;"><tr>`;

let cont = 0;
receiptHTML  += (this.tipoImpresora == 'POS')?`<td>` :`<td style="width: 50%; vertical-align: top;">`; 

if(this.resumenVenta.mayorDiaVenta != undefined){
receiptHTML +=`<h5>Dia mas vendido</h5>
<table  style="font-family: Arial, sans-serif; width: 100%;">`;
 
receiptHTML += `<tr><th>FECHA </th><th>CNT</th><th>TOTAL</th></tr>`  ; 
receiptHTML += `<tr><td>${this.resumenVenta.mayorDiaVenta.fecha} </td>
                    <td>${this.resumenVenta.mayorDiaVenta.cantidad}</td>
                    <td style="text-align: right;">${currencyFormatter.format(this.resumenVenta.mayorDiaVenta.totalVendido)}</td></tr>`  ;  
 receiptHTML += `</table>`  ;
}

if(this.resumenVenta.menorDiaVenta != undefined){
  receiptHTML +=`<h5>Dia menos vendido</h5>
  <table  style="font-family: Arial, sans-serif; width: 100%;">`;
   
  receiptHTML += `<tr><th>FECHA </th><th>CNT</th><th>TOTAL</th></tr>`  ; 
  receiptHTML += `<tr><td>${this.resumenVenta.menorDiaVenta.fecha} </td>
                      <td>${this.resumenVenta.menorDiaVenta.cantidad}</td>
                      <td style="text-align: right;">${currencyFormatter.format(this.resumenVenta.menorDiaVenta.totalVendido)}</td></tr>`  ;  
   receiptHTML += `</table>`  ;
  }

  
if(this.resumenVenta.productoMasVendido != undefined){
  receiptHTML +=`<h5>Producto mas vendido</h5>
  <table  style="font-family: Arial, sans-serif; width: 100%;">`;
   
  receiptHTML += `<tr><th>PRODUCTO </th><th>CNT</th><th>TOTAL</th></tr>`  ; 
  receiptHTML += `<tr><td>${this.resumenVenta.productoMasVendido.nombre} </td>
                      <td >${this.resumenVenta.productoMasVendido.cantidad}</td>
                      <td style="text-align: right;">${currencyFormatter.format(this.resumenVenta.productoMasVendido.total)}</td></tr>`  ;  
   receiptHTML += `</table>`  ;
  }

  if(this.resumenVenta.productoMenosVendido != undefined){
    receiptHTML +=`<h5>Producto menos vendido</h5>
    <table  style="font-family: Arial, sans-serif; width: 100%;">`;
     
    receiptHTML += `<tr><th>PRODUCTO </th><th>CNT</th><th>TOTAL</th></tr>`  ; 
    receiptHTML += `<tr><td>${this.resumenVenta.productoMenosVendido.nombre} </td>
                        <td>${this.resumenVenta.productoMenosVendido.cantidad}</td>
                        <td style="text-align: right;">${currencyFormatter.format(this.resumenVenta.productoMenosVendido.total)}</td></tr>`  ;  
     receiptHTML += `</table>`  ;
    }
let arrayStrPrd:string[]=[];
let contPRD = 0;
//listado de dias vendidos
 if  (this.tipoImpresora == 'POS'){ 
    this.resumenVenta.resumen?.forEach((lista) => {  
      cont++;
      receiptHTML += ` <tr> 
      <td style="text-align: left;" >${lista.fecha} </td>     
      <td style="text-align: right;" >${lista.cantidad} </td>
      <td style="text-align: right;" >${currencyFormatter.format(lista.totalVendido)}</td>
      </tr>     `  ;  
    if (cont == 40){
       receiptHTML += ` <tr> <td colspan='4'></td>   </tr><tr> <td colspan='4'></td></tr></table></table></div></div><br>
       <div style="font-family: Arial, sans-serif; border: 1px solid gray;margin: 10px; border-radius: 10px; padding: 15px;">
       ${this.generateCabecera() }${this.infoRVGeneral() }<div style="text-align: left;border-top: 1px solid black;" name="detalle"> 
       <table style="font-family: Arial, sans-serif; width: 100%;"><tbody><tr><td style="width: 50%; vertical-align: top;"></td><td>   `  
        ;
      receiptHTML +=`<h5>Resumen de ventas</h5> 
               <table  style="font-family: Arial, sans-serif; width: 100%;">
               <tr><th>FECHA </th><th>CANTIDAD</th><th>TOTAL</th></tr>`  ;
               cont = 0 ;  }
  }); 
  receiptHTML += `</table>`;
   if(this.resumenVenta.productos != undefined){
  
    receiptHTML +=`<h5>Resumen de productos</h5>
    <table  style="font-family: Arial, sans-serif; width: 100%;">`;
     
     receiptHTML += `<tr><th>PRODUCTO </th><th>CNT</th><th>TOTAL</th></tr>`  ;
    
        this.resumenVenta.productos?.forEach((lista) => {  
          receiptHTML += ` <tr> 
          <td style="text-align: left;" >${lista.nombre} </td>     
          <td style="text-align: right;" >${lista.cantidad} </td>
          <td style="text-align: right;" >${currencyFormatter.format(lista.total)}</td>
          </tr>  
         `;
         if (cont == 40){
          receiptHTML += ` <tr> <td colspan='3'></td>   </tr><tr> <td colspan='3'></td></tr></table></table></div></div><br>
          <div style="font-family: Arial, sans-serif; border: 1px solid gray;margin: 10px; border-radius: 10px; padding: 15px;">
          ${this.generateCabecera() }${this.infoRVGeneral() }<div style="text-align: left;border-top: 1px solid black;" name="detalle"> 
          <table style="font-family: Arial, sans-serif; width: 100%;"><tbody><tr><td style="width: 50%; vertical-align: top;"></td><td>   `  
           ;
         receiptHTML +=`<h5>Resumen de ventas</h5> 
                  <table  style="font-family: Arial, sans-serif; width: 100%;">
                  <tr><th>PRODUCTO </th><th>CNT</th><th>TOTAL</th></tr>`  ;
                  cont = 0 ;  }   
      });
      
    receiptHTML += `</table>`
    }
   
 }else{ 
  let htmlPrd = '' 
  if(this.resumenVenta.productos != undefined){ 
        cont = 18; 
        this.resumenVenta.productos?.forEach((lista) => {
             cont++
          htmlPrd += `<tr><td style="text-align: left;" >${lista.nombre} </td><td style="text-align: right;" >${lista.cantidad} </td><td style="text-align: right;" >${currencyFormatter.format(lista.total)}</td></tr>`;
         if (cont == 40){
          htmlPrd =`<h5>Resumen de productos vendidos</h5>
          <table  style="font-family: Arial, sans-serif; width: 100%;">
          <tr><th>PRODUCTO </th><th>CNT</th><th>TOTAL</th></tr>
          ${htmlPrd}</table>`; 
          arrayStrPrd.push(htmlPrd); 
          htmlPrd = ''
                  cont = 0 ;  }   
      });

      
      if (cont > 0){
        
        htmlPrd =`<h5>Resumen de productos vendidos</h5>
        <table  style="font-family: Arial, sans-serif; width: 100%;">
        <tr><th>PRODUCTO </th><th>CNT</th><th>TOTAL</th></tr>
        ${htmlPrd}</table>`; 
        arrayStrPrd.push(htmlPrd); 
        cont = 0 ;  }   
    }
    //console.log('arrayStrPrd',arrayStrPrd);

    this.resumenVenta.resumen?.forEach((lista , index) => {  
      if(cont==0){
        receiptHTML +=  (arrayStrPrd[contPRD]!= undefined)? `${arrayStrPrd[contPRD]}`:``;
        receiptHTML +=`</td><td style="width: 50%; vertical-align: top;"><h5>Resumen de ventas</h5> 
        <table  style="font-family: Arial, sans-serif; width: 100%;">
        <tr><th>FECHA </th><th>CANTIDAD</th><th>TOTAL</th></tr>`  ;
        contPRD++;
      }
      cont++;
      receiptHTML += ` <tr> 
      <td style="text-align: left;" >${lista.fecha} </td>     
      <td style="text-align: right;" >${lista.cantidad} </td>
      <td style="text-align: right;" >${currencyFormatter.format(lista.totalVendido)}</td>
      </tr>     `  ;  
    if (cont == 40){

       receiptHTML +=(this.resumenVenta.resumen[index+1] != undefined)? ` <tr> <td colspan='4'></td>   </tr><tr> <td colspan='4'></td></tr></table></table></div></div><br> 
       <div style="font-family: Arial, sans-serif; border: 1px solid gray;margin: 10px; border-radius: 10px; padding: 15px;">
       ${this.generateCabecera() }${this.infoRVGeneral() }<div style="text-align: left;border-top: 1px solid black;" name="detalle">  
       <table style="font-family: Arial, sans-serif; width: 100%;"><tbody><tr><td style="width: 50%; vertical-align: top;">   ` : ''; 
        ;

        cont = 0 ; 
      }
  });
}
//alert(contPRD +'-'+ arrayStrPrd.length + '--' + cont)
if(contPRD < (arrayStrPrd.length) ) {
   for (let i=contPRD ; i< arrayStrPrd.length ; i++ ){
    receiptHTML += ` <tr> <td colspan='4'></td>   </tr><tr> <td colspan='4'></td></tr></table></table></div></div><br> 
    <div style="font-family: Arial, sans-serif; border: 1px solid gray;margin: 10px; border-radius: 10px; padding: 15px;">
    ${this.generateCabecera() }${this.infoRVGeneral() }<div style="text-align: left;border-top: 1px solid black;" name="detalle">  
    <table style="font-family: Arial, sans-serif; width: 100%;"><tbody><tr><td style="width: 50%; vertical-align: top;">  
    ${arrayStrPrd[contPRD]}<br><br><br></td><td style="width: 50%; vertical-align: top;">
            <h5>Resumen de ventas</h5> 
            <table  style="font-family: Arial, sans-serif; width: 100%;">
            <tr><th>FECHA </th><th>CANTIDAD</th><th>TOTAL</th></tr> `
     ;
   }
}
if(cont> 0 ){receiptHTML += `</table>`}
receiptHTML += `</td></tr></table>`



receiptHTML += `</div>`

  return receiptHTML; 
} 
private detalleRepCredito():string{
  const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', 
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 });
let receiptHTML  = ` <hr> 
<div style="text-align: left;" name="detalle">
<table  style="font-family: Arial, sans-serif; width: 100%;"><tr>`; 
let cont = 0;
receiptHTML  +=`<td>`  ;  
if(this.resumenCreditos.creditos != undefined){

receiptHTML +=`<h5>Listado de Creditos</h5>`;

receiptHTML +=`<table  style="font-family: Arial, sans-serif; width: 100%;">`;
  

let cabecera =  (this.tipoImpresora == 'POS')?`<tr><th>V. inicial</th><th>Anticipo</th><th>Abonos</th><th>Saldo</th> </tr>`
:`<tr><th>Persona</th><th>Fecha</th><th>V. inicial</th><th>Anticipo</th><th>Abonos</th><th>Saldo</th></tr>` ; 
this.resumenCreditos.creditos.forEach(item=>{
  receiptHTML += (this.tipoImpresora == 'POS')?`<tr><th colspan='4'>${item.terceroNombre}</th></tr> 
						  <tr><th colspan='4'>${item.fecha_creacion}</th></tr>
              ${cabecera}
              <tr>
                <td>${currencyFormatter.format(item.valorInicial) }</td> 
                <td>${currencyFormatter.format(item.abonoInicial)}</td> 
                <td>${currencyFormatter.format(item.totalAbonos)}</td> 
                <td>${currencyFormatter.format(item.totalActual)}</td>   
              </tr>` : ` ${cabecera}
               <tr>
                  <td>${item.terceroNombre}</td> 
                  <td>${item.fecha_creacion}</td>
                  <td>${currencyFormatter.format(item.valorInicial) }</td> 
                  <td>${currencyFormatter.format(item.abonoInicial)}</td> 
                  <td>${currencyFormatter.format(item.totalAbonos)}</td> 
                  <td>${currencyFormatter.format(item.totalActual)}</td>   
              </tr>`;
       cabecera =  (this.tipoImpresora == 'POS')?cabecera:'';      

}) 
   receiptHTML += `</table>`  ;
} 

if(this.resumenCreditos.abonos != undefined){

  receiptHTML +=`<h5>Listado de Abonos</h5>`;
  
  receiptHTML +=`<table  style="font-family: Arial, sans-serif; width: 100%;">`;
    
  
  let cabecera =  (this.tipoImpresora == 'POS')?`<tr><th>Fecha</th><th>Abono</th><th>Cartera</th></tr>`
  :`<tr><th>Persona</th><th>Fecha</th><th>Abono</th><th>Cartera</th></tr>` ; 
  this.resumenCreditos.abonos.forEach(item=>{
    receiptHTML += (this.tipoImpresora == 'POS')?`<tr><th colspan='4'>${item.descripcion}</th></tr>  
                ${cabecera}
                <tr>
                  <th >${item.fecha_creacion}</th> 
                  <td>${currencyFormatter.format(item.totalAbonos)}</td> 
                  <td>${ item.id_cartera}</td>   
                </tr>` : `${cabecera}
                 <tr>
                    <td>${item.descripcion}</td> 
                    <td>${item.fecha_creacion}</td>
                    <td>${currencyFormatter.format(item.totalAbonos) }</td>   
                    <td>${item.id_cartera}</td> 
                </tr>`;
         cabecera =  (this.tipoImpresora == 'POS')?cabecera:'';      
  
  }) 
     receiptHTML += `</table>`  ;
  } 
if(this.resumenCreditos.cuotas != undefined){

    receiptHTML +=`<h5>Listado de cuotas</h5>`;
    
    receiptHTML +=`<table  style="font-family: Arial, sans-serif; width: 100%;">`;
      
    
    let cabecera =  (this.tipoImpresora == 'POS')?`<tr><th>Valor</th><th>T. Pagado</th><th>Saldo</th><th>últ.Abono</th></tr>`
    :`<tr><th>Fecha de pago</th><th>Cartera</th><th># Cuota</th><th>Valor</th><th>T. Pagado</th><th>Saldo</th><th>últ.Abono</th></tr>` ; 
    this.resumenCreditos.cuotas.forEach(item=>{
      receiptHTML += (this.tipoImpresora == 'POS')?`<tr><th colspan='4'>${item.fecha_max_pago} - credito # ${item.id_cartera} - cuota # ${item.numero_cuota}</th></tr>  
                  ${cabecera}
                  <tr>
                    <td >${currencyFormatter.format(item.valorCuota) }</td> 
                    <td>${currencyFormatter.format(item.totalPagado)}</td> 
                    <td>${currencyFormatter.format(item.totalActual) }</td>  
                    <td>${currencyFormatter.format(item.ultimoAbono) }</td>  
                  </tr>` : `${cabecera}
                   <tr>
                    <td>${item.fecha_max_pago}</td> 
                    <td>${item.id_cartera}</td> 
                    <td>${item.numero_cuota}</td> 
                    <td>${currencyFormatter.format(item.valorCuota) }</td> 
                    <td>${currencyFormatter.format(item.totalPagado)}</td> 
                    <td>${currencyFormatter.format(item.totalActual) }</td>  
                    <td>${currencyFormatter.format(item.ultimoAbono) }</td>  
                  </tr>`;
           cabecera =  (this.tipoImpresora == 'POS')?cabecera:'';      
    
    }) 
       receiptHTML += `</table>`  ;
    } 
if(this.resumenCreditos.cuotas_a_vencerce != undefined){

  receiptHTML +=`<h5>Listado de cuotas a vencerce</h5>`;
  
  receiptHTML +=`<table  style="font-family: Arial, sans-serif; width: 100%;">`;
    
  
  let cabecera =  (this.tipoImpresora == 'POS')?`<tr><th>Valor</th><th>T. Pagado</th><th>Saldo</th><th>últ.Abono</th></tr>`
  :`<tr><th>Fecha de pago</th><th>Cartera</th><th># Cuota</th><th>Valor</th><th>T. Pagado</th><th>Saldo</th><th>últ.Abono</th></tr>` ; 
  this.resumenCreditos.cuotas_a_vencerce.forEach(item=>{
    receiptHTML += (this.tipoImpresora == 'POS')?`<tr><th colspan='4'>${item.fecha_max_pago} - credito # ${item.id_cartera} - cuota # ${item.numero_cuota}</th></tr>  
                ${cabecera}
                <tr>
                  <td >${currencyFormatter.format(item.valorCuota) }</td> 
                  <td>${currencyFormatter.format(item.totalPagado)}</td> 
                  <td>${currencyFormatter.format(item.totalActual) }</td>  
                  <td>${currencyFormatter.format(item.ultimoAbono) }</td>  
                </tr>` : `${cabecera}
                  <tr>
                  <td>${item.fecha_max_pago}</td> 
                  <td>${item.id_cartera}</td> 
                  <td>${item.numero_cuota}</td> 
                  <td>${currencyFormatter.format(item.valorCuota) }</td> 
                  <td>${currencyFormatter.format(item.totalPagado)}</td> 
                  <td>${currencyFormatter.format(item.totalActual) }</td>  
                  <td>${currencyFormatter.format(item.ultimoAbono) }</td>  
                </tr>`;
          cabecera =  (this.tipoImpresora == 'POS')?cabecera:'';      
  
  }) 
      receiptHTML += `</table>`  ;
  } 
if(this.resumenCreditos.cuotas_vencidas != undefined){

    receiptHTML +=`<h5>Listado de cuotas vencidas</h5>`;
    
    receiptHTML +=`<table  style="font-family: Arial, sans-serif; width: 100%;">`;
      
    
    let cabecera =  (this.tipoImpresora == 'POS')?`<tr><th>Valor</th><th>T. Pagado</th><th>Saldo</th><th>últ.Abono</th></tr>`
    :`<tr><th>Fecha de pago</th><th>Cartera</th><th># Cuota</th><th>Valor</th><th>T. Pagado</th><th>Saldo</th><th>últ.Abono</th></tr>` ; 
    this.resumenCreditos.cuotas_vencidas.forEach(item=>{
      receiptHTML += (this.tipoImpresora == 'POS')?`<tr><th colspan='4'>${item.fecha_max_pago} - credito # ${item.id_cartera} - cuota # ${item.numero_cuota}</th></tr>  
                  ${cabecera}
                  <tr>
                    <td >${currencyFormatter.format(item.valorCuota) }</td> 
                    <td>${currencyFormatter.format(item.totalPagado)}</td> 
                    <td>${currencyFormatter.format(item.totalActual) }</td>  
                    <td>${currencyFormatter.format(item.ultimoAbono) }</td>  
                  </tr>` : `${cabecera}
                   <tr>
                    <td>${item.fecha_max_pago}</td> 
                    <td>${item.id_cartera}</td> 
                    <td>${item.numero_cuota}</td> 
                    <td>${currencyFormatter.format(item.valorCuota) }</td> 
                    <td>${currencyFormatter.format(item.totalPagado)}</td> 
                    <td>${currencyFormatter.format(item.totalActual) }</td>  
                    <td>${currencyFormatter.format(item.ultimoAbono) }</td>  
                  </tr>`;
           cabecera =  (this.tipoImpresora == 'POS')?cabecera:'';      
    
    }) 
       receiptHTML += `</table>`  ;
    }    

receiptHTML += `</td></tr></table>`



receiptHTML += `</div>`

  return receiptHTML; 
} 
private footerRV():string{
  return  '<div style="font-size: 10px;margin: 10px;">Documento de soporte de ventas en un rango de fecha</div>' ; 
}
//////////////////////////////////////////////
private footerRepCredito():string{
  return  '<div style="font-size: 10px;margin: 10px;">Documento de soporte de creditos en un rango de fecha</div>' ; 
}
private   infoRepCreditoGeneral():string{
  let receiptHTML = ''; 
  const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', 
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 }); 
     receiptHTML += (this.tipoImpresora != 'POS')?
         `<div> 
         <table style='width: 100%;'>
         <tr> 
              <th colspan="4">RESUMEN DE CREDITOS</th>  
         </tr>
          <tr> 
              <th>Usuario </th><td> ${this.resumenCreditos.usuario_generador}</td> 
              <th> </th><td>  </td> 
         </tr>
         <tr> <th colspan='4'>${this.resumenCreditos.descripcion} </th> </tr> 
         <tr>
         <th> Desde </th><td> ${this.resumenCreditos.fechaInicial}</td> <th> 
        hasta</th><td>  ${this.resumenCreditos.fechaFinal}</td> 
         </tr> 
          <tr> <td colspan='4'> 
          <table style='width: 100%;'>
           <tr> <th> <span class="d-block font-weight-bold"># Créditos</span></th>
                <th><span class="d-block font-weight-bold">Valor Actual</span></th> 
                <th> <span class="d-block font-weight-bold">Valor inicial</span></th> 
                <th> <span class="d-block font-weight-bold">Abono inicial</span></th> 
                <th> <span class="d-block font-weight-bold">Abonos recibidos</span></th>
            </tr>
            <tr>
              <th>  <span>${this.resumenCreditos?.numCreditos } </span> </th>
              <th> <span>${currencyFormatter.format(this.resumenCreditos?.t_totalActual)} </span></th>
              <th> <span>${currencyFormatter.format(this.resumenCreditos?.t_valorInicial)} </span> </th>
              <th> <span>${currencyFormatter.format(this.resumenCreditos?.t_abonoInicial)}</span></th>
              <th> <span>${currencyFormatter.format(this.resumenCreditos?.t_totalAbonos)}</span></th>
            </tr>
            <tr>
             <th> <span class="d-block font-weight-bold"># cuotas vencidas</span></th>
              <th> <span class="d-block font-weight-bold">Total vencido</span></th>
            </tr>
             <tr>
                 <th> <span>${this.resumenCreditos?.t_numero_plazos_vencidos }</span></th>
								 <th> <span>${currencyFormatter.format(this.resumenCreditos?.t_suma_plazos_vencidos)}</span> </th> 
             </tr>
            
          </table>
          </td> 
          </tr> 
        
         </table></div> `:
          `<div>
           <p>Usuario: ${this.resumenCreditos.usuario_generador}</p> 
           <p>Rango: desde el ${this.resumenCreditos.fechaInicial} hasta el  ${this.resumenCreditos.fechaFinal} </p>
                          </div><hr>
        <div>
          <p>${this.resumenCreditos.descripcion}}</p> 
           <p> <span class="d-block font-weight-bold"># Créditos</span>
           <span>${this.resumenCreditos?.numCreditos }</span> </p>
           <p><span class="d-block font-weight-bold">Valor Actual</span>
            <span>${currencyFormatter.format(this.resumenCreditos?.t_totalActual)}</span></p> 
            <p> <span class="d-block font-weight-bold">Valor inicial</span>
            <span>${currencyFormatter.format(this.resumenCreditos?.t_valorInicial)}</span> </p> 
            <p> <span class="d-block font-weight-bold">Abono inicial</span>
            <span>${currencyFormatter.format(this.resumenCreditos?.t_abonoInicial)}</span></p> 
            <p> <span class="d-block font-weight-bold">Abonos recibidos</span>
            <span>${currencyFormatter.format(this.resumenCreditos?.t_totalAbonos)}</span></p> 
            <p> <span class="d-block font-weight-bold"># cuotas vencidas</span>
            <span>${this.resumenCreditos?.t_numero_plazos_vencidos }</span></p> 
            <p> <span class="d-block font-weight-bold">Total vencido</span>
            <span>${currencyFormatter.format(this.resumenCreditos?.t_suma_plazos_vencidos)}</span> </p>
        </div>`
        
        ;
        return receiptHTML;
}
//////////////////////////////////////////////
private   infoRVGeneral():string{
  let receiptHTML = ''; 
  const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', 
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 }); 
     receiptHTML += (this.tipoImpresora != 'POS')?
         `<div> 
         <table style='width: 100%;'>
         <tr> 
              <th colspan="4">RESUMEN DE VENTA</th>  
         </tr>
          <tr> 
              <th>Usuario </th><td> ${this.resumenVenta.usuarioGenerador}</td> 
              <th> </th><td>  </td> 
         </tr>
         <tr> <th colspan='4'>${this.resumenVenta.descripcion} </th> </tr> 
         <tr>
         <th> Desde </th><td> ${this.resumenVenta.fechaInicial}</td> <th> 
        hasta</th><td>  ${this.resumenVenta.fechaFinal}</td> 
         </tr> 
         <tr> 
              <th>Cantidad Vendido</th><td> ${this.resumenVenta.cantidadVendida}</td> 
              <th>Total</th><td> ${currencyFormatter.format(this.resumenVenta.totalVenta)}</td> 
         </tr>
         </table></div> `:
          `<div>
           <p>Usuario: ${this.resumenVenta.usuarioGenerador}</p> 
           <p>Rango: desde el ${this.resumenVenta.fechaInicial} hasta el  ${this.resumenVenta.fechaFinal} </p>
                          </div><hr>
        <div>
          <p>${this.resumenVenta.descripcion}}</p> 
          <p>Cantidad   : ${this.resumenVenta.cantidadVendida}</p>
          <p>Total venta  : ${this.resumenVenta.totalVenta}</p>
        </div>`
        
        ;
        return receiptHTML;
}

private   infoDevGeneral():string{
  let receiptHTML = ''; 
  const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', 
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 }); 
     receiptHTML += (this.tipoImpresora != 'POS')?
         `<div> <table style='width: 100%;'>
         <tr> 
              <th colspan="4">RESUMEN DE DEVOLUCIONES</th>  
         </tr>
          <tr> 
              <th>Usuario </th><td> ${this.resumenVenta.usuarioGenerador}</td> 
              <th> </th><td>  </td> 
         </tr>
         <tr> <th colspan='4'>${this.resumenVenta.descripcion} </th> </tr> 
         <tr>
         <th> Desde </th><td> ${this.resumenVenta.fechaInicial}</td> <th> 
        hasta</th><td>  ${this.resumenVenta.fechaFinal}</td> 
         </tr> 
         <tr> 
              <th>Cantidad Vendido</th><td> ${this.resumenVenta.cantidadVendida}</td> 
              <th>Total</th><td> ${currencyFormatter.format(this.resumenVenta.totalVenta)}</td> 
         </tr>
         </table></div> `:
          `<div>
           <p>Usuario: ${this.resumenVenta.usuarioGenerador}</p> 
           <p>Rango: desde el ${this.resumenVenta.fechaInicial} hasta el  ${this.resumenVenta.fechaFinal} </p>
                          </div><hr>
        <div>
          <p>${this.resumenVenta.descripcion}}</p> 
          <p>Cantidad   : ${this.resumenVenta.cantidadVendida}</p>
          <p>Total venta  : ${this.resumenVenta.totalVenta}</p>
        </div>`
        
        ;
        return receiptHTML;
}
private footerDev():string{
  return  '<div style="font-size: 10px;margin: 10px;">Documento de soporte de Devoluciones en un rango de fecha</div>' ; 
}
/*********************************************************************************************** */

/*************************************************************************************************/

  generateSoporteHTML(): string {

    let receiptHTML = ''; 
    receiptHTML = (this.tipoImpresora == 'POS')?`<div style="font-family: Arial, sans-serif; width: 219.24px;"> ` : 
    `<div style="font-family: Arial, sans-serif; border: 1px solid gray;margin: 10px; border-radius: 10px; padding: 15px;">`;
    receiptHTML += this.generateSoporteCabecera() ; 
    receiptHTML += this.infoSoporteGeneral(); 
    receiptHTML += this.detalleSoporte(); 
    receiptHTML += this.footerSoporte() ; 
    receiptHTML += ` </div> 
    <style>  body table td { font-size: xx-small !important     } </style>`;
  
    return receiptHTML;
  } 
  private generateSoporteCabecera(){
    //console.log('documento a imprimir' ,this.doc);
    
      let cabecera = '';
      if (this.tipoImpresora == 'POS'){
        cabecera = ` <div style="text-align: center;">   ` ;
        if(PrinterManager.sucursal?.nombre_sucursal_sec.trim() != '')
          cabecera += `<h2 style=" margin: 0;">${PrinterManager.sucursal?.nombre_sucursal_sec}</h2> ` ; 
  
        cabecera += ` <h2  style=" margin: 0;">${this.movimiento?.arrEsta.nombre}</h2>  `; 
        cabecera += (this.movimiento?.arrEsta.nit.trim() == '' )? ` <p>Nit: ${PrinterManager.sucursal?.nit_sucursal}</p>`: ` <p>Nit: ${this.movimiento?.arrEsta.nit}</p>`  ;
      
        cabecera += (this.movimiento?.arrEsta.direccion.trim() == '' )?  ` <p> ${PrinterManager.sucursal?.dir}</p>`:  ` <p> ${this.movimiento?.arrEsta.direccion}</p>` ;
        cabecera += '<p> '
        cabecera += (this.movimiento?.arrEsta.ciudad.trim() == '' )?  ` ${PrinterManager.sucursal?.ciudad} `:  ` ${this.movimiento?.arrEsta.ciudad} ` ;
        cabecera += ' - '
        cabecera += (this.movimiento?.arrEsta.tel1.trim() == '' )?  `Tel: ${PrinterManager.sucursal?.tel1}`:  `Tel: ${this.movimiento?.arrEsta.tel1} ` ;
        cabecera += '</p> '; 
  
      }else{
        cabecera = `<div >     <table style='width: 100%;'><tr><td><h2  style=" margin: 0;">`;
        if((PrinterManager.sucursal?.nombre_sucursal_sec||'').trim() != '')
          cabecera +=   PrinterManager.sucursal?.nombre_sucursal_sec + ' - ' ; 
  
        cabecera += `${this.movimiento?.arrEsta.nombre}</h2>`;  
        cabecera += (this.movimiento?.arrEsta.nit.trim() == '' )? `Nit: ${PrinterManager.sucursal?.nit_sucursal} `: `Nit: ${this.movimiento?.arrEsta.nit} `  ;
        cabecera += '<br> '
       cabecera += (this.movimiento?.arrEsta.ciudad.trim() == '' )?  `${PrinterManager.sucursal?.ciudad} `:  `${this.movimiento?.arrEsta.ciudad} ` ;
       
        cabecera += (this.movimiento?.arrEsta.direccion.trim() == '' )?  ` ${PrinterManager.sucursal?.dir} `:  ` ${this.movimiento?.arrEsta.direccion} ` ;
        cabecera += '<br> '
        cabecera += (this.movimiento?.arrEsta.tel1.trim() == '' )?  `Tel: ${PrinterManager.sucursal?.tel1}`:  `Tel: ${this.movimiento?.arrEsta.tel1} ` ;
        
        cabecera += (this.movimiento?.arrEsta.tel2.trim() == '' )?  `- ${PrinterManager.sucursal?.tel2}`:  `- ${this.movimiento?.arrEsta.tel2} ` ;
        cabecera += `</td> <td></td></tr><tr><td></td> <td></td></tr></table><hr></div>`; 


      }
      return cabecera
    } 
  private   infoSoporteGeneral():string{
      let receiptHTML = '';
      let labelCliente = 'Tercero : ' 
      let leyenda = `Soporte de movimientos entre cuentas contables <br> ${this.movimiento.descripcionOpr}`;
      
         receiptHTML += (this.tipoImpresora != 'POS')?
             `<div> 
             <table style='width: 100%;'>
             <tr> 
                  <th>Operación #</th><td> ${this.movimiento.comprobante}</td> 
                  <th> </th><td> </td>  
             </tr>
              <tr> 
                  <th>Usuario Ingreso</th><td> ${this.movimiento.usuario}</td> 
                  <th>Vendedor</th><td> ${this.movimiento.vendedor}</td> 
             </tr>
             <tr> <th colspan='4'>${leyenda} </th> </tr> 
             <tr>
             <th> Fecha/Hora</th><td> ${this.movimiento.fecha}</td> <th> 
             ${labelCliente}</th><td>  ${this.movimiento.tercero}</td> 
             </tr> 
             <tr> 
                  <th>Débito</th><td> ${this.movimiento.debito}</td> 
                  <th>Crédito</th><td> ${this.movimiento.credito}</td> 
             </tr>
             </table></div> `:
              `<div>${leyenda}</div>
              <div>
               <p>Usuario: ${this.movimiento.usuario}</p>
               <p>Vendedor: ${this.movimiento.vendedor}</p>
                              <p>Fecha/Hora: ${this.movimiento.fecha}</p>
                              </div><hr>
            <div>
              <p>${this.movimiento.nombreOpr}</p>
              <p>${labelCliente} ${this.movimiento.tercero}</p>
              <p>Débito   : ${this.movimiento.debito}</p>
              <p>Crédito  : ${this.movimiento.credito}</p>
            </div>`
            
            ;
            return receiptHTML;
    }
    private detalleSoporte():string{
      const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', 
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 });
    let receiptHTML  = ` <hr> <div style="text-align: left;" name="detalle"><table  style="font-family: Arial, sans-serif; width: 100%;">`;
     
    receiptHTML += (this.tipoImpresora != 'POS')?
    `<tr><th>Cuenta </th><th>Nombre</th><th>Débito</th> <th>Crédito</th></tr>` : 
    '';
    //console.log('listado',this.doc.listado);
    
        this.movimiento.movimientos?.forEach((lista) => {
          const debito =  lista.debito ;
          const credito = lista.credito ; 
          
    
          receiptHTML += (this.tipoImpresora == 'POS')?`
           <tr> <th colspan = '4'  style="text-align: left;" >${lista.nombreCuenta}</p> </th> </tr>
           <tr><td>Cuenta</td><td>Débito</td><td>Crédito </td></tr>
           <tr><td>${lista.cuenta} </td>
           <td>${currencyFormatter.format(debito)}</td> 
           <td>${currencyFormatter.format(credito)} </td></tr>  
          `:`
          <tr> 
          <td style="text-align: left;" >${lista.cuenta}</p> </td>  
          <td style="text-align: left;" >${lista.nombreCuenta}</p> </td>    
          <td style="text-align: right;" >${currencyFormatter.format(debito)} </td>
          <td style="text-align: right;" >${currencyFormatter.format(credito)}</td>
          </tr>  
         `
          ;   
      });
    receiptHTML += `</table></div>`
    
      return receiptHTML; 
    } 
    private footerSoporte():string{
          return  '<div style="font-size: 10px;margin: 10px;">Documento de soporte de movimiento entre cuentas contables</div>' ; 
      }
  //*************************************************************************************** */
 
generateReceiptHTML(): string {

  let receiptHTML = ''; 
  receiptHTML = (this.tipoImpresora == 'POS')?`<div style="font-family: Arial, sans-serif; width: 219.24px;"> ` : 
  `<div style="font-family: Arial, sans-serif; border: 1px solid gray;margin: 10px; border-radius: 10px; padding: 15px;">`;
  receiptHTML += this.generateCabecera() ; 
  receiptHTML += this.infoGeneral(); 
  receiptHTML += this.detalle();
  receiptHTML += this.totales(); 
  receiptHTML += this.pagos() ; 
  receiptHTML += this.footer() ; 
  receiptHTML += ` </div> 
  <style>  body table td { font-size: xx-small !important    } </style>`;

  return receiptHTML;
} 
private   infoGeneral():string{
  let receiptHTML = '';
  if(this.doc.nombreDocumento == 'venta' )   receiptHTML += this.getResolucion() ;
  let labelCliente = 'Cliente : '
  let nombreDocumento = "";
  let leyenda = "";
  //alert(this.doc.nombreDocumento)
     switch(this.doc.nombreDocumento ){
        case 'venta' : nombreDocumento = "Factura No." ; leyenda = 'Este documento no reemplazala factura de venta ni el documento equivalente, es un soporte de uso contable' ; break;
        case 'cotizacion' : nombreDocumento = "Cotización No."; break;
        case 'gasto' : nombreDocumento = "Gasto No."; labelCliente = 'Pagado a : ' ; break;
        case 'cuentas_por_cobrar' : nombreDocumento = "Venta a credito No."; break;
        case 'cuentas_por_pagar' : nombreDocumento = "Compra a credito No."; labelCliente = 'Proveedor : ' ;break; 
        case 'comprobante_cuentas_por_pagar' : nombreDocumento = "Cuenta por pagar No."; labelCliente = 'Proveedor : ' ;break; 
        case 'remision_cuentas_por_cobrar' : nombreDocumento = "Remision a credito No."; break;
        case 'RecaudosCuentaXCobrar' : nombreDocumento = "Abono a cartera No."; break;
        case 'comprobante_devolucion' : nombreDocumento = "Devolucion No."; break;
        case 'comprobante_compras' : nombreDocumento = "Compra No.";labelCliente = 'Proveedor : ' ;  break;
        case 'Pagos_cuenta_por_pagar' : nombreDocumento = "Abono a credito No.";labelCliente = 'Proveedor : ' ;  break;
        case 'comprobante_nota_debito' : nombreDocumento = "Nota debito No.";labelCliente = 'Proveedor : ' ;  break;
     }
     receiptHTML += (this.tipoImpresora != 'POS')?
         `<div> 
         <table style='width: 100%;'>
         <tr> <th>${nombreDocumento}</th><td> ${this.doc.idDocumentoFinal}</td>
         
         <th> Usuario Ingreso</th><td> ${this.doc.vendedorNombre}</td> 
                  
         </tr> <tr>
         <th> Fecha/Hora</th><td> ${this.doc.fecha}</td> <th>
         
         ${labelCliente}</th><td>  ${this.doc.clienteobj!.nombreCompleto!}</td>
           
         </tr>
         </table></div> `:
          `<div>${leyenda}</div>
          <div>
           <p>Usuario: ${this.doc.vendedorNombre}</p>
                          <p>Fecha/Hora: ${this.doc.fecha}</p>
                          </div><hr>
        <div>
          <p>${nombreDocumento} ${this.doc.idDocumentoFinal}</p>
          <p>${labelCliente} ${this.doc.clienteobj!.nombreCompleto!}</p>
        </div>`
        
        ;
        return receiptHTML;
}
private detalle():string{
  const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', 
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 });
let receiptHTML  = ` <hr> <div style="text-align: left;" name="detalle"><table  style="font-family: Arial, sans-serif; width: 100%;">`;
 
receiptHTML += (this.tipoImpresora != 'POS' && this.doc.listado.length > 0)?`<tr><th>Producto </th><th>Precio uni. </th><th>Descuento</th> <th>IVA</th> <th>Precio Venta</th> <th>Cantidad</th><th>Total </th></tr>` : 
'';
//console.log('listado',this.doc.listado);

    this.doc.listado?.forEach((lista) => {
      const precioSinIVA = typeof lista.presioSinIVa === 'number' ? lista.presioSinIVa : parseFloat(lista.presioSinIVa??'0');
      const precioVenta = lista.presioSinIVa - lista.descuento  ;
      const cantidadVendida = typeof lista.cantidadVendida === 'number' ? lista.cantidadVendida : parseFloat(lista.cantidadVendida??'0');
      const descuento = typeof lista.descuento === 'number' ? lista.descuento : parseFloat(lista.descuento??'0');
      const iva = typeof lista.IVA === 'number' ? lista.IVA : parseFloat(lista.IVA??'0');
      const valorTotal = typeof lista.valorTotal === 'number' ? lista.valorTotal : parseFloat(lista.valorTotal??'0');
      

      receiptHTML += (this.tipoImpresora == 'POS')?`
       <tr> <th colspan = '4'  style="text-align: left;" >${lista.nombreProducto}</p> </th> </tr>
       <tr><td>Precio </td><td>Desc</td><td>Cant</td><td>Total </td></tr>
       <tr><td>${currencyFormatter.format(precioSinIVA)} </td>
       <td>${currencyFormatter.format(descuento)}</td>
       <td> ${cantidadVendida}</td>
       <td>${currencyFormatter.format(valorTotal)} </td></tr>  
      `:`
      <tr> <td   style="text-align: left;" >${lista.nombreProducto}</p> </td>   
      <td style="text-align: right;" >${currencyFormatter.format(precioSinIVA)} </td>
      <td style="text-align: right;" >${currencyFormatter.format(descuento)}</td>
      <td style="text-align: right;" >${currencyFormatter.format(iva)}</td>
      <td style="text-align: right;" >${currencyFormatter.format(precioVenta)}</td>
      <td style="text-align: right;" > ${cantidadVendida}</td>
      <td style="text-align: right;" >${currencyFormatter.format(valorTotal)} </td></tr>  
     `
      ;

      if( lista.nombreActividadDescuento != '' && lista.nombreActividadDescuento != 'na'  ){  receiptHTML +=
        (this.tipoImpresora == 'POS')?
        ` <tr style='font-size: 10px;' ><th colspan = '4' >Act: ${lista.nombreActividadDescuento}</th> </tr>   `:
        ` <tr style='font-size: 10px;' ><th   >Act: ${lista.nombreActividadDescuento}</th> </tr>   `
        
        
        ;}
        if(lista.descuentoAplicado != '' && lista.descuentoAplicado != 'na'){  
          receiptHTML +=   (this.tipoImpresora == 'POS')?` <tr  style='font-size: 10px;' ><th colspan = '4' >Des: ${lista.descuentoAplicado}</th> </tr>`:
          ` <tr  style='font-size: 10px;' ><th>Des: ${lista.descuentoAplicado}</th> </tr>`
          ;}

      receiptHTML += ` <hr>  `;
  });
receiptHTML += `</table></div>`

  return receiptHTML; 
} 
private totales():string{
  
  const valorParcial = typeof this.doc.valorParcial  === 'number' ? this.doc.valorParcial : parseFloat(this.doc.valorParcial??'0'); 
  const valorDescuento = typeof this.doc.descuento  === 'number' ? this.doc.descuento : parseFloat(this.doc.descuento??'0'); 
  const valorIVA = typeof this.doc.valorIVA  === 'number' ? this.doc.valorIVA : parseFloat(this.doc.valorIVA??'0');  
  const valorAjuste = typeof this.doc.ajusteAlpeso  === 'number' ? this.doc.ajusteAlpeso : parseFloat(this.doc.ajusteAlpeso??'0'); 
  const totalFactura = typeof this.doc.totalFactura  === 'number' ? this.doc.totalFactura : parseFloat(this.doc.totalFactura??'0'); 
  const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', 
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 });
  return  ` 
  <div style="text-align: right;">
  <hr>
  <table style=" margin-left: auto; width: 80%;   text-align: right; "> 
  <tr> <td>Valor Parcial:</td>
       <td> ${currencyFormatter.format(valorParcial )}</td>
  </tr>
  <tr> <td>Descuento:</td>
       <td>${currencyFormatter.format(valorDescuento )}</td>
  </tr>
  <tr> <td>IVA:</td>
       <td>${currencyFormatter.format(valorIVA )}</td>
  </tr>
  <tr> <td>Ajuste:</td>
       <td>${currencyFormatter.format(valorAjuste )}</td>
  </tr>
  <tr> <td>Total Factura:</td>
       <td> ${currencyFormatter.format(totalFactura )}</td>
  </tr> 
  </table> 
  </div> 
`;
}
private footer():string{

  switch(this.doc.nombreDocumento ){
    case 'venta' : return  ` <div name='footer' style="text-align: center;"><p>*** Gracias por su compra ***</p></div>`;
    case 'cotizacion' : return  ` <div name='footer' style="text-align: center;"><p>*** Este documento es una cotizacion  ***</p><p>***  esperamos vuelva pronto  ***</p></div>`;
    case 'gasto' : return  ` <div name='footer' style="text-align: center;"><p>*** Gracias por su compra ***</p></div>`;
    case 'cuentas_por_cobrar' : return  ` <div name='footer' style="text-align: center;"><p>*** Gracias por su compra ***</p></div>`;
    case 'remision_cuentas_por_cobrar' : return  ` <div name='footer' style="text-align: center;"><p>*** Gracias por su compra ***</p></div>`;
    case 'RecaudosCuentaXCobrar' : return  ` <div name='footer' style="text-align: center;"><p>*** Gracias por su compra ***</p></div>`;
    case 'comprobante_devolucion' : return  ` <div name='footer' style="text-align: center;">
    <p>Devolucion generada desde factura #${this.doc.campo_info_3}, este documento sirve como canje en su totalidad en cualquier otra compra o servicio</p></div>`;
    default:
      return  '' ; 
  }


  
}
private pagos():string{
  let html = '';
  const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', 
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 });

  if(this.doc.pagos?.length! > 0 ){
    html += ` <hr>
     <div style="text-align: left; " name='pagos' >
       <p>Pagos : </p>
       <hr>
       <div style="text-align: left;"><table style="with:100%">`;

        this.doc.pagos?.forEach((pago) => {
          const valorPagado = typeof pago.valorPagado  === 'number' ? pago.valorPagado : parseFloat(pago.valorPagado??'0'); 
          const valorRecibido = typeof pago.valorRecibido  === 'number' ? pago.valorRecibido : parseFloat(pago.valorRecibido??'0'); 
          const vueltos = typeof pago.vueltos  === 'number' ? pago.vueltos : parseFloat(pago.vueltos??'0'); 

          if(pago.nombreMedio!.trim()==''){
            html += `<tr>
              <td style="width:95%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Referencia ==> ${pago.referencia }</td>
              <td style="    text-align: right;"> ${currencyFormatter.format(valorPagado)}</td></tr>
            `;
          }else{
          html += `<tr>
              <td style="width:95%">${pago.nombreMedio!.trim()}</td>
              <td style="    text-align: right;"> ${currencyFormatter.format(valorPagado)}</td></tr>
            `;
            if (valorRecibido > 0) {
              html += `<tr> <td colspan='2'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Recibido ${currencyFormatter.format(valorRecibido)}<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vueltos ${currencyFormatter.format(vueltos) }</p></td></tr>
                `;
            } else {
              html += `
                  <tr> <td colspan='2'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Referencia ==> ${pago.referencia }</td></tr>
                `;
            }}


 });

 html += `</table><hr></div></div>`;
}
  return html;
}


private openPrintWindows(printContent:string){
  //console.log("html a imprimir" , printContent)
    const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')!;  
    if (WindowPrt) {
      //console.log('entro a print', WindowPrt);
      
      WindowPrt.document.write(printContent);
      WindowPrt.document.close();
      WindowPrt.addEventListener('afterprint', () => {
            WindowPrt.close();
        });  
         WindowPrt.print();
  }
}
private openExcelWindows(printContent:string , fileName:string){
  //console.log("html a imprimir" , printContent)
  printContent =  this.htmlEntities(printContent) ; 
    const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')!;  
    if (WindowPrt) {
      
      const contentType = "application/vnd.ms-excel; charset=iso-8859-1";
    const contentDisposition = `attachment; filename=${fileName}.xls`;
    const pragma = "no-cache";
    const expires = "0";
    printContent = printContent.replace(/\s?\$\s/g, '');
 
      //console.log('printContent' ,  printContent);
    const html = `
      <html>
      <head>
        <meta http-equiv="Content-Type" content="${contentType}">
        <meta http-equiv="Content-Disposition" content="${contentDisposition}">
        <meta http-equiv="Pragma" content="${pragma}">
        <meta http-equiv="Expires" content="${expires}">
        <meta charset="UTF-8">
      </head>
      <body>
      <table style='width: 100%;'>
      <tr><td colspan='3' style="background-color: beige; height:25px"></td>       </tr>
      <tr><td colspan='3' style="background-color: beige; height:25px"></td>       </tr>
      <tr><td style="background-color: beige; width: 15px;"></td><td>
        ${printContent}</td><td style="background-color: beige;width: 55px; "></td>
        <tr><td colspan='3' style="background-color: beige; height:25px"></td>       </tr>
        <tr><td colspan='3' style="background-color: beige; height:25px"></td>       </tr>
        </table>
      </body>
      </html>
    `;
      WindowPrt.document.write(html);
      WindowPrt.document.close(); 
         // Forzar la descarga del archivo Excel
    WindowPrt.addEventListener('load', () => {
      const a = WindowPrt.document.createElement('a');
      a.href = 'data:application/vnd.ms-excel,' + encodeURIComponent(html);
      a.download = `${fileName}.xls`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      WindowPrt.close(); // Cerrar la ventana después de la descarga
    });
  }
   
}


private htmlEntities(str: string) {
  return str
  .replace(/Â/g, '')
  .replace(/á/g, '&aacute;')
  .replace(/é/g, '&eacute;')
  .replace(/í/g, '&iacute;')
  .replace(/ó/g, '&oacute;')
  .replace(/ú/g, '&uacute;')
  .replace(/Á/g, '&Aacute;')
  .replace(/É/g, '&Eacute;')
  .replace(/Í/g, '&Iacute;')
  .replace(/Ó/g, '&Oacute;')
  .replace(/Ú/g, '&Uacute;')
  .replace(/ñ/g, '&ntilde;')
  .replace(/Ñ/g, '&Ntilde;');
}


}
