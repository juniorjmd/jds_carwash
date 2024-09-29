import {  Component } from '@angular/core';

@Component({
  selector: 'app-bienvenida-rf', 
  template: `
   <div class="card mt-5">
  <div class="card-header text-center">
  <h1>Reporte Financiero</h1>
</div>
<div class="card-body">
  <div class="row">
    <div class="col-4">
    <h2>Ingresos Totales</h2>
  <p>Ingresos Generados: <strong>$50,000</strong></p>
  <p>Comparación con el mes anterior: <strong>+10%</strong></p>
    </div>
    <div class="col-4">
    <h2>Costos Totales</h2>
  <p>Costos Incurridos: <strong>$30,000</strong></p>
  <p>Comparación con el mes anterior: <strong>+5%</strong></p>
  </div>
  <div class="col-4">
    
  <h2>Beneficio Bruto</h2>
  <p>Beneficio Bruto: <strong>$20,000</strong></p>
  <p>Margen de Beneficio Bruto: <strong>40%</strong></p>
  </div>
  <hr>
   
  <h2>Gastos Operativos</h2>
  <ul class="list-group">
    <li class="list-group-item"><strong>Salarios:</strong> $10,000</li>
    <li class="list-group-item"><strong>Alquiler:</strong> $5,000</li>
    <li class="list-group-item"><strong>Suministros:</strong> $2,000</li>
    <li class="list-group-item"><strong>Marketing:</strong> $1,000</li>
    <li class="list-group-item"><strong>Otros:</strong> $1,000</li>
  </ul>
  <hr>
  <h2>Beneficio Neto</h2>
  <p>Beneficio Neto: <strong>$8,000</strong></p>
  <p>Margen de Beneficio Neto: <strong>16%</strong></p>
  <hr>
  <h2>Estado de Resultados</h2>
  <table class="table">
    <thead>
      <tr>
        <th>Descripción</th>
        <th>Monto</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Ingresos Totales</td>
        <td>$50,000</td>
      </tr>
      <tr>
        <td>Costos Totales</td>
        <td>$30,000</td>
      </tr>
      <tr>
        <td>Gastos Operativos</td>
        <td>$12,000</td>
      </tr>
      <tr>
        <td>Beneficio Neto</td>
        <td>$8,000</td>
      </tr>
    </tbody>
  </table>
  <hr>
  <h2>Flujo de Caja</h2>
  <p>Saldo Inicial: <strong>$5,000</strong></p>
  <p>Flujo de Caja Entrante: <strong>$50,000</strong></p>
  <p>Flujo de Caja Saliente: <strong>$45,000</strong></p>
  <p>Saldo Final: <strong>$10,000</strong></p>
  <hr>
  <h2>Deudas y Cuentas por Pagar</h2>
  <p>Deudas Totales: <strong>$15,000</strong></p>
  <p>Fechas de Vencimiento y Montos Detallados en Tabla</p>
  <hr>
  <h2>Cuentas por Cobrar</h2>
  <p>Cuentas por Cobrar Totales: <strong>$12,000</strong></p>
  <p>Fechas de Vencimiento y Montos Detallados en Tabla</p>
  <hr>
  <h2>Inventario Valorizado</h2>
  <p>Valor Total del Inventario: <strong>$25,000</strong></p>
  <p>Comparación con el mes anterior: <strong>-2%</strong></p>
  <hr>
  <!-- <h2>Ratios Financieros</h2>
  <ul class="list-group">
    <li class="list-group-item"><strong>Ratio de Liquidez:</strong> 1.5</li>
    <li class="list-group-item"><strong>Ratio de Solvencia:</strong> 2.0</li>
    <li class="list-group-item"><strong>Margen de Utilidad:</strong> 16%</li>
    <li class="list-group-item"><strong>Retorno sobre la Inversión (ROI):</strong> 20%</li>
  </ul>-->
</div> </div> `,
  styleUrls: ['./bienvenidaRF.component.css'], 
})
export class BienvenidaRFComponent { }
