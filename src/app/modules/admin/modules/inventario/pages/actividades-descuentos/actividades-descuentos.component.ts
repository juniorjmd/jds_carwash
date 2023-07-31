import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Categoria } from 'src/app/interfaces/nInterfaces/categoria';
import { ColumnasTabla } from 'src/app/interfaces/nInterfaces/columnas-tabla';
import { ModalCrearActDescuentoComponent } from '../../component/modal-crear-act-descuento/modal-crear-act-descuento.component';

@Component({
  templateUrl: './actividades-descuentos.component.html',
  styleUrls: ['./actividades-descuentos.component.css']
})
export class ActividadesDescuentosComponent {
  origen = 'actividades';
  datos:Categoria[] = [
    {
      "id": 1,
      "nombre": "HOSPITALARIO",
      "descripcion": "HOSPITALARIO",
      "categoriaPadre": 0
    },
    {
      "id": 2,
      "nombre": "GENERICOS",
      "descripcion": "GENERICOS",
      "categoriaPadre": 0
    },
    {
      "id": 3,
      "nombre": "COMERCIALES",
      "descripcion": "COMERCIALES",
      "categoriaPadre": 0
    },
    {
      "id": 4,
      "nombre": "HELADOS",
      "descripcion": "HELADOS",
      "categoriaPadre": 0
    }] ;  
  ColumnasTabla:ColumnasTabla[] = [{ name : 'nombre' , columna : 'nombre' }, 
  { name : 'descripcion' , columna : 'descripcion' }
  ];


  bsModalRef!: BsModalRef;
constructor(   private modalService: BsModalService){ 

}

  
openModal() {
  this.bsModalRef = this.modalService.show(ModalCrearActDescuentoComponent);
}
}
