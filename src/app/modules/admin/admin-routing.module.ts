import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { CajasDetalleComponent } from './pages/cajas/cajas-detalle.component';
import { CajasNuevaComponent } from './pages/cajas/cajas-nueva.component';  
import { GeneralesComponent } from './pages/generales.component';
import { BodegasComponent } from './pages/bodegas/bodegas.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ContadoresComponent } from './pages/contadores/contadores.component'; 
import { CrearComponent } from './pages/establecimientos/crear.component';
import { ImpuestosComponent } from './pages/impuestos/impuestos.component'; 
import { MediosDePagoComponent } from './pages/medios-de-pago/medios-de-pago.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { TiposDeDocumentosComponent } from './pages/tipos-de-documentos/tipos-de-documentos.component';
import { DescuentosComponent } from './pages/descuentos/descuentos.component';
import { ActividadDescuentoComponent } from './pages/actividad-descuento/actividad-descuento.component';
import { ListarActividadComponent } from './pages/actividad-descuento/listar-actividad/listar-actividad.component';
import { CrearActividadComponent } from './pages/actividad-descuento/crear-actividad/crear-actividad.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [{ path : '' , component: IndexComponent,
              children:[
                {path : 'bodegas' , component:BodegasComponent},
                {path : 'inicio' , component:GeneralesComponent},
                {path : 'descuentos' , component:DescuentosComponent}, 
                { path : 'contadores' ,      component: ContadoresComponent},
                { path : 'Medios' ,      component: MediosDePagoComponent},
                { path : 'inventarios' ,   loadChildren: () => import('./modules/inventario/inventario.module').then(m => m.InventarioModule) },
                { path : 'cuentasContables' ,   loadChildren: () => import('./modules/cuentas-contables/cuentas-contables.module').then(m => m.CuentasContablesModule) },
                { path : 'categorias' ,      component: CategoriasComponent},
                { path : 'productos' ,      component: ProductosComponent},
                { path : 'tipoDocumentos' ,      component: TiposDeDocumentosComponent},
                { path : 'establecimientos' ,    component: CrearComponent}, 
                { path : 'impuestos', component:ImpuestosComponent}, 
                { path : 'caja' ,      component: CajasNuevaComponent}, 
                { path: 'trasladosCnt', loadChildren: () => import('./modules/traslados-cnt/traslados-cnt.module').then(m => m.TrasladosCntModule) },
                { path : 'cajaDetalle:id' ,      component: CajasDetalleComponent},
                { path : 'actividadesDescuento' ,      component: ActividadDescuentoComponent,children:[
                  { path : 'listar' ,      component: ListarActividadComponent},
                  { path : 'crear' ,      component: CrearActividadComponent},
                  { path : '**' , pathMatch:'full' , redirectTo : 'listar'}
                ]}, 
                
                { path : '**' , pathMatch:'full' , redirectTo : 'inicio'} 
              ]          
              },
              ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
