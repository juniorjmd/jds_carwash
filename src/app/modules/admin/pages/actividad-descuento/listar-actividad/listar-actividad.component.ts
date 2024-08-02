import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { actividadesDetalleRequest, actividadesRequest } from 'src/app/interfaces/producto-request';
import { ActividadesDescuentoModel } from 'src/app/models/actividadesDescuentoModel';
import { CategoriasModel } from 'src/app/models/categorias.model';
import { ClientesModel } from 'src/app/models/clientes/clientes.module';
import { MarcasModel } from 'src/app/models/marcas/marcas.module';
import { ProductoModel } from 'src/app/models/producto/producto.module';
import { ActiDescuentoService } from 'src/app/services/actiDescuento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-actividad',
  templateUrl: './listar-actividad.component.html',
  styleUrls: ['./listar-actividad.component.css']
})
export class ListarActividadComponent {

    actividades:ActividadesDescuentoModel[] =[];

    productos:ProductoModel[] = [];
    categorias:CategoriasModel[] = [];
    marcas:MarcasModel[] = [] ;
    clientes: ClientesModel[] = [] ;

    private serviceAct = inject(ActiDescuentoService)
    constructor(){
      console.log('entro primero aqui en ListarActividadComponent');
      
      this.serviceAct.getActividades().subscribe({next:(value:actividadesRequest)=>{
        this.actividades = value.data;
      }})
    }
    verDetalle(detalle:ActividadesDescuentoModel){
      console.log(detalle);
      this.serviceAct.getDetalleActividad(detalle).subscribe({next:(value:actividadesDetalleRequest)=>{ 

        console.log('data response detalle' , value.data);
        let html = '<table class ="table" >';
      if(value.numdata > 0 ){
        switch(detalle.tipo){
          case 'PRD' : 
              this.productos = value.data ;

            this.productos.forEach(x=>{
              html += `<tr><td>cod : ${x.id}  Nombre : ${x.nombre} | ${x.nombre2} | ${x.nombre3} </td></tr>      `;
            })
          break;
          case 'CAT' : 
          this.categorias = value.data ;
          break;
          case 'CLI' : 
          this.clientes = value.data ;
          break;
          case 'BRD' : 
          this.marcas = value.data ;
          break;
        }
        html += '</table>'
        Swal.fire({title:`Detalle actividad ${detalle.nombre}`,html });
        
      }   
            
      },error:error=>Swal.fire('error', error.error.error,'error')})
      
    }
}
