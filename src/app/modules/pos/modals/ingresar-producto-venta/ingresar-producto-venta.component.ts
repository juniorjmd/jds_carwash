import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DtoDocumentoProducto } from 'src/app/interfaces/dto-documento-producto';
import { ProductoService } from 'src/app/services/producto.service';
import { loading } from 'src/app/models/app.loading';
import { ProductoModel } from 'src/app/models/producto/producto.module';
import { errorOdoo } from 'src/app/interfaces/odoo-prd';
import { PrdExistenciasModule } from 'src/app/models/prd-existencias/prd-existencias.module';
import { PrdPreciosModule } from 'src/app/models/prd-precios/prd-precios.module';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { ProductoRequest } from 'src/app/interfaces/producto-request';
import Swal from 'sweetalert2';

@Component({
  selector: 'pos-ingresar-producto-venta',
  templateUrl: './ingresar-producto-venta.component.html',
  styleUrls: ['./ingresar-producto-venta.component.css']
})
export class IngresarProductoVentaComponent implements OnInit {
  precioVenta?:PrdPreciosModule;
  cantidadPrd:number = 0 ; 
  disabled = [true,true,true,true,true,true,true,true,true,true]; 
  codPrd:string = '';  
  parceros : ProductoModel[] = []; 
  show = true ;
  show_reemplazo = false;  
  ingresaPrecio = false;
  validarExistencia?:boolean;  
  existencia?:PrdExistenciasModule;  
  constructor( 
    private dInicialServ: DatosInicialesService ,  private prdService : ProductoService,
    
    public dialogo: MatDialogRef<IngresarProductoVentaComponent>,
    
    @Inject(MAT_DIALOG_DATA) public arrayDocPrd:DtoDocumentoProducto,
      
    public loading : loading) { // console.clear(); 
      console.log('arrayDocPrd' , this.arrayDocPrd); 
      console.log('validarExistenciaProducto' , this.validarExistencia);  
    }
  ngOnInit(): void { 
    this.loading.show()
    this.dInicialServ.parmValExistencia.subscribe({next:value=>{  
      this.validarExistencia = value.par_boolean; 
      this.loading.hide()
      this.getProducto();
    }});
  }
  getProducto(){
    this.loading.show()
    this.prdService.getProductoById(this.arrayDocPrd.producto?.id!).subscribe({next:(value:ProductoRequest)=>{
      console.log('producto completo', value); 
      this.loading.hide()
      this.arrayDocPrd.producto= value.producto  
      if (value.producto.tipo_producto == 2){
        this.validarExistencia = false;
        this.ingresaPrecio = true;
        this.enabledBtnIngreso();
        this.precioVenta = new PrdPreciosModule();
        this.precioVenta.precio_antes_de_iva = 0;
        this.precioVenta.precio_con_iva=0;
        this.precioVenta.valor_iva = 0;
      }else{ this.enabledBtnIngreso(); }
      
    }, error:e=>{console.error(e.error.error) ; this.loading.hide();  
    }})
  }

  cambiaPrecio(){
    if(this.precioVenta!.precio_con_iva == undefined) {this.precioVenta!.precio_con_iva = 0 ;}
    this.precioVenta!.precio_antes_de_iva = this.precioVenta!.precio_con_iva ;  
  }
  enabledBtnIngreso()
  {  
    this.precioVenta = this.arrayDocPrd.producto?.precios[0]! 
    let idBodegaStock =   this.arrayDocPrd.documento.idStockOdooPOS??0 

    try { 
      if (Array.isArray(this.arrayDocPrd.producto?.existencias)) {
        this.existencia = this.arrayDocPrd.producto?.existencias?.filter(x => x.id_bodega == idBodegaStock)[0] || this.existencia;
      }  
    } catch (error) {
      console.error(error)
    }
     console.log("enabledBtnIngreso - existencia" , this.arrayDocPrd.producto?.existencias ,  this.existencia ) 
    if(this.validarExistencia){
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
  }}else{
    this.disabled = [false ,false ,false ,false ,false ,false ,false ,false ,false ,false];
  } 
  }
    
  addCnt(cnt:number){
    if (this.existencia!.cant_actual == 10 ){
      this.enviarCnt(10);
    }else{
    this.cantidadPrd += cnt ;
   // console.log('existencia actual',this.existencia, (this.existencia?.cant_actual!   < this.cantidadPrd)); 
    
   if ( this.validarExistencia && (this.existencia?.cant_actual!    < this.cantidadPrd)){
       this.cantidadPrd =  this.existencia?.cant_actual ?? 0 ;
    }}
  }

  enviarCntDirecto(){    
    this.enviarCnt(0)
  }
  enviarCnt( cnt:number ){
    if( this.precioVenta?.precio_con_iva! <= 0){
      Swal.fire('Ingrese el precio de venta'); 
      return;
    }
    this.disabled = [true, true, true, true, true, true, true, true, true, true];
    this.cantidadPrd  += cnt ;
    console.log( 'enviarCnt' ,this.arrayDocPrd.producto  )
      console.log( 'enviarCnt' , this.cantidadPrd   )
        console.log( 'enviarCnt' ,      this.existencia?.cant_actual??0 )

    if (this.arrayDocPrd.producto !== undefined && this.cantidadPrd > 0 )
    {
        
      if(!this.validarExistencia || ((this.existencia?.cant_actual??0)   >= this.cantidadPrd ) ) 
      {  
            this.arrayDocPrd.producto.cantidadVendida = this.cantidadPrd;
            this.loading.show()  

            this.prdService.guardarPrdVentas(this.arrayDocPrd.producto ,  this.arrayDocPrd.documento , this.precioVenta!,this.validarExistencia ).subscribe(
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

}
