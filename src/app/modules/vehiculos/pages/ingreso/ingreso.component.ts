import { Component, OnInit } from '@angular/core';
import { ServiciosModule } from 'src/app/models/servicios/servicios.module';
import { TipoVehiculoModule } from 'src/app/models/tipo-vehiculo/tipo-vehiculo.module';
import { TiposServiciosModule } from 'src/app/models/tipos-servicios/tipos-servicios.module';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import Swal from 'sweetalert2'; 
import { loading } from 'src/app/models/app.loading';  
import { VehiculosIngresoServicioModule } from 'src/app/models/vehiculos-ingreso-servicio/vehiculos-ingreso-servicio.module';
import { select } from 'src/app/interfaces/generales.interface';
import { ServiciosCostosModule } from 'src/app/models/servicios-costos/servicios-costos.module';
import { EmpleadoModel } from 'src/app/models/empleados/empleados.module';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { MatDialog } from '@angular/material/dialog';
import { EstablecerCajaComponent } from '../establecer-caja/establecer-caja.component';
import { cajaModel } from 'src/app/models/cajas.model';
import { cajasServices } from 'src/app/services/Cajas.services';
import { caja } from 'src/app/interfaces/caja.interface';
import { ParametrosModule } from 'src/app/models/parametros/parametros.module';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {
  ingreso : VehiculosIngresoServicioModule = new VehiculosIngresoServicioModule('',0,'','',0,0); 
 // serviciosAVehiculos:ServiciosModule[] = [];
 cajaEStablecida:cajaModel = new cajaModel(undefined);

 serviciosAmostrar:any[] = [{id:0 , nombre : 'Escoger tipoServicio' }];
  serviciosAVehiculos:ServiciosCostosModule[] = []; 
 tiposVehiculo:TipoVehiculoModule[] = [];
  tiposServicio:TiposServiciosModule[] = [];
  tipo_servicio:number = 0;
  empleados:EmpleadoModel[] = []
  constructor( private serviceCaja : cajasServices ,
    private newAbrirDialog : MatDialog,private VehiculosService : VehiculosService , 
      private empleadosServices :EmpleadosService ,
    private loading : loading ) { 
      this.establecerCajaInicialDefault();
      this.getTiposServicios();
      this.getTiposVehiculos();
      this.getEmpleados(); 
    }
//**************************************************************************/
//*****establecer caja predeterminada cuando esta es una sola**************/
//**************************************************************************/

establecerCajaInicialDefault(){
   
  let cajaAux :cajaModel;
  this.loading.show()
  this.serviceCaja.getCajasActivasYparametros()
     .subscribe(
      (datos:any)=>{
        console.log(datos);
    let cont:number;    
   if (datos[0].numdata == 1 ){  
      datos[0].data!.forEach((dato:caja   )=>{
        cajaAux =  new cajaModel( dato ); 
       
      this.cajaEStablecida.id = cajaAux.id;
      this.cajaEStablecida.nombre =  cajaAux.nombre;
             
      }) 
      //console.log('cajas : ' , this.cajas);
    }else if(datos[0].numdata > 0 ){
      if(datos[1].numdata > 0 ){
        let definir = 0;
        datos[1].data!.forEach((dato:ParametrosModule   )=>{ 
         if(dato.cod_parametro === 'CAJA_PREDEFINIDA_PARA_INGRESO')
           {definir = dato.par_numerico!} 
               
        })
        datos[0].data!.forEach((dato:caja   )=>{
          cajaAux =  new cajaModel( dato ); 
         if (definir === cajaAux.id)
      {  this.cajaEStablecida.id = cajaAux.id;
        this.cajaEStablecida.nombre =  cajaAux.nombre;}
               
        }) 
      }
    }

        this.loading.hide()
      } ,

      
      error => {this.loading.hide();
        alert( error.error.error);
      }
      );
}


//**************************************************************************/
//*****establecer caja predeterminada cuando esta es una sola**************/
//**************************************************************************/

establecerCaja(){
  this.newAbrirDialog.open(EstablecerCajaComponent )
  .afterClosed()
  .subscribe(( caja:cajaModel)=>{  
    console.log('caja_seleccionada',caja);
    if (typeof(caja)!= 'undefined')
    this.cajaEStablecida = caja;
    
  })  
}
    generarIngresoApatios(){
      
      if( this.cajaEStablecida.id <= 0){ Swal.fire( 'Debe establecer una caja para asignar el servicio creado', '', 'error');
      this.establecerCaja();
      return ;
       }
      if( this.ingreso.lavador <= 0){ Swal.fire( 'Debe escoger el lavador', '', 'error');
      return ;
       }
        if( this.ingreso.cod_tipo_vehiculo <= 0){ Swal.fire( 'Debe escoger el tipo de vehiculo', '', 'error');
       return ;
        }
        if( this.ingreso.cod_servicio <= 0){ Swal.fire( 'Debe escoger el servicio', '', 'error');
        return ;
         }
         if( this.ingreso.propietario.trim() ===''){ Swal.fire( 'Debe ingresar el propietario', '', 'error');
         return ;
          }
          if( this.ingreso.telefono.trim() === ''){ Swal.fire( 'Debe ingresar el telefono', '', 'error');
          return ;
           }
           if( this.ingreso.placaVehiculo.trim() === ''){ Swal.fire( 'Debe ingresar la placa del vehiculo', '', 'error');
           return ;
            }
            
            
        
              if( this.ingreso.cajaAsignada! > 0 && this.ingreso.idDocumento! > 0 ){
                 if (  this.ingreso.cajaAsignada != this.cajaEStablecida.id ){
                  Swal.fire({
                    title: `La placa a ingresar tiene una factura activa en la caja : "${this.ingreso.nombreCajaAsignada}" `+
                           `, Desea continuar en esta factura o crear una nueva factura en la caja establecida.`, 
                    showCancelButton: true,
                    confirmButtonText: 'Si', 
                    cancelButtonText:'No'
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    console.log(result);
                     
                    if (result.isDismissed) { 
                      this.ingreso.cajaAsignada = this.cajaEStablecida.id;
                      this.ingreso.nombreCajaAsignada = this.cajaEStablecida.nombre;
                      this.ingreso.idDocumento = 0;
           
                    }
                    console.log(this.ingreso);
                    
                   // return;
                    this.loading.show(); 
                    this.VehiculosService.guardarNuevoIngresoServicio(this.ingreso).subscribe(
                     (respuesta:any)=>{console.log(respuesta)
                      
                     if (respuesta.error === 'ok'){
                      Swal.fire('datos ingresados con exito'); 
                      
                       this.ingreso.idDocumento =  respuesta.idDocumento;
                       this.ingreso.valor = 0;
                       this.ingreso.cod_servicio = 0; 
                       this.tipo_servicio = 0;
                       //this.getServiciosVehiculos();
                     }else{ 
                       try {
                        Swal.fire(respuesta.error, '', 'error');
                       } catch (error : any) {
                        Swal.fire('error en el servidor', '', 'error');
                       }
                     
                     }
                     this.loading.hide(); 
                     }) 

                  }
                  
                  
                  )
                  return;
                    }              
              }else{
                this.ingreso.cajaAsignada = this.cajaEStablecida.id;
                this.ingreso.nombreCajaAsignada = this.cajaEStablecida.nombre;
                
              }
          this.loading.show(); 
          this.VehiculosService.guardarNuevoIngresoServicio(this.ingreso).subscribe(
           (respuesta:any)=>{console.log(respuesta)
            
           if (respuesta.error === 'ok'){
            Swal.fire('datos ingresados con exito');  
            this.ingreso.idDocumento =  respuesta.idDocumento;
            this.ingreso.valor = 0;
            this.ingreso.cod_servicio = 0; 
            this.tipo_servicio = 0;
            //this.getServiciosVehiculos();
          }else{ 
            try {
             Swal.fire(respuesta.error, '', 'error');
            } catch (error : any) {
             Swal.fire('error en el servidor', '', 'error');
            }
          
          }
           this.loading.hide(); 
           }) 
        }



    cancelar(){
     this.ingreso = new VehiculosIngresoServicioModule('',0,'','',0,0); 
    }

    getEmpleados(){ 
      this.empleados = []; 
       this.loading.show()
       this.empleadosServices.getEmpleadosLavador().subscribe(
         (datos:any)=>{
            console.log(datos);
            
       if (datos.numdata > 0 ){ 
         datos.data!.forEach((dato:any , index:number )=>{ 
          this.empleados.push(dato.objeto);
         }) 
         console.log('empleados',this.empleados);
       }else{
         this.empleados = [];
       }
   
           this.loading.hide();
         } ,
         error => {this.loading.hide();
           console.log(error)
           Swal.fire( error.error.error, '', 'error');
         }
         );
     }  
  validarPlaca(){
    //vw_vehiculos_propietario
    
    if (this.ingreso.placaVehiculo.trim() === ''  ) { return;  }
    this.loading.show()
    this.VehiculosService.getVehiculos_propietario(this.ingreso.placaVehiculo ).subscribe(
      (datos:any)=>{
         console.log(datos);
         let dato:any = {placaVehiculo :  '',
         propietario:'',
         telefono:'',
         cod_tipo_vehiculo:0 ,
         idDocumento : 0 ,
         cajaAsignada:0
        } 
         
    if (datos.numdata > 0 ){ 
      dato = datos.data[0]; 
      console.log(dato);
      this.ingreso.propietario = dato.propietario;
      this.ingreso.telefono = dato.telefono;
      this.ingreso.cod_tipo_vehiculo = dato.cod_tipo_vehiculo;
      this.ingreso.idDocumento = dato.idDocumento;
      this.ingreso.cajaAsignada = dato.cajaAsignada;   
      this.ingreso.nombreCajaAsignada= dato.nombreCajaAsignada;   


    }
      this.getServiciosVehiculos()
      this.loading.hide()
      } ,
      error => {this.loading.hide();
        console.log(error)
        Swal.fire( error.error.error, '', 'error');
      }
      );
  }

  getTiposServicios(){  
  this.tiposServicio = [];
  this.serviciosAVehiculos  = [];
  this.tiposVehiculo  = [];


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
  
  optenerValor(){
    this.ingreso.valor = 0;
    this.serviciosAVehiculos!.forEach((servicio : ServiciosCostosModule )=>{
      if (servicio.cod_servicio == this.ingreso.cod_servicio ){
        this.ingreso.valor = servicio.valor; 
      }

 })
 console.log('optener el valor del servicio' , this.ingreso);
 
  }


  mostrarServicioPorTipo(){
    
    this.ingreso.cod_servicio = 0 ; 
    this.serviciosAmostrar  = [{id:0 , nombre : 'Escoger tipoServicio' }];
    if (this.tipo_servicio <= 0 ){
      return ;
    }
    let cont=0;
    this.serviciosAVehiculos!.forEach((servicio : ServiciosCostosModule )=>{
         if (servicio.tipo_servicio == this.tipo_servicio ){
          cont++;
          this.serviciosAmostrar[cont]  = {id:servicio.cod_servicio , nombre : servicio.nombreServicio }
         }
    })
  }
  getServiciosVehiculos( ){ 
    this.serviciosAVehiculos = [];  
    // alert(this.ingreso.cod_tipo_vehiculo  )
    if (this.ingreso.cod_tipo_vehiculo <=  0  ) { return;  }
    this.loading.show()
    this.VehiculosService.getServiciosPorTipoVehiculo(this.ingreso.cod_tipo_vehiculo ).subscribe(
      (datos:any)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      datos.data!.forEach((dato:ServiciosCostosModule , index:number )=>{
        this.serviciosAVehiculos[index] = new ServiciosCostosModule(
          dato.cod_servicio,   dato.cod_tipo_vehiculo ,dato.valor ,dato.estado , dato.id,dato.estadoNombre,dato.nombreServicio,dato.descipcionServicio
          ,dato.tipo_servicio , dato.nombre_tipo_servicio ,dato.nombreTipoVehiculo,dato.descripcionTipoVehiculo       ) ;
      }) 
      console.log(this.serviciosAVehiculos);
      this.mostrarServicioPorTipo();
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
    this.tiposVehiculo[0] =  new TipoVehiculoModule('',0,'','');
    this.loading.show()
    this.VehiculosService.geTiposVehiculos( ).subscribe(
      (datos:any)=>{
         console.log('geTiposVehiculos',datos);
         
    if (datos.numdata > 0 ){ 
      datos.data!.forEach((dato:TipoVehiculoModule , index:number )=>{
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

  ngOnInit(): void {
  }

}
