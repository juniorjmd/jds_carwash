import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { categoriaRequest, marcaRequest } from 'src/app/interfaces/producto-request';
import { loading } from 'src/app/models/app.loading';
import { CategoriasModel } from 'src/app/models/categorias.model';
import { MarcasModel } from 'src/app/models/marcas/marcas.module';
import { ProductoModel } from 'src/app/models/producto/producto.module'; 
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-update-producto',
  templateUrl: './modalUpdateProducto.component.html',
  styleUrls: ['./modalUpdateProducto.component.css'],
})
export class ModalUpdateProductoComponent {
   
   marcas:MarcasModel[] = []; 
   categorias:CategoriasModel[] = [];
   
   tipProductos:any = [{id:0 , nombre:'Seleccione el tipo de producto'},
    {id:1 , nombre:'prd.fisico '},
         {id:2 , nombre:'servicios' } 
       ];
  private productoService = inject(ProductoService) 
  constructor( @Inject(MAT_DIALOG_DATA) public   newProducto:ProductoModel , private loading:loading){ this.getCategorias_marcas() }
    
  
  getCategorias_marcas(){ 
    this.marcas = [];
    this.categorias = [];
  
      this.loading.show()
      this.productoService.getCategorias_marcas().subscribe({
        next: (datos:[categoriaRequest,marcaRequest])=>{
           console.log('getCategorias_marcas',datos);
       let cont:number;    
      if (datos[0].numdata > 0 ){ 
        this.categorias = 
        datos[0].data ;
        console.log(this.categorias); 
      }else{
        this.categorias = [];
      }
      if (datos[1].numdata > 0 ){ 
        cont = 1 ; 
        this.marcas = datos[1].data ;
        console.log(this.marcas);
      }else{
        this.marcas = [];
      }
          this.loading.hide()
        } ,
        error:(error : any) => {this.loading.hide();
          console.error('getCategorias_marcas',error) 
          try {
            Swal.fire( error.error.error, '', 'error');
          } catch (error) {
            Swal.fire( 'error interno, validar con el administrador del sitio', '', 'error');
          }
        }}
        );
     
      }
  
      limpiarFormulario(){
        this.newProducto  =new ProductoModel( '' , '' ,0 ,0,'','0', 0,0,0,0,0,'','','',0,''  ) ; 
  
       }
       enviarProducto(){
       
        if( this.newProducto.nombre.trim()  === ''){ 
          Swal.fire( 'Debe establecer minimo el nombre principal del  producto', '', 'error');
         return ;
         }
         if(this.newProducto.infoTributaria == 'GRABADO' && this.newProducto.porcent_iva == 0){
          Swal.fire( 'Debe establecer el procentaje del IVA', '', 'error');
          return ;
        }
        if(this.newProducto.infoTributaria !== 'GRABADO'){
          this.newProducto.porcent_iva == 0
        }
         if( this.newProducto.idCategoria!   <= 0){ 
          Swal.fire( 'Debe establecer una categoria', '', 'error');
         return ;
         } 
         if( this.newProducto.idMarca!   <= 0){ 
          Swal.fire( 'Debe establecer una marca', '', 'error');
         return ;
         } 
         if( this.newProducto.tipo_producto!   <= 0){ 
          Swal.fire( 'Debe establecer un tipo de producto', '', 'error');
         return ;
         } 
        /* if( this.newProducto.precioVenta   <= 0){ 
          Swal.fire( 'Debe establecer el precio de venta', '', 'error');
         return ;
         } */
        this.loading.show(); 
        this.productoService.guardarNuevoProducto(this.newProducto).subscribe(
          {next:
         (respuesta:any)=>{console.log(respuesta)
          
         if (respuesta.error === 'ok'){ 
          Swal.fire('datos ingresados con exito'); 
           this.limpiarFormulario();
        }else{ 
          try {
           Swal.fire(respuesta.error, '', 'error');
          } catch (error : any) {
           Swal.fire('error en el servidor', '', 'error');
          }
        
        }
        
         }
         , error: error =>  {Swal.fire(JSON.stringify(error), '', 'error')  ;
          console.error("enviar producto" ,  error)
         }
         , complete: () =>  {this.loading.hide();} }
        ) 
       }
 }
