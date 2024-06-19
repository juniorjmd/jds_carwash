import { Component, OnInit } from '@angular/core';

import { CategoriasModel } from 'src/app/models/categorias.model';
import { Categoria } from 'src/app/interfaces/categoria.interface'; 
import { loading } from 'src/app/models/app.loading';
import { ProductoService } from 'src/app/services/producto.service';
import { select } from 'src/app/interfaces/generales.interface'; 
import { ProductoModule } from 'src/app/models/producto/producto.module';
import { MarcasModule } from 'src/app/models/marcas/marcas.module'; 
import { PrdExistenciasModule } from 'src/app/models/prd-existencias/prd-existencias.module';
import { BodegasModule } from 'src/app/models/bodegas/bodegas.module';
import { AuxIngresoInventarioModule } from 'src/app/models/aux-ingreso-inventario/aux-ingreso-inventario.module';
import { MatDialog } from '@angular/material/dialog';
import { BuscarProdDirectoComponent } from 'src/app/modules/pos/pages/buscar-prod-directo/buscar-prod-directo.component';
import { responsePrd } from 'src/app/interfaces/odoo-prd';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
}) 
export class ProductosComponent implements OnInit {
  existenciasPrd:PrdExistenciasModule[]=[] ;
  inventario:any={
    nombre : '' , 
    bodega : 0 , 
    descripcion : ''
  }
  productoRetornoBusqueda!:ProductoModule ;
  AuxIngresoInventarioModule : AuxIngresoInventarioModule[] = [];


  newIngresoPrecargue !:AuxIngresoInventarioModule ;


  auxBodega:BodegasModule = {nombre : 'SELECCIONAR LA BODEGA' ,estado:0,   id:0  , descripcion : ''}
  bodegas :BodegasModule[] = [this.auxBodega];
  Productos :ProductoModule[] = [];
  categoriaAux :CategoriasModel  =  {id:0,  letra:'',     nombre:'Seleccione la categoria',     descripcion:'',     tipo:'',    contador :0   } ; 
  categorias :CategoriasModel[] = [ this.categoriaAux ]; 
  categorias2 :CategoriasModel[] = [ this.categoriaAux ];
  categorias3 :CategoriasModel[] = [ this.categoriaAux ];
  marcasAux:MarcasModule = { nombre:"Seleccione La marca",  descripcion:'',   estado: 0 ,     nombre_estado:'' ,
    id:0 };

  tipProductos:any = [{id:0 , nombre:'Seleccione el tipo de producto'},
                     {id:1 , nombre:'prd.fisico '},
                          {id:2 , nombre:'servicios' } 
                        ];
  marcas:MarcasModule[] = [this.marcasAux];
  newProducto:ProductoModule = new ProductoModule( '' ,0 ,0,0,0,0,'','',0,''
  ,0,0,0,0,0,'','','',0,0,new Date(),'','','','','',0,0,'') ; 


  constructor(private loading : loading,
    private productoService:ProductoService,
    
    private newAbrirDialog : MatDialog 
    ) {
     this.getProductos();
     this.getBodegas();
     this.getCategorias_marcas(); 
     }
     busquedaAuxiliarProducto( ){ 
      let text = $("#bodegasSelect option:anyed").text()
      if(this.inventario.bodega <= 0) {
        Swal.fire( 'Debe seleccionar la bodega de ingreso', '', 'error');
        return;
       }
      this.newAbrirDialog.open(BuscarProdDirectoComponent   )
      .afterClosed()
      .subscribe(( response:responsePrd  )=>{
        console.log(response);
        
        if (response.confirmado){
         this.productoRetornoBusqueda = response.datoDevolucion!;
          console.log('dato retornado busqueda directa',response.datoDevolucion);

          Swal.fire({
            title: `ingrese la cantidad a ingresar del producto "${response.datoDevolucion!.nombre_completo}" en la bodega  : "${text}"  .`, 
            input: 'number',
            showCancelButton: true,
            confirmButtonText: 'Si', 
            cancelButtonText:'No'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            console.log(result  );
            if (result.isConfirmed) {  
              if(result.value <= 0){
                Swal.fire( 'el valor debe ser mayor a cero', '', 'error');
                return;
              }
              this.newIngresoPrecargue =    new AuxIngresoInventarioModule(this.productoRetornoBusqueda.id! , result.value ,  this.inventario.bodega ) ; 
              this.productoService.guardarNuevoProductoPrecargue( this.newIngresoPrecargue   ).subscribe(
                (respuesta:any)=>{console.log(respuesta)
                 
                if (respuesta.error === 'ok'){  
                    console.log(respuesta);
               if (respuesta.numdata > 0 ){ 
                 this.AuxIngresoInventarioModule = respuesta.data;  
               }else{
                 this.AuxIngresoInventarioModule = [];     
                 } 
                 
               }else{ 
                 try {
                  Swal.fire(respuesta.error, '', 'error');
                 } catch (error : any) {
                  Swal.fire('error en el servidor', '', 'error');
                 }
               
               }
                this.loading.hide(); 
                }) 
            } 
         }) 
        } 
      })  
    
     }

