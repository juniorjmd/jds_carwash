import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecursoDetalle, Usuario } from 'src/app/interfaces/usuario.interface';
import { CustomConsole } from 'src/app/models/CustomConsole';
import { PrinterManager } from 'src/app/models/printerManager';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { usuarioService } from 'src/app/services/usuario.services';

@Component({
  selector: 'app-inicio-rep-ventas', 
  template: `<div class="container-fluid  fondoGeneral confondoBrillante pt-3 pb-3 ">
  <div class="row">
      <!-- Menú lateral -->
      <div class="col-md-3 col-lg-2 d-md-block sidebar collapse">
          <div class="list-group"> 
          <a class="list-group-item list-group-item-action" routerLinkActive="active" [routerLink]="['caja']">
            <i class="bi bi-wallet2"></i> Movimientos de Caja
          </a>
          <a class="list-group-item list-group-item-action" routerLinkActive="active" [routerLink]="['gastos']">
              <i class="bi bi-cash-stack"></i> Movimientos de Gastos
          </a>
          <a class="list-group-item list-group-item-action" routerLinkActive="active" [routerLink]="['movimientos']">
              <i class="bi bi-arrow-left-right"></i> Movimientos en una o más cuentas
          </a>
          <a class="list-group-item list-group-item-action" routerLinkActive="active" [routerLink]="['cuentasPorPagar']">
              <i class="bi bi-file-earmark-minus"></i> Cuentas por Pagar
          </a>
          <a class="list-group-item list-group-item-action" routerLinkActive="active" [routerLink]="['cuentasPorCobrar']">
              <i class="bi bi-file-earmark-plus"></i> Cuentas por Cobrar
          </a>

        </div>
      </div>
      <!-- Contenido principal -->
      <div class="col-md-9 col-lg-10 ml-sm-auto px-md-4">
          <h2>Reportes de Ventas:</h2>
          <router-outlet></router-outlet><hr>
      </div>
  </div>
</div>
`,
  styleUrls: ['./inicioRepFinansas.component.css'], 
})
export class InicioRepFinansasComponent  { 
  private _datosInicialesService = inject( DatosInicialesService );
  private usuarioService = inject( usuarioService );
  
  menusUsuario: RecursoDetalle[] = [];
  usuario?: Usuario;
  ngOnInit(): void {
    this.usuarioService.currentUsuario.subscribe((usuario) => {  this.usuario = usuario ; 
      CustomConsole.log('InicioRepVentasComponent - usuarioLogueado' , this.usuario);
      
      let recursos =  this.usuario?.permisos.find(x=> x.nombre_recurso  == "reportes")?.recursosHijos ; 

      this.menusUsuario =  recursos?.find(x=> x.nombre_recurso  == "ventas")?.recursosHijos||[] ; 

      CustomConsole.log('InicioRepVentasComponent - permisos ' , this.menusUsuario  );
      
    });
    this._datosInicialesService.currentSucursal.subscribe({next:(suc)=>{   
       PrinterManager.setSucursal(suc!);   
    }})}
}
