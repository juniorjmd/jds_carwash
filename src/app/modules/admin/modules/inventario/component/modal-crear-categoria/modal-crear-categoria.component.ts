import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './modal-crear-categoria.component.html',
  styleUrls: ['./modal-crear-categoria.component.css']
})
export class ModalCrearCategoriaComponent {
  constructor(public bsModalRef: BsModalRef) { }
}
