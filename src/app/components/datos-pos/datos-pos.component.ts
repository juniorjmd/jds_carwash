import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select } from 'src/app/interfaces/generales.interface';
import { Permisos, RecursoDetalle, Usuario } from 'src/app/interfaces/usuario.interface';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { LoginService } from 'src/app/services/login.services';

@Component({
  selector: 'app-datos-pos',
  templateUrl: './datos-pos.component.html',
  styleUrls: ['./datos-pos.component.css']
})
export class DatosPosComponent implements OnInit {

  cajasBtn = false;
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
  saltar(salto:any[]){
    
  }

  async getUsuarioLogeado(){
    try {
     
      let usuarioPermisos : Permisos[] |any = [];  
      const ServLogin = await  this._ServLogin.getUsuarioLogeadoAsync(); 
      const datos:any|select  = await ServLogin;  
      usuarioPermisos = datos.data.usuario.permisos; 
       this.getMenuImage(usuarioPermisos) ; 

  } catch (error:any) {
      throw new Error(`Error al leer maestros : ${error}`);
      console.log(error);
      alert( error.error.error);
      this._Router.navigate(['login']); 
    }  
   
  }

  
  getMenuImage(usuarioPermisos:Permisos[]|any[]){
 
    let menu = usuarioPermisos; 
    
    menu.forEach((detalle   ) => {
        if(detalle.recurso.tipo === 'boton'){
          switch(detalle.recurso.nombre_recurso){
            case 'Mantenimientos de cajas' : 
              this.cajasBtn = true;
            break;
          }
      console.log('recorrido datos pos', detalle ); 

         

        }
      });   
  }

}
