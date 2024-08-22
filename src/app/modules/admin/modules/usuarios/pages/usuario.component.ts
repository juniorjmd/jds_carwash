import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuarios } from 'src/app/interfaces/usuario.interface';
import { loading } from 'src/app/models/app.loading';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { usuarioService } from 'src/app/services/usuario.services';
import { UsuarioDetalleComponent } from './usuario-detalle.component';
import { UsuarioEditarComponent } from './usuario-editar.component';
import { UsuarioNuevoComponent} from './usuario-nuevo.component';
import { UsuarioPerfilComponent} from './usuario-perfil.component';
import { FndClienteComponent } from 'src/app/modules/shared/modals/fnd-cliente/fnd-cliente.component';
import { tap } from 'rxjs';
import { ClientesModel } from 'src/app/models/clientes/clientes.module';

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
    this.newUsuarioDialog.open(FndClienteComponent,{ data: { invoker:'gasto' } })
    .afterClosed()
    .pipe(
      tap((resp:{response: Boolean , persona:ClientesModel})=>{
        this.loading.hide();
        if (resp.response) { 
          this.newUsuarioDialog.open(UsuarioNuevoComponent,{data:resp.persona})
          .afterClosed()
          .subscribe((confirmado: Boolean)=>{
            if (confirmado){
            this.getUsuarios()  
          }
          })
        }
      })
    ).subscribe({
      next: () => {},
      error: (error) => console.error('Error:', error),
      complete: () => console.log('buscarCliente completo')
    });  


    
    
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

      {next: (datos:any)=>{
          console.log(datos);
          
     if (datos.numdata > 0 ){ 
       datos.data!.forEach((dato:Usuarios , index:number )=>{
         this.usuarios[index] = new UsuarioModel( dato );
       }) 
       console.log(this.usuarios);
     }else{
       this.usuarios = [];
     }
 
         this.loading.hide()
       } ,
       error : (error : any) => {this.loading.hide();
         console.log(error)
         alert( error.error.error);
       }
      
      
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
