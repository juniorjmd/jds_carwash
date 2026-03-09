import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ApiRoutingModule } from './api-routing.module'; 
import { ApiComponent } from './pages/api/api.component'; 
import { FormsModule } from '@angular/forms';
import { IndexComponent } from './pages/index/index.component';
import { InventariosPorPlantillaComponent } from './pages/inventarios_por_plantilla/inventarios_por_plantilla.component'; 



@NgModule({
  declarations: [
    ApiComponent,  
    InventariosPorPlantillaComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    ApiRoutingModule,
    SharedModule  ,FormsModule  
  ]
})
export class InventarioModule { }