     getBodegas(){ 
      this.bodegas   = [this.auxBodega];
      this.productoService.getbodegas( ).subscribe(
        (datos:any)=>{
           console.log(datos);
      if (datos.numdata > 0 ){ 
         
       let  cont = 1 ; 
        datos.data!.forEach((dato:BodegasModule , index:number )=>{
          this.bodegas[cont] = dato;
          cont++;
        }) 
      }else{
        this.bodegas   = [this.auxBodega];   }
          this.loading.hide()
        } ,
        error => {this.loading.hide();
          console.log(error)
          alert( error.error.error);
        }
        );
     }
     cerrarInventario(){
      if(this.inventario.bodega <= 0)
      { Swal.fire('Debe escoger la bodega!!!', '', 'error');
      return;}
      if(this.inventario.nombre.trim() === '')
      {  Swal.fire('Debe ingresar el nombre del inventario!!!', '', 'error');
      return;}
      //USUARIO_LOGUEADO
  
/*inventario:any={
    nombre : '' , 
    bodega : 0 , 
    descripcion : ''
  } */
     
      this.productoService.CERRAR_INVENTARIO(this.inventario.bodega, this.inventario.nombre ,this.inventario.descripcion).subscribe(
        (respuesta:any)=>{console.log(respuesta)
        
          if (respuesta.error === 'ok'){ 
            this.AuxIngresoInventarioModule = [];   
            this.inventario ={
              nombre : '' , 
              bodega : 0 , 
              descripcion : ''
            }
            Swal.fire('inventario Cerrado con exito', '', 'error');
         }else{ 
           try {
            Swal.fire(respuesta.error, '', 'error');
           } catch (error : any) {
            Swal.fire('error en el servidor', '', 'error');
           }
         
         }
          this.loading.hide(); 
         }
        );
     }
     borrarPrecarga(){
      if(this.inventario.bodega <= 0)
      {this.AuxIngresoInventarioModule=[];
      return;}
      
      this.productoService.borrarPrecarguePorBodega(this.inventario.bodega).subscribe(
        (respuesta:any)=>{console.log(respuesta)
        
          if (respuesta.error === 'ok'){ 
            this.AuxIngresoInventarioModule = [];   
         }else{ 
           try {
            Swal.fire(respuesta.error, '', 'error');
           } catch (error : any) {
            Swal.fire('error en el servidor', '', 'error');
           }
         
         }
          this.loading.hide(); 
         }
        );
     }
     cargarPrecargue(){
      if(this.inventario.bodega <= 0)
      {this.AuxIngresoInventarioModule=[];
      return;}
      this.productoService.getPrecarguePorBodega(this.inventario.bodega).subscribe(
        (datos:any)=>{
           console.log(datos);
      if (datos.numdata > 0 ){ 
        this.AuxIngresoInventarioModule = datos.data;  
      }else{
        this.AuxIngresoInventarioModule = [];      }
          this.loading.hide()
        } ,
        error => {this.loading.hide();
          console.log(error)
          alert( error.error.error);
        }
        );
     }
     editarPrd(prd:ProductoModule){
      this.removeGetActivo('CrearPrdLink'); 
      this.limpiarFormulario()
      this.newProducto = prd;
     }

