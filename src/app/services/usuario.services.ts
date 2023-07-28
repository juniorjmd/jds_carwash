import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loading } from 'src/app/models/app.loading';
import { Usuarios } from '../interfaces/usuario.interface';
import { actions } from '../models/app.db.actions';
import { TABLA } from '../models/app.db.tables';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class usuarioService {

    constructor(private http: HttpClient ,
        private loading : loading ){ 
        console.log('servicios usuarios inicializado');  
    }
    
    getPerfiles(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : TABLA.perfiles
                    };
        console.log('servicios de usuarios activo - getUsuarios' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    } 
    getUsuarios(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.usuario
                    };
        console.log('servicios de usuarios activo - getUsuarios' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    } 

    guardarUsuarios(usuario : Usuarios|UsuarioModel){ 
        const { ID, ...datosRestantes } = usuario; 
        const arrayDatos = datosRestantes; 
        console.log(arrayDatos);
        
        let datos = {"action": actions.actionInsert ,
                     "_tabla" : TABLA.usuarios,
                     "_arraydatos" : arrayDatos
                    };

        console.log('servicios de usuarios activo - getUsuarios' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    guardarUsuarioPerfil(usuario : UsuarioModel ,  perfil:number){
      
        let datos = {"action": actions.actionInsertPerfilUsuario  ,
        "_parametro" : { 
            "perfil" : perfil ,
            "usuario" : usuario.ID
        }
       };

        console.log('servicios de usuarios activo - guardarUsuarioPerfil' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    updateUsuarios(usuario : Usuarios){ 
        let where:any[] = []  
        const { ID, perfil, ...datosRestantes } = usuario; 
        const arrayDatos = datosRestantes;   
        where = [{"columna": 'ID', "tipocomp": '=', "dato":ID }];
        console.log(arrayDatos);
        
        let datos = {"action": actions.actionUpdate ,
                     "_tabla" : TABLA.usuarios,
                     "_arraydatos" : arrayDatos,
                     "_where": where
                    };

        console.log('servicios de usuarios activo - getUsuarios' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }

}