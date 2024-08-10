import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { DocumentoListado } from 'src/app/interfaces/documento.interface';
import { CarteraRequest, DocumentoCierreRequest } from 'src/app/interfaces/producto-request';
import { CarteraModel } from 'src/app/models/cartera/cartera.model';
import { ClientesModel } from 'src/app/models/clientes/clientes.module';
import { DocumentosModel } from 'src/app/models/ventas/documento.model';
import { PersonasModule } from 'src/app/modules/personas/personas.module';
import { FndClienteComponent } from 'src/app/modules/shared/modals/fnd-cliente/fnd-cliente.component';
import { DocumentoService } from 'src/app/services/documento.service';
import Swal from 'sweetalert2';
import { PagosCPPComponent } from '../../modals/pagos-CPP/pagos-CPP.component';
import { PrinterManager } from 'src/app/models/printerManager';
import { DocpagosModel } from 'src/app/models/ventas/pagos.model';
import { loading } from 'src/app/models/app.loading';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';

@Component({
  selector: 'modals-abonos-cuentas-por-pagar',
  templateUrl: './abonos-cuentas-por-pagar.component.html',
  styleUrls: ['./abonos-cuentas-por-pagar.component.css']
})
export class AbonosCuentasPorPagarComponent  implements OnInit {

 public docActivo:DocumentosModel = new DocumentosModel()
  public lisCartera:CarteraModel[] = [];
  public docAbono:DocumentosModel = new DocumentosModel(); 
  private  docService = inject(DocumentoService)
  public personaIngreso:ClientesModel = new ClientesModel(); 
  constructor( private loading:loading , private inicioService:DatosInicialesService,
    private newAbrirDialog: MatDialog,){

  }
  ngOnInit(): void {
    this.inicioService.currentSucursal.subscribe({next:value=>{
      PrinterManager.setSucursal(value);
    }})
  }

  buscarCliente(){ 
    this.newAbrirDialog.open(FndClienteComponent,{ data: {  invoker:'cuentasXpagar' } })
    .afterClosed()
    .pipe(
      tap((confirmado:  {response:true  , persona:ClientesModel})=>{
        if (confirmado.response) { 
          this.personaIngreso = confirmado.persona;
          this.buscarCreditoCliente();   }
      })
    ).subscribe({
      next: () => {},
      error: (error) => console.error('Error:', error),
      complete: () => console.log('buscarCliente completo')
    });   
  }
  buscarCreditoCliente(  ){
    this.docAbono.cliente =  ( typeof( this.personaIngreso.id!) == "string"   ) ? parseInt(this.personaIngreso.id) :this.personaIngreso.id!;
    this.docService
    .getCuentasXPagarByPersonaAbonos(( typeof( this.personaIngreso.id!) == "string"   ) ? parseInt(this.personaIngreso.id) :this.personaIngreso.id! )
    .subscribe({next:(retorno:CarteraRequest)=>{
      if(retorno.numdata!> 0){
        this.lisCartera =  retorno.data;
        this.docAbono.campo_auxiliar_1 =   this.lisCartera.reduce((acc:number, item) => acc + parseFloat(item.totalActual.toString()), 0);
       
        this.docAbono.campo_auxiliar_4 =   this.lisCartera.reduce((acc:number, item) => acc + parseFloat(item.suma_plazos_vencidos.toString()), 0);
       
        this.docAbono.valorParcial =  0;
        this.docAbono.listado = this.lisCartera.map((x:CarteraModel)=> {
                              let ret:DocumentoListado =  {
                                idProducto: `Cred_${x.id}`,
                                nombreProducto: x.descripcion,
                                presioVenta: 0,
                                porcent_iva: 0,
                                presioSinIVa: 0,
                                IVA: 0,
                                cantidadVendida: 1,
                                descuento: 0,
                                valorTotal: x.totalActual,
                                orden: 0,
                                cant_real_descontada: 1,
                                id_externo_auxiliar: x.id,
                                cant_devuelta : 0,estado_linea_venta:'A',
                                tipoDescuento:'porcentaje'
                              }
          return ret
          
        })??[];
        
        console.log('cartera' ,  this.lisCartera)
      }
    } , error:error=>{Swal.fire(error,error.error.error, 'error')}
  })
  }  

