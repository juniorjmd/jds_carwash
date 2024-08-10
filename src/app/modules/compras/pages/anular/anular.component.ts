import { Component, inject, OnInit } from '@angular/core';
import {   DocumentoCierreRequest, DocumentoCompraRequest } from 'src/app/interfaces/producto-request';
import { CarteraModel } from 'src/app/models/cartera/cartera.model';
import { PrinterManager } from 'src/app/models/printerManager';
import { arrRetorno, documentoDev, DocumentosComprasModel, DocumentosModel } from 'src/app/models/ventas/documento.model';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { DocumentoService } from 'src/app/services/documento.service';
import Swal from 'sweetalert2';
import { pagosSaldoNotasDebitoComponent } from '../../modals/pagos-saldo-notas-debito/pagos-saldo-notas-debito.component';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';

@Component({
  selector: 'app-anular',
  templateUrl: './anular.component.html',
  styleUrls: ['./anular.component.css']
})
export class AnularComprasComponent implements OnInit {


  public lisCartera:CarteraModel[] = [];
  public docEnvio:documentoDev ;
  public docAbono:DocumentosComprasModel = new DocumentosComprasModel(); 
  private  docService = inject(DocumentoService); 
  private dInicialServ= inject(DatosInicialesService)
  private newAbrirDialog= inject(MatDialog)
  constructor(   ){ 

   this.docEnvio = {
    idEsta:0,
    idDocF : '' , 
    exedente : 0 , 
    payReturn:[{id:0 , cnt:0}],
    pdrReturn :[{id:0 , cnt:0}]
   }
  }
  ngOnInit(): void {

    
    this.dInicialServ.currentSucursal.subscribe({next:(suc)=>{  
       PrinterManager.setSucursal(suc!);

    }})
  }
printDocumento(doc:DocumentosModel){
  console.log('documento a imprimir',doc);
  
  if(doc  != undefined  && doc.orden != undefined ){
    let printerManager:PrinterManager =  new PrinterManager();
    printerManager.setDocumento(doc )
    printerManager.printReceipt();
  }
}
  buscarDocumento(  ){

    this.docService.getDocComprasByNumFactura(this.docAbono.idDocumentoFinal )
    .subscribe({next:(retorno:DocumentoCompraRequest)=>{
      if(retorno.numdata!> 0){
        let docs:DocumentosComprasModel[] = retorno.data.map(x=>x.objeto); 
        this.docAbono =  docs[0];
        this.docEnvio.idDocF = this.docAbono.idDocumentoFinal;
        this.docEnvio.idEsta = this.docAbono.establecimiento;
        console.log('retorno' , retorno , this.docAbono);
       
      }
    } , error:error=>{Swal.fire(error,error.error.error, 'error')}
  })
  }
  recalcular(indice:number){
    console.log('validar cantidad' ,   this.docAbono.listado[indice].cant_real_descontada,this.docAbono.listado[indice].cant_devuelta ,
      ( this.docAbono.listado[indice].cant_real_descontada < this.docAbono.listado[indice].cant_devuelta! )

    );
    
   if( this.docAbono.listado[indice].cant_real_descontada < this.docAbono.listado[indice].cant_devuelta! )
    {this.docAbono.listado[indice].cant_devuelta = 0 ; }
   else{
    this.docAbono.campo_auxiliar_2 =  this.docAbono.listado.reduce((acc, item) => acc + ( parseFloat(item.presioVenta.toString()) *  item.cant_devuelta! ), 0);
    console.log('documento a enviar',this.docAbono);}
  
  }
  pagarTodo(){
    this.docAbono.listado.forEach(x=> x.cant_devuelta = (x.estado_linea_venta =='A')? x.cant_real_descontada:0 )
    this.docAbono.campo_auxiliar_2 =  this.docAbono.listado.reduce((acc, item) => acc + ( parseFloat(item.presioVenta.toString()) *  item.cant_devuelta! ), 0);
     console.log('documento a enviar',this.docAbono);
  
  }

  enviarAbono(){
    if(this.docAbono.campo_auxiliar_2! <= 0){
      Swal.fire('Error en el envio' , 'debe ingresar minimo un producto' , 'error')
    }

    this.docEnvio.pdrReturn =  this.docAbono.listado.map (x=>{let prd:arrRetorno = {
            id: x.id!,
            cnt: x.cant_devuelta!
          } ; 
          return prd;}).filter(x=> x.cnt > 0 ) ;  
  
     console.log('documento a enviar',this.docAbono , this.docEnvio);

      
     if ((this.docAbono.campo_auxiliar_2 > (this.docAbono.cuentaPorPagar?.totalActual||0 ))&&  ( (this.docAbono.cuentaPorPagar?.totalPagado||0 ) > 0 )){
      this.docEnvio.exedente = this.docAbono.campo_auxiliar_2 - (this.docAbono.cuentaPorPagar?.totalActual||0 ) ; 
      this.newAbrirDialog.open(pagosSaldoNotasDebitoComponent, { data: this.docEnvio })
      .afterClosed()
      .pipe(
        tap((confirmado: {rep:boolean,documento:DocumentosComprasModel}) => {
          if (confirmado.rep  ) { 
            this.buscarDocumento();
            this.printDocumento(confirmado.documento)
          }
        })
      ).subscribe({
        next: () => {},
        error: (error) => console.error('Error:', error),
        complete: () => console.log('asignarPagosAVenta completo')
      });
      return
     }
     
     this.docService.crearNotaDebito(this.docEnvio).subscribe({next:(value:DocumentoCierreRequest)=>{
      console.log('crearDocumentoAbono',value); 
      
      this.buscarDocumento();
     this.printDocumento(value.data.documentoFinal )

     },error:error=>Swal.fire(error.error.error)})
  }
  cancelar(){
    this.docAbono.listado.forEach(x=> x.presioVenta = 0)
    this.docAbono.campo_auxiliar_2 =  0 ;
    console.log('documento a enviar',this.docAbono);
  
  }
}
