import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { UsuarioModel } from 'src/app/models/usuario.model';
import { loading } from 'src/app/models/app.loading';
import { Perfil } from 'src/app/interfaces/usuario.interface';
import { usuarioService } from 'src/app/services/usuario.services';
import { select } from 'src/app/interfaces/generales.interface';

@Component({
  selector: 'app-usuario-perfil',
  template:  ` 
  <div class="container-fluid">
  <div class="row">
     <div class="col-sm-12  ">
         <h2 class='centrado'>Asignar un perfil al Usuario</h2>
     </div>
 </div><hr>
 <div class="row">
     <div class="col-sm-12  ">
       <b> {{usuarioActual.nombreCompleto}}</b>
     </div></div>
 <div class="row">
     <div class="col-sm-12  ">
       usuario : <b> {{usuarioActual.Login}}</b>
     </div></div><hr>
 <div class="row" *ngIf="perfiles.length > 0">
     <div class="col-sm-12  "><label id="example-radio-group-label">Seleccione el perfil del Usuairo : </label>
<mat-radio-group   [(ngModel)]="perfilUsuario">
<ul> 
 <li *ngFor="let perfil of perfiles" > <mat-radio-button    [value]="perfil.id">
    {{perfil.Perf_Nombre}}
  </mat-radio-button></li></ul>
</mat-radio-group>

      
         <table class='table' *ngIf="perfiles.length <= 0">  
           <tbody >
           <tr><td>No existen perfil para asignar al usuario</td></tr>
           </tbody>
         </table>
     </div>
 </div>
  <div class="row"  *ngIf="perfiles.length > 0">
  <div class="col-sm-5  ">
       <button type="button" class="btn btn-primary" (click) = 'guardarRelacion()'>Guardar</button>
     </div>
     <div class="col-sm-5  ">
       <button type="button" class="btn btn-danger" (click)= 'cerrarDialog()'>Cancelar</button>
     </div></div>
  </div>`,
  styles : ['']
})
export class UsuarioPerfilComponent implements OnInit { 
  usuarioActual:UsuarioModel;
  opciones:boolean[] = [];
  perfilUsuario:number = 0;
  perfiles:Perfil[] =[];
  constructor(
    private userService : usuarioService,
    @Inject(MAT_DIALOG_DATA) private usuario: UsuarioModel ,
  private loading : loading , 
  public dialogo: MatDialogRef<UsuarioPerfilComponent>
  ) { this.usuarioActual = usuario;
    this.perfilUsuario = this.usuarioActual.perfil;
    this.getPerfiles();
  }

  ngOnInit(): void {
  }

  guardarRelacion(){
    if(this.perfilUsuario === 0 ){
      alert('Debe seleccionar el perfil');
      return;
    }
     
    this.loading.show(); 
    this.userService.guardarUsuarioPerfil(this.usuarioActual , this.perfilUsuario).subscribe(
     (respuesta:any)=>{console.log(respuesta)
      
     if (respuesta.error === 'ok'){
       alert('datos ingresados con exito');   
     }else{
       alert(respuesta.error);
     }
     this.loading.hide();
     this.dialogo.close(true);
     })
    
  }
  getPerfiles(){ 
    this.loading.show()
    this.userService.getPerfiles().subscribe(
      (datos:select)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      datos.data.forEach((dato:Perfil , index )=>{
        this.perfiles[index] =  dato ;
      }) 
      console.log('perfiles',this.perfiles , this.perfiles.length);
    }else{
      this.perfiles = [];
    }

        this.loading.hide()
      } ,
      error => {this.loading.hide();
        console.log(error)
        alert( error.error.error);
      }
      );
  }
  cerrarDialog(){
    this.dialogo.close(false);
  }
}
