import { Component, OnInit } from '@angular/core';
import { TipoVehiculoModule } from 'src/app/models/tipo-vehiculo/tipo-vehiculo.module';

import { loading } from 'src/app/models/app.loading';
import { VehiculosService } from 'src/app/services/vehiculos.service'; 
import { select } from 'src/app/interfaces/generales.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css']
})
export class TiposComponent   {
  tiposVehiculo:TipoVehiculoModule[] = []
  newTipoVehiculo : TipoVehiculoModule = new TipoVehiculoModule('',0,'','');

  constructor(private VehiculosService : VehiculosService ,  private loading : loading) {
    this.getTiposVehiculos();
   }
  public setActualizatipo_vehiculo(tipo:TipoVehiculoModule){
     this.newTipoVehiculo = tipo;
  }
  public borrarTipoVehiculo(tipo:TipoVehiculoModule){ 
    Swal.fire({
      title: `Seguro que quiere borrar el tipo de vehiculo "${tipo.nombre}"`, 
      showCancelButton: true,
      confirmButtonText: 'Eliminar', 
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this.VehiculosService.eliminarTipoDeVehiculo(tipo).subscribe(
          (respuesta:any)=>{console.log(respuesta)
            if (respuesta.error === 'ok'){
              this. getTiposVehiculos();
              Swal.fire('Elemento eliminado con exito!', '', 'success');
              
            } 
          }
        );
        
      } 
    })
  }
  getTiposVehiculos(){ 
    this.tiposVehiculo[0] =  new TipoVehiculoModule('',0,'','');
    this.loading.show()
    this.VehiculosService.geTiposVehiculos().subscribe(
   
      (datos:any)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      datos.data.forEach((dato:TipoVehiculoModule , index:number )=>{
        this.tiposVehiculo[index] = new TipoVehiculoModule(
          dato.nombre,  dato.estado , dato.estadoNombre , dato.descripcion , dato.id
        ) ;
      }) 
      console.log(this.tiposVehiculo);
    }else{
      this.tiposVehiculo = [];
    }

        this.loading.hide()
      } ,
      error => {this.loading.hide();
        console.log(error)
        Swal.fire( error.error.error, '', 'error');
      }
      );
  }  
   manageTipoVehiculo():boolean {
    if(this.newTipoVehiculo.nombre.trim() === '' ){alert('Debe ingresar el nombre del tipo'); return false ;}
    if(this.newTipoVehiculo.estado === 0){alert('Debe escoger el estado del tipo'); return false ;}

    this.loading.show(); 
    this.VehiculosService.guardarTipoVehiculo(this.newTipoVehiculo).subscribe(
     (respuesta:any)=>{console.log(respuesta)
      
     if (respuesta.error === 'ok'){
      Swal.fire('datos ingresados con exito');  
       this.newTipoVehiculo =    new TipoVehiculoModule('',0,'','');
       this.getTiposVehiculos();
     }else{ 
      Swal.fire(respuesta.error, '', 'error');
     }
     this.loading.hide(); 
     return true;
     })
     return true;
  }
   
  cancelar(){
    this.newTipoVehiculo =  new TipoVehiculoModule('',0,'','');
  } 

}
