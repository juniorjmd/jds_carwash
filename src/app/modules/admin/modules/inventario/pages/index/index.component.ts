import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RecursoDetalle, Usuario } from 'src/app/interfaces/usuario.interface';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { LoginService } from 'src/app/services/login.services';
import { usuarioService } from 'src/app/services/usuario.services';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent  implements OnInit {

  menusUsuario :RecursoDetalle[] = [];
  usuario?:Usuario ;
  listado:any;
  constructor( private _datosInicialesService: DatosInicialesService , private _ServLogin:LoginService , 
    private _Router : Router , private sanitizer: DomSanitizer,private _userService:usuarioService) { 
      let auxmenusUsuario :RecursoDetalle[] = [];
      this.listado = {
        'derecho' : auxmenusUsuario  , 
        'izquierdo' : auxmenusUsuario, 
      }; 
      //console.clear()
    //  this.getUsuarioLogeado(); 
    }

      ngOnInit() {
        this._userService.currentUsuario.subscribe((usuario:Usuario) => { 
          if(usuario){
          this.usuario = usuario ; 
          ////CustomConsole.log('usuario cargado',usuario);
          
          let permisosAdmin:RecursoDetalle  = usuario.permisos.filter((x)=> x.nombre_recurso == "Admin")[0]
          let userPermisos:RecursoDetalle|undefined  = permisosAdmin.recursosHijos?.filter((x)=> x.nombre_recurso == "inventarios")[0]
          //let userPermisos:RecursoDetalle  = permisosInventario.recursosHijos?.filter((x)=> x.nombre_recurso == "inventarios")[0]
          this.listado = this.getMenuImage(userPermisos!.recursosHijos??[]);
          //CustomConsole.log('estoy en getUsuarioLogeado generales', this.usuario , this.listado);
          }
        });
      }

   

  getSanitizedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  
  getMenuImage(recursos:RecursoDetalle[]){

    let menuCardIzq:RecursoDetalle[] = [];
    let menuCardDer:RecursoDetalle[] = [];
    let listado = {
      'derecho' : menuCardDer , 
      'izquierdo' : menuCardIzq , 
    }
    let menu = recursos;
    let cont_1 = 0;
    let cont_2 = 0;
    let flag = false ;
    
    menu!.forEach((recurso   ) => {
        if(recurso.tipo === 'link'){ 

          if(flag){
            flag = false;
            menuCardDer[cont_1]= recurso ; 
            cont_1++;
  
          }else{ flag = true;
            menuCardIzq[cont_2]= recurso ; 
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
