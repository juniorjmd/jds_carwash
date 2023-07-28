import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select } from 'src/app/interfaces/generales.interface';
import { RecursoDetalle, Usuario, Usuarios } from 'src/app/interfaces/usuario.interface';
import { LoginService } from '../../services/login.services';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  keyLog:string = '123456qwerty';
  menusUsuario :RecursoDetalle[];

  margin = 0;
  constructor( private _ServLogin:LoginService , 
    private _Router : Router,) {  
    this.getUsuarioLogeado();
  }

  async getUsuarioLogeado(){
    try {
      const ServLogin = await  this._ServLogin.getUsuarioLogeadoAsync(); 
      const datos:any|select  = await ServLogin; 
      console.log('retorno', datos);  
      let usuario : Usuario ;
      usuario = datos.data.usuario ; 
      this.menusUsuario = this.getMenuImage(usuario) ;
     console.log('estoy en getUsuarioLogeado',this.menusUsuario);

  } catch (error) {
      throw new Error(`Error al leer maestros : ${error}`);
      console.log(error);
      alert( error.error.error);
      this._Router.navigate(['login']);
    }  
   
  }

  ngOnInit(): void {
    }
  getMenuImage(usuario:Usuario){

    let menuCard:RecursoDetalle[] = [];
    let menu = usuario.permisos;
    let margin = 0;
    console.log(usuario, menu);
    
    menu.forEach((detalle , index ) => {
      console.log('recorrido',index ,detalle ); 
        if(detalle.recurso.tipo === 'card'){

          menuCard[margin]= detalle.recurso ;
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
