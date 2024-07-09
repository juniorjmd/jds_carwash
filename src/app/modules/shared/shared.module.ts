import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { LiNavItemComponent } from './componentes/li-nav-item/li-nav-item.component';
import { TabComponent } from './componentes/tab/tab.component';
import { TableTrComponent } from './componentes/table-tr/table-tr.component';
import { TableComponent } from './componentes/table/table.component';
import { UlLinkComponent } from './componentes/ul-link/ul-link.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'; 
import { columnasTablaCnfg, confAmbiente } from './config';
import { DropdownFndComponent } from './componentes/dropdown-fnd/dropdown-fnd.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { booleanpPipe } from 'src/app/pipes/booleanp.pipe';
import { dataArrayOdooPipe } from 'src/app/pipes/dataArrayOdoo.pipe';
import { ImgB64Pipe } from 'src/app/pipes/imgB64.pipe';
import { Modal1Component } from 'src/app/modules/shared/componentes/modal1/modal1.component'; 
import { DialogoConfirmacionComponent } from './componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { LoadingComponent } from './componentes/loading/loading.component';
import { MenucardsComponent } from './componentes/menucards/menucards.component';
import { MenuItemLiComponent } from './componentes/menu-item-li/menu-item-li.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { OnlyNumberDirective } from 'src/app/directives/OnlyNumberDirective';
 
@NgModule({
  declarations: [LiNavItemComponent ,OnlyNumberDirective,
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
    MenuItemLiComponent],
  imports: [ NgbModule ,
    NgxBootstrapIconsModule.pick(allIcons)  ,
    NgxDatatableModule,RouterModule,FormsModule,CommonModule


  ],
  exports:[LiNavItemComponent ,DropdownFndComponent,
    TabComponent,
    TableComponent ,
    TableTrComponent,
    UlLinkComponent , 
    booleanpPipe,
    ImgB64Pipe ,
    dataArrayOdooPipe,
    Modal1Component, Modal1Component   ,
    MenucardsComponent,
    DialogoConfirmacionComponent,
    NavbarComponent,
    LoadingComponent, OnlyNumberDirective
  ]
})
export class SharedModule { }

export const colTablaCnfg =  columnasTablaCnfg
export const ambiente =  confAmbiente;
