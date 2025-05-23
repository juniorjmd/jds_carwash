import { Component, Input } from '@angular/core';
import { Recurso } from 'src/app/interfaces/recurso';
import { RecursoDetalle } from 'src/app/interfaces/usuario.interface';
import { CustomConsole } from 'src/app/models/CustomConsole';

@Component({
  selector: 'shared-menu-item-li',
  templateUrl: './menu-item-li.component.html',
  styleUrls: ['./menu-item-li.component.css']
})
export class MenuItemLiComponent {
  isDropdownActive:boolean = false;
  @Input() recurso!: RecursoDetalle;

   constructor(){
    CustomConsole.log('recursos :::::  ',this.recurso);
    
   }

  showDropdown() {
    this.isDropdownActive = true;
  }

  hideDropdown() {
    this.isDropdownActive = false;
  }
}
