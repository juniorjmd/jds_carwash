import { Component, Input } from '@angular/core';
import { Recurso } from 'src/app/interfaces/recurso';
import { RecursoDetalle } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'shared-menu-item-li-check',
  templateUrl: './menu-item-li-check.component.html',
  styleUrls: ['./menu-item-li-check.component.css']
})
export class MenuItemLiCheckComponent {
  isDropdownActive:boolean = false;
  @Input() recurso!: Recurso;

   constructor(){
    console.log('recursos :::::  ',this.recurso);
    
   }

  showDropdown() {
    this.isDropdownActive = true;
  }

  hideDropdown() {
    this.isDropdownActive = false;
  }
}
