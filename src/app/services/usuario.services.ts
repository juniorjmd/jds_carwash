import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loading } from 'src/app/models/app.loading';
import { Usuarios } from '../interfaces/usuario.interface';
import { actions } from '../models/app.db.actions';
import { TABLA } from '../models/app.db.tables';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { UsuarioModel } from '../models/usuario.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recurso } from '../interfaces/recurso';
import { perfil, perfilRequest, recursoRequest } from '../interfaces/producto-request';
import { CustomConsole } from '../models/CustomConsole';

@Injectable({
    providedIn: 'root'
})
export class usuarioService {


  private usuarioSource = new BehaviorSubject<any>(null);
  currentUsuario = this.usuarioSource.asObservable();


  private recursosSubject = new BehaviorSubject<Recurso[]>([]);
  recursos$ = this.recursosSubject.asObservable(); // Publica el observable


    // private _configService = inject(configService); 
constructor(private http: HttpClient ,
        private loading : loading ){ 
        CustomConsole.log('servicios usuarios inicializado');  
    }
    

  // Método para actualizar los recursos
  updateRecursos(newRecursos: Recurso[]) {
    this.recursosSubject.next(newRecursos);
  }
    changeUsuario(usuario: any) {
        this.usuarioSource.next(usuario);
      }

      getArrayRecursos():Observable<recursoRequest>{
        let datos = {"action": actions.getAllRecursosArr   
                    };
        CustomConsole.log('servicios de usuarios activo - getArrayRecursos' ,url.actionAdmin , datos, httpOptions());
        return this.http.post<recursoRequest>(url.actionAdmin , datos, httpOptions()) ;
    } 
    
     
      getArrayRecursosByPerfil(_idPerfil:number):Observable<recursoRequest>{
        let datos = {"action": actions.getAllRecursosArrByPerfil , _idPerfil };
        CustomConsole.log('servicios de usuarios activo - getArrayRecursosByPerfil' ,url.actionAdmin , datos, httpOptions());
        return this.http.post<recursoRequest>(url.actionAdmin , datos, httpOptions()) ;
    } 
    
    setArrayRecursos(_perfil:number , _recursos:Recurso):Observable<recursoRequest>{
        let datos = {"action": actions.setAllRecursosArr  , _perfil ,  _recursos           };
        CustomConsole.log('servicios de usuarios activo - setArrayRecursos' ,url.actionAdmin , datos, httpOptions());
        return this.http.post<recursoRequest>(url.actionAdmin , datos, httpOptions()) ;
    } 
    getPerfiles():Observable<perfilRequest>{
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : TABLA.perfiles
                    };
        CustomConsole.log('servicios de usuarios activo - getPerfiles' ,url.action , datos, httpOptions());
        return this.http.post<perfilRequest>(url.action , datos, httpOptions()) ;
    } 


    setPerfil(p:perfil){
        let datos ;
        let  arraydatos ;
        if (p.id != undefined &&  p.id  > 0 ){
            let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : p.id }] 
            p.id = undefined
            datos = {"action": actions.actionUpdate ,
            "_tabla" : TABLA.perfiles, "_where" : where ,
            "_arraydatos" : p
           };
        }
        else{
            datos = {"action": actions.actionInsert ,
            "_tabla" : TABLA.perfiles,
            "_arraydatos" : p
           };
        }  
       CustomConsole.log(datos); 
       return this.http.post(url.action , datos, httpOptions()) ; 
    }




    getUsuarios(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.usuario
                    };
        CustomConsole.log('servicios de usuarios activo - getUsuarios' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    } 

    guardarUsuarios(usuario : Usuarios|UsuarioModel){ 
        const { ID, ...datosRestantes } = usuario; 
         datosRestantes.nombreCompleto = undefined;
        datosRestantes.usr_registro = undefined;
        const arrayDatos = datosRestantes; 
        
        CustomConsole.log(arrayDatos);
        
        let datos = {"action": actions.actionInsertUsuario ,
                     "_tabla" : TABLA.usuarios,
                     "_arraydatos" : arrayDatos
                    };

        CustomConsole.log('servicios de usuarios activo - getUsuarios' ,url.action , datos, httpOptions());
        return this.http.post(url.actionAdmin , datos, httpOptions()) ;
    }
    guardarUsuarioPerfil(usuario : UsuarioModel ,  perfil:number){
      
        let datos = {"action": actions.actionInsertPerfilUsuario  ,
        "_parametro" : { 
            "perfil" : perfil ,
            "usuario" : usuario.ID
        }
       };

        CustomConsole.log('servicios de usuarios activo - guardarUsuarioPerfil' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    updateUsuarios(usuario : Usuarios){ 
        let where:any[] = []  
        const { ID, perfil, ...datosRestantes } = usuario; 
        datosRestantes.nombreCompleto = undefined ;
        const arrayDatos = datosRestantes;   
        where = [{"columna": 'ID', "tipocomp": '=', "dato":ID }]; 
        CustomConsole.log(arrayDatos);
        
        let datos = {"action": actions.actionUpdate ,
                     "_tabla" : TABLA.usuarios,
                     "_arraydatos" : arrayDatos,
                     "_where": where
                    };

        CustomConsole.log('servicios de usuarios activo - getUsuarios' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }

}