import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select } from 'src/app/interfaces/generales.interface';
import { vwsucursal } from 'src/app/models/app.db.interfaces';
import { LoginService } from 'src/app/services/login.services';
import { DatosInicialesService } from '../../../services/DatosIniciales.services';
import { RecursoDetalle, Usuario } from 'src/app/interfaces/usuario.interface';
import { ModalService } from 'src/app/modal.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',

  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  llaveIncio: string;
  sucursal: vwsucursal[] = [];
  keyLog: string = '123456qwerty';
  menusUsuario: RecursoDetalle[] = [];
  usuario?: Usuario;
  isDropdownActive = true;

  margin = 0;
  constructor(
    private modalService: ModalService,
    private _datosInicialesService: DatosInicialesService,
    private _ServLogin: LoginService,
    private _Router: Router
  ) {
    this.getUsuarioLogeado();

    this.llaveIncio = '';
    this._datosInicialesService.getDatosIniSucursal().subscribe({
      next: (data: any) => {
        this.sucursal = data;
        console.log(this.sucursal);
      },
      error: (error) => alert(error.error.error),
    });
  }

  toggleDropdown() {
    this.isDropdownActive = !this.isDropdownActive;
  }
  async getUsuarioLogeado() {
    try {
      const ServLogin = await this._ServLogin.getUsuarioLogeadoAsync();
      const datos: any = ServLogin;
      console.log('retorno', datos);
      let usuario: Usuario;
      usuario = datos.data.usuario;
      this.usuario = usuario;

      this.menusUsuario = this.getMenuImage(usuario);

      console.log(
        'estoy en getUsuarioLogeado en navbar component',
        this.menusUsuario
      );
    } catch (error: any) {
      throw new Error(`Error al leer maestros : ${error}`);
      console.log(error);
      alert(error.error.error);
      this._Router.navigate(['login']);
    }
  }

  getMenuImage(usuario: Usuario) {
    let menuCard: RecursoDetalle[] = [];
    let menu = usuario.permisos;
    let margin = 0;
    console.log('get menu usuario navbar', usuario, menu);

    menu!.forEach((detalle, index) => {
     // console.log('recorrido', index, detalle);
      if (detalle.recurso.tipo === 'ul-nav') {
        menuCard[margin] = detalle.recurso;
        margin++;
      }
    });

    return menuCard;
  }
  confirmLogout() {
    const message = '¿Estás seguro de que deseas cerrar sesión?';
    this.modalService.openConfirmationModal(message)
      .then((result) => {
        if (result) {
          this._Router.navigate(['/']);
        } else {
          console.log('Cancelado');
        }
      });
  }
}
