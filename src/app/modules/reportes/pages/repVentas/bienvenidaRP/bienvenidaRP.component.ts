import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecursoDetalle, Usuario } from 'src/app/interfaces/usuario.interface';
import { PrinterManager } from 'src/app/models/printerManager';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { usuarioService } from 'src/app/services/usuario.services';

@Component({
  selector: 'app-bienvenida-rp', 
  template: `<div  >
  <div class="card">
    <div class="card-header text-center">
      <h1>Bienvenida al Reporte de Ventas</h1>
    </div>
    <div class="card-body">
      <div class="text-center mb-4">
        <i class="bi bi-bar-chart-fill" style="font-size: 4rem; color: #007bff;"></i>
      </div>
      <h2 class="card-title text-center">Resumen de Ventas</h2>
      <p class="card-text text-center">
        En este módulo, podrás encontrar diversos reportes detallados sobre las ventas realizadas en tu negocio. Los reportes disponibles incluyen:
      </p>
      <ul class="list-group list-group-flush">    <li class="list-group-item" *ngFor="let item of menusUsuario">
          
        <a class="list-group-item list-group-item-action" routerLinkActive="active" 
          
          [routerLink]="item.direccion"><span [innerHTML] = "item.img"></span> {{item.display_nombre}}
          </a> 


        </li>
       


      
      </ul> <hr>
    </div>
  </div>
</div>`,
  styleUrls: ['./bienvenidaRP.component.css'], 
})
export class BienvenidaRPComponent { 
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

