import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'; 
import { ModalCrearMarcaComponent } from '../../component/modal-crear-marca/modal-crear-marca.component';
import { ColumnasTabla } from 'src/app/interfaces/nInterfaces/columnas-tabla';
import { Categoria } from 'src/app/interfaces/nInterfaces/categoria';

@Component({
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent {
  origen = 'marcas';
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
  this.bsModalRef = this.modalService.show(ModalCrearMarcaComponent);
}
}
