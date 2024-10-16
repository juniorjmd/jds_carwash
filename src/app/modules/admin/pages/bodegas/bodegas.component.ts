import { Component, OnInit } from '@angular/core';
import { CategoriasModel } from 'src/app/models/categorias.model';

import { loading } from 'src/app/models/app.loading';
import { ProductoService } from 'src/app/services/producto.service'; 
import { BodegasModule } from 'src/app/models/bodegas/bodegas.module';
import { CustomConsole } from 'src/app/models/CustomConsole';

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
      {next:   (datos:any)=>{
         CustomConsole.log('getBodegas',datos); 
    if (datos.numdata > 0 ){
      this.bodegas =  datos.data!.map((x:any)=>x.obj)  ;
      CustomConsole.log('bodegas',this.bodegas);
    }else{
      this.bodegas = [];
    }

        this.loading.hide()
      } ,
      error:(error : any) => {this.loading.hide();
        CustomConsole.log(error)
        alert( error.error.error);
      }}
      );
  }
  setActualizacategoria(categoria:BodegasModule){}
  setAgregarPerfil(categoria:BodegasModule){}
  ngOnInit(): void {
  }

}
