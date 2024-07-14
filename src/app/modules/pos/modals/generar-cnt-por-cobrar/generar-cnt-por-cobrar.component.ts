import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MediosDePago } from 'src/app/interfaces/medios-de-pago.interface';
import { DocumentosModel } from 'src/app/models/ventas/documento.model';
import { DocpagosModel } from 'src/app/models/ventas/pagos.model';
import { cajasServices } from 'src/app/services/Cajas.services';
import { PagosVentaComponent } from '../pagos-venta/pagos-venta.component';
import { loading } from 'src/app/models/app.loading'; 
import { DocumentoCierreRequest } from 'src/app/interfaces/producto-request';

@Component({
  selector: 'modal-generar-cnt-por-cobrar',
  templateUrl: './generar-cnt-por-cobrar.component.html',
  styleUrls: ['./generar-cnt-por-cobrar.component.css']
})
export class GenerarCntPorCobrarComponent implements OnInit {
  pagoPorCredito?:DocpagosModel;
  pagos:DocpagosModel[] = [];
  indexEfectivo:number = 0;
  MedioP:MediosDePago[]= [];
  listo:boolean = false;
  retorno : {result : boolean , documento :  DocumentosModel } = {
    result: false,
    documento: new DocumentosModel
  };
  constructor(
    public loading : loading,private serviceCaja : cajasServices ,
    public dialogo: MatDialogRef<GenerarCntPorCobrarComponent>,
    @Inject(MAT_DIALOG_DATA) public Documento:DocumentosModel

  ) { 
       this.pagoPorCredito = new DocpagosModel();
        this.pagoPorCredito.valorPagado = this.Documento.totalFactura;
        this.pagoPorCredito.valorRecibido = this.pagoPorCredito.valorPagado;
        this.pagoPorCredito.vueltos = 0; 
        this.getMediosP()
      }

  ngOnInit(): void {
  }
  finalizarOk(){
    //documentos_pagos
    this.serviceCaja.setPagoDocumentoCredito(this.Documento.orden ,this.pagos )
     .subscribe({next: (datos:DocumentoCierreRequest)=>{
        console.log(datos); 
        console.log('pagos realizados' , this.pagos ); 
        this.loading.hide()
        this.retorno.result = true;
        this.retorno.documento = datos.data.documentoFinal;
        this.dialogo.close(this.retorno);
      } ,
      error: error  => {this.loading.hide();
        console.error('finalizarOk', error.error.error);
      } } 
      );
  }
  cancelar(){
    this.dialogo.close(false);
  }
  cambioDeValor( index:number){

   if(!isNaN( this.pagos[index].valorPagado )){
    let pagoActual:number = this.pagoPorCredito!.valorPagado ; 
    let recibido =  parseFloat(this.pagos[index].valorPagado.toString())
    this.pagos[index].valorPagado = recibido;
    let totalFactura :number= this.Documento.totalFactura;

    if (this.pagos[index].valorPagado > pagoActual)
      {
        this.pagos[index].valorPagado = 0;
      } 
    
      let totalMedios:number =  this.pagos.reduce((acc:number, current) => acc + current.valorPagado, 0);
        console.log('totalMedios', totalMedios);
        
      this.pagoPorCredito!.valorPagado =  totalFactura -  totalMedios;
   
  }}
setVueltos(index:number){
  if(this.pagos[index].valorPagado > this.pagos[index].valorRecibido  ) {
    this.pagos[index].valorRecibido = this.pagos[index].valorPagado;
    this.pagos[index].vueltos = 0; 
  }else{ 
    this.pagos[index].vueltos = this.pagos[index].valorRecibido - this.pagos[index].valorPagado;
  } 
  
 
}
getMediosP(){ 
  console.log('DocumentoActivo',this.Documento)
  this.listo = false;
  this.loading.show()
  this.serviceCaja.getMediosCajaActiva()
     .subscribe( {next:(datos:any)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      datos.data!.forEach((dato:MediosDePago , index : number )=>{
        this.pagos[index] = new DocpagosModel();
        this.pagos[index].idMedioDePago = dato.id;
        this.pagos[index].nombreMedio =dato.nombre;
        this.pagos[index].valorPagado = 0;
        this.pagos[index].valorRecibido = 0;
        this.pagos[index].vueltos = 0; 
        this.pagos[index].valorTotalAPagar = 0;  
      }) 
     // console.log(this.MedioP);
    }else{
      this.MedioP = [];
    } 
    console.log('pagos realizados' , this.pagos ); 
        this.loading.hide()
        this.listo = true;
      } ,
      error: (error:any) => {this.loading.hide();
        alert( error.error.error);
      }}
      );
  }
}
