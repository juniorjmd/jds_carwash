import { Component, Input } from '@angular/core'; 
import { ColumnasTabla } from 'src/app/interfaces/nInterfaces/columnas-tabla';

@Component({
  selector: 'app-table-tr',
  templateUrl: './table-tr.component.html',
  styleUrls: ['./table-tr.component.css']
})
export class TableTrComponent {
  @Input() items !:any[]
  @Input() columnas !:ColumnasTabla[]
  @Input() id !:number;
  @Input() index !:number;
} 

