import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { PersonasRoutingModule } from './personas-routing.module';
import { ClienteDetalleComponent } from './pages/clientes/cliente-detalle.component';
import { ClienteInicioComponent } from './pages/clientes/cliente-inicio.component';
import { ClienteNuevoComponent } from './pages/clientes/cliente-nuevo.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { FndClienteComponent } from './pages/clientes/fnd-cliente/fnd-cliente.component';
import { MaestrosComponent } from './pages/clientes/maestros/maestros.component';
import { MaestrosNavComponent } from './pages/clientes/maestros/navbar.component';
import { CiudadesComponent } from './pages/clientes/maestros/ubicacion/ciudades.component';
import { DepartamentosComponent } from './pages/clientes/maestros/ubicacion/departamentos.component';
import { NewCiudadComponent } from './pages/clientes/maestros/ubicacion/new-ciudad.component';
import { NewDepartamentoComponent } from './pages/clientes/maestros/ubicacion/new-departamento.component';
import { NewPaisComponent } from './pages/clientes/maestros/ubicacion/new-pais.component';
import { PaisesComponent } from './pages/clientes/maestros/ubicacion/paises.component'; 
import { booleanpPipe } from 'src/app/pipes/booleanp.pipe';
import { dataArrayOdooPipe } from 'src/app/pipes/dataArrayOdoo.pipe';
import { ImgB64Pipe } from 'src/app/pipes/imgB64.pipe';



@NgModule({
  declarations: [
    ClientesComponent,
    ClienteNuevoComponent,
    ClienteInicioComponent,
    ClienteDetalleComponent,
    
    booleanpPipe,
    ImgB64Pipe ,
    dataArrayOdooPipe,
    CiudadesComponent,
    DepartamentosComponent,
    PaisesComponent,
    NewCiudadComponent,
    NewPaisComponent,
    NewDepartamentoComponent,

    MaestrosNavComponent , 
    MaestrosComponent,
    FndClienteComponent
  
  ],
  
  imports: [
    CommonModule,FormsModule, 
    PersonasRoutingModule 
  ]
})
export class PersonasModule { }
