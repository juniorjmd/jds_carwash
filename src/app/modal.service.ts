import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { MessageModalComponent } from './message-modal/message-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) {} 

  openConfirmationModal(message: string): Promise<boolean> {
    const modalRef = this.modalService.open(MessageModalComponent, { centered: true });
    modalRef.componentInstance.message = message;

    return modalRef.result.then((result) => {
      return Promise.resolve(result); // Resuelve la promesa con el resultado (true o false)
    }).catch(() => {
      return Promise.resolve(false); // Manejar el caso de cierre del modal sin selección
    });
  }
}
