import { Component, OnInit } from '@angular/core';
import { select } from 'src/app/interfaces/generales.interface';
import { ServiciosModule } from 'src/app/models/servicios/servicios.module';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import Swal from 'sweetalert2'; 
import { loading } from 'src/app/models/app.loading'; 
import { TiposServiciosModule } from 'src/app/models/tipos-servicios/tipos-servicios.module';
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  newServicioAVehiculo : ServiciosModule =  new ServiciosModule('',0,0); ;
  serviciosAVehiculos:ServiciosModule[] = []; 
  serviciosAmostrar:ServiciosModule[] = []; 
  tiposServicio:TiposServiciosModule[] = []

  constructor(private VehiculosService : VehiculosService ,  private loading : loading) {
    this.getTiposServicios();
    this.getServiciosVehiculos();
   }
   mostrarServicioPorTipo(){
     
    this.serviciosAmostrar = [];
    if (this.newServicioAVehiculo.tipo_servicio <= 0 ){ 
      this.serviciosAmostrar = this.serviciosAVehiculos;
      return ;
    }
    let cont=0;
    //newServicioAVehiculo.tipo_servicio
    this.serviciosAVehiculos!.forEach((servicioAsignado : ServiciosModule )=>{
      console.log(servicioAsignado);
      

         if (servicioAsignado.tipo_servicio.toString() === this.newServicioAVehiculo.tipo_servicio.toString() ){
        
          this.serviciosAmostrar[cont]  = servicioAsignado;
            cont++;
         }
    })
  }



   getTiposServicios(){ 
    this.tiposServicio[0] =  new TiposServiciosModule('',0,'','');
    this.loading.show()
    this.VehiculosService.getTiposServicios().subscribe(
      (datos:any)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      datos.data!.forEach((dato:TiposServiciosModule , index:number )=>{
        this.tiposServicio[index] = new TiposServiciosModule(
          dato.nombre,  dato.estado , dato.estadoNombre , dato.descripcion , dato.id
        ) ;
      }) 
      console.log(this.tiposServicio);
    }else{
      this.tiposServicio = [];
    }

        this.loading.hide()
      } ,
      error => {this.loading.hide();
        console.log(error)
        Swal.fire( error.error.error, '', 'error');
      }
      );
  }  
  public setActualiza_servicio_vehiculo(tipo:ServiciosModule){
     this.newServicioAVehiculo = tipo;
  }
  public borrarTipoVehiculo(tipo:ServiciosModule){ 
    Swal.fire({
      title: `Seguro que quiere borrar el servicio a vehiculo : "${tipo.nombre}"`, 
      showCancelButton: true,
      confirmButtonText: 'Eliminar', 
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this.VehiculosService.eliminarServicios(tipo).subscribe(
          (respuesta:any)=>{console.log(respuesta)
            if (respuesta.error === 'ok'){
              this. getServiciosVehiculos();
              Swal.fire('Elemento eliminado con exito!', '', 'success');
              
            } 
          }
        );
        
      } 
    })
  }
  getServiciosVehiculos(){ 
    this.serviciosAVehiculos[0] =   new ServiciosModule('',0,0); 
    this.loading.show()
    this.VehiculosService.getServicios().subscribe(
      (datos:any)=>{
         console.log(datos);
    if (datos.numdata > 0 ){ 
      this.serviciosAVehiculos = datos.data! ; 
      console.log(this.serviciosAVehiculos);
    }else{
      this.serviciosAVehiculos = [];
    }
this.mostrarServicioPorTipo();
        this.loading.hide();
      } ,
      error => {this.loading.hide();
        console.log(error)
        Swal.fire( error.error.error, '', 'error');
      }
      );
  }  

  manageServicioVehiculo():any{
    if(this.newServicioAVehiculo.nombre.trim() === '' ){alert('Debe ingresar el nombre del tipo'); return 0 ;}
    if(this.newServicioAVehiculo.estado === 0){alert('Debe escoger el estado del servicio'); return 0 ;}
    if(this.newServicioAVehiculo.tipo_servicio === 0){alert('Debe escoger el estado del tipo de servicio'); return 0 ;}
//newServicioAVehiculo.tipo_servicio
    this.loading.show(); 
    this.VehiculosService.guardarServicios(this.newServicioAVehiculo).subscribe(
     (respuesta:any)=>{console.log(respuesta)
      
     if (respuesta.error === 'ok'){
      Swal.fire('datos ingresados con exito');  
       this.newServicioAVehiculo =    new  ServiciosModule('',0 ,0); 
       this.getServiciosVehiculos();
     }else{ 
      Swal.fire(respuesta.error, '', 'error');
     }
     this.loading.hide(); 
     })
  }
   
  cancelar(){
    this.newServicioAVehiculo = new ServiciosModule('',0,0); 
  } 


  ngOnInit(): void {
  }

}
