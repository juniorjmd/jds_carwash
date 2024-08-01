import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-fnd-cliente', 
  templateUrl: './modalFndCliente.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFndClienteComponent implements OnInit {

  ngOnInit(): void { }

}
