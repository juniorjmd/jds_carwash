import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';  
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuarioResponseInterface } from 'src/app/interfaces/UsuarioResponse.Interface';
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
    private _Router : Router , private sanitizer: DomSanitizer) { 
      let auxmenusUsuario :RecursoDetalle[] = [];
      this.listado = {
        'derecho' : auxmenusUsuario  , 
        'izquierdo' : auxmenusUsuario, 
      }; 
      console.clear()
      this.getUsuarioLogeado(); }

  ngOnInit(): void {
  }

    getUsuarioLogeado(){
      this._ServLogin.getUsuarioLogeado().pipe(
        catchError(error => {
          console.error(`Error al leer maestros: ${error}`);
          alert(error.error.error);
          this._Router.navigate(['login']);
          return of(null); // Devuelve un Observable vacío en caso de error
        })
      ).subscribe((datos:UsuarioResponseInterface | null) => {
        if (datos) {
          console.log('retorno getUsuarioLogeado', datos);  
          let usuario: Usuario = datos.data.usuario; 
          this.listado = this.getMenuImage(usuario);
          console.log('estoy en getUsuarioLogeado generales', this.listado);
        }
      });
  }

  getSanitizedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
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
