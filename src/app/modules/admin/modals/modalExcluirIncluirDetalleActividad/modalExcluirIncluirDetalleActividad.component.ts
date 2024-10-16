
import { ChangeDetectionStrategy, Component, Inject, inject, type OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from 'jquery';
import { ProductoRequest } from 'src/app/interfaces/producto-request';
import { ActividadesDescuentoModel } from 'src/app/models/actividadesDescuentoModel';
import { ProductoModel } from 'src/app/models/producto/producto.module';
import { ActiDescuentoService } from 'src/app/services/actiDescuento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'modal-inout-detalle-actividad', 
  templateUrl: './modalExcluirIncluirDetalleActividad.component.html',
  styleUrls: ['./modalExcluirIncluirDetalleActividad.component.css'] 
})
export class ModalInOutDetalleActividad  {
  
  private actividadService =  inject(ActiDescuentoService)
  public productos:ProductoModel[] = [];
  public productosFiltrados:ProductoModel[] = [];
  filtroName:string = '' ;

  constructor(
    @Inject(MAT_DIALOG_DATA) public actividad:ActividadesDescuentoModel ){
      this.actividadService.getProductosActividad(actividad.id).subscribe({next:(value:ProductoRequest)=>{ 
        //CustomConsole.log(value);
        
        this.productos = [...value.data??[]];  
        this.productosFiltrados = [...this.productos]; 
      },error:error=>Swal.fire(error.error.error)
      })
    }

    
  
  enviarProducto(item:ProductoModel){
    let id:string = (typeof( item.id ) == 'string')? item.id! :item.id!.toString() ;
    if(item.selected){ 
      this.actividadService.excluirProducto(id ,this.actividad.id).subscribe({next:val=>{
        item.selected= false;
      }})
    }else{
       this.actividadService.quitarDeExcluidoProducto(id , this.actividad.id ) .subscribe({next:val=>{
        item.selected= true;
      }})
   
  }
 }
    filtrarPorNombre( ) {

      this.productosFiltrados = [...this.productos??[]].filter(x => (        
        x.nombre.toLowerCase().includes(this.filtroName.toLowerCase()) || 
        x.nombre2?.toLowerCase().includes(this.filtroName.toLowerCase()) ||
        x.nombre3?.toLowerCase().includes(this.filtroName.toLowerCase())
      
      )
  ); 
  }
 
}