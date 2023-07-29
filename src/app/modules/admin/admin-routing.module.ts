import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CajasDetalleComponent } from './pages/cajas-detalle.component';
import { CajasNuevaComponent } from './pages/cajas-nueva.component';
import { CajasComponent } from './pages/cajas.component';
import { DatosPosComponent } from './pages/datos-pos.component';
import { GeneralesComponent } from './pages/generales.component';
import { BodegasComponent } from './pages/generales/bodegas/bodegas.component';
import { CategoriasComponent } from './pages/generales/categorias/categorias.component';
import { ContadoresComponent } from './pages/generales/contadores/contadores.component';
import { CuentasCntComponent } from './pages/generales/cuentas-cnt/cuentas-cnt.component';
import { CrearComponent } from './pages/generales/establecimientos/crear.component';
import { ImpuestosComponent } from './pages/generales/impuestos/impuestos.component';
import { InventariosComponent } from './pages/generales/inventarios/inventarios.component';
import { MediosDePagoComponent } from './pages/generales/medios-de-pago/medios-de-pago.component';
import { ProductosComponent } from './pages/generales/productos/productos.component';
import { TiposDeDocumentosComponent } from './pages/generales/tipos-de-documentos/tipos-de-documentos.component';

const routes: Routes = [{ path : '' , component: DatosPosComponent,
              children:[
                {path : 'bodegas' , component:BodegasComponent},
                { path : 'generales' ,      component: GeneralesComponent},
                { path : 'contadores' ,      component: ContadoresComponent},
                { path : 'Medios' ,      component: MediosDePagoComponent},
                { path : 'inventarios' ,      component: InventariosComponent},
                { path : 'categorias' ,      component: CategoriasComponent},
                { path : 'productos' ,      component: ProductosComponent},
                { path : 'tipoDocumentos' ,      component: TiposDeDocumentosComponent},
                { path : 'establecimientos' ,    component: CrearComponent},
                { path : 'cuentasContables', component:CuentasCntComponent},
                { path : 'impuestos', component:ImpuestosComponent},
                { path : 'caja' ,      component: CajasComponent},
                { path : 'cajaNueva' ,      component: CajasNuevaComponent},
                { path : 'cajaDetalle:id' ,      component: CajasDetalleComponent},
                { path : '**' , pathMatch:'full' , redirectTo : 'generales'}, 
              ]          
              } ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
