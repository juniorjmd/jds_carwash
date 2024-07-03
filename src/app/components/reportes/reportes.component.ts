import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { select } from 'src/app/interfaces/generales.interface';
import { RecursoDetalle, Usuario, Usuarios } from 'src/app/interfaces/usuario.interface';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { LoginService } from 'src/app/services/login.services';
import { usuarioService } from 'src/app/services/usuario.services';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  usuario?:Usuario;
  menusUsuario :RecursoDetalle[] = [];
  listado:any;
  constructor( private _datosInicialesService: DatosInicialesService , private usuarioService:usuarioService,private _ServLogin:LoginService , 
    private _Router : Router) { 
      let auxmenusUsuario :RecursoDetalle[] = [];
      this.listado = {
        'derecho' : auxmenusUsuario  , 
        'izquierdo' : auxmenusUsuario, 
      }; 
      console.clear()  }

  ngOnInit(): void {
    
    this.usuarioService.currentUsuario.subscribe((usuario) => {  this.usuario = usuario ;  
      console.log('estoy en getUsuarioLogeado generales', this.usuario  );
      if(this.usuario ){

         let userPermisosAdmin:RecursoDetalle  = this.usuario.permisos.filter((x:RecursoDetalle)=> x.nombre_recurso == "Admin")[0]
         let userPermisos:RecursoDetalle = userPermisosAdmin.recursosHijos?.filter((x:RecursoDetalle)=> x.nombre_recurso == "reportes")[0]!
         console.log(userPermisosAdmin, userPermisos)
      this.listado = this.getMenuImage(userPermisos.recursosHijos??[]);
      console.log('estoy en getUsuarioLogeado generales', this.usuario , this.listado);
      }
     
    });
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
