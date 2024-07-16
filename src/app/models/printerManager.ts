import Swal from "sweetalert2";
import { vwsucursal } from "./app.db.interfaces";
import { DocumentosModel } from "./ventas/documento.model";

export class PrinterManager {
  private doc :DocumentosModel = new DocumentosModel() ; 
  private static sucursal?: vwsucursal;

  // Método estático para establecer la sucursal
  public static setSucursal(sucursal: vwsucursal) {
    PrinterManager.sucursal = sucursal;
  }
  constructor() { } 
  
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

  generateCierreHTML():string{
    let HTML = '';
    return HTML;
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

    const fecha = new Date();
    const dayOfMonth = fecha.getDate();
    const month = fecha.getMonth() + 1;
    const year = fecha.getFullYear();
    const hour = fecha.getHours();
    const minutes = fecha.getMinutes();
    const fechaStr = `${dayOfMonth}/${month}/${year} ${hour}:${minutes}`;

    let receiptHTML = `
      <div style="font-family: Arial, sans-serif; width: 300px;"> `
     receiptHTML = this.generateCabecera() ;
  
     if(this.doc.nombreDocumento == 'venta' )   receiptHTML = this.getResolucion() ;
  let nombreDocumento = "";
     switch(this.doc.nombreDocumento ){
        case 'venta' : nombreDocumento = "Factura No." ; break;
        case 'cotizacion' : nombreDocumento = "Cotización No."; break;
        case 'gasto' : nombreDocumento = "Gasto No."; break;
        case 'cuentas_por_cobrar' : nombreDocumento = "Venta a credito No."; break;
     }
     receiptHTML +=`
          <p>Usuario: ${this.doc.vendedorNombre}</p>
          <p>Fecha/Hora: ${fechaStr}</p>
        </div>
        
        <hr>
        <div  >
          <p>${nombreDocumento} ${this.doc.idDocumentoFinal}</p>
          <p>cliente ${this.doc.clienteobj!.nombreCompleto!}</p>
        </div>
       
    `;

   
receiptHTML += ` <hr> <div style="text-align: left;"><table  style="font-family: Arial, sans-serif; width: 300px;">`
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
  const valorParcial = typeof this.doc.valorParcial  === 'number' ? this.doc.valorParcial : parseFloat(this.doc.valorParcial??'0'); 
  const valorIVA = typeof this.doc.valorIVA  === 'number' ? this.doc.valorIVA : parseFloat(this.doc.valorIVA??'0'); 
  const totalFactura = typeof this.doc.totalFactura  === 'number' ? this.doc.totalFactura : parseFloat(this.doc.totalFactura??'0'); 
 

    receiptHTML += ` 
        <div style="text-align: right;">
          <p>Valor Parcial: ${valorParcial.toFixed(2)}</p>
          <p>IVA: ${valorIVA.toFixed(2)}</p>
          <p>Total Factura: ${totalFactura.toFixed(2)}</p>
        </div> 
    `;
    if(this.doc.pagos?.length! > 0 ){
       receiptHTML += ` <hr>
        <div style="text-align: center;">
          <p>Pagos : </p>
        </div><hr>
        <div style="text-align: right;">`;
   
    this.doc.pagos?.forEach((pago) => {
      const valorPagado = typeof pago.valorPagado  === 'number' ? pago.valorPagado : parseFloat(pago.valorPagado??'0'); 
      const valorRecibido = typeof pago.valorRecibido  === 'number' ? pago.valorRecibido : parseFloat(pago.valorRecibido??'0'); 
      const vueltos = typeof pago.vueltos  === 'number' ? pago.vueltos : parseFloat(pago.vueltos??'0'); 
 
        receiptHTML += `
          <p>${pago.nombreMedio!.trim()} ${valorPagado.toFixed(2).padStart(30 - pago.nombreMedio!.trim().length)}</p>
        `;
        if (valorRecibido> 0) {
            receiptHTML += `
              <p>Recibido ${valorRecibido.toFixed(2).padStart(30)} Vueltos ${vueltos.toFixed(2).padStart(30, '.')}</p>
            `;
        } else {
            receiptHTML += `
              <p>Referencia ${pago.referencia.padStart(30, '.')}</p>
            `;
        }
    });

    receiptHTML += `</div>`;
  }
    receiptHTML += this.footer() ; 
    receiptHTML += ` </div> `;

    return receiptHTML;
}
private footer():string{
  return  ` <div style="text-align: center;"><p>*** Gracias por su compra ***</p></div>`;
}
// Método para imprimir la tirilla de punto de venta
public printReceipt( ) {
  if(this.doc.orden ==  undefined){
    Swal.fire('error' , 'no existe un documento a imprimir' , 'error')

  }else{
     this.doc 
    const printContent = this.generateReceiptHTML();
    console.log("html a imprimir" , printContent)
    const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')!;  
    if (WindowPrt) {
      WindowPrt.document.write(printContent);
      WindowPrt.document.close();
      WindowPrt.onload = () => {
          WindowPrt.focus();
          WindowPrt.addEventListener('afterprint', () => {
            WindowPrt.close();
        });
          WindowPrt.print(); 
      };
  }
  }

}

}
