import { Component, OnInit } from '@angular/core';
import { select } from 'src/app/interfaces/generales.interface';
import { ServiciosCostosModule } from 'src/app/models/servicios-costos/servicios-costos.module';
import { ServiciosModule } from 'src/app/models/servicios/servicios.module';
import { TipoVehiculoModule } from 'src/app/models/tipo-vehiculo/tipo-vehiculo.module';
import { TiposServiciosModule } from 'src/app/models/tipos-servicios/tipos-servicios.module';

import { VehiculosService } from 'src/app/services/vehiculos.service';
import Swal from 'sweetalert2'; 
import { loading } from 'src/app/models/app.loading';  
import { exit } from 'process';

@Component({
  selector: 'app-servicioscostos',
  templateUrl: './servicioscostos.component.html',
  styleUrls: ['./servicioscostos.component.css']
})
export class ServicioscostosComponent implements OnInit {
  arrServiciosCostos:ServiciosCostosModule[] = [];
  tiposServicio:TiposServiciosModule[] = [];
  serviciosAVehiculos:ServiciosModule[] = [];
  tiposVehiculo:TipoVehiculoModule[] = [];
  tipoVehiculo:number;
  servicioSelecionado:number;
  precio : number ;
  newServiciosCostos:ServiciosCostosModule = new ServiciosCostosModule(0,0,0,0);
  tipo_servicio:number; 
  constructor( private VehiculosService : VehiculosService ,  
               private loading : loading   )
                {this.tipo_servicio=0; 
                 this.tipoVehiculo=0;
                 this.servicioSelecionado=0;
                 this.precio = 0;
                 this.getTiposServicios();
                }
  setActualiza_costoServicioVehiculo(costo : ServiciosCostosModule){
Swal.fire({
  title: 'Ingrese el nuevo valor a editar',
  text:`servicio : ${costo.nombreServicio}, vehiculo : ${costo.nombreTipoVehiculo}, costo Actual : ${costo.valor} `,
  input: 'number',
  inputAttributes: {
    autocapitalize: 'off'
  },
  showCancelButton: true,
  confirmButtonText: 'Actualizar',
  showLoaderOnConfirm: true,
  preConfirm: (valor) => {
    costo.valor = valor;
    this.VehiculosService.guardarCostoServicio(costo).subscribe(
      (respuesta:any)=>{console.log(respuesta)
       
      if (respuesta.error === 'ok'){
       Swal.fire('datos ingresados con exito');  
        //-------------------
       this.limpiar();
     //----------------------------------
        //this.getServiciosVehiculos();
      }else{ 
       Swal.fire(respuesta.error, '', 'error');
      }
      this.loading.hide(); 
      }) 
  },
  allowOutsideClick: () => !Swal.isLoading()
}).then((result) => {
  if (result.isConfirmed) {
  }
})




  }
  borrarCostoServicioVehiculo(costo : ServiciosCostosModule){
    Swal.fire({
      title: `Seguro que quiere borrar el costo del servicio "${costo.nombreServicio}" al vehiculo  "${costo.nombreTipoVehiculo}"`, 
      showCancelButton: true,
      confirmButtonText: 'Eliminar', 
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this.VehiculosService.eliminarCostosServicios(costo).subscribe(
          (respuesta:any)=>{console.log(respuesta)
            if (respuesta.error === 'ok'){
              this.getTiposVehiculos();
              this.getCostosServiciosVehiculos();
              Swal.fire('Elemento eliminado con exito!', '', 'success');
              
            } 
          }
        );
        
      } 
    })
  }
  lipiarSelect(){
    this.arrServiciosCostos  = []; 
    this.serviciosAVehiculos  = [];
    this.tiposVehiculo  = [];
  this.tipoVehiculo=0;
  this.servicioSelecionado=0;
  this.precio =0 ;
    this.limpiar();
  }
  getTiposServicios(){ 
    this.arrServiciosCostos  = [];
  this.tiposServicio = [];
  this.serviciosAVehiculos  = [];
  this.tiposVehiculo  = [];


    this.tiposServicio[0] =  new TiposServiciosModule('',0,'','');
    this.loading.show()
    this.VehiculosService.getTiposServicios().subscribe(
      (datos:any)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      datos.data.forEach((dato:TiposServiciosModule , index:number )=>{
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
  getServiciosVehiculos( ){ 
    this.serviciosAVehiculos = [];
    this.lipiarSelect();
    //this.serviciosAVehiculos[0] =   new ServiciosModule('',0,'',0,0); 
   // alert(this.tipo_servicio )
    if (this.tipo_servicio <=  0  ) { return;  }
    this.loading.show()
    this.VehiculosService.getServiciosPorTipo(this.tipo_servicio).subscribe(
      (datos:any)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      datos.data.forEach((dato:ServiciosModule , index:number )=>{
        this.serviciosAVehiculos[index] = new ServiciosModule(
          dato.nombre,  dato.estado , dato.estadoNombre ,dato.tipo_servicio , dato.precio_general , dato.descripcion, dato.nombre_tipo_servicio , dato.id
        ) ;
      }) 
      console.log(this.serviciosAVehiculos);
    }else{
      this.serviciosAVehiculos = [];
    }

        this.loading.hide()
      } ,
      error => {this.loading.hide();
        console.log(error)
        Swal.fire( error.error.error, '', 'error');
      }
      );
  } 

  getTiposVehiculos(){ 
    this.tiposVehiculo = [];
    this.arrServiciosCostos = [] ;
    
    if ( this.servicioSelecionado<= 0) {
      return
    }
    this.getCostosServiciosVehiculos();
    this.serviciosAVehiculos.forEach(
      (servicio:ServiciosModule)=>{
        //console.log('éntro ', servicio);
        
        if(servicio.id == this.servicioSelecionado){
          this.precio =  servicio.precio_general!;
          exit;
        }
      }
    )
    this.tiposVehiculo[0] =  new TipoVehiculoModule('',0,'','');
    this.loading.show()
    this.VehiculosService.getVehiculoNoAsignadoAServicios(this.servicioSelecionado).subscribe(
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

  enviarRelacionServicioVehiculo(){
  if(  this.tipo_servicio === 0 ) {
    Swal.fire( 'debe seleccionar el tipo de servicio', '', 'error');
    return
  }
  if( this.servicioSelecionado === 0 ) {
  Swal.fire( 'debe seleccionar el servicio', '', 'error');
  return
}
if( this.tipoVehiculo === 0 ) {
  Swal.fire( 'debe seleccionar el tipo de vehiculo', '', 'error');
  return
}
if( this.precio <= 0  ) {
  Swal.fire( 'debe ingresar el valor del servicio, este debe ser mayor a cero', '', 'error');
  return
}
this.loading.show(); 
// newServiciosCostos:ServiciosCostosModule = new ServiciosCostosModule(0,0,0,0);
this.newServiciosCostos = new ServiciosCostosModule(this.servicioSelecionado, this.tipoVehiculo ,this.precio ,1);
this.VehiculosService.guardarCostoServicio(this.newServiciosCostos).subscribe(
 (respuesta:any)=>{console.log(respuesta)
  
 if (respuesta.error === 'ok'){
  Swal.fire('datos ingresados con exito');  
   //-------------------
  this.limpiar();
//----------------------------------
   //this.getServiciosVehiculos();
 }else{ 
  Swal.fire(respuesta.error, '', 'error');
 }
 this.loading.hide(); 
 }) 
 }

 getCostosServiciosVehiculos(){ 
  this.tiposVehiculo = [];
  this.precio = 0;
  if ( this.servicioSelecionado <= 0){return;}
  this.tiposVehiculo[0] =  new TipoVehiculoModule('',0,'','');
  this.loading.show()
  this.VehiculosService.getCostosServicios(this.servicioSelecionado).subscribe(
    (datos:any)=>{
       console.log(datos);
       
  if (datos.numdata > 0 ){ 
    datos.data.forEach((dato:ServiciosCostosModule , index:number )=>{
      this.arrServiciosCostos[index] = new ServiciosCostosModule( 
        dato.cod_servicio,
        dato.cod_tipo_vehiculo,
        dato.valor,
        dato.estado,
        dato.id,
        dato.estadoNombre,
        dato.nombreServicio,
        dato.descipcionServicio,
        dato.tipo_servicio,
        dato.nombre_tipo_servicio,
        dato.nombreTipoVehiculo,
        dato.descripcionTipoVehiculo
      ) ;
    }) 
    console.log(this.arrServiciosCostos);
  }else{
    this.arrServiciosCostos = [];
  }

      this.loading.hide()
    } ,
    error => {this.loading.hide();
      console.log(error)
      Swal.fire( error.error.error, '', 'error');
    }
    );
}  


limpiar(){

  // this.tipo_servicio = 0 
  // this.servicioSelecionado = 0
    this.tipoVehiculo = 0 
    this.precio = 0  
    this.newServiciosCostos = new ServiciosCostosModule(0,0,0,0);
    this.getCostosServiciosVehiculos();
      
  this.serviciosAVehiculos.forEach(
    (servicio:ServiciosModule)=>{
      //console.log('éntro ', servicio);
      
      if(servicio.id == this.servicioSelecionado){
        this.precio =  servicio.precio_general;
        exit;
      }
    }
  )
 
}
  ngOnInit(): void {
  }

}
