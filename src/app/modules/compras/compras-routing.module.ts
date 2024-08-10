import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprasComponent } from './compras.component';
import { ListarComprasComponent } from './pages/listar/listar.component';
import { CreateComprasComponent } from './pages/crear/crearCompra.component';
import { AnularComprasComponent } from './pages/anular/anular.component';
import { listarNotasDebitoComponent } from './pages/listar_notas_debito/listarNotasDebito.component';
import { AbonosCuentasPorPagarComponent } from './pages/abonos-cuentas-por-pagar/abonos-cuentas-por-pagar.component';

const routes: Routes = [{ path: '', component: ComprasComponent , children:[
  { path: 'listar', component: ListarComprasComponent  },
  { path: 'crear', component: CreateComprasComponent  } , 
  { path: 'anular', component: AnularComprasComponent  }, 
  { path: 'listarAnulaciones', component: listarNotasDebitoComponent  },
  { path: 'abonarCredito', component: AbonosCuentasPorPagarComponent  },
  { path : '**' , pathMatch:'full' , redirectTo : 'listar'}, 

]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
