import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.services';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { vwsucursal } from 'src/app/models/app.db.interfaces';
import { Modal1Component } from 'src/app/modules/shared/components/modal1/modal1.component'
import { UsuarioModel } from 'src/app/models/usuario.model';
import { Form, NgForm } from '@angular/forms';
import { select } from 'src/app/interfaces/generales.interface';
import { CustomConsole } from 'src/app/models/CustomConsole';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[Modal1Component]
})
export class LoginComponent implements OnInit {
  usuario!:UsuarioModel;
  sucursal:vwsucursal[]=[]; 
  constructor(private _datosInicialesService : DatosInicialesService,
    private _loginService: LoginService,
    private _Router : Router,
    private _modal : Modal1Component ) {
      
      localStorage.clear();
        //this.sucursal =  this._datosInicialesService.getDatosIniSucursal();
    this._datosInicialesService.getDatosIniSucursal().subscribe(
      (data:any)=>{
      this.sucursal = data;
      _datosInicialesService.chageSucursal(this.sucursal[0]) 
    } ,
    error => {CustomConsole.log(error)
      alert( error.error.error)
    }
      ); 
   }

    

    login( form: NgForm){
   if(form.invalid){return;} 

    this._loginService.getLogin(this.usuario.Login , this.usuario.pass).subscribe(
      async (datos:any)=>{ 
        if(datos.data.usuario.length === 0){ 
          alert('error de usuario')
        }else{
          CustomConsole.log('getLogin',datos.data.usuario);  
          localStorage.setItem('sis41254#2@', datos.data.usuario.key_registro );
          localStorage.setItem('#2@56YH7H82BF', datos.data.usuario.id ); 
          const digestBuffer = await this._loginService.digestMessage(new Date().toDateString());
          CustomConsole.log('llave para permisos' , digestBuffer );
          
          localStorage.setItem('#2@JIEQPJKASFÑLKJ', digestBuffer); 
          
          localStorage.setItem(digestBuffer, datos.data.usuario.permisos.join()); 
          this._Router.navigate(['home']);
        }
      
    } ,
    error => {CustomConsole.log(error)
      alert( error.error.error)
    }
      ); 
    
  }
   myFunction(x:any) { 
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}


ngOnInit(): void {
  this.usuario =  new UsuarioModel( undefined);
 // this.usuario.Login = 'admin';
 // this.usuario.pass = 'prom2001josdom';   
  } 
}
 

