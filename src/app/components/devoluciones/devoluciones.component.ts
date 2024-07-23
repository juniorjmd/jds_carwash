import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentoListado } from 'src/app/interfaces/documento.interface';
import { CarteraRequest, DocumentoCierreRequest, DocumentoRequest } from 'src/app/interfaces/producto-request';
import { CarteraModel } from 'src/app/models/cartera/cartera.model';
import { ClientesModel } from 'src/app/models/clientes/clientes.module';
import { PrinterManager } from 'src/app/models/printerManager';
import { DocumentosModel } from 'src/app/models/ventas/documento.model';
import { AbonosCuentasXCobrarComponent } from 'src/app/modules/pos/modals/abonos-cuentas-xcobrar/abonos-cuentas-xcobrar.component';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { DocumentoService } from 'src/app/services/documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent implements OnInit {


  public lisCartera:CarteraModel[] = [];
  public docAbono:DocumentosModel = new DocumentosModel(); 
  private  docService = inject(DocumentoService); 
  private dInicialServ= inject(DatosInicialesService)
  constructor(   ){  

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

    this.docService.getDocumentosByNumFactura(this.docAbono.idDocumentoFinal )
    .subscribe({next:(retorno:DocumentoRequest)=>{
      if(retorno.numdata!> 0){
        let docs:DocumentosModel[] = retorno.data.map(x=>x.objeto); 
        this.docAbono =  docs[0];
        console.log('retorno' , retorno , this.docAbono);
       
      }
    } , error:error=>{Swal.fire(error,error.error.error, 'error')}
  })
  }
  recalcular(indice:number){
    console.log('validar cantidad' ,   this.docAbono.listado[indice].cant_real_descontada,this.docAbono.listado[indice].cant_devuelta ,
      ( this.docAbono.listado[indice].cant_real_descontada < this.docAbono.listado[indice].cant_devuelta )

    );
    
   if( this.docAbono.listado[indice].cant_real_descontada < this.docAbono.listado[indice].cant_devuelta )
    {this.docAbono.listado[indice].cant_devuelta = 0 ; }
   else{
    this.docAbono.campo_auxiliar_2 =  this.docAbono.listado.reduce((acc, item) => acc + ( parseFloat(item.presioVenta.toString()) *  item.cant_devuelta ), 0);
    console.log('documento a enviar',this.docAbono);}
  
  }
  pagarTodo(){
    this.docAbono.listado.forEach(x=> x.cant_devuelta = (x.estado_linea_venta =='A')? x.cant_real_descontada:0 )
    this.docAbono.campo_auxiliar_2 =  this.docAbono.listado.reduce((acc, item) => acc + ( parseFloat(item.presioVenta.toString()) *  item.cant_devuelta ), 0);
     console.log('documento a enviar',this.docAbono);
  
  }

  enviarAbono(){
    if(this.docAbono.campo_auxiliar_2! <= 0){
      Swal.fire('Error en el envio' , 'debe ingresar minimo un producto' , 'error')
    }
     console.log('documento a enviar',this.docAbono);
     this.docService.crearDocumentoDevolucion(this.docAbono).subscribe({next:(value:DocumentoCierreRequest)=>{
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
