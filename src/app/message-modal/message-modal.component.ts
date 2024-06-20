import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importar NgbActiveModal si estás utilizando ng-bootstrap

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css'],
})
export class MessageModalComponent {
  @Input() message = '';

  constructor(public activeModal: NgbActiveModal) {} // Inyectar NgbActiveModal si estás utilizando ng-bootstrap

  close(result: boolean) {
    this.activeModal.close(result);
  }
}
