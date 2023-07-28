import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { loading } from 'src/app/models/app.loading';
import { select } from 'src/app/interfaces/generales.interface';
import { DocumentosModel } from 'src/app/models/documento.model';
import { DocumentoService } from 'src/app/services/documento.service';
import { MatDialog } from '@angular/material/dialog';
import { OdooPrd, responsePrd } from 'src/app/interfaces/odoo-prd';
import { MoverDocumentosComponent } from '../mover-documentos/mover-documentos.component';
import { BuscarProductosComponent } from '../buscar-productos/buscar-productos.component';
import { DocumentoListado } from 'src/app/interfaces/documento.interface';
import { ProductoService } from 'src/app/services/producto.service';
import { errorOdoo } from 'src/app/interfaces/odoo-prd';
import { MediosDePago } from 'src/app/interfaces/medios-de-pago.interface';
import { cajasServices } from 'src/app/services/Cajas.services';
import { DocpagosModel, pagosModel } from 'src/app/models/pagos.model';
import { PagosVentaComponent } from '../pagos-venta/pagos-venta.component';
import { printer, url } from 'src/app/models/app.db.url';
import { ConectorPlugin } from 'src/app/models/app.printer.con';
import { BuscarProdDirectoComponent } from '../buscar-prod-directo/buscar-prod-directo.component';
import { FndClienteComponent } from '../../cliente/fnd-cliente/fnd-cliente.component'; 
import { productoDocumento } from 'src/app/interfaces/clientes-odoo';
import { RecursoDetalle, Usuario } from 'src/app/interfaces/usuario.interface';
import { LoginService } from 'src/app/services/login.services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements AfterViewInit  {


  
  cotiza = false ; 
  libranza = false ; 
  pasaAotraCaja = false;
  planSepare = false;
  domicilio = false;
  pagos:pagosModel[] =[]  ;
  indexEfectivo:number;
  focus:boolean;
  MedioP:MediosDePago[]=[];
  buscarClose : boolean = true;
  codigoProducto:string;
  vueltas:boolean = false;
  menusUsuario :RecursoDetalle[];
  documentos : DocumentosModel[] = [];
  documentoActivo : DocumentosModel = new DocumentosModel();
  documentoRetorno : DocumentosModel = new DocumentosModel();
  documentoSeleccionadoActivo : DocumentosModel = new DocumentosModel(); 
  @ViewChild('codProd') codProdlement: ElementRef;
  constructor( public loading : loading,private serviceCaja : cajasServices ,
    private newAbrirDialog : MatDialog,
    private documentoService : DocumentoService,
    private productoService : ProductoService,private _ServLogin:LoginService , 
    private _Router : Router
    
 ) {  
  console.clear();
  this.getUsuarioLogeado(); 
  }

  async getUsuarioLogeado(){
    try {
      const ServLogin = await  this._ServLogin.getUsuarioLogeadoAsync(); 
      const datos:any|select  = await ServLogin; 
      console.log('retorno', datos);  
      let usuario : Usuario ;
      usuario = datos.data.usuario ; 
      this.menusUsuario = this.getMenuImage(usuario) ;
     console.log('estoy en getUsuarioLogeado',this.menusUsuario);
     this.getDocumentos();
  } catch (error) {
      throw new Error(`Error al leer maestros : ${error}`);
      console.log(error);
      alert( error.error.error);
      this._Router.navigate(['login']);
    }  
   
  }

  ngOnInit(): void {
    }
  getMenuImage(usuario:Usuario){

    let menuCard:RecursoDetalle[] = [];
    let menu = usuario.permisos;
    let margin = 0;
    console.log(usuario, menu);
    
    menu.forEach((detalle , index ) => {
      console.log('recorrido',index ,detalle ); 
        if(detalle.recurso.tipo === 'boton'){

          menuCard[margin]= detalle.recurso ;
          margin = margin + 1;

          switch (detalle.recurso.nombre_recurso)
          {
            case 'crear cotizacion' :

             this.cotiza = true ; 
              break;
              case 'crear libranza' :
                this.libranza = true ; 
                break;
                case 'pasar a otra caja' :
                  this.pasaAotraCaja = true;
                  break;
                  case 'plan separe' :
                    this.planSepare = true;
                    break;
                    case 'domicilio' :
                  this.domicilio = true;
                  break;
 
                 
          }
        }
      });
      

      return menuCard;
  }




  ngAfterViewInit(): void {
    this.irbuscarProducto();
    this.getMediosP();
  }
  busquedaAuxiliarProducto( ){ 
 
      this.buscarClose = false ;
      this.newAbrirDialog.open(BuscarProdDirectoComponent ,{data:this.codigoProducto })
      .afterClosed()
      .subscribe(( response:responsePrd  )=>{
        console.log(response);
        
        if (response.confirmado){
         
          console.log('dato retornado busqueda directa',response.datoDevolucion);
          this.codigoProducto = response.datoDevolucion.id.toString();
          this.buscarClose = true;
          this.buscarProducto()
          
        }else{ 
          this.codigoProducto = '';
          this.irbuscarProducto();
         
        }  
      })  
    
  }

  async printer_factura_final()
  { console.log(this.documentoRetorno); 
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
   conector.texto( this.documentoRetorno.nombreEsta + "\n");
   conector.texto( 'Vende : '+this.documentoRetorno.vendedorNombre + "\n" ); 
   conector.texto("Fecha/Hora:"+fechaStr+ "\n");
   conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);
   conector.texto( "     Resolucion:"+ this.documentoRetorno.resolucion + "\n" ); 
   conector.texto( "     Desde :"+ this.documentoRetorno.consecutivoDesde +" Hasta :"+ this.documentoRetorno.consecutivoHasta + "\n" ); 
   conector.texto( "     Fecha:"+ this.documentoRetorno.fechaInicioResolucion  +" Hasta :"+this.documentoRetorno.fechaFinResolucion + "\n" ); 
   conector.texto("--------------------------------\n"); 
   conector.texto("Factura "+this.documentoRetorno.idDocumentoFinal + "\n");
   conector.texto("--------------------------------\n");
   this.documentoRetorno.listado.forEach((lista:DocumentoListado)=>{
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
   auxStr =  this.documentoRetorno.valorParcial.toString() ;  
   conector.texto("Valor Parcial  :  "+auxStr.padStart( 16  , ' ' )+ "\n");
   auxStr =  this.documentoRetorno.valorIVA.toString() ;  
   conector.texto("          IVA  :  "+auxStr.padStart( 16  , ' ' )+ "\n");
   auxStr =  this.documentoRetorno.valorTotal.toString() ;  
   conector.texto("Total Factura  :  "+auxStr.padStart( 16  , ' ' )+ "\n");
   auxStr =  this.documentoRetorno.totalFactura.toString() ;   
   conector.texto("------------------------------------\n\n");
   
   conector.texto("-----------------------------------------------\n");
   conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
   conector.texto("Medios de Pago\n"); 
   conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha); 
   conector.texto("-----------------------------------------------\n\n"); 
   let tamanio = 0;
   this.documentoRetorno.pagos.forEach((pago:DocpagosModel)=>{
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



  getMediosP(){ 
  this.loading.show()
  this.serviceCaja.getMediosCajaActiva()
     .subscribe(
      (datos:select)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      datos.data.forEach((dato:MediosDePago , index )=>{
        this.MedioP[index] =   dato ;
        this.pagos[index] = new pagosModel();
        this.pagos[index].idMedioDePago = dato.id;
        if (dato.nombre === 'Efectivo')
       { this.indexEfectivo = index;
          this.pagos[index].valorPagado = this.documentoActivo.totalFactura;}
        else
        {this.pagos[index].valorPagado = 0;}
      }) 
      console.log(this.MedioP);
    }else{
      this.MedioP = [];
    }  
    console.log('medios de pago' , this.MedioP );
        this.loading.hide()
      } ,
      error => {this.loading.hide();
        alert( error.error.error);
      }
      );
  }
  generarEnvio(){ 
    if(this.documentoActivo.totalFactura <= 0){
      alert('El valor en la factura debe ser mayor a cero');
      return;
    }
    console.log('cliente',this.documentoActivo.cliente)
    if(this.documentoActivo.cliente === 0 ){
      
        this.newAbrirDialog.open(FndClienteComponent,{data:this.documentoActivo })
        .afterClosed()
        .subscribe((confirmado: Boolean)=>{
          this.generarDomicilio()
          this.buscarClose = true;

        })   
    }else{this.generarDomicilio()}

  }

  generarDomicilio(){
    this.loading.show() 
  this.documentoService.generarDomicilioDocumento(this.documentoActivo.orden).subscribe(
    (respuesta:select)=>{
      let cont = 0;
       console.log('crearDocumento',respuesta);  
       if (respuesta.error === 'ok'){
        this.getDocumentos(); 
       }else{
       this.getDocumentos();
         alert(respuesta.error);
       }
       this.loading.hide();
       this.irbuscarProducto();

} );
  }
  buscarCliente(){
    this.newAbrirDialog.open(FndClienteComponent,{data:this.documentoActivo })
    .afterClosed()
    .subscribe((confirmado: Boolean)=>{
      this.getDocumentos();
      this.codigoProducto = '';
      this.irbuscarProducto();
      this.buscarClose = true;
    })   
  }

  buscarProducto( ){ 
    console.log('buscarProducto',this.codigoProducto)
    let dataAuxEnvio:productoDocumento = {'idproducto':this.codigoProducto,
                                           'documento':this.documentoActivo}; 
    if (this.codigoProducto.trim() !== '' &&  this.buscarClose){
      this.buscarClose = false ;
      this.newAbrirDialog.open(BuscarProductosComponent ,{data:dataAuxEnvio })
      .afterClosed()
      .subscribe((confirmado: Boolean)=>{
        this.getDocumentos();
        this.codigoProducto = '';
        this.irbuscarProducto();
        this.buscarClose = true;
      })  
    }
  }
  moverDocumentoCaja(){
     this.newAbrirDialog.open(MoverDocumentosComponent ,{data:this.documentoActivo })
      .afterClosed()
      .subscribe((confirmado: Boolean)=>{
        if (confirmado){ 
          this.getDocumentos();
      }
      })
  } 

  eliminarLinea(linea:DocumentoListado){
    console.log(linea)
    this.loading.show() 
    this.productoService.devolverPrdCompra(linea).subscribe(
      (respuesta:select)=>{
        
        console.log(JSON.stringify(respuesta));
        if (respuesta.error !== 'ok'){
            alert(respuesta.error);
            
          }else{
            this.getDocumentos();
          }
          this.loading.hide()
        },
        (error:errorOdoo) =>{
          console.log(JSON.stringify( error) );
          
          alert(error.error.error +"\n" + error.error.msg); 
          this.loading.hide()
        }) 

  }
  irbuscarProducto( ){
   let activeTextarea = document.activeElement.tagName; 
   console.log(activeTextarea)
   if(activeTextarea.toUpperCase().indexOf('SELECT') < 0)
    this.codProdlement.nativeElement.focus();
  }
  irbuscarProductoObl( ){ 
     this.codProdlement.nativeElement.focus(); 
     
   }

  asignarPagosAVenta(){
    this.newAbrirDialog.open(PagosVentaComponent ,{data:this.documentoActivo })
     .afterClosed()
     .subscribe((confirmado: Boolean)=>{
       if (confirmado){ 
         this.facturarDocumento();
     }
     })
 }  
  facturarDocumento(){

     
    if (typeof(this.documentoActivo.pagos) === 'undefined' || this.documentoActivo.pagos.length === 0)
      {this.documentoActivo.pagos[0] = new DocpagosModel();
        this.documentoActivo.pagos[0].idDocumento =  this.documentoActivo.orden;
        try {
          this.documentoActivo.pagos[0].idMedioDePago =  this.pagos[ this.indexEfectivo].idMedioDePago;
        this.documentoActivo.pagos[0].referencia =  'Efectivo';
        this.documentoActivo.pagos[0].valorPagado =  this.pagos[ this.indexEfectivo].valorPagado;
        } catch (error) {
          this.documentoActivo.pagos[0].idMedioDePago =  1;
        this.documentoActivo.pagos[0].referencia =  'Efectivo';
        this.documentoActivo.pagos[0].valorPagado =  this.documentoActivo.valorTotal;
        }
        
        
      }else{
        console.log( this.documentoActivo.pagos);
      }
      //return;
      if (this.documentoActivo.listado.length === 0){
      alert('Debe ingresar los productos a facturar') ; 
      return;
    }
    if (parseInt(this.documentoActivo.totalFactura.toString()) === 0){
      alert('el total de la factura debe ser mayor a cero') ; 
      return;
    } 
  //  documentoActivo

  this.loading.show() 
  this.documentoService.cerrarDocumento(this.documentoActivo.orden).subscribe(
    (respuesta:select)=>{
      let cont = 0; 
       if (respuesta.error === 'ok'){
        this.documentoRetorno = respuesta.data.documentoFinal;
        console.log('facturarDocumento',this.documentoRetorno)
        this.printer_factura_final()
        this.crearDocumento();
        
       }else{
         alert(respuesta.error);
       }
       this.loading.hide();
       this.irbuscarProducto();

} );
  
  }
  crearDocumento(){
    this.loading.show() 
  this.documentoService.crearDocumento().subscribe(
    (respuesta:select)=>{
      let cont = 0;
       console.log('crearDocumento',respuesta); 
       if (respuesta.error === 'ok'){
        this.getDocumentos();
        
       }else{
         alert(respuesta.error);
       }
       this.loading.hide();
       this.irbuscarProducto();

} );
  } 
  cambiarDocumentoActivo(){
    this.loading.show() 
  this.documentoService.cambiarDocumento(this.documentoActivo.orden).subscribe(
    (respuesta:select)=>{
      let cont = 0;
       console.log('cambiarDocumento',respuesta);  
       if (respuesta.error !== 'ok'){  
         alert(respuesta.error); 
         
       }else{ 
        try {
          this.pagos[ this.indexEfectivo].valorPagado = this.documentoActivo.totalFactura;
        } catch (error) {
          
        }
          
      
      }
       this.loading.hide();
       this.irbuscarProducto();

} );
  }
  actualizarPagosDocumento(){

  }
  cancelarDocumento(){
    this.loading.show() 
  this.documentoService.cancelarDocumento(this.documentoActivo.orden).subscribe(
    (respuesta:select)=>{
      let cont = 0;
       console.log('cancelarDocumento',respuesta);  
       if (respuesta.error === 'ok'){
        this.getDocumentos(); 
       }else{
       this.getDocumentos();
         alert(respuesta.error);
       }
       this.loading.hide();
       this.irbuscarProducto();

} );
  }

 getDocumentos(){
  //this.printer_factura_final();
  this.vueltas =true;
  this.pagos = [];
  this.documentoService.getDocumentosUsuarioCaja().subscribe(
    (datos:select)=>{
      let cont = 0; 
       this.documentos = [];
       let documentoSeleccionado:DocumentosModel;
       console.log('getDocumentos', datos.numdata);
       console.log('getDocumentos_recuest', datos );
       
  if (datos.numdata > 0 ){ 
    datos.data.forEach((dato:any , index  )=>{ 
     // this.documentos = 
     this.documentos.push(dato.objeto);
     if(index === 0)  documentoSeleccionado = dato.objeto;
     if (dato.objeto.estado == 1 ){
      documentoSeleccionado = dato.objeto;
     } 
    })
    this.documentoActivo = documentoSeleccionado;
    if (this.documentoActivo.pagos.length > 0 ){
      this.pagos = this.documentoActivo.pagos;
      console.log('pagos factura',this.pagos)
    }else{
      try {
        this.pagos[ this.indexEfectivo].valorPagado = this.documentoActivo.totalFactura;
      } catch (error) {
        
      }
    }
     this.irbuscarProducto();
 }else{
  this.crearDocumento()
} 
 this.vueltas =false;
} ,
(error: any) =>{
  alert(JSON.stringify(error));

});
}
}
