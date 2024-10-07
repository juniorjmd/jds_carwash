import { Component,  OnInit } from '@angular/core'; 
import Swal from 'sweetalert2'; 
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'; 
import { Inventario } from 'src/app/interfaces/nInterfaces/inventario';
import { Categoria } from 'src/app/interfaces/nInterfaces/categoria';
import { CategoriasService } from 'src/app/services/nServices/categorias.service';
import { ExecuteService } from 'src/app/services/nServices/execute.service';
import { InventarioService } from 'src/app/services/nServices/inventario.service';
 

@Component({
  templateUrl: './modal-crear-inventario.component.html',
  styleUrls: ['./modal-crear-inventario.component.css']
})
export class ModalCrearInventarioComponent  implements OnInit {
  
  categorias!: Categoria[] ;// Aquí debes obtener las categorías reales desde el servidor
  marcas: string[] = ['Marca 1', 'Marca 2', 'Marca 3']; // Aquí debes obtener las marcas reales desde el servidor
  proveedores: string[] = ['Proveedor 1', 'Proveedor 2', 'Proveedor 3']; // Aquí debes obtener los proveedores reales desde el servidor

  formData:Inventario = {
    
    id: 0 ,
     id_tipo: 0,
    id_categoria : 0 ,
    id_marca : 0 ,
    id_proveedor: 0 ,
    nombre: '',
    descripcion: '', 
    estado: 'SAP',
  };
   
  datosTipo = [
   { id : 0 , 
    text : 'Seleccione Tipo'},
    { id : 1 , 
      text : 'Total'},
      { id : 2 , 
        text : 'Por categoría'},
        { id : 3 , 
          text : 'Por marca'},
          { id : 4 , 
            text : 'Por proveedor'}
      
  ];
 
  constructor(   private modalService: BsModalService ,private _CategoriaService : CategoriasService , private executeService : ExecuteService , private inventarioService:InventarioService
      ){}

  submitForm(){

this.inventarioService.setInventarios(this.formData).subscribe({
  next:(request)=>{
    //console.log('request inventario' , request);
    
    this.executeService.optenerListadoInventarios$.next(true);
    this.modalService.hide();
  } , 
  error:(error)=>{
    console.error(error);
    
    Swal.fire({title:'Error al crear el inventario' , text: error.error.message, icon : 'error'});
  }

})

   
  } 
 
  cancelar(){
   // this.executeService.cerrarModalInventario$.next(true);
    this.executeService.optenerListadoInventarios$.next(false);
    this.modalService.hide();

} 


  onCategoriaSeleccionada(id:any){
    this.formData.id_categoria = id; 
    this.formData.id_marca = 0; 
    this.formData.id_proveedor = 0; 
      console.error('esto es lo que se recibe del componente hijo categoria', id); 
  } 

  onMarcaSeleccionada(id:any){
    this.formData.id_categoria = 0; 
    this.formData.id_marca = id; 
    this.formData.id_proveedor = 0; 
      console.error('esto es lo que se recibe del componente hijo marca', id); 
  } 
  onProveedorSeleccionado(id:any){
    this.formData.id_categoria = 0; 
    this.formData.id_marca = 0; 
    this.formData.id_proveedor = id; 
      console.error('esto es lo que se recibe del componente hijo proveedor', id); 
  } 
  getCategorias(){
    this._CategoriaService.getCategorias().subscribe(
      {next:(resoult)=>{
        this.categorias =resoult
      },
      error:(error)=>{Swal.fire('error', error , 'error')}}
    )
  }
  ngOnInit() {
    // Asignamos la fecha actual al campo de fecha de creación 
    this.formData.fechaCreacion = new Date();
   this.getCategorias();
   this.executeService.optenerListadoInventarios$.next(false);
  }
}
