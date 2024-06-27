import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select } from 'src/app/interfaces/generales.interface';
import { RecursoDetalle, Usuario, Usuarios } from 'src/app/interfaces/usuario.interface';
import { LoginService } from '../../services/login.services';
import { LoginComponent } from '../login/login.component';
import { usuarioService } from 'src/app/services/usuario.services';
import { UsuarioModel } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  keyLog:string = '123456qwerty';
  menusUsuario :RecursoDetalle[] = [];
  usuario?:Usuario;

  margin = 0;
  constructor( private _ServLogin:LoginService , private usuarioService : usuarioService , 
    private _Router : Router,) {   
  }

  async getUsuarioLogeado(){
    try {
     console.log('usuario recibido' , this.usuario)
      this.menusUsuario = this.getMenuImage(this.usuario!) ;
     console.log('estoy en getUsuarioLogeado',this.menusUsuario);

  } catch (error : any) {
      throw new Error(`Error al leer maestros : ${error}`);
      console.log(error);
      alert( error.error.error);
      this._Router.navigate(['login']);
    }  
   
  }

  
  ngOnInit() {
    this.usuarioService.currentUsuario.subscribe((usuario) => { this.usuario = usuario ; 
      if(this.usuario)   this.getUsuarioLogeado();
    });
  }
  getMenuImage(usuario:Usuario){

    let menuCard:RecursoDetalle[] = [];
    let menu = usuario.permisos;
    let margin = 0;
    console.log(usuario, menu);
    
    menu!.forEach((recurso , index ) => {
       console.log('recorrido',index ,recurso ); 
        if(recurso.tipo === 'card'){

          menuCard[margin]=  recurso ;
          margin = margin + 1;
        }
      });
      switch (margin){
        case 1 : this.margin = 4; break;
        case 2 : this.margin = 3; break;
        case 3 : this.margin = 2; break;

      }

      return menuCard;
  }

}
