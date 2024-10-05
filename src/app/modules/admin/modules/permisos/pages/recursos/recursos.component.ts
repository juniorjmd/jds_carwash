import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-recursos', 
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecursosComponent { }
