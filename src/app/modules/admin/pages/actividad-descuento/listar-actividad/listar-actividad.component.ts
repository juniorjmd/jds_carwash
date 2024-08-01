import { Component, inject } from '@angular/core';
import { actividadesRequest } from 'src/app/interfaces/producto-request';
import { ActividadesDescuentoModel } from 'src/app/models/actividadesDescuentoModel';
import { ActiDescuentoService } from 'src/app/services/actiDescuento.service';

@Component({
  selector: 'app-listar-actividad',
  templateUrl: './listar-actividad.component.html',
  styleUrls: ['./listar-actividad.component.css']
})
export class ListarActividadComponent {

    actividades:ActividadesDescuentoModel[] =[];

    private serviceAct = inject(ActiDescuentoService)
    constructor(){
      console.log('entro primero aqui en ListarActividadComponent');
      
      this.serviceAct.getActividades().subscribe({next:(value:actividadesRequest)=>{
        this.actividades = value.data;
      }})
    }
    verDetalle(detalle:ActividadesDescuentoModel){
      console.log(detalle);
      
    }
}
