import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DtoDocumentoProducto } from 'src/app/interfaces/dto-documento-producto';
import { ProductoService } from 'src/app/services/producto.service';
import { loading } from 'src/app/models/app.loading';
import { ProductoModule } from 'src/app/models/producto/producto.module';
import { errorOdoo } from 'src/app/interfaces/odoo-prd';
import { PrdExistenciasModule } from 'src/app/models/prd-existencias/prd-existencias.module';
import { PrdPreciosModule } from 'src/app/models/prd-precios/prd-precios.module';

@Component({
  selector: 'pos-ingresar-producto-venta',
  templateUrl: './ingresar-producto-venta.component.html',
  styleUrls: ['./ingresar-producto-venta.component.css']
})
export class IngresarProductoVentaComponent {
  precioVenta?:PrdPreciosModule;
  cantidadPrd = 0 ; 
  disabled = [true,true,true,true,true,true,true,true,true,true]; 
  codPrd:string = '';  
  parceros : ProductoModule[] = []; 
  show = true ;
  show_reemplazo = false;  
  existencia?:PrdExistenciasModule;
  constructor(   private prdService : ProductoService,
    
    public dialogo: MatDialogRef<IngresarProductoVentaComponent>,
    
    @Inject(MAT_DIALOG_DATA) public arrayDocPrd:DtoDocumentoProducto,
      
    public loading : loading) { // console.clear();
      console.log('arrayDocPrd' , this.arrayDocPrd); 
     this.enabledBtnIngreso();
    }


  enabledBtnIngreso()
  { 
   
    this.precioVenta = this.arrayDocPrd.producto?.precios[0]! 
    let idBodegaStock =   this.arrayDocPrd.documento.idStockOdooPOS??0 
    try { 
      if (Array.isArray(this.arrayDocPrd.producto?.existencias)) {
        this.existencia = this.arrayDocPrd.producto?.existencias?.filter(x => x.id_bodega === idBodegaStock)[0] || this.existencia;
      } 
  
    } catch (error) {
      console.error(error)
    }
     console.log("existencia" , this.arrayDocPrd.producto?.existencias ,  this.existencia ) 
if(this.existencia != undefined  ){
     
    console.log('menor o igual a 10' , typeof(this.existencia.cant_actual ) , this.existencia.cant_actual )
     switch (this.existencia.cant_actual){
      case 0 : 
        this.disabled = [true, true, true, true, true, true, true, true, true, true];
      break;
      case 1 : 
        this.disabled = [false ,true, true, true, true, true, true, true, true, true];
      break;
      case 2 : 
        this.disabled = [false ,false ,true, true, true, true, true, true, true, true];
      break;
      case 3 : 
        this.disabled = [false ,false ,false ,true, true, true, true, true, true, true];
      break;
      case 4 : 
        this.disabled = [false ,false ,false ,false ,true, true, true, true, true, true];
      break;
      case 5 : 
        this.disabled = [false ,false ,false ,false ,false ,true, true, true, true, true];
      break;
      case 6 : 
        this.disabled = [false ,false ,false ,false ,false ,false ,true, true, true, true];
      break;
      case 7 : 
        this.disabled = [false ,false ,false ,false ,false ,false ,false ,true, true, true];
      break;
      case 8 : 
        this.disabled = [false ,false ,false ,false ,false ,false ,false ,false ,true, true];
      break;
      case 9 : 
        this.disabled = [false ,false ,false ,false ,false ,false ,false ,false ,false ,true];
      break;
      case 10 :  
        this.disabled = [false ,false ,false ,false ,false ,false ,false ,false ,false ,false];
      break;
      default : 
          this.disabled = [false ,false ,false ,false ,false ,false ,false ,false ,false ,false ];
      break;
      
      
    }
  }
  }
    
  addCnt(cnt:number){
    if (this.existencia!.cant_actual == 10 ){
      this.enviarCnt(10);
    }else{
    this.cantidadPrd += cnt ;
   // console.log('existencia actual',this.existencia, (this.existencia?.cant_actual!   < this.cantidadPrd)); 
    if (this.existencia?.cant_actual!    < this.cantidadPrd){
       this.cantidadPrd =  this.existencia?.cant_actual ?? 0 ;
    }}
  }

  enviarCnt( cnt:number ){
    this.disabled = [true, true, true, true, true, true, true, true, true, true];
    this.cantidadPrd  += cnt ;
    console.log( 'enviarCnt' ,this.arrayDocPrd.producto  )
      console.log( 'enviarCnt' , this.cantidadPrd   )
        console.log( 'enviarCnt' ,      this.existencia?.cant_actual??0 )

    if (this.arrayDocPrd.producto !== undefined && this.cantidadPrd > 0 &&  
      (this.existencia?.cant_actual??0)    >= this.cantidadPrd){  
            this.arrayDocPrd.producto.cantidadVendida = this.cantidadPrd;
            this.loading.show()  

            this.prdService.guardarPrdVentas(this.arrayDocPrd.producto ,  this.arrayDocPrd.documento , this.precioVenta! ).subscribe(
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
