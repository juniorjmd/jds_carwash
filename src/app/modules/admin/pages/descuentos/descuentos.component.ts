import { Component, inject } from '@angular/core';
import { error } from 'jquery';
import { DescuentoRequest } from 'src/app/interfaces/producto-request';
import { DescuentoModule } from 'src/app/models/descuento/descuento.model';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-descuentos',
  templateUrl: './descuentos.component.html',
  styleUrls: ['./descuentos.component.css']
})
export class DescuentosComponent {
   descuentos:DescuentoModule[]=[];
   private productoService= inject(ProductoService);
   public newDesc:DescuentoModule =  new DescuentoModule();
  constructor(){
    this.getDescuentos()
  }

  eliminar(){
    
  }
   editar( ){  
        this.productoService.setDescuento(this.newDesc).subscribe({next:(value:any)=>{
          console.log(value);
          if (value.error != undefined && value.error == 'ok'){ 
            this.newDesc =  new DescuentoModule();
            this.getDescuentos();
          } else{
            Swal.fire('error','error en la generacion del descuento','error')
          }
        },error:error=>console.error(error.error.error)
        })

   }
   setEditar(item:DescuentoModule ){
   this.newDesc  = {...item} 

   }

   getDescuentos(){
    this.productoService.getDescuentos().subscribe({next:(value:DescuentoRequest)=>{
      if(value.numdata > 0){
        this.descuentos =  value.data;
      }
    }})
   }
}
