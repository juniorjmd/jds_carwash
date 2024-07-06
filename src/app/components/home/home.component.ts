import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { LoginService } from 'src/app/services/login.services';
import { usuarioService } from 'src/app/services/usuario.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario?:Usuario
  constructor(private _ServLogin : LoginService ,   private _Router: Router , private usuarioService:usuarioService) { }

  print() {
    const printContent = document.getElementById('print-section');
    const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')!;
    WindowPrt.document.write(printContent!.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.addEventListener('afterprint', () => {
      WindowPrt.close();
    });
    WindowPrt.print();
  }
  ngOnInit(): void {this.getUsuarioLogeado(); }
  getUsuarioLogeado() {
     
    this._ServLogin.getUsuarioLogeadoAsync().subscribe({next:(datos)=>{
     
    this.usuario = datos.data.usuario;   
    this.usuarioService.changeUsuario(this.usuario); // Actualiza con el usuario logueado

    },error: (error: any) => { 
    console.log(error);
    alert(error.error.error);
    this._Router.navigate(['login']);
  }})  
}

}
