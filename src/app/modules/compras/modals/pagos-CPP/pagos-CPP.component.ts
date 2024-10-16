import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { MediosDePago } from 'src/app/interfaces/medios-de-pago.interface';
import { DocumentoRequest } from 'src/app/interfaces/producto-request';
import { loading } from 'src/app/models/app.loading'; 
import { CustomConsole } from 'src/app/models/CustomConsole';
import { DocumentosModel } from 'src/app/models/ventas/documento.model';
import { DocpagosModel, pagosModel } from 'src/app/models/ventas/pagos.model';
import { cajasServices } from 'src/app/services/Cajas.services'; 
import { DocumentoService } from 'src/app/services/documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagos-venta',
  templateUrl: './pagos-CPP.component.html',
  styleUrls: ['./pagos-CPP.component.css']
})
export class PagosCPPComponent implements OnInit {
  pagos:DocpagosModel[] = [];
  indexEfectivo:number = 0;
  MedioP:MediosDePago[]= [];
  listo:boolean = false;
  constructor(
    public loading : loading,private serviceCaja : cajasServices , private documentoService: DocumentoService ,
    public dialogo: MatDialogRef<PagosCPPComponent>,
    @Inject(MAT_DIALOG_DATA) public Documento:DocumentosModel

  ) { this.getMediosP()}

  ngOnInit(): void {
  }
  adicionarOtroBono(id:number){
    this.pagos[id]
    let pago = {...this.pagos[id]}
    pago.valorPagado = 0;
    pago.referencia = '';

    this.pagos.push(pago)
  }
  buscarBono(pago:number){
    this.documentoService. getDocumentosByNumFactura(this.pagos[pago].referencia)
    .subscribe({next:(retorno:DocumentoRequest)=>{
      if(retorno.numdata!> 0){
        let docs:DocumentosModel[] = retorno.data.map(x=>x.objeto); 
        let docAbono:DocumentosModel =  docs[0];
        CustomConsole.log('bono encontrado ==>' , retorno , docAbono); 
        let valPago = docAbono.valorTotal - docAbono.campo_auxiliar_6;
        this.pagos[pago].valorPagado = (valPago > this.pagos[this.indexEfectivo].valorPagado)? this.pagos[this.indexEfectivo].valorPagado : valPago ;

        if(this.pagos[pago].valorPagado > 0){  this.cambioDeValor(pago)}else{
          Swal.fire('error','El bono ingresado no es valido', 'info')
        }       
      }
    } , error:error=>{Swal.fire(error,error.error.error, 'error')}
  })
  }
  finalizarOk(){
    //documentos_pagos
    this.serviceCaja.setPagoDocumento(this.Documento.orden ,this.pagos )
     .subscribe({next: (datos:any)=>{
         CustomConsole.log(datos); 
    CustomConsole.log('pagos realizados' , this.pagos ); 
        this.loading.hide()
        this.listo = true;
        this.dialogo.close(true);
      } ,
      error: error  => {this.loading.hide();
        Swal.fire('finalizarOk', error.error.error);
      } } 
      );
  }
  finalizarOkCredito(){
    //documentos_pagos
    this.serviceCaja.setPagoDocumento(this.Documento.orden ,this.pagos )
     .subscribe({next: (datos:any)=>{
         CustomConsole.log(datos); 
    CustomConsole.log('pagos realizados' , this.pagos ); 
        this.loading.hide()
        this.listo = true;
        this.dialogo.close({rep:true,credito:true});
      } ,
      error: error  => {this.loading.hide();
        Swal.fire('finalizarOk', error.error.error);
      } } 
      );
  }
  
  cancelar(){
    this.dialogo.close(false);
  }
  cambioDeValor( index:number){
    if (this.pagos[index].valorPagado <= this.pagos[this.indexEfectivo].valorPagado){
      this.pagos[this.indexEfectivo].valorPagado = this.pagos[this.indexEfectivo].valorPagado -this.pagos[index].valorPagado ;
    }else{
      this.pagos[index].valorPagado = 0;
    }
    this.pagos[this.indexEfectivo].valorPagado = this.Documento.totalFactura;
    this.pagos!.forEach((dato:DocpagosModel , index : number )=>{
      if (index !== this.indexEfectivo)
      this.pagos[this.indexEfectivo].valorPagado -= dato.valorPagado;
    })
    this.pagos[this.indexEfectivo].valorRecibido = this.pagos[this.indexEfectivo].valorPagado;
    this.pagos[this.indexEfectivo].vueltos = 0; 

  }
setVueltos(index:number){
  if(this.pagos[index].valorPagado > this.pagos[index].valorRecibido  ) {
    this.pagos[index].valorRecibido = this.pagos[index].valorPagado;
    this.pagos[index].vueltos = 0; 
  }else{
   
    this.pagos[index].vueltos = this.pagos[index].valorRecibido - this.pagos[index].valorPagado;
  } 
  
 
}

getMediosP(){ 
  CustomConsole.log('DocumentoActivo',this.Documento)
  this.listo = false;
  this.loading.show()
  this.serviceCaja.getMediosByEstablecimiento(this.Documento.establecimiento)
     .subscribe( {next:(datos:any)=>{
         CustomConsole.log('getMediosCajaActiva',datos);
      if (datos.numdata > 0 ){ 
        this.pagos = []; 
         
      CustomConsole.log('pagos recibidos' , this.pagos);
      
        datos.data!.forEach((dato:MediosDePago )=>{  
         let pago = new DocpagosModel();  
         pago.idMedioDePago = dato.id;
          pago.nombreMedio =dato.nombre;
          pago.valorPagado = 0;
          pago.valorRecibido = 0;
          pago.vueltos = 0; 
          pago.valorTotalAPagar = 0; 
          this.pagos.push(pago)
        })  
      this.indexEfectivo =  this.pagos.findIndex(pago => pago.nombreMedio!.toUpperCase() === 'EFECTIVO'); 
        this.pagos[this.indexEfectivo].valorPagado = this.Documento.totalFactura ;
        this.pagos[this.indexEfectivo].referencia = 'efectivo';
    }else{
      this.pagos = [];
    } 
    CustomConsole.log('pagos realizados' , this.pagos ); 
        this.loading.hide()
        this.listo = true;
      } ,
      error: (error) => {this.loading.hide();
        alert( error.error.error);
      }}
      );
  }
}
