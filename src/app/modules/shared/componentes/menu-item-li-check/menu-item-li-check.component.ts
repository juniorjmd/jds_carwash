import { Component, Input } from '@angular/core';
import { Recurso } from 'src/app/interfaces/recurso'; 

@Component({
  selector: 'shared-menu-item-li-check',
  templateUrl: './menu-item-li-check.component.html',
  styleUrls: ['./menu-item-li-check.component.css']
})
export class MenuItemLiCheckComponent {
  isDropdownActive:boolean = false;
  @Input() recurso!:Recurso;

   constructor(){
    console.log('recursos :::::  ',this.recurso);
    
   }

  showDropdown() {
    this.isDropdownActive =(this.isDropdownActive)?false: true;
  }

  hideDropdown() {
    this.isDropdownActive = false;
  }
}
