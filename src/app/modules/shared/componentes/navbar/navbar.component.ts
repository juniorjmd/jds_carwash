import { Component  } from '@angular/core';
import { Router } from '@angular/router'; 
import { vwsucursal } from 'src/app/models/app.db.interfaces';
import { LoginService } from 'src/app/services/login.services';
import { DatosInicialesService } from '../../../../services/DatosIniciales.services';
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
  moduleActive = '';

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
        // console.log(this.sucursal);
      },
      error: (error) => alert(error.error.error),
    });
  }

  toggleDropdown() {
    this.isDropdownActive = !this.isDropdownActive;
  }
  async getUsuarioLogeado() {
     
      this._ServLogin.getUsuarioLogeadoAsync().subscribe({next:(datos)=>{
       
      this.usuario = datos.data.usuario; 
        this.menusUsuario = this.getMenuImage(this.usuario!);
      },error: (error: any) => { 
      console.log(error);
      alert(error.error.error);
      this._Router.navigate(['login']);
    }})  
  }

  getMenuImage(usuario: Usuario) {
    let menuCard: RecursoDetalle[] = [];
    let menu = usuario.permisos;
    let margin = 0;
    console.log(usuario, menu);

    menu!.forEach((detalle, index) => {
      // console.log('recorrido',index ,detalle );
      if (detalle.tipo === 'card') {
        menuCard[margin] = detalle;
        margin = margin + 1;
      }
    }); 
    
    switch (margin) {
      case 1:
        this.margin = 4;
        break;
      case 2:
        this.margin = 3;
        break;
      case 3:
        this.margin = 2;
        break;
        default:
          this.margin = 1;
    }

    return menuCard;
  }
  confirmLogout() {
    const message = '¿Estás seguro de que deseas cerrar sesión?';
    this.modalService.openConfirmationModal(message).then((result) => {
      if (result) {
        this._Router.navigate(['/']);
      } else {
        console.log('Cancelado');
      }
    });
  }
  changeModule(module: string) {
    this.moduleActive = `${module}`.split(',')[1];
    // alert( this.moduleActive)
    this._Router.navigate([`home/${this.moduleActive}`]);
    if (this.moduleActive === 'pos') {
      this.moduleActive = 'punto de venta';
    }
  }
}
