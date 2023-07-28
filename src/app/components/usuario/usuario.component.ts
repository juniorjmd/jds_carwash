import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select } from 'src/app/interfaces/generales.interface';
import { Usuarios } from 'src/app/interfaces/usuario.interface';
import { loading } from 'src/app/models/app.loading';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { usuarioService } from 'src/app/services/usuario.services';
import { UsuarioDetalleComponent } from './usuario-detalle.component';
import { UsuarioEditarComponent } from './usuario-editar.component';
import { UsuarioNuevoComponent} from './usuario-nuevo.component';
import { UsuarioPerfilComponent} from './usuario-perfil.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios :UsuarioModel[]  = []; 
  constructor( private userService : usuarioService,
    
    private newUsuarioDialog : MatDialog , 
     private loading : loading) { 
    this.getUsuarios();
  }

  ngOnInit(): void {
  }
  crearUsuario(){
    
      this.newUsuarioDialog.open(UsuarioNuevoComponent,{data:null})
      .afterClosed()
      .subscribe((confirmado: Boolean)=>{
        if (confirmado){
        this.getUsuarios()  
      }
      })
  }
  setAgregarPerfil(usuario : UsuarioModel){
    this.newUsuarioDialog.open(UsuarioPerfilComponent,{data:usuario})
    .afterClosed()
    .subscribe((confirmado: Boolean)=>{ if (confirmado){
      this.getUsuarios()  
    }})

  }
  getUsuarios(){
    this.usuarios[0] = new UsuarioModel(undefined) ;
    this.loading.show()
    this.userService.getUsuarios().subscribe(
      (datos:select)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      datos.data.forEach((dato:Usuarios , index )=>{
        this.usuarios[index] = new UsuarioModel( dato );
      }) 
      console.log(this.usuarios);
    }else{
      this.usuarios = [];
    }

        this.loading.hide()
      } ,
      error => {this.loading.hide();
        console.log(error)
        alert( error.error.error);
      }
      );
  }
  setAgregarCajas(usuario:Usuarios){
    this.newUsuarioDialog.open(UsuarioDetalleComponent,{data:usuario})
    .afterClosed()
    .subscribe((confirmado: Boolean)=>{
      if (confirmado){
      this.getUsuarios()  
    }
    })
  }
  setActualizaUsuario(usuario:Usuarios){
    this.newUsuarioDialog.open(UsuarioEditarComponent,{data:usuario})
    .afterClosed()
    .subscribe((confirmado: Boolean)=>{
      if (confirmado){
      this.getUsuarios()  
    }
    })
  }

}
