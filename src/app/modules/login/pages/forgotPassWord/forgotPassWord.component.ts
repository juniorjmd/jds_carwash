import {  Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { vwsucursal } from 'src/app/models/app.db.interfaces';
import { CustomConsole } from 'src/app/models/CustomConsole';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { LoginService } from 'src/app/services/login.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-pass-word',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassWord.component.css']  
})
export class ForgotPassWordComponent implements OnInit { 
  usuario!:UsuarioModel;
  sucursal:vwsucursal[]=[]; 
  constructor(private _datosInicialesService : DatosInicialesService,
    private _loginService: LoginService,
    private _Router : Router ) {

   }
getDatosInciales(){

  this._datosInicialesService.getDatosIniSucursal().subscribe({
    next: (data:any)=>{
      this.sucursal = data;
      this._datosInicialesService.chageSucursal(this.sucursal[0]) 
    } , error: error => {CustomConsole.log('error retornado',error)
      Swal.fire('_datosInicialesService - error', JSON.stringify(error) , 'error') 
    }
  } ); 
}
    

    login( form: NgForm){
   if(form.invalid){return;} 

    this._loginService.getLogin(this.usuario.Login , this.usuario.pass).subscribe(
      async (datos:any)=>{ 
        if(datos.data.usuario.length === 0){ 
          Swal.fire('error de usuario')
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
    error => {
      CustomConsole.log(error) 
      Swal.fire('error', JSON.stringify(error) , 'error') 
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
  this.getDatosInciales();
  } 
  changePassword( form: NgForm){
    
  }
}
 

