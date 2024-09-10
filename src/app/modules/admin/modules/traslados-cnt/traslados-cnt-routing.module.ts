import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrasladosCntComponent } from './traslados-cnt.component';
import { TrasladoDesdeCajaComponent } from './pages/trasladoDesdeCaja/trasladoDesdeCaja.component';
/* <a  [routerLink]="[ 'desdeCaja'] "  routerLinkActive="active"  class="list-group-item list-group-item-action ">Desde Caja</a>
                <a  [routerLink]="[ 'asignarSaldos'] "  routerLinkActive="active"  class="list-group-item list-group-item-action">Asignar Saldos Cuenta</a>
                <a  [routerLink]="[ 'moverHaciaMuchasCnts'] "  routerLinkActive="active"  class="list-group-item list-group-item-action">Desde una cuenta a muchas</a>
                <a  [routerLink]="[ 'moverDesdeMuchasCnts'] "  routerLinkActive="active"  class="list-group-item list-group-item-action">Hacia una cuenta de muchas</a>
                
               */
const routes: Routes = [{ path: '', component: TrasladosCntComponent , children : [
  { path: 'desdeCaja', component: TrasladoDesdeCajaComponent },
  { path: 'asignarSaldos', component: TrasladosCntComponent },
  { path: 'moverHaciaMuchasCnts', component: TrasladosCntComponent },
  { path: 'moverDesdeMuchasCnts', component: TrasladosCntComponent },
  { path: '**',pathMatch:'full' , redirectTo : 'desdeCaja' }

] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrasladosCntRoutingModule { }
