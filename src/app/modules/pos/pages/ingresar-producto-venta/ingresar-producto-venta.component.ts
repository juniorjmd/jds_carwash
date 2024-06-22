import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DtoDocumentoProducto } from 'src/app/interfaces/dto-documento-producto';
import { ProductoService } from 'src/app/services/producto.service';
import { loading } from 'src/app/models/app.loading';
import { ProductoModule } from 'src/app/models/producto/producto.module';
import { errorOdoo } from 'src/app/interfaces/odoo-prd';
import { PrdExistenciasModule } from 'src/app/models/prd-existencias/prd-existencias.module';

@Component({
  selector: 'pos-ingresar-producto-venta',
  templateUrl: './ingresar-producto-venta.component.html',
  styleUrls: ['./ingresar-producto-venta.component.css']
})
export class IngresarProductoVentaComponent {
  cantidadPrd = 0 ; 
  disabled = [true,true,true,true,true,true,true,true,true,true]; 
  codPrd:string = '';  
  parceros : ProductoModule[] = []; 
  show = true ;
  show_reemplazo = false;  
existencia:PrdExistenciasModule;
  constructor(   private prdService : ProductoService,
    
    public dialogo: MatDialogRef<IngresarProductoVentaComponent>,
    
    @Inject(MAT_DIALOG_DATA) public arrayDocPrd:DtoDocumentoProducto,
      
    public loading : loading) {
      console.log('arrayDocPrd' , this.arrayDocPrd); 
      let idBodegaStock =   this.arrayDocPrd.documento.idStockOdooPOS??0
      this.existencia =    this.arrayDocPrd.producto?.existencias?.filter(x=>x.id_bodega==idBodegaStock)[0]!;
      this.cantidadPrd = 0 ;  
    }



    
  addCnt(cnt:number){
    this.cantidadPrd += cnt ;
    if (this.existencia?.cant_actual ?? 0  < this.cantidadPrd){
       this.cantidadPrd =  this.existencia?.cant_actual ?? 0 ;
    }
  }

  enviarCnt( cnt:number ){
    this.disabled = [true, true, true, true, true, true, true, true, true, true];
    this.cantidadPrd  += cnt ;
    if (this.arrayDocPrd.producto !== undefined && this.cantidadPrd > 0 && this.arrayDocPrd.producto.cantidad! >= this.cantidadPrd){  
            this.arrayDocPrd.producto.cantidadVendida = this.cantidadPrd;
            this.loading.show() 

            this.prdService.guardarPrdCompra(this.arrayDocPrd.producto ,  this.arrayDocPrd.documento.orden ).subscribe(
              (respuesta:any)=>{
                if (respuesta.error !== 'ok'){
                    alert(respuesta.error);
                    console.log(JSON.stringify(respuesta));
                    this.dialogo.close(false); 
                  }
                  else{ this.dialogo.close(true); 
                    console.log('productoVendido',JSON.stringify(respuesta));}
                  this.loading.hide() 

                },
                (error:errorOdoo) =>{
                  console.log(JSON.stringify( error) );
                  
                  alert(error.error.error +"\n" + error.error.msg); 
                  this.dialogo.close(false); 
                  this.loading.hide() 
                }) 
       
        
    }
  }

}
