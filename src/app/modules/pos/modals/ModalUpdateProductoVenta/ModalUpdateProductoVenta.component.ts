
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { error } from 'jquery';
import { DocumentoListado } from 'src/app/interfaces/documento.interface';
import { ProductoExitenciaRequest, ProductoRequest } from 'src/app/interfaces/producto-request';
import { loading } from 'src/app/models/app.loading';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { DocumentoService } from 'src/app/services/documento.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-modal-update-producto-venta', 
  templateUrl: './ModalUpdateProductoVenta.component.html',
  styleUrls: ['./ModalUpdateProductoVenta.component.css'], 
})
export class ModalUpdateProductoVentaComponent implements OnInit { 
  
  validarExistencia?:boolean;  
  descuento:number = 0 ;  
  constructor(public loading : loading, private service:DocumentoService ,  private prdService : ProductoService,
     public dialogo: MatDialogRef<ModalUpdateProductoVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public item:DocumentoListado,
    private dInicialServ: DatosInicialesService  ){  
      this.item.val_aux_1 =   this.item.val_aux_1||this.item.presioSinIVa ; 
      this.item.val_aux_2 =  this.item.val_aux_2||this.item.presioVenta ; 
    }

    
  ngOnInit(): void { 
    this.loading.show()
    this.dInicialServ.parmValExistencia.subscribe({next:value=>{  
      this.validarExistencia = value.par_boolean; 
      this.loading.hide() 
    }});
  }

  editar(){
    console.log('ModalUpdateProductoVentaComponent' ,this.item );
    this.service.editarLineaDocumento(this.item).subscribe({next:value=>{
      if (value.error == 'ok'){
        this.dialogo.close(true)   
         }
    }, error:e=>console.error(e.error.error)})

    
  } 
  enviarCntDirecto(){
    if (this.validarExistencia){ 
        this.loading.show()
        this.prdService.getProductoExtistenciaDocById(this.item.idProducto,this.item.idDocumento!).subscribe({next:(value:ProductoExitenciaRequest)=>{
          console.log('producto completo', value); 
          this.loading.hide()    

          if(value.data.existencia  <    this.item.cantidadVendida) 
            {this.item.cantidadVendida = this.item.cant_real_descontada }
          else{
            this.item.cant_real_descontada = this.item.cantidadVendida;
            this.cambioValor();
          }

        }, error:e=>{console.error(e.error.error) ; this.loading.hide();  
        }})
      
    }else{
    this.item.cant_real_descontada = this.item.cantidadVendida;
    this.cambioValor();
   }
  } 

  cambioValor(){
    this.item.descuento = 0;
    this.descuento= this.descuento||0 ;
     if(this.descuento  > 0 ){

      let des :number = 0 ; 
      if(this.item.tipoDescuento == 'porcentaje'){
        des = (this.item.val_aux_2||0) * this.descuento / 100 ;
      }else{
        des =   this.descuento  ;
      }
      this.item.presioVenta  = this.item.val_aux_2! - des ; 
      this.item.presioSinIVa = parseFloat(( this.item.presioVenta / (1 + ( this.item.porcent_iva / 100 ) ) ).toFixed(2));
      this.item.descuento = parseFloat((( this.item.val_aux_1! - this.item.presioSinIVa    ) ).toFixed(2));
      this.item.presioSinIVa +=this.item.descuento;
      this.item.descuentoAplicado = 'Descuento en venta',
      this.item.nombreActividadDescuento = ''
    } else{
      this.item.presioSinIVa  = this.item.val_aux_1||this.item.presioSinIVa  ;  
      this.item.descuentoAplicado = '',
      this.item.nombreActividadDescuento = ''
    }
    this.item.IVA = parseFloat(((this.item.presioSinIVa - this.item.descuento) * (this.item.porcent_iva / 100)).toFixed(2));
    this.item.valorTotal = parseFloat(((this.item.presioSinIVa - this.item.descuento + this.item.IVA) * this.item.cant_real_descontada).toFixed(2));
    this.item.presioVenta =  parseFloat(((this.item.presioSinIVa - this.item.descuento + this.item.IVA)  ).toFixed(2));
  }
}
