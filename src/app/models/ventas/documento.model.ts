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
        cajaObj?: cajaModel[];
        impuestos?:DocumentoImpuestos[];
        listado?:DocumentoListado[];
        pagos?:DocpagosModel[]; 
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

         // Método para generar el HTML de la tirilla de punto de venta
    generateReceiptHTML(): string {

      const fecha = new Date();
      const dayOfMonth = fecha.getDate();
      const month = fecha.getMonth() + 1;
      const year = fecha.getFullYear();
      const hour = fecha.getHours();
      const minutes = fecha.getMinutes();
      const fechaStr = `${dayOfMonth}/${month}/${year} ${hour}:${minutes}`;

      let receiptHTML = `
        <div style="font-family: Arial, sans-serif; width: 300px;">
          <div style="text-align: center;">
            <h2>${this.nombreEsta}</h2>
            <h2>${this.nombreEsta}</h2>
            <p>Nit: ${this.sucursal?.nit_sucursal}</p>
            <p>Vende: ${this.vendedorNombre}</p>
            <p>Fecha/Hora: ${fechaStr}</p>
          </div>
          <div style="text-align: left;">
            <p>Resolución: ${this.resolucion}</p>
            <p>Desde: ${this.consecutivoDesde} Hasta: ${this.consecutivoHasta}</p>
            <p>Fecha: ${this.fechaInicioResolucion} Hasta: ${this.fechaFinResolucion}</p>
          </div>
          <hr>
          <div style="text-align: center;">
            <p>Factura ${this.idDocumentoFinal}</p>
            <p>cliente ${this.clienteobj!.nombreCompleto!}</p>
          </div>
          <hr>
          <div style="text-align: left;">
      `;

     
 receiptHTML += `<table  style="font-family: Arial, sans-serif; width: 300px;">`
console.log('listado',this.listado);
      this.listado?.forEach((lista) => {
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
receiptHTML += `</table>`
    const valorParcial = typeof this.valorParcial  === 'number' ? this.valorParcial : parseFloat(this.valorParcial??'0'); 
    const valorIVA = typeof this.valorIVA  === 'number' ? this.valorIVA : parseFloat(this.valorIVA??'0'); 
    const totalFactura = typeof this.totalFactura  === 'number' ? this.totalFactura : parseFloat(this.totalFactura??'0'); 
   

      receiptHTML += `
          </div>
          <div style="text-align: right;">
            <p>Valor Parcial: ${valorParcial.toFixed(2)}</p>
            <p>IVA: ${valorIVA.toFixed(2)}</p>
            <p>Total Factura: ${totalFactura.toFixed(2)}</p>
          </div>
          <hr>
          <div style="text-align: center;">
            <p>Medios de Pago</p>
          </div>
          <div style="text-align: right;">
      `;

      this.pagos?.forEach((pago) => {
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

      receiptHTML += `
          </div>
          <div style="text-align: center;">
            <p>*** Gracias por su compra ***</p>
          </div>
        </div>
      `;

      return receiptHTML;
  }

  // Método para imprimir la tirilla de punto de venta
  public printReceipt(sucursal:vwsucursal) {
    this.sucursal=sucursal;
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
