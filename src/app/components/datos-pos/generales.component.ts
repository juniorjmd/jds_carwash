import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { select } from 'src/app/interfaces/generales.interface';
import { RecursoDetalle, Usuario } from 'src/app/interfaces/usuario.interface';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { LoginService } from 'src/app/services/login.services';

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {

  menusUsuario :RecursoDetalle[] = [];
  listado:any;
  constructor( private _datosInicialesService: DatosInicialesService , private _ServLogin:LoginService , 
    private _Router : Router) { 
      let auxmenusUsuario :RecursoDetalle[] = [];
      this.listado = {
        'derecho' : auxmenusUsuario  , 
        'izquierdo' : auxmenusUsuario, 
      }; 
      console.clear()
      this.getUsuarioLogeado(); }

  ngOnInit(): void {
  }

  async getUsuarioLogeado(){
    try {
      const ServLogin = await  this._ServLogin.getUsuarioLogeadoAsync(); 
      const datos:any|select  = await ServLogin; 
      console.log('retorno getUsuarioLogeado', datos);  
      let usuario : Usuario ;
      usuario = datos.data.usuario ; 
      this.listado = this.getMenuImage(usuario) ;
     console.log('estoy en getUsuarioLogeado generales',this.listado);

  } catch (error:any) {
      throw new Error(`Error al leer maestros : ${error}`);
      console.log(error);
      alert( error.error.error);
      this._Router.navigate(['login']);
    }  
   
  }

  
  getMenuImage(usuario:Usuario){

    let menuCardIzq:RecursoDetalle[] = [];
    let menuCardDer:RecursoDetalle[] = [];
    let listado = {
      'derecho' : menuCardDer , 
      'izquierdo' : menuCardIzq , 
    }
    let menu = usuario.permisos;
    let cont_1 = 0;
    let cont_2 = 0;
    let flag = false ;
    
    menu.forEach((detalle   ) => {
        if(detalle.recurso.tipo === 'link'){ 

          if(flag){
            flag = false;
            menuCardDer[cont_1]= detalle.recurso ; 
            cont_1++;
  
          }else{ flag = true;
            menuCardIzq[cont_2]= detalle.recurso ; 
          cont_2++;

          }

        }
      }); 
      listado = {
        'derecho' : menuCardDer , 
        'izquierdo' : menuCardIzq , 
      }  
      return listado;
  }

}
