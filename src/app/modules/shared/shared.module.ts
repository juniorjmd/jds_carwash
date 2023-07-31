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
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [LiNavItemComponent ,
    TableTrComponent,
    TableComponent ,
    TabComponent,
    UlLinkComponent,
    DropdownFndComponent],
  imports: [ NgbModule ,
    NgxBootstrapIconsModule.pick(allIcons)  ,
    NgxDatatableModule,RouterModule,FormsModule,CommonModule


  ],
  exports:[LiNavItemComponent ,DropdownFndComponent,
    TableTrComponent,
    TableComponent ,
    TabComponent,
    UlLinkComponent ]
})
export class SharedModule { }

export const colTablaCnfg =  columnasTablaCnfg
export const ambiente =  confAmbiente;
