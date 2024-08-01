import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { categoriaRequest, clienteRequest, DescuentoRequest, marcaRequest, ProductoRequest } from 'src/app/interfaces/producto-request';
import { CategoriasModel } from 'src/app/models/categorias.model';
import { ClientesModel } from 'src/app/models/clientes/clientes.module';
import { DescuentoModule } from 'src/app/models/descuento/descuento.model';
import { MarcasModel } from 'src/app/models/marcas/marcas.module';
import { ProductoModel } from 'src/app/models/producto/producto.module';
import { ActiDescuentoService } from 'src/app/services/actiDescuento.service';
import Swal from 'sweetalert2';
import { FindProductosComponent } from '../../../modals/findProductos/findProductos.component';
import { FindCategoriasComponent } from '../../../modals/findCategorias/findCategorias.component';
import { FindMarcasComponent } from '../../../modals/findMarcas/findMarcas.component';
import { ModalFndClienteComponent } from '../../../modals/modalFndCliente/modalFndCliente.component';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent {
  descuentos:DescuentoModule[] = []
  productos:ProductoModel[] = []
  categorias:CategoriasModel[] = []
  marcas:MarcasModel[] = []
  clientes:ClientesModel[] = []
  showprd = false
  showcat = false
  showmar = false
  showcli = false
  private actividadService =  inject(ActiDescuentoService)
  private newAbrirDialog = inject(MatDialog)
  private fb=  inject(FormBuilder );
  actividadForm: FormGroup;
  constructor() {

  console.log('entro primero aqui en CrearActividadComponent');
  this.iniciaCat();
  this.iniciaCli();
  this.iniciaMar();
  this.iniciaPrd(); 
  this.iniciaDescuentos();
  this.getTmpCategorias();
  this.getTmpClientes();
  this.getTmpMarcas();
  this.getTmpProductos();

this.actividadForm = this.fb.group({
  nombre: ['', Validators.required],
  descripcion: ['', Validators.required],
  fechaInicial: ['', Validators.required],
  fechaFinal: ['', Validators.required],
  tipo: ['', Validators.required],
  estado: [1, Validators.required],
  idDescuento: [null, Validators.required]
});
  } 

  iniciaPrd(){ 
  this.actividadService.getProductosDisponibles().subscribe({next : (value:ProductoRequest)=>{
    console.log('getProductosDisponibles',value); 
    this.actividadService.setArrayProductos(value.data)
  }})
  }
  iniciaCat(){ 
    this.actividadService.getCategoriasDisponibles().subscribe({next : (value:categoriaRequest)=>{
    this.actividadService.setArrayCategorias(value.data)
  }})}
  iniciaMar(){
    this.actividadService.getClientesDisponibles().subscribe({next : (value:clienteRequest)=>{
      this.actividadService.setArrayClientes(value.data)
    }})}
  iniciaCli(){
    this.actividadService.getMarcasDisponibles().subscribe({next : (value:marcaRequest)=>{
      this.actividadService.setArrayMarcas(value.data)
    }})}
 iniciaDescuentos(){ 
  this.actividadService.getDescuentos().subscribe({next : (value:DescuentoRequest)=>{
    this.descuentos = value.data??[]
  }})
 }


  abrirBusqueda(){
    if (this.showprd) {
      this.newAbrirDialog.open(FindProductosComponent, { data:  null })
      .afterClosed()
      .pipe(
        tap((confirmado: Boolean) => {
       
        })
      ).subscribe({
        next: () => {},
        error: (error) => console.error('Error:', error),
        complete: () =>{ console.log('moverDocumentoCaja completo'); 
          this.iniciaDescuentos();
          this.getTmpProductos();
        }
      });  
    } 
    if (this.showcat) {
      this.newAbrirDialog.open(FindCategoriasComponent, { data:  null })
      .afterClosed()
      .pipe(
        tap((confirmado: Boolean) => {
          if (confirmado) {   
  this.iniciaDescuentos();
          }
        })
      ).subscribe({
        next: () => {},
        error: (error) => console.error('Error:', error),
        complete: () => console.log('moverDocumentoCaja completo')
      });  
    }
    if (this.showmar) {
      this.newAbrirDialog.open(FindMarcasComponent, { data:  null })
      .afterClosed()
      .pipe(
        tap((confirmado: Boolean) => {
          if (confirmado) {  
  this.iniciaDescuentos();
          }
        })
      ).subscribe({
        next: () => {},
        error: (error) => console.error('Error:', error),
        complete: () => console.log('moverDocumentoCaja completo')
      });  
      
    } 
    if (this.showcli) {
      this.newAbrirDialog.open(ModalFndClienteComponent, { data:  null })
      .afterClosed()
      .pipe(
        tap((confirmado: Boolean) => {
          if (confirmado) {   
            this.iniciaDescuentos();
          }
        })
      ).subscribe({
        next: () => {},
        error: (error) => console.error('Error:', error),
        complete: () => console.log('moverDocumentoCaja completo')
      });  
      
    } 
  }
  eliminarPrdTemp(id:any){
    this.actividadService.deleteProducto(id).subscribe({next:(value)=>{
      this.iniciaPrd();
      this.getTmpProductos();
    }})
  }
  cambiarListado(){
    this.showprd = false
    this.showcat = false
    this.showmar = false
    this.showcli = false

    const tipo = this.actividadForm.get('tipo')?.value;
    this.showprd = tipo === 'PRD';
    this.showcat = tipo === 'CAT';
    this.showmar = tipo === 'BRD';
    this.showcli = tipo === 'CLI';
  }

onSubmitActividad() {
  if (this.actividadForm.valid) { 

    if (this.showprd  && this.productos.length == 0) {
      Swal.fire('error' , 'Debe escoger minimo un producto al cual aplicarle el descuento' , 'info')
      return;

    } 
    if (this.showcat  && this.categorias.length == 0) {
      Swal.fire('error' , 'Debe escoger minimo una categoria a la cual aplicarle el descuento' , 'info')
      return;} 
    if (this.showmar && this.marcas.length == 0) {
      Swal.fire('error' , 'Debe escoger minimo una marca a la cual aplicarle el descuento' , 'info')
        return;} 
    if (this.showcli   && this.clientes.length == 0) {
      Swal.fire('error' , 'Debe escoger minimo un cliente al cual aplicarle el descuento' , 'info')
          return;} 

          this.actividadService.createDescuentoActividad(this.actividadForm.value).subscribe(response => {
      console.log('Descuento actividad creado:', response);
    });
  }
}

getTmpCategorias(){ 
  this.actividadService.getCategoriaActividadTmp().subscribe({next : (value:categoriaRequest)=>{
    this.categorias = value.data??[]
  }})
 }
 getTmpMarcas(){ 
  this.actividadService.getMarcaActividadTmp().subscribe({next : (value:marcaRequest)=>{
    this.marcas = value.data??[]
  }})
 }
 getTmpClientes(){ 
  this.actividadService.getClienteActividadTmp().subscribe({next : (value:clienteRequest)=>{
    this.clientes = value.data??[]
  }})
 }
 getTmpProductos(){ 
  this.actividadService.getProductosActividadTmp().subscribe({next : (value:ProductoRequest)=>{
    this.productos = value.data??[]
  }})
 }




}
