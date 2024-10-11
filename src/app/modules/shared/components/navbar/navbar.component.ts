import { Component  } from '@angular/core';
import { Router } from '@angular/router'; 
import { vwsucursal } from 'src/app/models/app.db.interfaces';
import { LoginService } from 'src/app/services/login.services';
import { DatosInicialesService } from '../../../../services/DatosIniciales.services';
import { RecursoDetalle, Usuario } from 'src/app/interfaces/usuario.interface';
import { ModalService } from 'src/app/modal.service';
import { Location } from '@angular/common';
import { usuarioService } from 'src/app/services/usuario.services';
import Swal from 'sweetalert2';
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
  constructor(private location: Location,
    private modalService: ModalService,
    private _datosInicialesService: DatosInicialesService,private usuarioService : usuarioService,
    private _ServLogin: LoginService,
    private _Router: Router
  ) {
   
    this.llaveIncio = '';
    this._datosInicialesService.getDatosIniSucursal().subscribe({
      next: (data: any) => {
        this.sucursal = data;
        console.log('getDatosIniSucursal',this.sucursal);
      },
      error: (error) => Swal.fire('getDatosIniSucursal error ',JSON.stringify(error)),
    });
  }
  goBack(): void {
    this.location.back();
  }
  ngOnInit() {
    this.usuarioService.currentUsuario.subscribe((usuario) => {  this.usuario = usuario ; 
      console.log('usuarioLogueado' , this.usuario);
      
    });
  }
 

 

  showDropdown() {
    this.isDropdownActive = false;
  }

  hideDropdown() {
    this.isDropdownActive = true;
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
