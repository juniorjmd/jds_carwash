import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
import { error } from 'jquery';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent  implements OnInit{
  descuentos:DescuentoModule[] = [];
  productos:ProductoModel[] = [];
  categorias:CategoriasModel[] = [];
  marcas:MarcasModel[] = [];
  clientes:ClientesModel[] = [];
  fechaInicial: string = '';
  showprd = false;
  showcat = false;
  showmar = false;
  showcli = false;
  private actividadService =  inject(ActiDescuentoService);
  private newAbrirDialog = inject(MatDialog);
  private fb=  inject(FormBuilder );
  actividadForm: FormGroup;
  constructor() {  
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
  

  ngOnInit() {
    // Escuchar cambios en la fecha inicial
    this.actividadForm.get('fechaInicial')?.valueChanges.subscribe(value => {
      this.fechaInicial = value;
      // Establecer el valor mínimo de fechaFinal basado en fechaInicial
      this.actividadForm.get('fechaFinal')?.setValidators([Validators.required, this.minDateValidator(this.fechaInicial)]);
      this.actividadForm.get('fechaFinal')?.updateValueAndValidity();
    });
  }

  minDateValidator(minDate: string): ValidatorFn  {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      return new Date(control.value) >= new Date(minDate) ? null : { minDate: { value: control.value } };
    };
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
  iniciaCli(){
    this.actividadService.getClientesDisponibles().subscribe({next : (value:clienteRequest)=>{
      this.actividadService.setArrayClientes(value.data)
    }})}
  
  iniciaMar(){
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
        complete: () =>{ console.log('FindProductosComponent completo'); 
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
        })
      ).subscribe({
        next: () => {},
        error: (error) => console.error('Error:', error),
        complete: () =>{ console.log('FindCategoriasComponent completo'); 
          this.iniciaDescuentos();
          this.getTmpCategorias();
        }
      });  
    }
    if (this.showmar) {
      this.newAbrirDialog.open(FindMarcasComponent, { data:  null })
      .afterClosed()
      .pipe(
        tap((confirmado: Boolean) => {
          
        })
      ).subscribe({
        next: () => {},
        error: (error) => console.error('Error:', error),
        complete: () => { console.log('FindCategoriasComponent completo'); 
          this.iniciaDescuentos();
          this.getTmpMarcas();
        }
      });  
      
    } 
    if (this.showcli) {
      this.newAbrirDialog.open(ModalFndClienteComponent, { data:  null })
      .afterClosed()
      .pipe(
        tap((confirmado: Boolean) => { 
        })
      ).subscribe({
        next: () => {},
        error: (error) => console.error('Error:', error),
        complete: () => { console.log('FindCategoriasComponent completo'); 
          this.iniciaDescuentos();
          this.getTmpClientes();
        }
      });  
      
    } 
  }
  eliminarPrdTemp(id:any){
    const tipo = this.actividadForm.get('tipo')?.value;
    this.actividadService.deleteItemDescuentoTmp(id ,tipo ).subscribe({next:(value)=>{
     if( this.showprd  ) {
      this.iniciaPrd();
      this.getTmpProductos();
     }
     if( this.showcat   ) {
      this.iniciaCat();
      this.getTmpCategorias();
     }
     if( this.showmar  ) {
      this.iniciaMar();
      this.getTmpMarcas();
     }
     if( this.showcli  ) {
      this.iniciaCli();
      this.getTmpClientes();
     }
    
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

          this.actividadService.createDescuentoActividad(this.actividadForm.value).subscribe({next:(response:any) => {
      console.log('Descuento actividad creado:', response);
      if(response.error == 'ok'){
        if(this.showprd ) this.getTmpProductos()
        if( this.showcat ) this.getTmpCategorias()
        if( this.showmar  ) this.getTmpMarcas()
        if( this.showcli ) this.getTmpClientes() 
      } },error:error=>console.error(error.error.error) }   );
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
