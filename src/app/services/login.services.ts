import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  RecursoDetalle, Usuario  } from '../interfaces/usuario.interface';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { Observable, firstValueFrom } from 'rxjs';
import { UsuarioResponseInterface } from '../interfaces/UsuarioResponse.Interface';
import { CustomConsole } from '../models/CustomConsole';
import { ConfigService } from './config.service';


@Injectable({
    providedIn: 'root'
})
export class LoginService {
 usuario!:Usuario;
    private permisosUsuario : RecursoDetalle[] = [];

    // private _configService = inject(configService); 
constructor(private http: HttpClient ,  private configService:ConfigService){ 
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
        CustomConsole.log('servicios datos iniciales inicializado ' ,this.configService.url.login , datos, this.configService.url.httpOptionsSinAutorizacion);
        return this.http.post(this.configService.url.login , datos, this.configService.url.httpOptionsSinAutorizacion) ;
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
        CustomConsole.log('validar llave de session inicializado ' ,this.configService.url.login , datos,         this.configService.url.httpOptionsSinAutorizacion);
        return this.http.post<UsuarioResponseInterface>(this.configService.url.login , datos, httpOptions()) ;
    }
    

    setRenovacionContrasena(_usuario:string):Observable<{error:any}>{
      let datos = {"action": actions.actionResetearPass ,
                  _usuario
              };
      CustomConsole.log('setRenovacionContrasena inicializado ' ,this.configService.url.login , datos,         this.configService.url.httpOptionsSinAutorizacion);
      return this.http.post<{error:any}>(this.configService.url.login , datos, httpOptions()) ;
  }


    getUsuarioLogeadoObs(invoker: string = ''): Observable<any> {
        const datos = {
          "action": actions.actionValidarKeylogin,
          "_llaveSession": localStorage.getItem('sis41254#2@'),
          "_invoker": invoker
        };
        CustomConsole.log('validar llave de session <observable> inicializado', this.configService.url.login, datos, this.configService.url.httpOptionsSinAutorizacion);
        return this.http.post(this.configService.url.login, datos, httpOptions());
      }

    // async  getUsuarioLogeadoAsync(invoker :string = '')
    // {       
    //     let datos = {"action": actions.actionValidarKeylogin ,
    //     "_llaveSession" : localStorage.getItem('sis41254#2@')  ,"_invoker": invoker };
    //     CustomConsole.log('validar llave de session inicializado ' ,this.configService.url.login , datos, this.configService.url.httpOptionsSinAutorizacion);
    //     return await   this.http.post(this.configService.url.login , datos, httpOptions()).toPromise() ; 
    // }
     getUsuarioLogeadoAsync(invoker: string = ''): Observable<any> {
        let datos = {
          action: actions.actionValidarKeylogin,
          _llaveSession: localStorage.getItem('sis41254#2@'),
          _invoker: invoker
        };
      CustomConsole.log('validar llave de session inicializado', this.configService.url.login, datos, this.configService.url.httpOptionsSinAutorizacion);
        return  this.http.post(this.configService.url.login, datos, httpOptions()) ;
      } 
      
  SET_PASS_USUARIO( _id_usuario:number, _pass:string): Observable<any> {
        let datos = {
          action: actions.actionSetPass, _id_usuario, _pass
        };
       //  CustomConsole.log('validar llave de session inicializado', this.configService.url.login, datos, this.configService.url.httpOptionsSinAutorizacion);
        return  this.http.post(this.configService.url.login, datos, httpOptions()) ;
      }
  getDatosUsuarioLogeado(invoker: string = ''): Observable<any> {
        let datos = {
          action: actions.actionGetUsuarioActual,
          _llaveSession: localStorage.getItem('sis41254#2@'),
          _invoker: invoker
        };
        CustomConsole.log('validar llave de session inicializado', this.configService.url.login, datos, this.configService.url.httpOptionsSinAutorizacion);
        return  this.http.post(this.configService.url.login, datos, httpOptions()) ;
      }
    }
 