import { Component, inject } from '@angular/core';
import { DescuentoRequest } from 'src/app/interfaces/producto-request';
import { DescuentoModule } from 'src/app/models/descuento/descuento.model';
import { ProductoService } from 'src/app/services/producto.service';

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

   editar( ){  
        this.productoService.setDescuento(this.newDesc).subscribe({next:value=>{
          console.log(value); 
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
