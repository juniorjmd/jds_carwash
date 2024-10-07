import { UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { responseSubC } from 'src/app/interfaces/odoo-prd';
import { CategoriasModel } from 'src/app/models/categorias.model';
import { ProductoService } from 'src/app/services/producto.service';
import { ModalCntSubCuentasComponent } from '../cuentasContables/cnt-sub-cuentas.component';
import { tap } from 'rxjs';
import { loading } from 'src/app/models/app.loading';
import { categoriaRequest } from 'src/app/interfaces/producto-request';
import Swal from 'sweetalert2';
 

@Component({
  selector: 'modal-admin-categorias',
  templateUrl: './admin-categorias.component.html',
  styleUrls: ['./admin-categorias.component.css']
})
export class AdminCategoriasComponent implements OnInit {
  categoriaForm?: FormGroup;
  private fb = inject( FormBuilder );
private prdService = inject(ProductoService); 
private newAbrirDialog =  inject(MatDialog)
private loading= inject(loading)  
private dialogo= inject(MatDialogRef<AdminCategoriasComponent>);

categorias: CategoriasModel[] = []; 
newCateg: CategoriasModel =  new CategoriasModel(null); 
categoriasPadre1: CategoriasModel[] = []; 
categoriasPadre2: CategoriasModel[] = []; 


filtrarPadre2(){
  const padre1Id = this.categoriaForm?.get('categoriaPadre1')?.value;  
  //console.log('padre1Id' , padre1Id)
  let objPadre =    this.categorias.filter(x => x.id == padre1Id)[0];
  //console.log(objPadre)
  this.categoriaForm?.get('cuentaContable')?.setValue( objPadre.NombreCuentaContable);
  this.newCateg.idCuentaContable  = objPadre.idCuentaContable;
  this.categoriasPadre2 = this.categorias.filter(x => x.idPadreCategoria == padre1Id);

}
filtrarPadre3(){
  const padre1Id = this.categoriaForm?.get('categoriaPadre2')?.value;  
  let objPadre =    this.categorias.filter(x => x.id == padre1Id)[0];
  this.categoriaForm?.get('cuentaContable')?.setValue( objPadre.NombreCuentaContable);
  this.newCateg.idCuentaContable  = objPadre.idCuentaContable; 

}
 ngOnInit(): void {
 this.prdService.currentCategorias.subscribe({next:(cat)=>{
    if (cat !== undefined ) {   this.categorias = cat!;
      this.categoriasPadre1 =  this.categorias.filter(x=> x.idPadreCategoria == 0 )
      this.categoriasPadre2 =  this.categorias.filter(x=> x.idPadreCategoria! > 0 )
    }
 }})

  this.categoriaForm = this.fb.group({ 
    letra: ['', Validators.required],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required] ,
    cuentaContable: ['', Validators.required] ,
    categoriaPadre1: [0], // No requerido
    categoriaPadre2: [0]  // No requerido
  });
 }

 
 buscarCuentasContables(){
  this.newAbrirDialog.open(ModalCntSubCuentasComponent, { data:  null })
  .afterClosed() 
  .pipe(
    tap((response: responseSubC) => {
      //console.log('buscarCuentasContables',response);
      if (response.confirmado && response.datoDevolucion !== undefined ) {  
        this.categoriaForm?.get('cuentaContable')?.setValue( response.datoDevolucion.nombre_scuenta);
        this.newCateg.idCuentaContable  = response.datoDevolucion.id_scuenta;
      }  
    })
  ).subscribe({
    next: () => {},
    error: (error) => console.error('Error:', error),
    complete: () =>  console.log('buscarCuentasContables completo')
  }); 
}
  onSubmit(): void {
    if (this.categoriaForm?.valid) {
      //console.log(this.categoriaForm.value);
      let valores:any = this.categoriaForm.value ; 
      this.newCateg.idPadreCategoria = 0;
      if( valores.categoriaPadre2!= undefined && valores.categoriaPadre2 > 0 ){
        this.newCateg.idPadreCategoria = valores.categoriaPadre2;
      }else if( valores.categoriaPadre1!= undefined && valores.categoriaPadre1 > 0 ){
        this.newCateg.idPadreCategoria = valores.categoriaPadre1;
      } 
      if ( this.newCateg.idPadreCategoria! > 0 ){
        let auxPadre =  this.categorias.filter(x=> x.id == this.newCateg.idPadreCategoria)[0]
        this.newCateg.letra = `${auxPadre.letra}${valores.letra}`;
      }else{
        this.newCateg.letra = valores.letra ;
      }
      
      this.newCateg.letra = this.newCateg.letra.toUpperCase();
      this.newCateg.descripcion = valores.descripcion ; 
      this.newCateg.nombre = valores.nombre ; 
      this.newCateg.usuario_creacion = 'USUARIO_LOGUEADO' ;  
      this.newCateg.name_usuario_creacion = undefined ; 
      this.newCateg.name_usuario_edicion = undefined ;  

      //console.log(this.newCateg);
      this.prdService.setCategorias(this.newCateg).subscribe({next:(value:any)=>{ 
        //console.log(value)
        this.dialogo.close(true); 
      },error:error=>console.error(error)})
    } 
  }
  getAllCategorias(){ 
    this.loading.show()
    this.prdService.getCategorias().subscribe({
       next :(datos:categoriaRequest)=>{
         //console.log('getAllCategorias',datos);
         
    if (datos.numdata > 0 ){  
        this.categorias = datos.data!.map((x:any)=>x.obj) 
        this.prdService.asignarCategorias(this.categorias);
        //console.log(this.categorias);
        this.newAbrirDialog.closeAll();
    }else{
      this.categorias = [];
    }

        this.loading.hide()
      } ,
      error: error => {this.loading.hide();
        Swal.fire(JSON.stringify(error))
      }}
      );
  }
}
