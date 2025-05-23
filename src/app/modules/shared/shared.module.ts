import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { LiNavItemComponent } from './components/li-nav-item/li-nav-item.component';
import { TabComponent } from './components/tab/tab.component';
import { TableTrComponent } from './components/table-tr/table-tr.component';
import { TableComponent } from './components/table/table.component';
import { UlLinkComponent } from './components/ul-link/ul-link.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'; 
import { columnasTablaCnfg, confAmbiente } from './config';
import { DropdownFndComponent } from './components/dropdown-fnd/dropdown-fnd.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { booleanpPipe } from 'src/app/pipes/booleanp.pipe';
import { dataArrayOdooPipe } from 'src/app/pipes/dataArrayOdoo.pipe';
import { ImgB64Pipe } from 'src/app/pipes/imgB64.pipe';
import { Modal1Component } from 'src/app/modules/shared/components/modal1/modal1.component'; 
import { DialogoConfirmacionComponent } from './components/dialogo-confirmacion/dialogo-confirmacion.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MenucardsComponent } from './components/menucards/menucards.component';
import { MenuItemLiComponent } from './components/menu-item-li/menu-item-li.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OnlyNumberDirective } from 'src/app/directives/OnlyNumberDirective';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DocumentosDropdownComponent } from './components/documentos-dropdown/documentos-dropdown.component'; 
import { FndClienteComponent } from './modals/fnd-cliente/fnd-cliente.component';
import { EmpleadosDropdownComponent } from './components/empleados-dropdown/empleados-dropdown.component';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';   
import { MarcasDropdownComponent } from './components/marcas-dropdown/marcas-dropdown.component';
import { CategiasDropdownComponent } from './components/categorias-dropdown/categorias-dropdown.component';
import { LineBreakPipe } from './pipes/line-break.pipe';
import { productosVendidosDropdownComponent } from './components/productosVendidos-dropdown/productosVendidos-dropdown.component';
import { categoriasVendidasDropdownComponent } from './components/categoriasVendidas-dropdown/categoriasVendidas-dropdown.component';
import { vendedoresDropdownComponent } from './components/vendedores-dropdown/vendedores-dropdown.component';
import { usuarioDropdownComponent } from './components/usuario-dropdown/usuario-dropdown.component';  
import { MenuItemLiCheckComponent } from './components/menu-item-li-check/menu-item-li-check.component';
@NgModule({
  declarations: [
    FndClienteComponent,
    LiNavItemComponent ,
    OnlyNumberDirective,
    Modal1Component   ,
    MenucardsComponent,
    DialogoConfirmacionComponent,
    LoadingComponent,
    booleanpPipe,
    ImgB64Pipe ,
    dataArrayOdooPipe,
    TabComponent,
    TableComponent,
    TableTrComponent,
    UlLinkComponent,
    DropdownFndComponent,
    NavbarComponent,
    MenuItemLiComponent,MenuItemLiCheckComponent,
    DropdownComponent,
    DocumentosDropdownComponent,vendedoresDropdownComponent,
    EmpleadosDropdownComponent ,MarcasDropdownComponent, CategiasDropdownComponent , LineBreakPipe, categoriasVendidasDropdownComponent 
  ,productosVendidosDropdownComponent, usuarioDropdownComponent
  ],
  imports: [ NgbModule , 
    NgxBootstrapIconsModule.pick(allIcons)  ,
    NgxDatatableModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule, 
    MatDialogModule ,
    MatButtonModule ,
    MatCheckboxModule ,
  ],
  exports:[FndClienteComponent, MenuItemLiComponent,MenuItemLiCheckComponent,
    LiNavItemComponent ,DropdownFndComponent,DocumentosDropdownComponent,categoriasVendidasDropdownComponent ,
    TabComponent,usuarioDropdownComponent,
    TableComponent ,
    TableTrComponent,vendedoresDropdownComponent,
    UlLinkComponent , 
    booleanpPipe,
    ImgB64Pipe ,
    dataArrayOdooPipe,
    Modal1Component, Modal1Component   ,LineBreakPipe,
    MenucardsComponent,
    DialogoConfirmacionComponent,
    NavbarComponent,
    LoadingComponent, OnlyNumberDirective,
    ReactiveFormsModule ,EmpleadosDropdownComponent, 
    RouterModule,
    FormsModule,
    CommonModule,
    MatDialogModule ,
    MatButtonModule ,
    MatCheckboxModule  ,
    MarcasDropdownComponent,
    CategiasDropdownComponent, 
    productosVendidosDropdownComponent
  ]
})
export class SharedModule { }

export const colTablaCnfg =  columnasTablaCnfg
export const ambiente =  confAmbiente;
