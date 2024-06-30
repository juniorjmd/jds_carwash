import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { loading } from 'src/app/models/app.loading';
import { select } from 'src/app/interfaces/generales.interface';
import { DocumentosModel } from 'src/app/models/ventas/documento.model';
import { DocumentoService } from 'src/app/services/documento.service';
import { MatDialog } from '@angular/material/dialog';
import { OdooPrd, responsePrd } from 'src/app/interfaces/odoo-prd';
import { MoverDocumentosComponent } from '../mover-documentos/mover-documentos.component'; 
import { DocumentoListado } from 'src/app/interfaces/documento.interface';
import { ProductoService } from 'src/app/services/producto.service';
import { errorOdoo } from 'src/app/interfaces/odoo-prd';
import { MediosDePago } from 'src/app/interfaces/medios-de-pago.interface';
import { cajasServices } from 'src/app/services/Cajas.services';
import { DocpagosModel, pagosModel } from 'src/app/models/ventas/pagos.model';
import { PagosVentaComponent } from '../pagos-venta/pagos-venta.component';
import { printer, url } from 'src/app/models/app.db.url';
import { ConectorPlugin } from 'src/app/models/app.printer.con';
import { BuscarProdDirectoComponent } from '../buscar-prod-directo/buscar-prod-directo.component'; 
import { productoDocumento } from 'src/app/interfaces/clientes-odoo';
import { RecursoDetalle, Usuario } from 'src/app/interfaces/usuario.interface';
import { LoginService } from 'src/app/services/login.services';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FndClienteComponent } from 'src/app/modules/personas/pages/clientes/fnd-cliente/fnd-cliente.component';
import Swal from 'sweetalert2';
import { IngresarProductoVentaComponent } from '../ingresar-producto-venta/ingresar-producto-venta.component';
import { DtoDocumentoProducto } from 'src/app/interfaces/dto-documento-producto';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements AfterViewInit, OnInit {

  cotiza = false; 
  libranza = false; 
  pasaAotraCaja = false;
  planSepare = false;
  domicilio = false;
  pagos: pagosModel[] = []; 
  indexEfectivo!: number;
  focus!: boolean;
  MedioP: MediosDePago[] = [];
  MedioPInicial: MediosDePago[] = [];
  buscarClose: boolean = true;
  codigoProducto!: string;
  vueltas: boolean = false;
  menusUsuario: RecursoDetalle[] = [];
  documentos: DocumentosModel[] = [];
  documentoActivo: DocumentosModel = new DocumentosModel();
  documentoRetorno: DocumentosModel = new DocumentosModel();
  documentoSeleccionadoActivo: DocumentosModel = new DocumentosModel(); 

  @ViewChild('codProd') codProdlement!: ElementRef;

  constructor(
    public loading: loading,
    private serviceCaja: cajasServices,
    private newAbrirDialog: MatDialog,
    private documentoService: DocumentoService,
    private productoService: ProductoService,
    private _ServLogin: LoginService, 
    private _Router: Router
  ) {  
    console.clear();
    this.getUsuarioLogueado();
  }

  ngOnInit(): void {  
    this.getMediosP();
  }

  ngAfterViewInit(): void {
    this.irbuscarProducto();
  }
  getUsuarioLogueado(){
    this._ServLogin.getUsuarioLogeado().subscribe(
      {
        next:(request) => {
          this.getMenuImage(request.data.usuario)
        } ,
        error: error=>{console.error('Error getUsuarioLogeado', error);} 
      }
    )
  }

  getMenuImage(usuario: Usuario) {
    let menuCard: RecursoDetalle[] = [];
    let menu = usuario.permisos;
    let margin = 0;
    console.log( 'permisos usuario' , usuario, menu);

    let menuDetalleBtn =  usuario.permisos.filter(x=> x.nombre_recurso === "Punto de Venta" )
    console.log( 'permisos usuario',  menuDetalleBtn[0].recursosHijos);
    menuDetalleBtn[0].recursosHijos!.forEach((recurso ) => { 

        switch (recurso.nombre_recurso.trim()) {
          case 'crear cotizacion':
            this.cotiza = true; 
            break;
          case 'crear libranza':
            this.libranza = true; 
            break;
          case 'pasar a otra caja':
            this.pasaAotraCaja = true;
            break;
          case 'plan separe':
            this.planSepare = true;
            break;
          case 'domicilio':
            this.domicilio = true;
            break;
        }
       
    });

    return menuCard;
  }

  getDocumentos() { 
    this.vueltas = true; 
    this.documentoService.getDocumentosCaja().pipe(
      tap((datos: any) => {
        this.documentos = [];
        let documentoSeleccionado: DocumentosModel[] ;
        console.log('getDocumentos', datos.numdata);
        console.log('getDocumentos_recuest', datos);

        if (datos.numdata > 0) {
          this.documentos = datos.data ; 
          console.log('getDocumentos_recuest', this.documentos);
          if (datos.numdata === 1) {
            this.documentoActivo = datos.data[0];
          } else {
            documentoSeleccionado = this.documentos.filter((x: DocumentosModel) => x.estado == 1) ; 
          console.log('documentoSeleccionado' , documentoSeleccionado);
            this.documentoActivo = (documentoSeleccionado.length > 0) ?  documentoSeleccionado[0] :  this.documentos[0]; 
          }
          this.asignarMediosDePagoValoresIniciales();
        
          
          
          this.irbuscarProducto();
        } else {
          this.crearDocumento();
        }
        this.vueltas = false;
      }),
      catchError((error: any) => {
        console.error('error', error );
        return of(null); // Devuelve un observable vacío en caso de error
      })
    ).subscribe({
      next: () => {},
      error: (error) => console.error('Error:', error),
      complete: () => console.log('getDocumentos completo')
    });
  }

  asignarMediosDePagoValoresIniciales(){

    this.MedioP = this.MedioPInicial.map(x=>x);
    console.log('documentoActivo' , this.documentoActivo); 
          if (this.documentoActivo.pagos === undefined || this.documentoActivo.pagos.length === 0){
            this.documentoActivo.pagos = this.MedioP.map((value: any , index) => {
              let valorPago = 0;
               if (value.nombre.toUpperCase() == 'EFECTIVO'){
                 valorPago = this.documentoActivo.totalFactura
               }
                let auxpago:DocpagosModel = {
                  idDocumento: this.documentoActivo.orden,
                  idMedioDePago: value.id,
                  valorPagado: valorPago,
                  valorTotalAPagar: valorPago,
                  valorRecibido: valorPago,
                  vueltos: 0,
                  referencia: ''
                } ; 
              return auxpago;
            })
          } 
           let docPagos = [...this.documentoActivo.pagos] ; 
                      console.log("asignar pagos" , docPagos)
           this.MedioP.forEach(medio => {
           console.log(medio.id);
            const pago = docPagos.find((p: DocpagosModel) => p.idMedioDePago == medio.id);
            console.log('get pagos iteracion ' , pago )
            if (pago) {
              medio.valor_aux = pago.valorPagado;
            }
          }); 

            this.pagos = this.documentoActivo.pagos!;
            console.log('pagos factura', this.pagos,'medios de pagos ', this.MedioP);

  }

  crearDocumento() {
    this.loading.show();
    this.documentoService.crearDocumento().pipe(
      tap((respuesta: any) => {
        console.log('crearDocumento', respuesta); 
        if (respuesta.error === 'ok') {
          this.getDocumentos();
        } else {
          try {
            Swal.fire(respuesta.error, '', 'error');
           } catch (error : any) {
            Swal.fire('error en el servidor', '', 'error');
           }
        }
        this.loading.hide();
        this.irbuscarProducto();
      }),
      catchError((error: any) => {
        this.loading.hide(); 
        try {
          Swal.fire(error, '', 'error');
         } catch (error : any) {
          Swal.fire('error en el servidor', '', 'error');
         }
        return of(null);
      })
    ).subscribe({
      next: () => {},
      error: (error) => console.error('Error:', error),
      complete: () => console.log('crearDocumento completo')
    });
  }

  buscarProducto() { 
    console.log('buscarProducto', this.codigoProducto);
    let dataAuxEnvio: productoDocumento = {
      'idproducto': this.codigoProducto,
      'documento': this.documentoActivo
    }; 
    if (this.codigoProducto.trim() !== '' && this.buscarClose) {
      
      this.loading.show();
      this.productoService.getProductoByIdOrCodBarra(this.codigoProducto).subscribe({
        next:(value)=>{console.log(value)
          let datoAsignacion:DtoDocumentoProducto = {
            'producto': value?.productos    ,
             'documento':this.documentoActivo
           }
           this.newAbrirDialog.open(IngresarProductoVentaComponent, { data:  datoAsignacion })
           .afterClosed()
           .pipe(
             tap((confirmado: Boolean) => {
               if (confirmado) { 
                 this.getDocumentos();
               }
             })
           ).subscribe({
             next: () => {},
             error: (error) => console.error('Error:', error),
             complete: () => console.log('moverDocumentoCaja completo')
           });  
        },
      error:error=>console.error(error),complete:()=>
        this.loading.hide() 
      })
     
    }
  }

  moverDocumentoCaja() {
    this.newAbrirDialog.open(MoverDocumentosComponent, { data: this.documentoActivo })
      .afterClosed()
      .pipe(
        tap((confirmado: Boolean) => {
          if (confirmado) { 
            this.getDocumentos();
          }
        })
      ).subscribe({
        next: () => {},
        error: (error) => console.error('Error:', error),
        complete: () => console.log('moverDocumentoCaja completo')
      });
  }

  eliminarLinea(linea: DocumentoListado) {
    console.log(linea);
    this.loading.show();
    this.productoService.devolverPrdCompra(linea).pipe(
      tap((respuesta: any) => {
        console.log(JSON.stringify(respuesta));
        if (respuesta.error !== 'ok') { 
          try {
            Swal.fire(respuesta.error, '', 'error');
           } catch (error : any) {
            Swal.fire('error en el servidor', '', 'error');
           }
        } else {
          this.getDocumentos();
        }
        this.loading.hide();
      }),
      catchError((error: errorOdoo) => {
        console.log(JSON.stringify(error)); 
        try {
          Swal.fire(error.error.error, '', 'error');
         } catch (error : any) {
          Swal.fire('error en el servidor', '', 'error');
         }
        this.loading.hide();
        return of(null);
      })
    ).subscribe({
      next: () => {},
      error: (error) => console.error('Error:', error),
      complete: () => console.log('eliminarLinea completo')
    });
  }

  irbuscarProducto() {
    let activeTextarea = document.activeElement!.tagName; 
    console.log(activeTextarea);
    if (activeTextarea.toUpperCase().indexOf('SELECT') < 0) {
      this.codProdlement.nativeElement.focus();
    }
  }

  irbuscarProductoObl() { 
    this.codProdlement.nativeElement.focus(); 
  }

  asignarPagosAVenta() {
    if (typeof(this.documentoActivo.listado) === 'undefined' || this.documentoActivo.listado.length === 0) { 
      Swal.fire('No posee elementos a facturar', 'Debe incluir minimo un producto o servicio en la factura', 'error');
      return;
    } 
    this.newAbrirDialog.open(PagosVentaComponent, { data: this.documentoActivo })
      .afterClosed()
      .pipe(
        tap((confirmado: Boolean) => {
          if (confirmado) { 
            this.facturarDocumento();
          }
        })
      ).subscribe({
        next: () => {},
        error: (error) => console.error('Error:', error),
        complete: () => console.log('asignarPagosAVenta completo')
      });
  }

  facturarDocumento() {
    this.documentoActivo.pagos = [];
    if (typeof(this.documentoActivo.pagos) === 'undefined' || this.documentoActivo.pagos.length === 0) {
      this.documentoActivo.pagos[0] = new DocpagosModel();
      this.documentoActivo.pagos[0].idDocumento = this.documentoActivo.orden;
      try {
        this.documentoActivo.pagos[0].idMedioDePago = this.pagos[this.indexEfectivo].idMedioDePago;
        this.documentoActivo.pagos[0].referencia = 'Efectivo';
        this.documentoActivo.pagos[0].valorPagado = this.pagos[this.indexEfectivo].valorPagado;
      } catch (error: any) {
        this.documentoActivo.pagos[0].idMedioDePago = 1;
        this.documentoActivo.pagos[0].referencia = 'Efectivo';
        this.documentoActivo.pagos[0].valorPagado = this.documentoActivo.valorTotal;
      }
    } else {
      console.log(this.documentoActivo.pagos);
    }
    if (this.documentoActivo.listado!.length === 0) {
      let error = 'Debe ingresar los productos a facturar' ; 
      try {
        Swal.fire(error, '', 'error');
       } catch (error : any) {
        Swal.fire('error en el servidor', '', 'error');
       }
      return;
    }
    if (parseInt(this.documentoActivo.totalFactura.toString()) === 0) { 
      try {
        Swal.fire('el total de la factura debe ser mayor a cero', '', 'error');
       } catch (error : any) {
        Swal.fire('error en el servidor', '', 'error');
       }
      return;
    }

    this.loading.show();
    this.documentoService.cerrarDocumento(this.documentoActivo.orden).subscribe({next:(respuesta: any) => {
      if (respuesta.error === 'ok') {
        this.documentoRetorno = respuesta.data.documentoFinal;
        console.log('facturarDocumento', this.documentoRetorno);
        this.printer_factura_final();
        this.crearDocumento();
      } else {
        try {
          Swal.fire(respuesta.error, '', 'error');
         } catch (error : any) {
          Swal.fire('error en el servidor', '', 'error');
         }
      }
      this.loading.hide();
      this.irbuscarProducto();
    }
      ,error: (error: any) => {
         
        try {
          Swal.fire(error, '', 'error');
         } catch (error : any) {
          Swal.fire('error en el servidor', '', 'error');
         }},complete:()=>{console.log('facturarDocumento completo');
            this.loading.hide()
         }
    })
  }

  cambiarDocumentoActivo() {
    this.loading.show();
    this.documentoService.cambiarDocumento(this.documentoActivo.orden).pipe(
      tap((respuesta: any) => {
        if (respuesta.error !== 'ok') {  
          try {
            Swal.fire(respuesta.error, '', 'error');
           } catch (error : any) {
            Swal.fire('error en el servidor', '', 'error');
           }
        } else { 
          try {
            this.asignarMediosDePagoValoresIniciales();
          } catch (error: any) {
            console.error('Error setting pagos', error);
          }
        }
        this.loading.hide();
        this.irbuscarProducto();
      }),
      catchError((error: any) => {
        this.loading.hide();
        try {
          Swal.fire(error, '', 'error');
         } catch (error : any) {
          Swal.fire('error en el servidor', '', 'error');
         }
        return of(null);
      })
    ).subscribe({
      next: () => {},
      error: (error) => console.error('Error:', error),
      complete: () => console.log('cambiarDocumentoActivo completo')
    });
  }

  cancelarDocumento() {
    this.loading.show();
    this.documentoService.cancelarDocumento(this.documentoActivo.orden).pipe(
      tap((respuesta: any) => {
        if (respuesta.error === 'ok') {
          this.getDocumentos(); 
        } else {
          this.getDocumentos();
          try {
            Swal.fire(respuesta.error, '', 'error');
           } catch (error : any) {
            Swal.fire('error en el servidor', '', 'error');
           }
        }
        this.loading.hide();
        this.irbuscarProducto();
      }),
      catchError((error: any) => {
        this.loading.hide();
        try {
          Swal.fire(error, '', 'error');
         } catch (error : any) {
          Swal.fire('error en el servidor', '', 'error');
         }
        return of(null);
      })
    ).subscribe({
      next: () => {},
      error: (error) => console.error('Error:', error),
      complete: () => console.log('cancelarDocumento completo')
    });
  }
//generar factura domicilio
  generarEnvio() { 
    if (this.documentoActivo.totalFactura <= 0) { 
      
      Swal.fire('El valor en la factura debe ser mayor a cero', '', 'error');
      
      return;
    }
    if (this.documentoActivo.cliente === 0) {
      this.newAbrirDialog.open(FndClienteComponent, { data: { docActivo : this.documentoActivo , invoker:'ventas' }})
        .afterClosed()
        .pipe(
          tap((confirmado: Boolean) => {
            this.generarDomicilio();
            this.buscarClose = true;
          })
        ).subscribe({
          next: () => {},
          error: (error) => console.error('Error:', error),
          complete: () => console.log('generarEnvio completo')
        });   
    } else {
      this.generarDomicilio();
    }
  }

  generarDomicilio() {
    this.loading.show();
    this.documentoService.generarDomicilioDocumento(this.documentoActivo.orden).pipe(
      tap((respuesta: any) => {
        if (respuesta.error === 'ok') {
          this.getDocumentos(); 
        } else {
          this.getDocumentos();
          try {
            Swal.fire(respuesta.error, '', 'error');
           } catch (error : any) {
            Swal.fire('error en el servidor', '', 'error');
           }
        }
        this.loading.hide();
        this.irbuscarProducto();
      }),
      catchError((error: any) => {
        this.loading.hide();
        try {
          Swal.fire(error, '', 'error');
         } catch (error : any) {
          Swal.fire('error en el servidor', '', 'error');
         }
        return of(null);
      })
    ).subscribe({
      next: () => {},
      error: (error) => console.error('Error:', error),
      complete: () => console.log('generarDomicilio completo')
    });
  }

  getMediosP() { 
    this.loading.show();
    this.serviceCaja.getMediosCajaActiva().pipe(
      tap((datos: any) => {
        if (datos.numdata > 0) { 
          this.MedioP = datos.data! ;
          this.MedioPInicial = datos.data! ;
          this.getDocumentos();
        } else {
          this.MedioP = [];
          Swal.fire('error en el servidor', 'No hay medios de pago disponible', 'error');    
        }  
        this.loading.hide();
      }),
      catchError((error: any) => {
        this.loading.hide(); 
        try {
          Swal.fire(error.error.error, '', 'error');
         } catch (error : any) {
          Swal.fire('error en el servidor', '', 'error');
         }
        return of(null);
      })
    ).subscribe({
      next: () => {},
      error: (error) => console.error('Error:', error),
      complete: () => console.log('getMediosP completo')
    });
  }

  busquedaAuxiliarProducto() { 
    this.buscarClose = false;
    this.newAbrirDialog.open(BuscarProdDirectoComponent, { data: this.codigoProducto })
      .afterClosed()
      .pipe(
        tap((response: responsePrd) => {
          if (response.confirmado && response.datoDevolucion !== undefined ) { 

            let datoAsignacion:DtoDocumentoProducto = {
             'producto': response.datoDevolucion    ,
              'documento':this.documentoActivo
            }
            this.newAbrirDialog.open(IngresarProductoVentaComponent, { data:  datoAsignacion })
            .afterClosed()
            .pipe(
              tap((confirmado: Boolean) => {
                if (confirmado) { 
                  this.getDocumentos();
                }
              })
            ).subscribe({
              next: () => {},
              error: (error) => console.error('Error:', error),
              complete: () => console.log('moverDocumentoCaja completo')
            });  
          } else { 
            this.codigoProducto = '';
            this.irbuscarProducto();
          }
        })
      ).subscribe({
        next: () => {},
        error: (error) => console.error('Error:', error),
        complete: () => console.log('busquedaAuxiliarProducto completo')
      });
  }

  buscarCliente(){
    this.newAbrirDialog.open(FndClienteComponent,{data:this.documentoActivo })
    .afterClosed()
    .pipe(
      tap((confirmado: Boolean)=>{
        if (confirmado) { 
          this.getDocumentos();  
          this.codigoProducto = '';
          this.irbuscarProducto();
          this.buscarClose = true;}
      })
    ).subscribe({
      next: () => {},
      error: (error) => console.error('Error:', error),
      complete: () => console.log('buscarCliente completo')
    });   
  }

  async printer_factura_final() {
    console.log(this.documentoRetorno); 
    let fecha = new Date();
    let dayOfMonth = fecha.getDate();
    let month = fecha.getMonth() + 1;
    let year = fecha.getFullYear();
    let hour = fecha.getHours();
    let minutes = fecha.getMinutes(); 
    let auxStr: string;
    let fechaStr =  dayOfMonth + "/" + month + "/" + year + ' ' + hour + ':' + minutes; 
    let nombreImpresora = printer.namePrinterGenerico;
    if (!nombreImpresora) return console.log("Selecciona una impresora");
    let conector = new ConectorPlugin(null);
    conector.cortar();
    conector.establecerTamanioFuente(1, 1);
    conector.establecerEnfatizado(0);
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
    conector.texto(this.documentoRetorno.nombreEsta + "\n");
    conector.texto('Vende : ' + this.documentoRetorno.vendedorNombre + "\n"); 
    conector.texto("Fecha/Hora:" + fechaStr + "\n");
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);
    conector.texto("     Resolucion:" + this.documentoRetorno.resolucion + "\n"); 
    conector.texto("     Desde :" + this.documentoRetorno.consecutivoDesde + " Hasta :" + this.documentoRetorno.consecutivoHasta + "\n"); 
    conector.texto("     Fecha:" + this.documentoRetorno.fechaInicioResolucion + " Hasta :" + this.documentoRetorno.fechaFinResolucion + "\n"); 
    conector.texto("--------------------------------\n"); 
    conector.texto("Factura " + this.documentoRetorno.idDocumentoFinal + "\n");
    conector.texto("--------------------------------\n");
    this.documentoRetorno.listado!.forEach((lista: DocumentoListado) => {
      conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);
      conector.texto("  " + lista.nombreProducto + "\n");
      conector.texto("|    Precio   | cnt |    dest    |    total    |\n");
      auxStr = lista.presioVenta.toString();
      lista.presioVenta = parseInt(auxStr);
      conector.texto(lista.presioVenta.toString().padStart(13));
      auxStr = lista.cantidadVendida.toString();
      lista.cantidadVendida = parseInt(auxStr);
      conector.texto(lista.cantidadVendida.toString().padStart(6));
      auxStr = lista.descuento.toString();
      lista.descuento = parseInt(auxStr);
      conector.texto(lista.descuento.toString().padStart(14));
      auxStr = lista.valorTotal.toString();
      lista.valorTotal = parseInt(auxStr);
      conector.texto(lista.valorTotal.toString().padStart(14) +  "\n\n");
    });
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha); 
    conector.texto("------------------------------------\n");
    auxStr = this.documentoRetorno.valorParcial.toString();  
    conector.texto("Valor Parcial  :  " + auxStr.padStart(16, ' ') + "\n");
    auxStr = this.documentoRetorno.valorIVA.toString();  
    conector.texto("          IVA  :  " + auxStr.padStart(16, ' ') + "\n");
    auxStr = this.documentoRetorno.valorTotal.toString();  
    conector.texto("Total Factura  :  " + auxStr.padStart(16, ' ') + "\n");
    auxStr = this.documentoRetorno.totalFactura.toString();   
    conector.texto("------------------------------------\n\n");
    conector.texto("-----------------------------------------------\n");
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
    conector.texto("Medios de Pago\n"); 
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha); 
    conector.texto("-----------------------------------------------\n\n"); 
    let tamanio = 0;
    this.documentoRetorno.pagos!.forEach((pago: DocpagosModel) => {
      tamanio = 42 - pago.nombreMedio!.trim().length; 
      conector.texto('     ' + pago.nombreMedio!.trim() + pago.valorPagado.toString().padStart(tamanio) + "\n");
      if (pago.valorRecibido > 0) {
        conector.texto(" Recibido                       vueltos\n");
        conector.texto("      " + pago.valorRecibido + pago.vueltos.toString().padStart(30, '.') + "\n");
      } else {
        conector.texto("     Referencia" + pago.referencia.padStart(30, '.') + "\n");
      }
    });
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
    conector.texto("\n-----------------------------------------------\n\n");    
    conector.texto("***Gracias por su compra***\n");
    conector.feed(4);
    conector.abrirCajon(); // Abrir cajón de dinero. Opcional
    conector.cortar();
    const respuestaAlImprimir = await conector.imprimirEn(nombreImpresora);
    if (respuestaAlImprimir === true) {
      console.log("Impreso correctamente");
    } else {
      console.log("Error. La respuesta es: " + respuestaAlImprimir);
    }
  }
}
