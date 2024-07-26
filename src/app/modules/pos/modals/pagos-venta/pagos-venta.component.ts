import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { MediosDePago } from 'src/app/interfaces/medios-de-pago.interface';
import { DocumentoRequest } from 'src/app/interfaces/producto-request';
import { loading } from 'src/app/models/app.loading'; 
import { DocumentosModel } from 'src/app/models/ventas/documento.model';
import { DocpagosModel, pagosModel } from 'src/app/models/ventas/pagos.model';
import { cajasServices } from 'src/app/services/Cajas.services'; 
import { DocumentoService } from 'src/app/services/documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagos-venta',
  templateUrl: './pagos-venta.component.html',
  styleUrls: ['./pagos-venta.component.css']
})
export class PagosVentaComponent implements OnInit {
  pagos:DocpagosModel[] = [];
  indexEfectivo:number = 0;
  MedioP:MediosDePago[]= [];
  listo:boolean = false;
  constructor(
    public loading : loading,private serviceCaja : cajasServices , private documentoService: DocumentoService ,
    public dialogo: MatDialogRef<PagosVentaComponent>,
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
        console.log('bono encontrado ==>' , retorno , docAbono); 
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
         console.log(datos); 
    console.log('pagos realizados' , this.pagos ); 
        this.loading.hide()
        this.listo = true;
        this.dialogo.close({rep:true,credito:true});
      } ,
      error: error  => {this.loading.hide();
        console.error('finalizarOk', error.error.error);
      } } 
      );
  }
  finalizarOkCredito(){
    //documentos_pagos
    this.serviceCaja.setPagoDocumento(this.Documento.orden ,this.pagos )
     .subscribe({next: (datos:any)=>{
         console.log(datos); 
    console.log('pagos realizados' , this.pagos ); 
        this.loading.hide()
        this.listo = true;
        this.dialogo.close({rep:true,credito:true});
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
  console.log('DocumentoActivo',this.Documento)
  this.listo = false;
  this.loading.show()
  this.serviceCaja.getMediosCajaActiva()
     .subscribe( {next:(datos:any)=>{
      console.clear();
         console.log('getMediosCajaActiva',datos);
      if (datos.numdata > 0 ){ 
        this.pagos = [];
        let  index : number = this.Documento.pagos.length; 
        console.log('total pagos documento',index);
        
        if (index <= 0 ) index = -1;
        
        console.log('total pagos documento',index);
        if (index > 0 )
          { 
            this.pagos = this.Documento.pagos.map(x => {
            if (x.nombreMedio?.toUpperCase() !== 'EFECTIVO') {
              let pago = new DocpagosModel();
              pago.idMedioDePago = x.idMedioDePago || 0;
              pago.nombreMedio = x.nombreMedio || '';
              pago.valorPagado = x.valorPagado || 0;
              pago.valorRecibido = x.valorRecibido || 0;
              pago.vueltos = x.vueltos || 0;
              pago.valorTotalAPagar = x.valorTotalAPagar || 0;
              pago.soloLectura = true
              return pago;
            } 
            else {
             // this.pagoPorCredito.valorPagado = x.valorPagado || 0;
              return;}// O puedes devolver un valor específico que indique que no debe incluirse en la lista de pagos
            
        }).filter((pago): pago is DocpagosModel => pago !== undefined);
      }
      console.log('pagos recibidos' , this.pagos);
      
        datos.data!.forEach((dato:MediosDePago )=>{  
         let pago = new DocpagosModel();  
         pago.idMedioDePago = dato.id;
          pago.nombreMedio =dato.nombre;
          pago.valorPagado = 0;
          pago.valorRecibido = 0;
          pago.vueltos = 0; 
          pago.valorTotalAPagar = 0; 
          const exists = this.pagos.some(p => p.nombreMedio === pago.nombreMedio);
          if(!exists || (exists && pago.nombreMedio.toUpperCase() !== 'EFECTIVO' ))
                  this.pagos.push(pago)
        })  
        let sum = this.pagos.reduce((total, pago) => total + pago.valorPagado, 0);
      this.indexEfectivo =  this.pagos.findIndex(pago => pago.nombreMedio!.toUpperCase() === 'EFECTIVO');
        this.pagos[this.indexEfectivo].valorPagado = this.Documento.totalFactura -  sum ;
 
   
     // console.log(this.MedioP);
    }else{
      this.pagos = [];
    } 
    console.log('pagos realizados' , this.pagos ); 
        this.loading.hide()
        this.listo = true;
      } ,
      error: (error) => {this.loading.hide();
        alert( error.error.error);
      }}
      );
  }
}