     existencias(prd:ProductoModule){
      this.loading.show()
      this.productoService.getProductosExistencia(prd).subscribe(
        (datos:any)=>{
           console.log(datos);
           
      if (datos.numdata > 0 ){ 
        this.existenciasPrd = datos.data; 
        console.log(this.existenciasPrd);
        let pagosHtml:string =  `<h1>Producto : <br>${this.existenciasPrd[0].nombre_completo}</h1>
        <table class='table' style='font-size:12px'> 
        <tr><td colspan='10' > <h1>Existentencias y Movimientos</h1><td></tr> 
        <tr>
        <td>Bodega</td>
        <td>ultimo mov.</td>
        <td>fecha</td>
        <td>usuario</td>
        <td>cnt. inicial</td>
        <td>cnt. actual</td>
        <td>ventas</td>
        <td>compras</td>
        <td>devoluciones</td>
        <td>remisionada</td> 
        </tr>
       `;
       // cantInicial, cantActual, compras, ventas, devoluciones, stock, remisionada,
       
       this.existenciasPrd!.forEach(pago=>{
         pagosHtml +=`<tr> `;
         pagosHtml +=`<td>${pago.nombreBodega}</td> `;
         pagosHtml +=`<td nowrap>${pago.ult_mov}</td> `;
         pagosHtml +=`<td nowrap>${pago.fecha_ult_mov}</td> `;
         pagosHtml +=`<td nowrap>${pago.nombreUsuario_ult_mov}</td> `;
         pagosHtml +=`<td nowrap>${pago.cantInicial}</td> `;
         pagosHtml +=`<td nowrap>${pago.cantActual}</td> `;
         pagosHtml +=`<td nowrap>${pago.ventas}</td> `;
         pagosHtml +=`<td nowrap>${pago.compras}</td> `;
         pagosHtml +=`<td nowrap>${pago.devoluciones}</td> `;
         pagosHtml +=`<td nowrap>${pago.remisionada}</td> `;
         pagosHtml +=`</tr> `;
       })
   
   
       pagosHtml += '</table>'
   
   
   
       Swal.fire({html:pagosHtml, width: '900px'});




      }else{
        this.existenciasPrd = [];
        Swal.fire( 'el producto ' + prd.nombre_completo+ ' no posee existencias en ninguna bodega!!', '', 'error');
      }
  
          this.loading.hide()
        } ,
        error => {this.loading.hide();
          console.log(error)
          alert( error.error.error);
        }
        );
     }
     getCategorias_marcas(){ 
  this.marcas = [this.marcasAux];
  this.categorias = [this.categoriaAux ];

    this.loading.show()
    this.productoService.getCategorias_marcas().subscribe({next: (datos:any)=>{
         console.log(datos);
     let cont:number;    
    if (datos[0].numdata > 0 ){ 
      cont = 1 ; 
      datos[0].data!.forEach((dato:Categoria , index:number )=>{
        this.categorias[cont] = new CategoriasModel(dato) ;
        cont++;
      }) 
      console.log(this.categorias);
    }else{
      this.categorias = [this.categoriaAux ];
    }
    if (datos[1].numdata > 0 ){ 
      cont = 1 ; 
      datos[1].data!.forEach((dato:MarcasModule , index:number )=>{
        this.marcas[cont] = dato;
        cont++;
      }) 
      console.log(this.marcas);
    }else{
      this.marcas = [this.marcasAux];
    }
        this.loading.hide()
      } ,
      error:(error : any) => {this.loading.hide();
        console.log(error)
        alert( error.error.error);
      }}
      );
   
    }



     limpiarFormulario(){
      this.newProducto  = new ProductoModule( '' ,0 ,0,0,0,0,'','',0,''
      ,0,0,0,0,0,'','','',0,0,new Date(),'','','','','',0,0,'') ; 
     }
     enviarProducto(){
      
      if( this.newProducto.nombre.trim()  === ''){ 
        Swal.fire( 'Debe establecer minimo el nombre principal del  producto', '', 'error');
       return ;
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
       if( this.newProducto.precioVenta   <= 0){ 
        Swal.fire( 'Debe establecer el precio de venta', '', 'error');
       return ;
       } 
      this.loading.show(); 
      this.productoService.guardarNuevoProducto(this.newProducto).subscribe(
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
       this.loading.hide(); 
       }) 
     }

     
     getProductos(){ 
    this.loading.show()
    this.productoService.getProductosGeneral([0,100]).subscribe(
      (datos:any)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      datos.data!.forEach((dato:ProductoModule , index:number )=>{
        this.Productos[index] = dato;
      }) 
      console.log(this.Productos);
    }else{
      this.Productos = [];
    }

        this.loading.hide()
      } ,
      error => {this.loading.hide();
        console.log(error)
        alert( error.error.error);
      }
      );
    }

  removeGetActivo(a:string){
    console.log(a);
    $('.likcontPrd').each(function(){
       $(this).removeClass('active')
    }) ;
    
    $('#'+a ).addClass('active') 
    $('.contPrd').css('display' , 'none   ')
    const elemDiv = document.getElementById(a.trim()+'Div') 
    elemDiv!.style.display = 'block'
  }
  ngOnInit(): void {
  }

}
