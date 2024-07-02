import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';  
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuarioResponseInterface } from 'src/app/interfaces/UsuarioResponse.Interface';
import { select } from 'src/app/interfaces/generales.interface';
import { RecursoDetalle, Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { LoginService } from 'src/app/services/login.services';
import { usuarioService } from 'src/app/services/usuario.services';

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {

  menusUsuario :RecursoDetalle[] = [];
  usuario?:Usuario ;
  listado:any;
  constructor( private _datosInicialesService: DatosInicialesService , private _ServLogin:LoginService , 
    private _Router : Router , private sanitizer: DomSanitizer,private usuarioService:usuarioService) { 
      let auxmenusUsuario :RecursoDetalle[] = [];
      this.listado = {
        'derecho' : auxmenusUsuario  , 
        'izquierdo' : auxmenusUsuario, 
      }; 
      //console.clear()
    //  this.getUsuarioLogeado(); 
    }

      ngOnInit() {
        this.usuarioService.currentUsuario.subscribe((usuario:Usuario) => { 
          if(usuario){
          this.usuario = usuario ; 
          let userPermisos:RecursoDetalle  = usuario.permisos.filter((x)=> x.nombre_recurso == "Admin")[0]
          this.listado = this.getMenuImage(userPermisos.recursosHijos??[]);
          console.log('estoy en getUsuarioLogeado generales', this.usuario , this.listado);
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
