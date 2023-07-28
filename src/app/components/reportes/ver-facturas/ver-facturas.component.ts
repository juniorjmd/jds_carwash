import { Component, OnInit } from '@angular/core';
import { DocumentosModel } from 'src/app/models/documento.model';
import { DocumentoService } from 'src/app/services/documento.service';
import { loading } from 'src/app/models/app.loading';
import { select } from 'src/app/interfaces/generales.interface';
import Swal from 'sweetalert2';
import { ConectorPlugin } from 'src/app/models/app.printer.con';
import { DocpagosModel } from 'src/app/models/pagos.model';
import { DocumentoListado } from 'src/app/interfaces/documento.interface';
import { printer, url } from 'src/app/models/app.db.url';

@Component({
  selector: 'app-ver-facturas',
  templateUrl: './ver-facturas.component.html',
  styleUrls: ['./ver-facturas.component.css']
})
export class VerFacturasComponent implements OnInit {

  documentos : DocumentosModel[] = [];
  codFactura:string;
  codCliente:string;
  fecha1:string;
  fecha2:string;
  constructor(public loading : loading,
    private documentoService : DocumentoService ) {
       this.codFactura = '';
       this.codCliente= '';
       /**const year = date.getFullYear() * 1e4; // 1e4 gives us the the other digits to be filled later, so 20210000.
const month = (date.getMonth() + 1) * 100; // months are numbered 0-11 in JavaScript, * 100 to move two digits to the left. 20210011 => 20211100
const day = date.getDate(); // */
      let fecha = new Date();
       this.fecha1 = fecha.getFullYear().toString() +'-'+ (fecha.getMonth() + 1).toString().padStart(2,'0')+'-'+ (fecha.getDate()).toString().padStart(2,'0') ;
       this.fecha2 = this.fecha1;
    
     }

  ngOnInit(): void {
       this.removeGetActivo('ListadoPorNumeroLink');
  }
  limpiarListado(){
    this.documentos=[];
  }
  removeGetActivo(a:string){
    this.limpiarListado()
    console.log(a);
    $('.likcontPrd').each(function(){
       $(this).removeClass('active')
    }) ;
    
    $('#'+a ).addClass('active') 
    $('.contPrd').css('display' , 'none   ')
    const elemDiv = document.getElementById(a.trim()+'Div') 
    elemDiv.style.display = 'block'
  }

