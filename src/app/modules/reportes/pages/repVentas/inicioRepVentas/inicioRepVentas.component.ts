import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-inicio-rep-ventas', 
  template: `<div class="container-fluid">
  <div class="row">
      <!-- Menú lateral -->
      <div class="col-md-3 col-lg-2 d-md-block sidebar collapse">
          <div class="list-group"> 
               <a class="list-group-item list-group-item-action" routerLinkActive="active" [routerLink]="['diarias']">
            <i class="bi bi-calendar3"></i> Ventas Diarias
          </a>
          <a class="list-group-item list-group-item-action" routerLinkActive="active" [routerLink]="['productos']">
            <i class="bi bi-tags"></i> Ventas por Producto
          </a>
          <a class="list-group-item list-group-item-action" routerLinkActive="active" [routerLink]="['categorias']">
            <i class="bi bi-box-seam"></i> Ventas por Categoría
          </a>
          <a class="list-group-item list-group-item-action" routerLinkActive="active" [routerLink]="['vendedorCajero']">
            <i class="bi bi-person-lines-fill"></i> Ventas por Vendedor/Cajero
          </a>
          <a class="list-group-item list-group-item-action" routerLinkActive="active" [routerLink]="['horas']">
            <i class="bi bi-clock"></i> Ventas por Hora/Día de la Semana
          </a>
          <a class="list-group-item list-group-item-action" routerLinkActive="active" [routerLink]="['devoluciones']">
            <i class="bi bi-arrow-counterclockwise"></i> Reportes de Devoluciones
          </a>

               
          </div>
      </div>
      <!-- Contenido principal -->
      <div class="col-md-9 col-lg-10 ml-sm-auto px-md-4">
          <h2>Reportes de Ventas:</h2>
          <router-outlet></router-outlet>
      </div>
  </div>
</div>
`,
  styleUrls: ['./inicioRepVentas.component.css'], 
})
export class InicioRepVentasComponent { }
