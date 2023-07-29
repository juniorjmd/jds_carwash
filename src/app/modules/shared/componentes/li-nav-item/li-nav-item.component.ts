import { Component, Input } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';

@Component({
  selector: 'app-li-nav-item',
  templateUrl: './li-nav-item.component.html',
  styleUrls: ['./li-nav-item.component.css']
})
export class LiNavItemComponent {

  @Input()
  itemMenu!: Menu;
  
}
