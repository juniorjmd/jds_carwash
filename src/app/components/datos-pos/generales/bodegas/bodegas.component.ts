import { Component, OnInit } from '@angular/core';
import { CategoriasModel } from 'src/app/models/categorias.model';

import { loading } from 'src/app/models/app.loading';
import { ProductoService } from 'src/app/services/producto.service';
import { select } from 'src/app/interfaces/generales.interface';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { BodegasModule } from 'src/app/models/bodegas/bodegas.module';

@Component({
  selector: 'app-bodegas',
  templateUrl: './bodegas.component.html',
  styleUrls: ['./bodegas.component.css']
})
export class BodegasComponent implements OnInit {
  bodegas:any[] = [];
  constructor(private loading : loading,
    private productoService:ProductoService) { 
      this.getBodegas();
    }
  getBodegas(){ 
    this.loading.show()
    this.productoService.getbodegas().subscribe(
      (datos:select)=>{
         console.log(datos);
         /* @Inject(String) public nombre:string,
  @Inject(Number) public estado:number,
  
  @Inject(String) public descripcion?:string,
  @Inject(Number) public id?:number,
  @Inject(String) public nombre_estado?:string*/
    if (datos.numdata > 0 ){ 
      datos.data.forEach((dato:BodegasModule , index )=>{
        this.bodegas[index] = new BodegasModule(dato.nombre,
                                                dato.estado,
                                                dato.descripcion,
                                                dato.id,
                                                dato.nombre_estado
        ) ; 
      }) 
      console.log('bodegas',this.bodegas);
    }else{
      this.bodegas = [];
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
