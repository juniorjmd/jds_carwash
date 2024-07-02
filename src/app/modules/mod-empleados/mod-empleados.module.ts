import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreacionEdicionComponent } from './pages/creacion-edicion/creacion-edicion.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { PagosComponent } from './pages/pagos/pagos.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EmpleadosRoutingModule } from './empleados-routing.module';



@NgModule({
  declarations: [ 
    EmpleadosComponent,  
    PagosComponent, 
    CreacionEdicionComponent,  
  ],
  imports: [ 
    CommonModule,
    FormsModule, 
    EmpleadosRoutingModule , 
    SharedModule
  ]
})
export class ModEmpleadosModule { }
