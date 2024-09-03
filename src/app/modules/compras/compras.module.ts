import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { ComprasComponent } from './compras.component';
import { CreateComprasComponent } from './pages/crear/crearCompra.component';
import { AnularComprasComponent } from './pages/anular/anular.component';
import { ListarComprasComponent } from './pages/listar/listar.component';
import { SharedModule } from '../shared/shared.module';
import { ModalUpdateProductoCompraComponent } from './modals/ModalUpdateProductoVenta/ModalUpdateProductoCompra.component';
import { GenerarCntPorPagarComponent } from './modals/generar-cnt-por-pagar/generar-cnt-por-pagar.component';
import { listarNotasDebitoComponent } from './pages/listar_notas_debito/listarNotasDebito.component';
import { pagosSaldoNotasDebitoComponent } from './modals/pagos-saldo-notas-debito/pagos-saldo-notas-debito.component';
import { AbonosCuentasPorPagarComponent } from './pages/abonos-cuentas-por-pagar/abonos-cuentas-por-pagar.component';
import { PagosCPPComponent } from './modals/pagos-CPP/pagos-CPP.component';
import { EditarComprasComponent } from './pages/editar/editarCompra.component';


@NgModule({
  declarations: [GenerarCntPorPagarComponent,listarNotasDebitoComponent,pagosSaldoNotasDebitoComponent,AbonosCuentasPorPagarComponent,
    ComprasComponent,CreateComprasComponent , PagosCPPComponent,EditarComprasComponent,
    AnularComprasComponent , ListarComprasComponent , ModalUpdateProductoCompraComponent
  ],
  imports: [ 
    ComprasRoutingModule 
    , SharedModule
  ]
})
export class ComprasModule { }
