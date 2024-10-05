import {  Component } from '@angular/core';

@Component({
  selector: 'app-bienvenida-rf', 
  template: `<div>
  <div class="card">
    <div class="card-header text-center">
      <h1>Bienvenida al Reporte Financiero</h1>
    </div>
    <div class="card-body">
      <div class="text-center mb-4">
        <i class="bi bi-currency-exchange" style="font-size: 4rem; color: #007bff;"></i>
      </div>
      <h2 class="card-title text-center">Resumen Financiero</h2>
      <p class="card-text text-center">
        En este módulo, podrás encontrar diversos reportes detallados sobre el estado financiero de tu negocio. Los reportes disponibles incluyen:
      </p>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><i class="bi bi-wallet2"></i> Movimientos de Caja</li>
        <li class="list-group-item"><i class="bi bi-cash-stack"></i> Movimientos de Gastos</li>
        <li class="list-group-item"><i class="bi bi-arrow-left-right"></i> Movimientos en una o más cuentas</li>
        <li class="list-group-item"><i class="bi bi-file-earmark-minus"></i> Cuentas por Pagar</li>
        <li class="list-group-item"><i class="bi bi-file-earmark-plus"></i> Cuentas por Cobrar</li>
      </ul>
      <div class="text-center mt-4">
        <a [routerLink]="['caja']" class="btn btn-primary mb-2">Movimientos de Caja</a>
        <a [routerLink]="['gastos']" class="btn btn-primary mb-2">Movimientos de Gastos</a>
        <a [routerLink]="['movimientos']" class="btn btn-primary mb-2">Movimientos en una o más cuentas</a>
        <a [routerLink]="['cuentasPorPagar']" class="btn btn-primary mb-2">Cuentas por Pagar</a>
        <a [routerLink]="['cuentasPorCobrar']" class="btn btn-primary mb-2">Cuentas por Cobrar</a>
      </div>
      <hr>
    </div>
  </div>
</div>
 `,
  styleUrls: ['./bienvenidaRF.component.css'], 
})
export class BienvenidaRFComponent { }
