import { Component } from '@angular/core';
import { MaestroClienteServices } from '../../../../services/MaestroCliente.services';
import { loading } from 'src/app/models/app.loading';
import { dfltAnswOdoo2 } from 'src/app/interfaces/clientes-odoo'; 
import { ProductoService } from 'src/app/services/producto.service';
import { responsePrd } from 'src/app/interfaces/odoo-prd';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductoModule } from 'src/app/models/producto/producto.module';
@Component({ 
  selector: 'app-buscar-prod-directo',
  templateUrl: './buscar-prod-directo.component.html',
  styleUrls: ['./buscar-prod-directo.component.css']
})
export class BuscarProdDirectoComponent  {
  show = false ;
  textFindMarcas:string = '';
  textFindProductos:string = '';
  parceros : ProductoModule[] = [];
  prdBusqueda !:ProductoModule   ;
  listPrdBusqueda :ProductoModule[] = [];
  respuestaDialog:responsePrd = {  "confirmado": false, 
  "datoDevolucion":this.listPrdBusqueda[0]};
  codPrd!:string ;   
  cantidadPrd!:number ;  
  disabled:boolean[] = []
  //--------------------
  marcas:dfltAnswOdoo2[]=[];
  marcasAux:dfltAnswOdoo2[] = [];
  categorias:dfltAnswOdoo2[] = [];
  constructor(public loading : loading ,public dialogo: MatDialogRef<BuscarProdDirectoComponent>
    , private prdService : ProductoService,
    private MaestroClienteServices :MaestroClienteServices) {
    this.buscarProductos();
    this.getCategorias();
    this.getMarcas();
   }
   getProductosPorFiltro(){
    console.log('busqueda productos inicial' ); 
     this.loading.show() 
     this.listPrdBusqueda = [];
     this.prdService.getProductosPorNombre( this.textFindProductos ,[0,30] ).subscribe(
       (respuesta:any)=>{
         if (respuesta.error === 'ok'){
            if (respuesta.numdata > 0 ){
              this.listPrdBusqueda =  respuesta.data;
  
            }else{alert('la busqueda no genero ningun resultado') 
               } 
          }else{
            alert(respuesta.error);
          } 
          console.log('getProductosPorCategoria',JSON.stringify(respuesta));
          this.loading.hide();
         
          },
          error => {this.loading.hide();
            alert( error.error.error);
          } 
     );
    }
   buscarProductos(){
    console.log('busqueda productos inicial' ); 
     this.loading.show() 
     this.listPrdBusqueda = [];
     this.prdService.getProductosGeneral([0,30]).subscribe(
       (respuesta:any)=>{
         if (respuesta.error === 'ok'){
            if (respuesta.numdata > 0 ){
              this.listPrdBusqueda =  respuesta.data;
  
            }else{alert('la busqueda no genero ningun resultado') 
               } 
          }else{
            alert(respuesta.error);
          } 
          console.log('getProductosPorCategoria',JSON.stringify(respuesta));
          this.loading.hide();
         
          },
          error => {this.loading.hide();
            alert( error.error.error);
          } 
     );
    }
   buscarPorCategoria(categoria:dfltAnswOdoo2){
    this.listPrdBusqueda = [];
     console.log('categoria' , categoria); 
      this.loading.show() 
      this.prdService.getProductosPorCategoria(categoria.dato ).subscribe(
        (respuesta:any)=>{
          if (respuesta.error === 'ok'){
             if (respuesta.numdata > 0 ){
              respuesta.data!.forEach((value:any,index:number) => {  
                this.listPrdBusqueda[index] = value ;  
              }); 
   
             }else{alert('no existen productos con la categoria '+ categoria.label) 
                } 
           }else{
             alert(respuesta.error);
           } 
           console.log('getProductosPorCategoria',JSON.stringify(respuesta));
           this.loading.hide();
          
           },
           error => {this.loading.hide();
             alert( error.error.error);
           } 
      );
     }
     enviarProducto(prd:ProductoModule){
      this.respuestaDialog.confirmado = true;
      this.respuestaDialog.datoDevolucion = prd;

      this.dialogo.close(this.respuestaDialog);
     }
   buscarPorMarca(marca:dfltAnswOdoo2){
     
    this.listPrdBusqueda = [];
    console.log('marca' , marca);
    this.loading.show() 
      this.prdService.getProductosPorMarca(marca.dato ).subscribe(
        (respuesta:any)=>{
          if (respuesta.error === 'ok'){
             if (respuesta.numdata > 0 ){

              respuesta.data!.forEach((value:any,index:number) => { 
                this.listPrdBusqueda[index] = value ;  
              }); 
   
             }else{alert('no existen productos de la marca '+ marca.label) 
                } 
           }else{
             alert(respuesta.error);
           } 
           console.log('getProductosPorMarca',JSON.stringify(respuesta));
           this.loading.hide();
          
           },
           error => {this.loading.hide();
             alert( error.error.error);
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
        console.log('getCategorias',value); 
        this.categorias.push({
          "dato": value.id,
          "label":value.nombre,
          "color":value.color,
          "display":true
        })  
    
      })       
      this.loading.hide() ;
      console.log('categorias',this.categorias);
    });

  }
  getMarcas(){ 
    this.MaestroClienteServices.setMarcas().subscribe((datos:any)=>{
       console.log('setMarcas ODDO' , JSON.stringify(datos));
      this.loading.show()
      this.marcas = [];
      datos.data!.forEach((value:any,index:number)=>{
        console.log('value' , value,'index',index);
        
       /* this.categorias[index].dato = value.id;
        this.categorias[index].label = value.display_name;*/
        this.marcas.push({
          "dato": value.id,
          "label":value.nombre,
          "color":value.color,
          "display":true
        })  
    
      }) 
      this.marcasAux = this.marcas;
      console.log(this.categorias);
      
      this.loading.hide() ;
    });

  }
  getMarcasPorFiltro(){
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
 
}
