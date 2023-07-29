import { Component, Input } from '@angular/core';
import { Menu } from '../../../../interfaces/menu';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {
@Input() menus!: Menu[] 
@Input() titulo!:string ;
 
}
