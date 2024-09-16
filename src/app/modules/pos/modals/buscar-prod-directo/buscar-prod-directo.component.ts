import { Component, Inject, OnInit } from '@angular/core';
import { MaestroClienteServices } from '../../../../services/MaestroCliente.services';
import { loading } from 'src/app/models/app.loading';
import { dfltAnswOdoo2 } from 'src/app/interfaces/clientes-odoo'; 
import { ProductoService } from 'src/app/services/producto.service';
import { responsePrd } from 'src/app/interfaces/odoo-prd';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoModel } from 'src/app/models/producto/producto.module'; 
import Swal from 'sweetalert2';
import { CategoriasModel } from 'src/app/models/categorias.model';
import { MarcasModel } from 'src/app/models/marcas/marcas.module';
@Component({ 
  selector: 'app-buscar-prod-directo',
  templateUrl: './buscar-prod-directo.component.html',
  styleUrls: ['./buscar-prod-directo.component.css']
})
export class BuscarProdDirectoComponent implements OnInit  {
  show = false ;
  textFindMarcas:string = '';textFindCategoria="";
  textFindProductos:string = '';
  parceros : ProductoModel[] = [];
  prdBusqueda !:ProductoModel   ;
  listPrdBusqueda :ProductoModel[] = [];
  respuestaDialog:responsePrd = {  "confirmado": false, 
  "datoDevolucion":this.listPrdBusqueda[0]};
  codPrd!:string ;   
  cantidadPrd!:number ;  
  disabled:boolean[] = [];
  //--------------------
  marcas:dfltAnswOdoo2[]=[];
  marcasAux:dfltAnswOdoo2[] = [];
  categorias:dfltAnswOdoo2[] = [];
  categoriasAux:dfltAnswOdoo2[] = [];
  
  marcaSeleccionada: MarcasModel = new MarcasModel();
  categoriaSeleccionada: CategoriasModel = new CategoriasModel(null);
  constructor(public loading : loading ,public dialogo: MatDialogRef<BuscarProdDirectoComponent>
    , private prdService : ProductoService,@Inject(MAT_DIALOG_DATA) public producto:ProductoModel[] ,
    private MaestroClienteServices :MaestroClienteServices ,
  ) { this.marcaSeleccionada.nombre = 'Filtre por Marca';
    this.marcaSeleccionada.id = 0;
    this.categoriaSeleccionada.nombre = 'Filtre por Categoria';
    this.categoriaSeleccionada.id = 0;
    console.log('productos ingresados en el llamados',this.producto);
    if (this.producto != undefined){
      this.listPrdBusqueda =  this.producto;
    }else{
    this.buscarProductos(); }
   }
  ngOnInit(): void { 

    this.prdService.currentCategorias.subscribe((value:CategoriasModel[]|null)=>{
        if(value != undefined){
          this.categorias = []; 
          value.forEach((value:any )=>{  
            this.categorias.push({
              "dato": value.id,
              "label":value.nombre,
              "color":value.color,
              "display":true
            })  
        
          })       
          this.categoriasAux = this.categorias ;
        }
    })
     
    this.prdService.currentMarcas.subscribe((value:MarcasModel[]|null)=>{
        if(value != undefined){
          this.marcas = []; 
          value.forEach((value:any )=>{  
            this.marcas.push({
              "dato": value.id,
              "label":value.nombre,
              "color":value.color,
              "display":true
            })  
        
          })       
          this.marcasAux = this.marcas;
        }
    })
  }
   getProductosPorFiltro(){
    console.log('busqueda productos inicial' ); 
     this.loading.show() 
     this.listPrdBusqueda = [];
     this.prdService.get_producto_simple_by_nombre( this.textFindProductos  )
     .subscribe({next:
      (respuesta:any)=>{
        if (respuesta.error === 'ok'){
           if (respuesta.numdata > 0 ){ 
             this.listPrdBusqueda = respuesta.data?? [] ;   
           }else{Swal.fire(  "error", 'no existen productos con la referencia o nombre '+ this.textFindProductos  ) 
              } 
         }else{
           Swal.fire(  "error", respuesta.error);
         } 
         console.log('buscarPorCategoria',JSON.stringify(respuesta));
         this.loading.hide();
        
         }, error:
         error => {this.loading.hide();
           Swal.fire(  "error",  error.error.error);
         } }
    );
    }
   buscarProductos(){ 
     this.loading.show() 
     this.listPrdBusqueda = [];
     this.prdService.get_producto_simple().subscribe({
      next :  (respuesta:any)=>{
        console.log('busqueda productos inicial'  , respuesta);
        
         if (respuesta.error === 'ok'){
            if (respuesta.numdata > 0 ){ 
              const productos = respuesta.data; 
              console.log('producto general ===>>>' , productos)
              this.listPrdBusqueda = productos   
            }else{Swal.fire(  "error", 'la busqueda no genero ningun resultado') 
               } 
          }else{ 
            
            Swal.fire(  "error - getProductosGeneral" , respuesta.error ,"error"  );
          } 
           
          this.loading.hide();
         
          }, error :  error => {this.loading.hide();
            Swal.fire(  "error - getProductosGeneral",  error  , "error"  );
          } }
     );
    }
   buscarPorCategoriaDB(categoria:CategoriasModel){
    this.listPrdBusqueda = []; 
      this.loading.show() 
      this.prdService.get_producto_simple_by_categoria(categoria.id )
      
      .subscribe({next:
        (respuesta:any)=>{
          if (respuesta.error === 'ok'){
             if (respuesta.numdata > 0 ){ 
               this.listPrdBusqueda = respuesta.data?? [] ;   
             }else{Swal.fire(  "error", 'no existen productos con la categoria '+ categoria.nombre) 
                } 
           }else{
             Swal.fire(  "error", respuesta.error);
           } 
           console.log('buscarPorCategoria',JSON.stringify(respuesta));
           this.loading.hide();
          
           }, error:
           error => {this.loading.hide();
             Swal.fire(  "error",  error.error.error);
           } }
      );
     }
     enviarProducto(prd:ProductoModel){
      this.respuestaDialog.confirmado = true;
      this.respuestaDialog.datoDevolucion = prd;

      this.dialogo.close(this.respuestaDialog);
     } 
   buscarPorMarcaDB(marca:MarcasModel){
     
    this.listPrdBusqueda = [];
    console.log('marca' , marca);
    this.loading.show() 
      this.prdService.get_producto_simple_by_marca(marca.id! ).subscribe( {
        next:
        (respuesta:any)=>{
          if (respuesta.error === 'ok'){
             if (respuesta.numdata > 0 ){
                this.listPrdBusqueda = respuesta.data?? [] ;  
             }else{Swal.fire(  "error", 'no existen productos de la marca '+ marca.nombre) 
                } 
           }else{
             Swal.fire(  "error", respuesta.error);
           } 
           console.log('getProductosPorMarca',JSON.stringify(respuesta)); 
          
           },error: error => {
             Swal.fire(  "error",  error.error.error);
           },complete: ()=> this.loading.hide()
           }
      );

    }
 
}
