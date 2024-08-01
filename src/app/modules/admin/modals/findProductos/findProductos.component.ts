import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto/producto.module';
import { ActiDescuentoService } from 'src/app/services/actiDescuento.service';

@Component({
  selector: 'app-find-productos', 
  templateUrl: './findProductos.html',
  styleUrls: ['./findProductos.component.css'], 
})
export class FindProductosComponent implements OnInit {
  
  private actividadService =  inject(ActiDescuentoService)
  public productos:ProductoModel[] = [];
  public productosFiltrados:ProductoModel[] = [];
  filtroName:string = ''

  ngOnInit(): void { 
    this.actividadService.arrayProductos.subscribe({next:(prd)=>{
      this.productos = [...prd??[]]; 
      console.log('oninit filtroname',this.filtroName); 
      if(this.filtroName == '') {this.productosFiltrados = [...this.productos];}
      
      
          }})
  } 
  enviarProducto(item:ProductoModel){
    let id:string = (typeof( item.id ) == 'string')? item.id! :item.id!.toString() ;
    if(!item.selected){
      item.selected= true;
      this.actividadService.setProducto(id).subscribe({next:val=>{
        item.selected= true;
      }})
    }else{
      
      this.actividadService.deleteProducto(id  ) .subscribe({next:val=>{
        item.selected= false;
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
      if(this.productosFiltrados.length == 0){
       this.busquedaFiltradoPorNombre()
      } 
  }

  busquedaFiltradoPorNombre(){ 
      this.actividadService.
      getProductosDisponiblesByName(this.filtroName)
      .subscribe({next:(value)=>{ 
        if(value.numdata > 0) { 
          console.log('termina la busqueda');
          
          this.productosFiltrados = value.data;
          const nuevosProductos = value.data.filter((nuevoProducto: ProductoModel) => 
            !this.productos.some(producto => producto.id === nuevoProducto.id)
          ); 
          this.actividadService.setArrayProductos( [...this.productos, ...nuevosProductos] );
          console.log('busqueda productos',this.productosFiltrados);
          
        }
      }})
    
  }
}