  VerFactura(venta:DocumentosModel){
    let pagosHtml:string =  `<h1>Factura :  ${venta.idDocumentoFinal}</h1>
    <h2>Cliente :  ${venta.clienteNombre}</h2>
    <h2>fecha :  ${venta.fecha}</h2>
    <table class='table' style='font-size:12px'> 
    <tr>
    <td>Producto</td>
    <td>código</td>
    <td>cantidad</td>
    <td>precio</td>
    <td>IVA</td>
    <td>total</td> 
    </tr>
   `;
   // cantInicial, cantActual, compras, ventas, devoluciones, stock, remisionada,
   
   venta.listado.forEach(pago=>{
     pagosHtml +=`<tr> `;
     pagosHtml +=`<td>${pago.nombreProducto}</td> `;
     pagosHtml +=`<td nowrap>${pago.idProducto}</td> `;
     pagosHtml +=`<td nowrap>${pago.cant_real_descontada}</td> `;
     pagosHtml +=`<td nowrap>${pago.presioSinIVa}</td> `;
     pagosHtml +=`<td nowrap>${pago.IVA}</td> `;
     pagosHtml +=`<td nowrap>${pago.valorTotal}</td> `; 
     pagosHtml +=`</tr> `;
   })



   pagosHtml +=   `  
   <tr><td colspan="2"></td>
     <td colspan="4">
     <table class='table' style='font-size:12px'> 
     <tr><td colspan="3">
     <h4>Pagos</h4></td></tr>
  `;
  pagosHtml +=`<tr> `;
  pagosHtml +=`<td>Medio de pago</td> `;
  pagosHtml +=`<td nowrap>Referencia</td> `;
  pagosHtml +=`<td nowrap>Valor</td> `; 
  pagosHtml +=`</tr> `;
  // cantInicial, cantActual, compras, ventas, devoluciones, stock, remisionada,
  
  venta.pagos.forEach(pago=>{
    pagosHtml +=`<tr> `;
    pagosHtml +=`<td style="text-align: left;"><b>${pago.nombreMedio}</b></td> `;
    pagosHtml +=`<td nowrap>${pago.referencia}</td> `;
    pagosHtml +=`<td nowrap>${pago.valorPagado}</td> `; 
    pagosHtml +=`</tr> `;
  })


  pagosHtml += '</table>'


  
  pagosHtml += '</td></tr></table>'

   Swal.fire({html:pagosHtml, width: '800px' , showCancelButton:true , cancelButtonText:'imprimir'}).then(value=>{
    console.log(value);
    if(value.isDismissed){
      this.imprimirFactura(venta);
    }
    
   });
  }
  async imprimirFactura(factura:DocumentosModel)
  { console.log(factura); 
    let fecha = new Date();
    let dayOfMonth = fecha.getDate();
    let month = fecha.getMonth() + 1;
    let year = fecha.getFullYear();
    let hour = fecha.getHours();
    let minutes = fecha.getMinutes(); 
    let auxStr:string;
let fechaStr =  dayOfMonth + "/" + month +"/" + year +' '+ hour +':'+minutes; 
   let nombreImpresora = printer.namePrinterGenerico;
   if (!nombreImpresora) return console.log("Selecciona una impresora");
   let conector = new ConectorPlugin(null);
   conector.cortar();
   conector.establecerTamanioFuente(1, 1);
   conector.establecerEnfatizado(0);
   conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
  // conector.imagenDesdeUrl(url.brand + "/logo_empresa.png")
   conector.texto( factura.nombreEsta + "\n");
   conector.texto( 'Vende : '+factura.vendedorNombre + "\n" ); 
   conector.texto("Fecha/Hora:"+fechaStr+ "\n");
   conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);
   conector.texto( "     Resolucion:"+ factura.resolucion + "\n" ); 
   conector.texto( "     Desde :"+ factura.consecutivoDesde +" Hasta :"+ factura.consecutivoHasta + "\n" ); 
   conector.texto( "     Fecha:"+ factura.fechaInicioResolucion  +" Hasta :"+factura.fechaFinResolucion + "\n" ); 
   conector.texto("----------------------------------------\n"); 
   conector.texto("Factura "+factura.idDocumentoFinal + "\n");
   conector.texto("----------------------------------------\n");
   conector.texto("----------------COPIA-------------------\n");
   conector.texto("----------------------------------------\n");
   factura.listado.forEach((lista:DocumentoListado)=>{
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);
    conector.texto("  "+lista.nombreProducto + "\n");
    conector.texto("|    Precio   | cnt |    dest    |    total    |\n");
    auxStr = lista.presioVenta.toString() ;
    lista.presioVenta = parseInt(auxStr);
    conector.texto(lista.presioVenta.toString().padStart(13 )  );
    auxStr = lista.cantidadVendida.toString() ;
    lista.cantidadVendida = parseInt(auxStr);
    conector.texto(lista.cantidadVendida.toString().padStart(6 ));
    auxStr = lista.descuento.toString() ;
    lista.descuento = parseInt(auxStr);
    conector.texto(lista.descuento.toString().padStart(14 ));
    auxStr = lista.valorTotal.toString() ;
    lista.valorTotal = parseInt(auxStr);
    conector.texto(lista.valorTotal.toString().padStart(14 ) +  "\n\n");
   })
   conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha); 
   conector.texto("------------------------------------\n");
   auxStr =  factura.valorParcial.toString() ;  
   conector.texto("Valor Parcial  :  "+auxStr.padStart( 16  , ' ' )+ "\n");
   auxStr =  factura.valorIVA.toString() ;  
   conector.texto("          IVA  :  "+auxStr.padStart( 16  , ' ' )+ "\n");
   auxStr =  factura.valorTotal.toString() ;  
   conector.texto("Total Factura  :  "+auxStr.padStart( 16  , ' ' )+ "\n");
   auxStr =  factura.totalFactura.toString() ;   
   conector.texto("------------------------------------\n\n");
   
   conector.texto("-----------------------------------------------\n");
   conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
   conector.texto("Medios de Pago\n"); 
   conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha); 
   conector.texto("-----------------------------------------------\n\n"); 
   let tamanio = 0;
   factura.pagos.forEach((pago:DocpagosModel)=>{
    tamanio = 42 - pago.nombreMedio.trim().length; 

    conector.texto( '     '+pago.nombreMedio.trim()+ pago.valorPagado.toString().padStart(tamanio)+ "\n");
    if (pago.valorRecibido > 0 ){
      conector.texto(" Recibido                       vueltos\n");
    conector.texto("      "+pago.valorRecibido + pago.vueltos.toString().padStart(30,'.') + "\n");
    }else{
      conector.texto( "     Referencia" +pago.referencia.padStart(30,'.') +"\n");
    }
    
   })
   conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
   
   conector.texto("\n-----------------------------------------------\n\n");    
   conector.texto("***Gracias por su compra***\n");
   
   conector.feed(4)

   conector.abrirCajon() // Abrir cajón de dinero. Opcional
   conector.cortar()
   const respuestaAlImprimir = await conector.imprimirEn(nombreImpresora);
   if (respuestaAlImprimir === true) {
       console.log("Impreso correctamente");
   } else {
       console.log("Error. La respuesta es: " + respuestaAlImprimir);
   }
  } 

  getDocumentos(){
    //this.printer_factura_final(); 
    if(this.codFactura.trim() === ''){
      Swal.fire('Es necesario ingresar el codigo o numero de factura','error','error');
      return;
    }
    this.documentoService.getVentasFinalizadas(this.codFactura.trim() ).subscribe(
      (datos:select)=>{
        let cont = 0; 
         this.documentos = []; 
         console.log('getDocumentos', datos.numdata);
         console.log('getDocumentos_recuest', datos );
         
    if (datos.numdata > 0 ){ 
      datos.data.forEach((dato:any , index  )=>{  
       this.documentos.push(dato.objeto);
       
      }) 
   } else{
    Swal.fire('No existen datos relacionados con la busqueda')
   } 
  } ,
  (error: any) =>{
    alert(JSON.stringify(error));
  
  });
  }


  getDocumentosPorFecha(){
    //this.printer_factura_final(); 
    if(this.fecha1.trim() === ''){
      Swal.fire('Es necesario escoger la fecha inicial del rango de factura','error','error');
      return;
    } 
    if(this.fecha2.trim() === ''){
      Swal.fire('Es necesario escoger la fecha final del rango de factura','error','error');
      return;
    }
    this.documentoService.getVentasFinalizadasPorFecha(this.fecha1.trim(),this.fecha2.trim() ).subscribe(
      (datos:select)=>{
        let cont = 0; 
         this.documentos = []; 
         console.log('getDocumentos', datos.numdata);
         console.log('getDocumentos_recuest', datos );
         
    if (datos.numdata > 0 ){ 
      datos.data.forEach((dato:any , index :number )=>{  
       this.documentos.push(dato.objeto);
       
      }) 
   } else{
    Swal.fire('No existen datos relacionados con la busqueda')
   } 
  } ,
  (error: any) =>{
    alert(JSON.stringify(error));
  
  });
  }
  getDocumentosPorCliente(){
    //this.printer_factura_final(); 
    if(this.codCliente.trim() === ''){
      Swal.fire('Es necesario ingresar el numero de identificacion o nombre del cliente de la factura','error','error');
      return
    }
    this.documentoService.getVentasFinalizadasPorCliente(this.codCliente.trim() ).subscribe(
      (datos:select)=>{
        let cont = 0; 
         this.documentos = []; 
         console.log('getDocumentos', datos.numdata);
         console.log('getDocumentos_recuest', datos );
         
    if (datos.numdata > 0 ){ 
      datos.data.forEach((dato:any , index  )=>{  
       this.documentos.push(dato.objeto);
       
      }) 
   }else{
    Swal.fire('No existen datos relacionados con la busqueda')
   } 
  } ,
  (error: any) =>{
    alert(JSON.stringify(error));
  
  });
  }
}
