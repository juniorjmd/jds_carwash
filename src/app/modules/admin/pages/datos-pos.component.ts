import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select } from 'src/app/interfaces/generales.interface';
import {   RecursoDetalle, } from 'src/app/interfaces/usuario.interface';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { LoginService } from 'src/app/services/login.services';

@Component({
  selector: 'app-datos-pos',
  templateUrl: './datos-pos.component.html',
  styleUrls: ['./datos-pos.component.css']
})
export class DatosPosComponent implements OnInit {

  cajasBtn = false;
  menusUsuario :RecursoDetalle[] = [];
  listado:any;
  constructor( private _datosInicialesService: DatosInicialesService , private _ServLogin:LoginService , 
    private _Router : Router) { 
      let auxmenusUsuario :RecursoDetalle[] = [];
      this.listado = {
        'derecho' : auxmenusUsuario  , 
        'izquierdo' : auxmenusUsuario, 
      }; }


  ngOnInit(): void {
  }
  saltar(salto:any[]){
    
  }
  

}
