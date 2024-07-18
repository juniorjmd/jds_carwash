import Swal from "sweetalert2";
import { vwsucursal } from "./app.db.interfaces";
import { DocumentosModel } from "./ventas/documento.model";
import { cajasResumenModel } from "./ventas/cajasResumen.model";
import { currencyDollar } from "ngx-bootstrap-icons";

export class PrinterManager {
  private doc :DocumentosModel = new DocumentosModel() ; 
  private static sucursal?: vwsucursal;
  private cierre:cajasResumenModel = new cajasResumenModel();

  // Método estático para establecer la sucursal
  public static setSucursal(sucursal: vwsucursal) {
    PrinterManager.sucursal = sucursal;
  }
  constructor() { } 
  // Método para imprimir la tirilla de punto de venta
public printClose( cierre:cajasResumenModel){
  this.cierre =  cierre
  const printContent = this.generateCierreHTML();
  console.log(printContent);
  this.openPrintWindows(printContent);
  }
    generateCierreHTML(): string {


    let receiptHTML = `<div style="font-family: Arial, sans-serif; width: 300px;"> `
    receiptHTML += this.generateCabeceraCierre() ;  
    receiptHTML += this.detalleCierre();  
    receiptHTML += this.footerCierre() ; 
    receiptHTML += ` </div> `;

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
  
private pagosCierre():string{
  const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' });
  let html = '<div><hr><p>Pagos</p><table >'; 
  this.cierre.arrPagos.forEach(pago=>{
     html += `<tr><td>${pago.nombrepago} </td><td>:</td> <td>${currencyFormatter.format(pago.total)}</td></tr> `
  })
  html +='</table></div>'
  return html;
}
private footerCierre():string{
  return  ` <div name='footer' style="text-align: center;"><p>*** Gracias***</p></div>`;
}
  public printReceipt( ) {
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
   }  
  private generateCabecera(){
    let cabecera = ` <div style="text-align: center;">
    <h2>${this.doc.nombreEsta}</h2>
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
    return HTML;
  }


generateReceiptHTML(): string {


  let receiptHTML = `<div style="font-family: Arial, sans-serif; width: 300px;"> `
  receiptHTML += this.generateCabecera() ; 
  receiptHTML += this.infoGeneral(); 
  receiptHTML += this.detalle();
  receiptHTML += this.totales(); 
  receiptHTML += this.pagos() ; 
  receiptHTML += this.footer() ; 
  receiptHTML += ` </div> `;

  return receiptHTML;
}

private infoGeneral():string{
  let receiptHTML = '';
  if(this.doc.nombreDocumento == 'venta' )   receiptHTML += this.getResolucion() ;

  let nombreDocumento = "";
     switch(this.doc.nombreDocumento ){
        case 'venta' : nombreDocumento = "Factura No." ; break;
        case 'cotizacion' : nombreDocumento = "Cotización No."; break;
        case 'gasto' : nombreDocumento = "Gasto No."; break;
        case 'cuentas_por_cobrar' : nombreDocumento = "Venta a credito No."; break;
        case 'RecaudosCuentaXCobrar' : nombreDocumento = "Abono a cartera No."; break;
        case 'comprobante_devolucion' : nombreDocumento = "Devolucion No."; break;
     }
     receiptHTML +=`<div> <p>Usuario: ${this.doc.vendedorNombre}</p>
                          <p>Fecha/Hora: ${this.doc.fecha}</p>
                          </div><hr>
        <div  >
          <p>${nombreDocumento} ${this.doc.idDocumentoFinal}</p>
          <p>cliente ${this.doc.clienteobj!.nombreCompleto!}</p>
        </div>`;
        return receiptHTML;
}

private detalleCierre():string{
  const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' });

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
private detalle():string{
   
let receiptHTML  = ` <hr> 
<div style="text-align: left;" name="detalle"><table  style="font-family: Arial, sans-serif; width: 100%;">`
console.log('listado',this.doc.listado);
    this.doc.listado?.forEach((lista) => {
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


private totales():string{
  
  const valorParcial = typeof this.doc.valorParcial  === 'number' ? this.doc.valorParcial : parseFloat(this.doc.valorParcial??'0'); 
  const valorIVA = typeof this.doc.valorIVA  === 'number' ? this.doc.valorIVA : parseFloat(this.doc.valorIVA??'0'); 
  const totalFactura = typeof this.doc.totalFactura  === 'number' ? this.doc.totalFactura : parseFloat(this.doc.totalFactura??'0'); 
 
  return  ` 
  <div style="text-align: right;">
    <p>Valor Parcial: ${valorParcial.toFixed(2)}</p>
    <p>IVA: ${valorIVA.toFixed(2)}</p>
    <p>Total Factura: ${totalFactura.toFixed(2)}</p>
  </div> 
`;
}
private footer():string{

  switch(this.doc.nombreDocumento ){
    case 'venta' : return  ` <div name='footer' style="text-align: center;"><p>*** Gracias por su compra ***</p></div>`;
    case 'cotizacion' : return  ` <div name='footer' style="text-align: center;"><p>*** Este documento es una cotizacion  ***</p><p>***  esperamos vuelva pronto  ***</p></div>`;
    case 'gasto' : return  ` <div name='footer' style="text-align: center;"><p>*** Gracias por su compra ***</p></div>`;
    case 'cuentas_por_cobrar' : return  ` <div name='footer' style="text-align: center;"><p>*** Gracias por su compra ***</p></div>`;
    case 'RecaudosCuentaXCobrar' : return  ` <div name='footer' style="text-align: center;"><p>*** Gracias por su compra ***</p></div>`;
    case 'comprobante_devolucion' : return  ` <div name='footer' style="text-align: center;">
    <p>Devolucion generada desde factura #${this.doc.campo_info_3}, este documento sirve como canje en su totalidad en cualquier otra compra o servicio</p></div>`;
    default:
      return  '' ; 
  }


  
}
private pagos():string{
  let html = '';
  const currencyFormatter = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' });

  if(this.doc.pagos?.length! > 0 ){
    html += ` <hr>
     <div style="text-align: left;" name='pagos' >
       <p>Pagos : </p>
       <hr>
       <div style="text-align: left;"><table style="with:100%">`;

        this.doc.pagos?.forEach((pago) => {
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
                  <tr> <td colspan='2'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Referencia ==> ${pago.referencia }</td></tr>
                `;
            }
 });

 html += `</table><hr></div></div>`;
}
  return html;
}


private openPrintWindows(printContent:string){
  console.log("html a imprimir" , printContent)
    const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')!;  
    if (WindowPrt) {
      console.log('entro a print', WindowPrt);
      
      WindowPrt.document.write(printContent);
      WindowPrt.document.close();
      WindowPrt.addEventListener('afterprint', () => {
            WindowPrt.close();
        });  WindowPrt.print();
  }
}


}
