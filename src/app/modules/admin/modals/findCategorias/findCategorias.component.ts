import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-find-categorias',  
  templateUrl: './findCategorias.html',
  styleUrls: ['./findCategorias.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindCategoriasComponent { }
