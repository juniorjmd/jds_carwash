import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><i class="bi bi-calendar3"></i> Resumen de Ventas Diarias</li>
        <li class="list-group-item"><i class="bi bi-tags"></i> Resumen de Ventas por Producto</li>
        <li class="list-group-item"><i class="bi bi-box-seam"></i> Ventas por Categoría</li>
        <li class="list-group-item"><i class="bi bi-person-lines-fill"></i> Ventas por Vendedor/Cajero</li>
        <li class="list-group-item"><i class="bi bi-clock"></i> Ventas por Hora/Día de la Semana</li>
        <li class="list-group-item"><i class="bi bi-arrow-counterclockwise"></i> Reportes de Devoluciones</li>
      </ul>
      <div class="text-center mt-4">
        <a  [routerLink]="['ventas/productos']" class="btn btn-primary">Ir a los Reportes de Ventas</a>
      </div>
    </div>
  </div>
</div>`,
  styleUrls: ['./bienvenidaRP.component.css'], 
})
export class BienvenidaRPComponent { }
