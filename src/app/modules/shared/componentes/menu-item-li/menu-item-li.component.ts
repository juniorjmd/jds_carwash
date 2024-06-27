import { Component, Input } from '@angular/core';
import { RecursoDetalle } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'shared-menu-item-li',
  templateUrl: './menu-item-li.component.html',
  styleUrls: ['./menu-item-li.component.css']
})
export class MenuItemLiComponent {

  @Input() recurso!: RecursoDetalle;
}
