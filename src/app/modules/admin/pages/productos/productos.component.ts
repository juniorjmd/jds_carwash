import { Component, OnInit } from '@angular/core';

import { CategoriasModel } from 'src/app/models/categorias.model';
import { Categoria } from 'src/app/interfaces/categoria.interface'; 
import { loading } from 'src/app/models/app.loading';
import { ProductoService } from 'src/app/services/producto.service'; 
import { ProductoModel } from 'src/app/models/producto/producto.module';
import { MarcasModel } from 'src/app/models/marcas/marcas.module'; 
import { PrdExistenciasModule } from 'src/app/models/prd-existencias/prd-existencias.module';
import { BodegasModule } from 'src/app/models/bodegas/bodegas.module';
import { AuxIngresoInventarioModule } from 'src/app/models/aux-ingreso-inventario/aux-ingreso-inventario.module';
import { MatDialog } from '@angular/material/dialog';
import { BuscarProdDirectoComponent } from 'src/app/modules/pos/modals/buscar-prod-directo/buscar-prod-directo.component';
import { responsePrd } from 'src/app/interfaces/odoo-prd';
import Swal from 'sweetalert2';
import { categoriaRequest, marcaRequest, presentacionPrdRequest } from 'src/app/interfaces/producto-request';
import { ModalUpdateProductoComponent } from '../../modals/modalUpdateProducto/modalUpdateProducto.component';
import { PresentacionPrdModel } from 'src/app/models/presentacionPrdModel';
import { PrdPreciosModule } from 'src/app/models/prd-precios/prd-precios.module';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
}) 
export class ProductosComponent implements OnInit {
  buscar = true;
  auxBodega:BodegasModule = {nombre : 'SELECCIONAR LA BODEGA' ,estado:0,   id:0  , descripcion : ''}
  existenciasPrd:PrdExistenciasModule[]=[] ;
  
  presentacion:PresentacionPrdModel[] = []
  productoRetornoBusqueda!:ProductoModel ;
  AuxIngresoInventarioModule : AuxIngresoInventarioModule[] = [];


  newIngresoPrecargue !:AuxIngresoInventarioModule ;


  bodegas :BodegasModule[] = [this.auxBodega];
  inventario:any={
    nombre : '' , 
    bodega : this.bodegas[0] , 
    descripcion : '',
    tipoInventario : 0
  }
  Productos :ProductoModel[] = [];
  categoriaAux :CategoriasModel[]  =  [{id:0,  letra:'',  
       nombre:'Seleccione la categoria',  
          descripcion:'',  numHijos:0,   tipo:'',    contador :0  ,selected:false }] ; 
  categorias :CategoriasModel[] = []; 
  categorias1 :CategoriasModel[] = [...this.categoriaAux ];
  categorias2 :CategoriasModel[] = [...this.categoriaAux ];
  categorias3 :CategoriasModel[] = [...this.categoriaAux ];
  marcasAux:MarcasModel = { nombre:"Seleccione La marca",  descripcion:'',   estado: 0 ,     nombre_estado:'' , selected:false,
    id:0 };

    tipProductos:any = [{id:0 , nombre:'Seleccione el tipo de producto'},
      {id:1 , nombre:'prd.fisico '},
           {id:2 , nombre:'servicios' } 
         ];
         tipInventario:any = [{id:0 , nombre:'Seleccione el tipo de inventario'},
          {id:2 , nombre: 'Ajuste'},
               {id:1 , nombre:'General' } 
             ];
  marcas:MarcasModel[] = [this.marcasAux];
  newProducto:ProductoModel = new ProductoModel( '' , '' ,0 ,0,'0','0', 0,0,0,0,0,'','','',0, ''  ) ; 
  textFindProductos:string = '';
  
