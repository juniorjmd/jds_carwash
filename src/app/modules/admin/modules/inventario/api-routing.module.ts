import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { ApiComponent } from './pages/api/api.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { InventariosComponent } from './pages/inventarios/inventarios.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { BodegasComponent } from './pages/bodegas/bodegas.component';
import { ExistenciasComponent } from './pages/existencias/existencias.component';
import { LotesComponent } from './pages/lotes/lotes.component';
import { GruposComponent } from './pages/grupos/grupos.component';
import { DescuentosComponent } from './pages/descuentos/descuentos.component';
import { ActividadesDescuentosComponent } from './pages/actividades-descuentos/actividades-descuentos.component';
import { WrkInventarioComponent } from './pages/wrk-inventario/wrk-inventario.component'; 
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [{ path: '', component: ApiComponent , 
                       children:[
                        { path: 'inicio', component: IndexComponent    } , 
                        { path: 'inventario', component: InventariosComponent    } , 
                        { path: 'inventario/wrk', component: WrkInventarioComponent},
                        { path: 'categorias', component: CategoriasComponent} , 
                        { path: 'marcas', component: MarcasComponent} , 
                        { path: 'productos', component: ProductosComponent} , 
                        { path: 'bodegas', component: BodegasComponent} , 
                        { path: 'existencias', component: ExistenciasComponent} , 
                        { path: 'lotes', component: LotesComponent} , 
                        { path: 'gruposProductos', component: GruposComponent} , 
                        { path: 'descuentos', component: DescuentosComponent} , 
                        { path: 'actividades', component: ActividadesDescuentosComponent} ,  
                        { path : '**' , pathMatch:'full' , redirectTo : 'inicio'} 
                                 ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiRoutingModule { }
