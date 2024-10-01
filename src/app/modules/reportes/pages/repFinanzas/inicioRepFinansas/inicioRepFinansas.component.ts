import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecursoDetalle, Usuario } from 'src/app/interfaces/usuario.interface';
import { PrinterManager } from 'src/app/models/printerManager';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { usuarioService } from 'src/app/services/usuario.services';

@Component({
  selector: 'app-inicio-rep-ventas', 
  template: `<div class="container-fluid">
  <div class="row">
      <!-- Menú lateral -->
      <div class="col-md-3 col-lg-2 d-md-block sidebar collapse">
          <div class="list-group">
          <a class="list-group-item list-group-item-action" routerLinkActive="active" [routerLink]="['estado-resultados']">
            <i class="bi bi-file-earmark-text"></i> Estado de Resultados
          </a>
          <a class="list-group-item list-group-item-action " routerLinkActive="active" [routerLink]="['caja']">
            <i class="bi bi-cash"></i>Movimientos de Caja
          </a> 
          <a class="list-group-item list-group-item-action " routerLinkActive="active" [routerLink]="['gastos']">
            <i class="bi bi-cash"></i>Movimientos de Gastos
          </a>
          <a class="list-group-item list-group-item-action " routerLinkActive="active" [routerLink]="['movimientos']">
            <i class="bi bi-cash"></i>Movimientos en una o mas cuentas
          </a>
          <a class="list-group-item list-group-item-action" routerLinkActive="active" [routerLink]="['cuentas-pagar']">
            <i class="bi bi-file-earmark-minus"></i> Cuentas por Pagar
          </a>
          <a class="list-group-item list-group-item-action" routerLinkActive="active" [routerLink]="['cuentas-cobrar']">
            <i class="bi bi-file-earmark-plus"></i> Cuentas por Cobrar
          </a>
          <a class="list-group-item list-group-item-action" routerLinkActive="active" [routerLink]="['inventario-valorizado']">
            <i class="bi bi-box-seam"></i> Inventario Valorizado
          </a>
          <a class="list-group-item list-group-item-action" routerLinkActive="active" [routerLink]="['ratios-financieros']">
            <i class="bi bi-bar-chart"></i> Ratios Financieros
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
      console.log('InicioRepVentasComponent - usuarioLogueado' , this.usuario);
      
      let recursos =  this.usuario?.permisos.find(x=> x.nombre_recurso  == "reportes")?.recursosHijos ; 

      this.menusUsuario =  recursos?.find(x=> x.nombre_recurso  == "ventas")?.recursosHijos||[] ; 

      console.log('InicioRepVentasComponent - permisos ' , this.menusUsuario  );
      
    });
    this._datosInicialesService.currentSucursal.subscribe({next:(suc)=>{   
       PrinterManager.setSucursal(suc!);   
    }})}
}