  ivaIncluido :boolean = true;
  constructor(private loading : loading,
    private productoService:ProductoService,
    
    private newAbrirDialog : MatDialog 
    ) {
      this.getPresentacion();
     this.getProductos();
     this.getBodegas();
     this.getCategorias_marcas(); 
     }
     cambioTipProducto(){
      if(this.newProducto.tipo_producto == 2 ){
        this.newProducto.presentacion = 0;
      }
     }
  getPresentacion(){
    this.productoService.getPresentacioProducto().subscribe({next:(value:presentacionPrdRequest)=>{
      let pre:PresentacionPrdModel = {
        id: 0,
        nombre: 'Ninguna',
        descripcion: '',
        sigla: ''
      };
      this.presentacion = [pre, ...value.data];  
    }});
  }
   getProductosPorFiltro(){
    console.log('busqueda productos inicial' ); 
     this.loading.show()  
     this.productoService.getProductosPorNombre( this.textFindProductos ,[0,30] ).subscribe(

      {next :
       (respuesta:any)=>{
         if (respuesta.error === 'ok'){
            if (respuesta.numdata > 0 ){
              const productos = respuesta.productos; 
              console.log('producto general' , productos)
              this.Productos = productos   
            }else{ 
              Swal.fire(  "error",  'la busqueda no genero ningun resultado', "error" );
               } 
          }else{ 
            Swal.fire(  "error", respuesta.error , "error"); 
          } 
          console.log('getProductosNombre',JSON.stringify(respuesta));
         
         
          } , error:    error => { this.loading.hide();  
                    Swal.fire(  "error", error , "error"); 
          },complete:()=>  this.loading.hide() }
     );
    }
    setCategoria2(){   
        this.categorias3  = [... this.categoriaAux ];
        this.categorias2  = this.categorias.filter( x=> x.idPadreCategoria == this.newProducto.idCategoria  )
        
      this.categorias2.unshift(this.categoriaAux[0]);
    }
    setCategoria3(){  
      this.categorias3  = this.categorias2.filter( x=> x.idPadreCategoria == this.newProducto.idCategoria2  )
      this.categorias3.unshift(this.categoriaAux[0]);
    }
     busquedaAuxiliarProducto( ){   
      if(this.inventario.bodega.id <= 0) {
        Swal.fire( 'Debe seleccionar la bodega de ingreso', '', 'error');
        return;
       }
       
       let nomInventario = this.inventario.bodega.nombre;
       console.log(JSON.stringify(this.inventario.bodega))
      this.newAbrirDialog.open(BuscarProdDirectoComponent   )
      .afterClosed()
      .subscribe(( response:responsePrd  )=>{
        console.log(response);
        
        if (response.confirmado){
         this.productoRetornoBusqueda = response.datoDevolucion!;
          console.log('dato retornado busqueda directa',response.datoDevolucion);
          Swal.fire({
            title: `ingrese la cantidad a ingresar del producto "${response.datoDevolucion!.nombre}"
             en la bodega  : "${nomInventario}"  .`, 
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
                 this.AuxIngresoInventarioModule = respuesta.datos;  
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
      this.productoService.getbodegas( ).subscribe({next : 
        (datos:any)=>{
           console.log('producto component - get bodegas' , datos);
          if (datos.numdata > 0 ){ 
            this.bodegas = datos.data!.map((x:any)=>x.obj) 
            this.bodegas.unshift(this.auxBodega);
          }else{
            this.bodegas   = [this.auxBodega];   }
            } , error:
        error => {this.loading.hide();
          console.error('getbodegas',error) 
          try {
            Swal.fire( error , 'error');
          } catch (error) {
            Swal.fire( 'error interno, validar con el administrador del sitio', '' , 'error');
          }
        }
        , complete : ()=>this.loading.hide()    }  );
     }
     cerrarInventario(){
      if(this.inventario.bodega.id <= 0)
      { Swal.fire('Debe escoger la bodega!!!', '', 'error');
      return;}
      if(this.inventario.tipoInventario <= 0)
      { Swal.fire('Debe escoger el tipo de inventario!!', '', 'error');
      return;}
      if(this.inventario.nombre.trim() === '')
      {  Swal.fire('Debe ingresar el nombre del inventario!!!', '', 'error');
      return;} 
        let msg = '';
        console.log("inventario cerrar" , this.inventario)
      switch(this.inventario.tipoInventario){
        case 1 : 
            msg = 'Ten en cuenta, el inventario tipo GENERAL borrara la existencia actual de los productos ingresados '+
             'y los reemplazara con los nuevos valores '
        break;
        case 2 :   
        msg = 'Ten en cuenta, el inventario tipo AJUSTE, sumara a la existencia actual de los productos ingresados '+
             'los nuevos valores con actuales ,  es decir si un producto X tiene valor -10 e ingresas 10 el valor acual del producto sera 0 (cero)'
        break;
        default:
          msg = 'Tipo de inventario no reconocido.';
      }

      msg  = msg + '. esta operacion no es reversible asi que es necesario que tengas muy claro esto antes de aplicar' ;
     
      Swal.fire({
        title: '¿Estás seguro?',
        text: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ¡hazlo!',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          
      this.productoService.CERRAR_INVENTARIO(this.inventario.bodega.id, this.inventario.nombre ,this.inventario.descripcion
        ,this.inventario.tipoInventario ).subscribe(
          {next :       (respuesta:any)=>{console.log(respuesta)        
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
         },error: error => 
          { Swal.fire(JSON.stringify(error.error) , '', 'error') 
                   console.error(error.error)       
                     }  , complete:()=>
          this.loading.hide()
        }
        )
          // Aquí pones la lógica para la acción confirmada
        } 
      });





     }
     borrarPrecarga(){
      if(this.inventario.bodega <= 0)
      {this.AuxIngresoInventarioModule=[];
      return;}
      
      this.productoService.borrarPrecarguePorBodega(this.inventario.bodega.id).subscribe(
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
     borrarIngreso(obj:AuxIngresoInventarioModule){

       this.productoService.eliminaritemIngresoInventario(obj.id)
       .subscribe({next:(data)=> { Swal.fire( "Elemento eliminado con exito" , '', 'error');
         this.cargarPrecargue()
                    },
                    error:error=>Swal.fire( error.error.error, '', 'error')
                  }
     )
     }
     cargarPrecargue(){
      if(this.inventario.bodega <= 0)
      {this.AuxIngresoInventarioModule=[];
      return;}
      this.productoService.getPrecarguePorBodega(this.inventario.bodega.id).subscribe({next:
        (datos:any)=>{
           console.log(datos);
      if (datos.numdata > 0 ){ 
        this.AuxIngresoInventarioModule = datos.data;  
      }else{
        this.AuxIngresoInventarioModule = [];      }
        } ,
        error:error => {this.loading.hide();
          console.error('getPrecarguePorBodega',error) 
          try {
            Swal.fire( error.error.error, '', 'error');
          } catch (error) {
            Swal.fire( 'error interno, validar con el administrador del sitio', '', 'error');
          }
        },complete:()=>
          this.loading.hide() }
        );
     }
     editarPrd(prd:ProductoModel){ 
      console.clear();
      console.log('producto enviado', prd);
      
      this.limpiarFormulario() 
      this.newAbrirDialog.open(ModalUpdateProductoComponent , { data:  prd }  )
      .afterClosed()
      .subscribe(( response:responsePrd  )=>{
        console.log(response);
        
        if (response.confirmado){ 
          console.log('dato retornado busqueda directa',response.datoDevolucion);
       
        } 
      })  

     }


     existencias(prd:ProductoModel){
      if (prd.existencias.length > 0 ){ 
        this.existenciasPrd = prd.existencias; 
        console.log(this.existenciasPrd);
        let pagosHtml:string =  `<h1>Producto : <br>${this.existenciasPrd[0].nombre_producto}</h1>
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
         pagosHtml +=`<td nowrap>${pago.fecha_ultimo_cambio}</td> `;
         pagosHtml +=`<td nowrap>${pago.nombreUsuario_ult_mov}</td> `;
         pagosHtml +=`<td nowrap>${pago.cant_inicial}</td> `;
         pagosHtml +=`<td nowrap>${pago.cant_actual}</td> `;
         pagosHtml +=`<td nowrap>${pago.ventas}</td> `;
         pagosHtml +=`<td nowrap>${pago.compras}</td> `;
         pagosHtml +=`<td nowrap>${pago.devoluciones}</td> `;
         pagosHtml +=`<td nowrap>${pago.remisiones}</td> `;
         pagosHtml +=`</tr> `;
       })
   
   
       pagosHtml += '</table>'
   
   
   
       Swal.fire({html:pagosHtml, width: '900px'});




      }else{
        this.existenciasPrd = [];
        Swal.fire( 'el producto ' + prd.nombre+ ' no posee existencias en ninguna bodega!!', '', 'error');
      }
     }
     existencias_old(prd:ProductoModel){
      this.loading.show()
      this.productoService.getProductosExistencia(prd).subscribe(
        {
          next:
        (datos:any)=>{
           console.log(datos);
           
      if (datos.numdata > 0 ){ 
        this.existenciasPrd = datos.data; 
        console.log(this.existenciasPrd);
        let pagosHtml:string =  `<h1>Producto : <br>${this.existenciasPrd[0].nombre_producto}</h1>
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
         pagosHtml +=`<td nowrap>${pago.fecha_ultimo_cambio}</td> `;
         pagosHtml +=`<td nowrap>${pago.nombreUsuario_ult_mov}</td> `;
         pagosHtml +=`<td nowrap>${pago.cant_inicial}</td> `;
         pagosHtml +=`<td nowrap>${pago.cant_actual}</td> `;
         pagosHtml +=`<td nowrap>${pago.ventas}</td> `;
         pagosHtml +=`<td nowrap>${pago.compras}</td> `;
         pagosHtml +=`<td nowrap>${pago.devoluciones}</td> `;
         pagosHtml +=`<td nowrap>${pago.remisiones}</td> `;
         pagosHtml +=`</tr> `;
       })
   
   
       pagosHtml += '</table>'
   
   
   
       Swal.fire({html:pagosHtml, width: '900px'});




      }else{
        this.existenciasPrd = [];
        Swal.fire( 'el producto ' + prd.nombre+ ' no posee existencias en ninguna bodega!!', '', 'error');
      }
  
          this.loading.hide()
        } , error:
        error => {this.loading.hide();
          console.error('getProductosExistencia',error) 
          try {
            Swal.fire( error.error.error, '', 'error');
          } catch (error) {
            Swal.fire( 'error interno, validar con el administrador del sitio', '', 'error');
          }
        }}
        );
     }
     getCategorias_marcas(){ 
  this.marcas = [this.marcasAux];
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
      this.categorias1 = this.categorias.filter(x=>x.idPadreCategoria == 0)
      this.categorias1.unshift(this.categoriaAux[0]);
    }else{
      this.categorias = [...this.categoriaAux ];
    }
    if (datos[1].numdata > 0 ){ 
      cont = 1 ; 
      this.marcas = datos[1].data ;
      console.log(this.marcas);
    }else{
      this.marcas = [this.marcasAux];
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
      
        let precio:PrdPreciosModule = new PrdPreciosModule();
        precio.id_producto = this.newProducto.id
        precio.precio_con_iva = 0;
        precio.precio_antes_de_iva = 0;
        precio.valor_iva = 0;
    
        if(this.newProducto.precios[0] == undefined)this.newProducto.precios.push({...precio})  ;
        if(this.newProducto.precios[1] == undefined)this.newProducto.precios.push({...precio})  ;
        if(this.newProducto.precios[2] == undefined)this.newProducto.precios.push({...precio})  ;

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
        

       if (this.newProducto.porcent_iva??0 > 0){
        let ivaPorcentaje = this.newProducto.porcent_iva??0;
        if (this.ivaIncluido){
        for (let i=0; i<3 ;i++){
         let precioConIVA =  this.newProducto.precios[i].precio_con_iva??0;
         this.newProducto.precios[i].precio_antes_de_iva = precioConIVA / (1 + ivaPorcentaje / 100);
         this.newProducto.precios[i].valor_iva = precioConIVA - this.newProducto.precios[i].precio_antes_de_iva!;
         this.newProducto.precios[i].precio_con_iva = precioConIVA;
        }
        }else{
          for (let i=0; i<3 ;i++){
            let precioAntesDeIVA =  this.newProducto.precios[i].precio_con_iva??0;
            this.newProducto.precios[i].precio_antes_de_iva = precioAntesDeIVA;
            this.newProducto.precios[i].valor_iva = precioAntesDeIVA * (ivaPorcentaje / 100);
            this.newProducto.precios[i].precio_con_iva = precioAntesDeIVA +  this.newProducto.precios[i].valor_iva!;
           }
        }
      }else{
        for (let i=0; i<3 ;i++){ 
          this.newProducto.precios[i].precio_antes_de_iva =   this.newProducto.precios[i].precio_con_iva??0;;
          this.newProducto.precios[i].valor_iva = 0; 
         }
      } 

      this.loading.show(); 
      this.productoService.guardarNuevoProducto(this.newProducto).subscribe(
        {next:
       (respuesta:any)=>{console.log(respuesta)
        
       if (respuesta.error === 'ok'){
        this.buscar = true;
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

     
     getProductos(){ 
      if(!this.buscar){return}
    this.loading.show()
    this.productoService.getProductosGeneral([0,100]).subscribe({
      next: 
      (datos:any)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      this.buscar =  false;
      this.Productos = datos.productos 
      console.log('getProductos',this.Productos);
    }else{
      this.Productos = [];
    }

        this.loading.hide()
      } , error:    error => {this.loading.hide();
        console.error('getProductosGeneral',error) 
        try {
          Swal.fire( error.error.error, '', 'error');
        } catch (error) {
          Swal.fire( 'error interno, validar con el administrador del sitio', '', 'error');
        }
      }}
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
