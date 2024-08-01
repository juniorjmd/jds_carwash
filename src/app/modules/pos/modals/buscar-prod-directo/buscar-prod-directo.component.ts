import { Component, OnInit } from '@angular/core';
import { MaestroClienteServices } from '../../../../services/MaestroCliente.services';
import { loading } from 'src/app/models/app.loading';
import { dfltAnswOdoo2 } from 'src/app/interfaces/clientes-odoo'; 
import { ProductoService } from 'src/app/services/producto.service';
import { responsePrd } from 'src/app/interfaces/odoo-prd';
import { MatDialogRef } from '@angular/material/dialog';
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
  disabled:boolean[] = []
  //--------------------
  marcas:dfltAnswOdoo2[]=[];
  marcasAux:dfltAnswOdoo2[] = [];
  categorias:dfltAnswOdoo2[] = [];
  categoriasAux:dfltAnswOdoo2[] = [];
  constructor(public loading : loading ,public dialogo: MatDialogRef<BuscarProdDirectoComponent>
    , private prdService : ProductoService,
    private MaestroClienteServices :MaestroClienteServices) {
    this.buscarProductos(); 
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
     this.prdService.getProductosPorNombre( this.textFindProductos ,[0,30] ).subscribe(

      {next :
       (respuesta:any)=>{
         if (respuesta.error === 'ok'){
            if (respuesta.numdata > 0 ){
              const productos = respuesta.productos; 
              console.log('producto general' , productos)
              this.listPrdBusqueda = productos   
            }else{ 
              Swal.fire(  "error",  'la busqueda no genero ningun resultado', "error" );
               } 
          }else{ 
            Swal.fire(  "error", respuesta.error , "error"); 
          } 
          console.log('getProductosPorFiltro',JSON.stringify(respuesta));
         
         
          } , error:    error => { this.loading.hide();  
                    Swal.fire(  "error", error , "error"); 
          },complete:()=>  this.loading.hide() }
     );
    }
   buscarProductos(){
    console.log('busqueda productos inicial' ); 
     this.loading.show() 
     this.listPrdBusqueda = [];
     this.prdService.getProductosGeneral([0,30]).subscribe({
      next :  (respuesta:any)=>{
         if (respuesta.error === 'ok'){
            if (respuesta.numdata > 0 ){ 
              const productos = respuesta.productos; 
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
   buscarPorCategoria(categoria:dfltAnswOdoo2){
    this.listPrdBusqueda = []; 
      this.loading.show() 
      this.prdService.getProductosPorCategoria(categoria.dato ).subscribe(
        (respuesta:any)=>{
          if (respuesta.error === 'ok'){
             if (respuesta.numdata > 0 ){ 
               this.listPrdBusqueda = respuesta.productos?? [] ;   
             }else{Swal.fire(  "error", 'no existen productos con la categoria '+ categoria.label) 
                } 
           }else{
             Swal.fire(  "error", respuesta.error);
           } 
           console.log('buscarPorCategoria',JSON.stringify(respuesta));
           this.loading.hide();
          
           },
           error => {this.loading.hide();
             Swal.fire(  "error",  error.error.error);
           } 
      );
     }
     enviarProducto(prd:ProductoModel){
      this.respuestaDialog.confirmado = true;
      this.respuestaDialog.datoDevolucion = prd;

      this.dialogo.close(this.respuestaDialog);
     }
   buscarPorMarca(marca:dfltAnswOdoo2){
     
    this.listPrdBusqueda = [];
    console.log('marca' , marca);
    this.loading.show() 
      this.prdService.getProductosPorMarca(marca.dato ).subscribe( {
        next:
        (respuesta:any)=>{
          if (respuesta.error === 'ok'){
             if (respuesta.numdata > 0 ){
                this.listPrdBusqueda = respuesta.productos?? [] ;  
             }else{Swal.fire(  "error", 'no existen productos de la marca '+ marca.label) 
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
   //BUSCAR_MARCAS
   
   getCategorias(){ 
    this.MaestroClienteServices.setCategoriasPrd().subscribe((datos:any)=>{
       console.log('setCategoriasPrd' , JSON.stringify(datos));
      this.loading.show()
      this.categorias = [];
      
      datos.data!.forEach((value:any )=>{  
        this.categorias.push({
          "dato": value.id,
          "label":value.nombre,
          "color":value.color,
          "display":true
        })  
    
      })       
      this.categoriasAux = this.categorias ;
      this.loading.hide() ;
     // console.log('categorias',this.categorias);
    });

  }
  getMarcas(){ 
    this.MaestroClienteServices.setMarcas().subscribe((datos:any)=>{
       console.log('setMarcas ODDO' , JSON.stringify(datos));
      this.loading.show()
      this.marcas = [];
      datos.data!.forEach((value:any,index:number)=>{ 
        this.marcas.push({
          "dato": value.id,
          "label":value.nombre,
          "color":value.color,
          "display":true
        })  
    
      }) 
      this.marcasAux = this.marcas;
      // console.log(this.categorias);
      
      this.loading.hide() ;
    });

  }
  getMarcasPorFiltro()
  {
    //this.marcasAux = this.marcas;
    let marcas3 : dfltAnswOdoo2[] = [];
    let cont = 0;
    let auxTxt = this.textFindMarcas.trim().toUpperCase();
    if (  auxTxt === '')
     { this.marcas = this.marcasAux} 
     else{

      this.marcas!.forEach( ( value:dfltAnswOdoo2) =>{
        console.log(value.label,value.label.indexOf(auxTxt));
        
        if ( value.label.toUpperCase() === auxTxt || value.label.toUpperCase().indexOf(auxTxt) >= 0){
        // console.log(cont,value);
         
          marcas3[cont] = value ; 
          cont++;
        }
      })
     // console.log(marcas3);
      this.marcas = marcas3;
     }
  }

  
  getCaterogiasPorFiltro()
  {
    //this.marcasAux = this.marcas; 
    let cont = 0;
    let auxTxt = this.textFindCategoria.trim().toUpperCase();
    if (  auxTxt === '')
     { this.categorias = this.marcasAux} 
     else{
      this.marcas = this.marcas.filter(value => {( value.label.toUpperCase() === auxTxt || value.label.toUpperCase().indexOf(auxTxt) >= 0)})
      
     }
  }
 
}
