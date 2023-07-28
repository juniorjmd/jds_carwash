import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select } from 'src/app/interfaces/generales.interface';
import { RecursoDetalle, Usuario } from 'src/app/interfaces/usuario.interface';
import { vwsucursal } from 'src/app/models/app.db.interfaces';
import { LoginService } from 'src/app/services/login.services';
import { DatosInicialesService  } from '../../../services/DatosIniciales.services';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html' ,
  
  styleUrls: ['./navbar.component.css'  ]
})
export class NavbarComponent   {
  llaveIncio:string;
  sucursal : vwsucursal[] = [];  
    keyLog:string = '123456qwerty';
    menusUsuario :RecursoDetalle[];
  
    margin = 0;
    constructor(  private _datosInicialesService: DatosInicialesService , private _ServLogin:LoginService , 
      private _Router : Router,) {  
      this.getUsuarioLogeado();
     
    this.llaveIncio = ''; 
    this._datosInicialesService.getDatosIniSucursal().subscribe(
      (data:vwsucursal[])=>{
      this.sucursal = data;
      console.log(this.sucursal);
    } ,
    error => alert(error.error.error));
    
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

  
  getMenuImage(usuario:Usuario){

    let menuCard:RecursoDetalle[] = [];
    let menu = usuario.permisos;
    let margin = 0;
    console.log(usuario, menu);
    
    menu.forEach((detalle , index ) => {
      console.log('recorrido',index ,detalle ); 
        if(detalle.recurso.tipo === 'ul-nav'){
          menuCard[margin]= detalle.recurso ; 
          margin++;
        }
      }); 

      return menuCard;
  }

 
}
