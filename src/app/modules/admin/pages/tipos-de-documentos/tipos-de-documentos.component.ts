import { Component, OnInit } from '@angular/core';
import { TipoDeDocumentos } from 'src/app/interfaces/tipo-de-documentos';
import { ProductoService } from 'src/app/services/producto.service';
import { loading } from 'src/app/models/app.loading';

@Component({
  selector: 'app-tipos-de-documentos',
  templateUrl: './tipos-de-documentos.component.html',
  styleUrls: ['./tipos-de-documentos.component.css']
})
export class TiposDeDocumentosComponent implements OnInit {
  tiposDeDocumento : TipoDeDocumentos[] = [];
  constructor( private servicePrd : ProductoService ,  private loading : loading ) {
    this.loading.show();
    this.servicePrd.getTiposDeDocumentos().subscribe(
      (respuesta:any)=>{console.log(respuesta)
       
      if (respuesta.error === 'ok'){
         this.tiposDeDocumento = respuesta.data;
      }else{
        alert(respuesta.error);
      }
      
      this.loading.hide();
      }
  
     )
   }

  ngOnInit(): void {
  }

}
