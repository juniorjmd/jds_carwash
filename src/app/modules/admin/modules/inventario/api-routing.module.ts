import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { ApiComponent } from './pages/api/api.component';  
import { IndexComponent } from './pages/index/index.component';
import { InventariosPorPlantillaComponent } from './pages/inventarios_por_plantilla/inventarios_por_plantilla.component'; 

const routes: Routes = [{ path: '', component: ApiComponent , 
                       children:[  
                        { path: 'inventario_por_plantilla', component: InventariosPorPlantillaComponent} , 
                        { path: 'inicio', component: IndexComponent    } ,  
                        { path : '**' , pathMatch:'full' , redirectTo : 'inicio'} 
                                 ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiRoutingModule { }
