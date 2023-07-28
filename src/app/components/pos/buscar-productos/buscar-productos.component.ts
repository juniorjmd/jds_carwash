import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { productoDocumento } from 'src/app/interfaces/clientes-odoo';
import { select } from 'src/app/interfaces/generales.interface';
import { errorOdoo, OdooPrd } from 'src/app/interfaces/odoo-prd';

import { loading } from 'src/app/models/app.loading';
import { ProductoModule } from 'src/app/models/producto/producto.module';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-buscar-productos',
  templateUrl: './buscar-productos.component.html',
  styleUrls: ['./buscar-productos.component.css']
})
export class BuscarProductosComponent implements OnInit {
  parceros : ProductoModule[] = [];
  prdBusqueda !:ProductoModule   ;
  codPrd:string ;  
  show = false ;
  show_reemplazo = false;
  cantidadPrd:number ;  
  disabled:boolean[]
  constructor(   private prdService : ProductoService,
    
    public dialogo: MatDialogRef<BuscarProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public codPrdInser:productoDocumento,
      
    public loading : loading) { 

      console.log('codPrdInser' , this.codPrdInser);
      
      this.cantidadPrd = 0 ;
      this.codPrd =  codPrdInser.idproducto ;
      this.buscarProducto();
      this.disabled = [true,true,true,true,true,true,true,true,true,true];
    }

  ngOnInit(): void {
  }
  addCnt(cnt:number){
    this.cantidadPrd += cnt ;
    if (this.prdBusqueda.cantidad! < this.cantidadPrd){
       this.cantidadPrd =  this.prdBusqueda.cantidad! ;
    }
  }

  enviarCnt( cnt:number ){
    this.disabled = [true, true, true, true, true, true, true, true, true, true];
    this.cantidadPrd  += cnt ;
    if ( this.cantidadPrd > 0 && this.prdBusqueda.cantidad! >= this.cantidadPrd){  
            this.prdBusqueda.cantidadVendida = this.cantidadPrd;
            this.loading.show() 
            this.prdService.guardarPrdCompra(this.prdBusqueda ,  this.codPrdInser.documento! ).subscribe(
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

   
   buscarProducto(){
    this.loading.show() 
    this.prdService.getProductosCodBarrasVCnt(this.codPrd , this.codPrdInser.documento!.caja! ).subscribe(
      (respuesta:any)=>{  
        if (respuesta.error === 'ok'){
           if (respuesta.numdata > 0 ){
           this.prdBusqueda =  respuesta.data[0] ; 
           console.log('busqueda producto : ',this.prdBusqueda);
           if(this.prdBusqueda.cantidad! >= 10 ){
            this.disabled = [false ,false ,false ,false ,false ,false ,false ,false ,false ,false ];
           }else{
             switch (this.prdBusqueda.cantidad ){
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
                this.disabled = [true, true, true, true, true, true, true, true, true, false ];
              break;
             }  
            
           }
           this.parceros = respuesta.prodReemplazo ;
          this.show = true;  

           }else{alert('la busqueda no genero ningun resultado')
               this.dialogo.close(true);
              }

          /****** */
           
          //this.dialogo.close(true);
         }else{
           alert(respuesta.error);
         }  
         this.loading.hide();
        
         },
         error => {this.loading.hide();
           alert( error.error.error);
         } 
    );
   }

}
