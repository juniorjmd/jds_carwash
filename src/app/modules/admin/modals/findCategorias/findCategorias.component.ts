import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { error } from 'jquery';
import { CategoriasModel } from 'src/app/models/categorias.model';
import { ProductoModel } from 'src/app/models/producto/producto.module';
import { ActiDescuentoService } from 'src/app/services/actiDescuento.service';

@Component({
  selector: 'app-find-categorias',  
  templateUrl: './findCategorias.html',
  styleUrls: ['./findCategorias.component.css'], 
})
export class FindCategoriasComponent { 
  
  private actividadService =  inject(ActiDescuentoService)
  public categorias:CategoriasModel[] = [];
  public categoriasFiltrados:CategoriasModel[] = [];
  filtroName:string = ''

  ngOnInit(): void { 
    this.actividadService.arrayCategorias.subscribe({next:(prd)=>{
      this.categorias = [...prd??[]]; 
      //console.log('oninit filtroname',this.filtroName); 
      if(this.filtroName == '') {this.categoriasFiltrados = [...this.categorias];}  
          }})
  } 
  enviarProducto(item:CategoriasModel){
    //console.log(item); 
    let id:number = (typeof( item.id ) == 'string')? parseInt(item.id!) :item.id! ;  
    if(!item.selected){
      this.actividadService.setCategoria(id).subscribe({next:val=>{
        item.selected= true; 
        this.marcarCategoriaYDescendientes(item, true);
      }})
    }else{ 
      this.actividadService.deleteCategoria(id) .subscribe({next:val=>{  
        item.selected= false; 
        this.marcarCategoriaYDescendientes(item, false);
      },error:error=>console.error(error.error.error)
      })
   
  }
 }

 private marcarCategoriaYDescendientes(item: CategoriasModel, seleccionado: boolean) {
  item.selected = seleccionado;
  const hijos = this.categorias.filter((x: CategoriasModel) => x.idPadreCategoria === item.id);
  hijos.forEach((hijo) => { 
    let id:number = (typeof( hijo.id ) == 'string')? parseInt(hijo.id!) :hijo.id! ; 
    if (seleccionado) {
      this.actividadService.setCategoria( id).subscribe({
        next: () => {
          this.marcarCategoriaYDescendientes(hijo, true);
        },
        error: (error) => console.error(error.error.error),
      });
    } else {
      this.actividadService.deleteCategoria(id).subscribe({
        next: () => {
          this.marcarCategoriaYDescendientes(hijo, false);
        },
        error: (error) => console.error(error.error.error),
      });
    }
  });
}




    filtrarPorNombre( ) {

      this.categoriasFiltrados = [...this.categorias??[]].filter(x => (        
        x.nombre.toLowerCase().includes(this.filtroName.toLowerCase())  
      
      )
  ); 
      if(this.categoriasFiltrados.length == 0){

       this.busquedaFiltradoPorNombre()
      } 
  }

  busquedaFiltradoPorNombre(){ 
      this.actividadService.
      getCategoriasDisponiblesByName(this.filtroName)
      .subscribe({next:(value)=>{ 
        //console.log('resultado busqueda' , value);
        
        if(value.numdata > 0) { 
          //console.log('termina la busqueda');
          
          this.categoriasFiltrados = value.data;
          const nuevosProductos = value.data.filter((nuevoProducto: CategoriasModel) => 
            !this.categorias.some(producto => producto.id === nuevoProducto.id)
          ); 
          this.actividadService.setArrayCategorias( [...this.categorias, ...nuevosProductos] );
          //console.log('busqueda categorias',this.categoriasFiltrados);
          
        }
      }})
    
  }
}
