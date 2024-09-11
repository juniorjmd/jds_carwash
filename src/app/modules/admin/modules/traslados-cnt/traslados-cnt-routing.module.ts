import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrasladosCntComponent } from './traslados-cnt.component';
import { TrasladoDesdeCajaComponent } from './pages/trasladoDesdeCaja/trasladoDesdeCaja.component'; 
import { TrasladoParaAsignarSaldoComponent } from './pages/trasladoParaAsignarSaldo/trasladoParaAsignarSaldo.component';
import { trasladoDeMuchasAUnaComponent } from './pages/trasladoDeMuchasAUna/trasladoDeMuchasAUna.component';
import { trasladoDeUnaAMuchasComponent } from './pages/trasladoDeUnaAMuchas/trasladoDeUnaAMuchas.component';
 
const routes: Routes = [{ path: '', component: TrasladosCntComponent , children : [
  { path: 'desdeCaja', component: TrasladoDesdeCajaComponent },
  { path: 'asignarSaldos', component: TrasladoParaAsignarSaldoComponent },
  { path: 'moverHaciaMuchasCnts', component: trasladoDeUnaAMuchasComponent },
  { path: 'moverDesdeMuchasCnts', component: trasladoDeMuchasAUnaComponent },
  { path: '**',pathMatch:'full' , redirectTo : 'desdeCaja' }

] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrasladosCntRoutingModule { }
