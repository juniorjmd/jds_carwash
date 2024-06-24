import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'; 
import { ModalCrearCategoriaComponent } from '../../component/modal-crear-categoria/modal-crear-categoria.component';
import { colTablaCnfg } from 'src/app/modules/shared/shared.module';
import { CategoriasService } from 'src/app/services/nServices/categorias.service';
import { ColumnasTabla } from 'src/app/interfaces/nInterfaces/columnas-tabla';
import { Categoria } from 'src/app/interfaces/nInterfaces/categoria';

@Component({
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit  {
  origen = 'categorias';
datos!:Categoria[] ;  



ColumnasTabla:ColumnasTabla[] = colTablaCnfg.categorias; 

bsModalRef!: BsModalRef;
constructor( private catService : CategoriasService , private modalService: BsModalService){


}


ngOnInit() {
  this.catService.getCategorias().subscribe(
    {next:(value)=>{
      this.datos = value.categorias;
      console.log('CategoriasComponent - getCategorias' , value , this.datos); 
    },
    error:error=>console.error(error)
  }
  )
}



openModal() {
  this.bsModalRef = this.modalService.show(ModalCrearCategoriaComponent);
}


}