  recalcular(indice:number){
   if( this.docAbono.listado[indice].valorTotal < this.docAbono.listado[indice].presioVenta )
    {this.docAbono.listado[indice].presioVenta = 0 ; }
   else{
    this.docAbono.valorParcial =  this.docAbono.listado.reduce((acc, item) => acc + parseFloat(item.presioVenta.toString()), 0);
    console.log('documento a enviar',this.docAbono);}
  
  }
  pagarTodo(){
    this.docAbono.listado.forEach(x=> x.presioVenta = x.valorTotal)
    this.docAbono.valorParcial =  this.docAbono.listado.reduce((acc, item) => acc + parseFloat(item.presioVenta.toString()), 0);
    console.log('documento a enviar',this.docAbono);
  
  }

  facturarDocumento() {
    this.docActivo!.pagos = [];
  
    if (this.docActivo!.listado!.length === 0) {
      let error = 'Debe ingresar los productos a facturar' ; 
      try {
        Swal.fire(error, '', 'error');
       } catch (error : any) {
        Swal.fire('error en el servidor', '', 'error');
       }
      return;
    }
    if (parseInt(this.docActivo!.totalFactura.toString()) === 0) { 
      try {
        Swal.fire('el total de la factura debe ser mayor a cero', '', 'error');
       } catch (error : any) {
        Swal.fire('error en el servidor', '', 'error');
       }
      return;
    }

    this.loading.show();
    this.docService .cerrarDocumento(this.docActivo!.orden).subscribe({next:(respuesta: DocumentoCierreRequest) => {
      //console.clear();
      console.log("respuesta cierre documento =>" , respuesta)
      if (respuesta.error === 'ok') {  
        this.docActivo = Object.assign(new DocumentosModel(), respuesta.data.documentoFinal); 
        console.log('facturarDocumento =>>>>>', this.docActivo);
        this.printer_factura_final(); 
      } else {
        try {
          Swal.fire(respuesta.error, '', 'error');
         } catch (error : any) {
          Swal.fire('error en el servidor', '', 'error');
         }
      }
      this.loading.hide(); 
    }
      ,error: (error: any) => {
         
        try {
          Swal.fire(error.error.error, '', 'error');
         } catch (error : any) {
          Swal.fire('error en el servidor', '', 'error');
         }},complete:()=>{console.log('facturarDocumento completo');
            this.loading.hide()
         }
    })
  }

  async printer_factura_final() {  
    let printM =  new PrinterManager();
    printM.setDocumento(this.docActivo);
    printM.printReceipt(false);
    this.buscarCreditoCliente();
  }

  enviarAbono(){
    if(this.docAbono.valorParcial <= 0){
      Swal.fire('Error en el envio' , 'debe ingresar minimo un abono' , 'error')
    }
     console.log('documento a enviar',this.docAbono);
     this.docService.crearDocumentoAbonoCredito(this.docAbono).subscribe({next:(value:DocumentoCierreRequest)=>{
     this.docActivo =   value.data.documentoFinal;
      
    this.newAbrirDialog.open(PagosCPPComponent,{ data: this.docActivo  })
    .afterClosed()
    .pipe(
      tap((confirmado: boolean)=>{
        if (confirmado) {  
          this.facturarDocumento()
          }
      })
    ).subscribe({
      next: () => {},
      error: (error) => console.error('Error:', error),
      complete: () => console.log('buscarCliente completo')
    });   
      console.log('crearDocumentoAbono',value); 
     }})
  }
  cancelar(){
    this.docAbono.listado.forEach(x=> x.presioVenta = 0)
    this.docAbono.valorParcial =  this.docAbono.listado.reduce((acc, item) => acc + parseFloat(item.presioVenta.toString()), 0);
    console.log('documento a enviar',this.docAbono);
  
  }
}
