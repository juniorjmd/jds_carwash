import { Component, OnInit } from '@angular/core';
import { caja } from 'src/app/interfaces/caja.interface';
import { select } from 'src/app/interfaces/generales.interface';
import { cajaModel } from 'src/app/models/cajas.model';
import { loading } from 'src/app/models/app.loading';
import { cajasServices } from 'src/app/services/Cajas.services'; 
import { establecimientoModel } from 'src/app/models/establecimientos.model';
import { Establecimientos } from 'src/app/interfaces/establecimientos.interface';
import { ParametrosService } from 'src/app/services/parametros.service';
import { ParametrosModule } from 'src/app/models/parametros/parametros.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cajas-nueva',
  templateUrl: './cajas-nueva.component.html',
  styleUrls: ['./cajas-nueva.component.css']
})
export class CajasNuevaComponent implements OnInit {
  cajas :cajaModel[]  = []; 
  parametros:ParametrosModule[] = [];
  newCaja : cajaModel = new cajaModel(undefined);
  esta : establecimientoModel[];
  guardarBtn = false;
  constructor( private serviceCaja : cajasServices ,  
     private parServices:ParametrosService , 
    private loading : loading ) { 
      this.getParametros();
     this.getEstablecimiento();
     this.getCajas();
    
  }
  Cancelar(){
    this.newCaja =  new cajaModel(undefined);
     
  }

  
  getParametros(){ 
    this.parametros = []; 
     this.loading.show()
     this.parServices.getParametros().subscribe(
       (datos:select)=>{
          console.log(datos);
          
     if (datos.numdata > 0 ){ 
      this.parametros = datos.data 
       console.log('parametros',this.parametros);
     }else{
       this.parametros = [];
     }
     this.parametros.forEach(parametro =>{
      if(parametro.cod_parametro.trim() === 'SISTEMA_MULTICAJAS'){
        if(parametro.par_boolean == true)
        {this.guardarBtn = true; }   
            else{this.guardarBtn = false; }
      }
     })
         this.loading.hide();
       } ,
       error => {this.loading.hide();
         console.log(error)
         Swal.fire( error.error.error, '', 'error');
       }
       );
   }  
  getEstablecimiento(){
    this.newCaja.establecimiento = 0;
    this.serviceCaja.getEstablecimientos()
     .subscribe(
      (datos:select)=>{
         console.log(datos);
         this.esta = [];   
    if (datos.numdata > 0 ){ 
      
      datos.data.forEach((dato:Establecimientos , index )=>{
        this.esta[index] = new establecimientoModel( dato );
      }) 
      console.log(this.esta);
    }

        this.loading.hide()
      } ,
      error => {this.loading.hide();
        
    this.esta = [];
        alert( error.error.error);
      }
      );
  }
  setActualizaCaja(cajaActualizar : cajaModel){
    this.newCaja = cajaActualizar ; 
  }
getCajas(){
  this.cajas[0] = this.newCaja ;
  
  this.loading.show()
  this.serviceCaja.getCajas()
     .subscribe(
      (datos:select)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      datos.data.forEach((dato:caja , index )=>{
        this.cajas[index] = new cajaModel( dato );
      }) 
      console.log(this.cajas);
    }else{
      this.cajas = [];
    }

        this.loading.hide()
      } ,
      error => {this.loading.hide();
        alert( error.error.error);
      }
      );
}


  ngOnInit(): void {
  }
  guardarCaja(){
   console.log('nueva caja',this.newCaja.nombre)
   if (typeof(this.newCaja.nombre) === 'undefined'){
    this.loading.hide();
    alert('Debe ingresar el Nombre de la caja');
    return;
   }
   if (typeof(this.newCaja.descripcion) === 'undefined'){
    this.newCaja.descripcion = this.newCaja.nombre ;
   }else{
    if ( this.newCaja.descripcion.trim() === ''){
      this.newCaja.descripcion = this.newCaja.nombre ;
     }
   }
   if (this.newCaja.estadoGeneral === 0){
    this.newCaja.estadoGeneral = 2 ;
   }
   if (this.newCaja.establecimiento === 0){
    this.newCaja.establecimiento = 1 ;
   }
   
   this.loading.show(); 
   this.serviceCaja.setCaja(this.newCaja).subscribe(
    (respuesta:any)=>{console.log(respuesta)
     
    if (respuesta.error === 'ok'){
      alert('datos ingresados con exito');  
      this.newCaja =  new cajaModel(undefined);
      this.getCajas();
    }else{
      alert(respuesta.error);
      this.loading.hide();
    }
    }

   )
  }


}
