import { Component, OnInit } from '@angular/core';
import { CategoriasModel } from 'src/app/models/categorias.model';

import { loading } from 'src/app/models/app.loading';
import { ProductoService } from 'src/app/services/producto.service';
import { select } from 'src/app/interfaces/generales.interface';
import { Categoria } from 'src/app/interfaces/categoria.interface';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: CategoriasModel[] = []; 
  constructor( private loading : loading,
   private productoService:ProductoService
    ) {this.getUsuarios() }
  crearCategoria(){

  }
  getUsuarios(){ 
    this.loading.show()
    this.productoService.getCategorias().subscribe(
      (datos:select)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      datos.data.forEach((dato:Categoria , index )=>{
        this.categorias[index] = new CategoriasModel(dato) ;
      }) 
      console.log(this.categorias);
    }else{
      this.categorias = [];
    }

        this.loading.hide()
      } ,
      error => {this.loading.hide();
        console.log(error)
        alert( error.error.error);
      }
      );
  }

  ngOnInit(): void {
  }

}
