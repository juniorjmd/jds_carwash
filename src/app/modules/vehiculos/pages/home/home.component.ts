import { Component, OnInit } from '@angular/core';
import { RecursoDetalle, Usuario } from 'src/app/interfaces/usuario.interface';
import { CustomConsole } from 'src/app/models/CustomConsole';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { usuarioService } from 'src/app/services/usuario.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeVhComponent implements OnInit {
[x: string]: any;
usuario?:Usuario;
permisos?:RecursoDetalle;
  constructor(private usuarioService:usuarioService) { }

  ngOnInit(): void {
    this.usuarioService.currentUsuario.subscribe((usuario) => {  this.usuario = usuario ; 
      CustomConsole.log('usuario homeComponent',this.usuario)
      this.permisos =  this.usuario?.permisos.filter(x=> x.display_nombre == "Vehiculos")[0];
    });

  }

}
