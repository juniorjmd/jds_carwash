import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  RecursoDetalle, Usuario  } from '../interfaces/usuario.interface';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { Observable, firstValueFrom } from 'rxjs';
import { UsuarioResponseInterface } from '../interfaces/UsuarioResponse.Interface';
import { CustomConsole } from '../models/CustomConsole';


@Injectable({
    providedIn: 'root'
})
export class LoginService {
 usuario!:Usuario;
    private permisosUsuario : RecursoDetalle[] = [];

    // private _configService = inject(configService); 
constructor(private http: HttpClient){ 
        CustomConsole.log('servicios loguin inicializado');        
    }

    async digestMessage(message:any) {
        const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
        const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
        return hashHex;
      }

    /*
    
    */  
    getLogin( L_usuario: string , L_contraseña: string) {
        let datos = {"action": actions.actionlogin ,
                    "_password" : L_contraseña,
                    "_usuario" : L_usuario
                };
        CustomConsole.log('servicios datos iniciales inicializado ' ,url.login , datos, url.httpOptionsSinAutorizacion);
        return this.http.post(url.login , datos, url.httpOptionsSinAutorizacion) ;
    } 


    private getPermisos(idPerfil:number):RecursoDetalle[]{
        return this.permisosUsuario;
    }
    private getLlaveRegistro(){
        return this.usuario.key_registro;
    }
    getUsuarioLogeado( ){
        let datos = {"action": actions.actionValidarKeylogin ,
                    "_llaveSession" : localStorage.getItem('sis41254#2@')
                };
        CustomConsole.log('validar llave de session inicializado ' ,url.login , datos,         url.httpOptionsSinAutorizacion);
        return this.http.post<UsuarioResponseInterface>(url.login , datos, httpOptions()) ;
    }
    
    getUsuarioLogeadoObs(invoker: string = ''): Observable<any> {
        const datos = {
          "action": actions.actionValidarKeylogin,
          "_llaveSession": localStorage.getItem('sis41254#2@'),
          "_invoker": invoker
        };
        CustomConsole.log('validar llave de session <observable> inicializado', url.login, datos, url.httpOptionsSinAutorizacion);
        return this.http.post(url.login, datos, httpOptions());
      }

    // async  getUsuarioLogeadoAsync(invoker :string = '')
    // {       
    //     let datos = {"action": actions.actionValidarKeylogin ,
    //     "_llaveSession" : localStorage.getItem('sis41254#2@')  ,"_invoker": invoker };
    //     CustomConsole.log('validar llave de session inicializado ' ,url.login , datos, url.httpOptionsSinAutorizacion);
    //     return await   this.http.post(url.login , datos, httpOptions()).toPromise() ; 
    // }
     getUsuarioLogeadoAsync(invoker: string = ''): Observable<any> {
        let datos = {
          action: actions.actionValidarKeylogin,
          _llaveSession: localStorage.getItem('sis41254#2@'),
          _invoker: invoker
        };
      CustomConsole.log('validar llave de session inicializado', url.login, datos, url.httpOptionsSinAutorizacion);
        return  this.http.post(url.login, datos, httpOptions()) ;
      } 
      
  SET_PASS_USUARIO( _id_usuario:number, _pass:string): Observable<any> {
        let datos = {
          action: actions.actionSetPass, _id_usuario, _pass
        };
       //  CustomConsole.log('validar llave de session inicializado', url.login, datos, url.httpOptionsSinAutorizacion);
        return  this.http.post(url.login, datos, httpOptions()) ;
      }
  getDatosUsuarioLogeado(invoker: string = ''): Observable<any> {
        let datos = {
          action: actions.actionGetUsuarioActual,
          _llaveSession: localStorage.getItem('sis41254#2@'),
          _invoker: invoker
        };
        CustomConsole.log('validar llave de session inicializado', url.login, datos, url.httpOptionsSinAutorizacion);
        return  this.http.post(url.login, datos, httpOptions()) ;
      }
    }
 