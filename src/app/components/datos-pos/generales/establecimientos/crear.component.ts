import { Component, OnInit } from '@angular/core';
import { select } from 'src/app/interfaces/generales.interface';
import { loading } from 'src/app/models/app.loading';
import { cajasServices } from 'src/app/services/Cajas.services'; 
import { establecimientoModel } from 'src/app/models/establecimientos.model';
import { Establecimientos } from 'src/app/interfaces/establecimientos.interface';
import { TiposEstablecimientosModel } from 'src/app/models/tipos-establecimientos.model';
import { TiposEstablecimientos } from 'src/app/interfaces/tipos-establecimientos';
import { MatDialog } from '@angular/material/dialog';
import { TiposEstablComponent } from './tipos-establ.component';
import { LocationOdoo } from 'src/app/models/location-odoo.model';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit { 
  objIni:LocationOdoo = {id:0, name : 'Sin Asignar'} ; 
  establecimientos :establecimientoModel[]  = [];
  tiposEsta: TiposEstablecimientosModel[];
  aLocationFisico:LocationOdoo   ;
  aLocationPOS:LocationOdoo    ;  
  aLocationVirtual:LocationOdoo    ;
  locationStore:LocationOdoo[]  = [];
  locationPOS:LocationOdoo[]  = [];
  locationVirtual:LocationOdoo[]  = [];
  newEsta : establecimientoModel = new establecimientoModel(undefined); 
  constructor( private serviceCaja : cajasServices ,  
    private newEstablecimientoDialog : MatDialog ,   
    private loading : loading ) {
      this.Cancelar();
      this.getTiposEstablecimiento();
     this.getEstablecimiento(); 
     this.getLocacionPrincipales();
    
  }

  asignarLocation(a:number , b:LocationOdoo){
    console.log("asignar datos al elemento",b)
    switch(a){
      case 1 : 
      this.newEsta.idAuxiliar =   b.id ;
      this.newEsta.nombreAuxiliar =   b.complete_name ; 
      break;
      case 2 : 
      this.newEsta.idBodegaStock =   b.id ;
      this.newEsta.NameBodegaStock =   b.complete_name ; 
      break;
      case 3 : 
      this.newEsta.idBodegaVitual =   b.id ;
      this.newEsta.NameBodegaVirtual =   b.complete_name ; 
      break;
    }
  }
  getLocacionPrincipales(){

    this.serviceCaja.getLocacionesFisicas()
    .subscribe(
     (datos:select)=>{
        console.log(datos);
        this.locationStore = [];   
        this.locationPOS   = [];
      this.locationVirtual  = [];
   if (datos.numdata > 0 ){ 
     
     datos.data.forEach((dato:LocationOdoo , index )=>{
       this.locationStore[index] = dato;  

     }) 
     console.log("this.locationStore" , this.locationStore)
      
     this.newEsta.tipo = 0;
     this.newEsta.estado = 0;
   } 
       this.loading.hide()
     } ,
     error => {this.loading.hide();
       
   this.locationStore = [];
       alert( error.error.error);
     }
     );
  }
  

  getLocacionesAlternas(id:number){
    this.locationPOS   = []; 
    
    this.serviceCaja.getLocacionesSecundarias(id)
    .subscribe(
     (datos:select)=>{
        console.log(datos);   
        this.locationPOS   = []; 
     if (datos.numdata > 0 ){ 
       datos.data.forEach((dato:LocationOdoo , index )=>{ 
         this.locationPOS[index] = dato; 
         //----------------------------------
         if (this.newEsta.idBodegaStock == this.locationPOS[index].id){ 
         this.aLocationPOS  =  this.locationPOS[index] ; 
         this.asignarLocation(2, this.aLocationPOS )
        }
         //-----------------------------------
       })
      
       console.log(this.locationPOS); 
   }

       this.loading.hide()
     } ,
     error => {this.loading.hide();
       
   this.locationStore = [];
       alert( error.error.error);
     }
     );

  }
  getLocacionesExistencia(id:number){
    this.locationPOS   = []; 
    
    this.serviceCaja.getLocacionesExistencias(id)
    .subscribe(
     (datos:select)=>{
        console.log(datos);   
        this.locationPOS   = []; 
     if (datos.numdata > 0 ){ 
       datos.data.forEach((dato:LocationOdoo , index )=>{ 
         this.locationPOS[index] = dato; 
         //----------------------------------
         if (this.newEsta.idBodegaStock == this.locationPOS[index].id){ 
         this.aLocationPOS  =  this.locationPOS[index] ; 
         this.asignarLocation(2, this.aLocationPOS )
        }
         //-----------------------------------
       })
      
       console.log(this.locationPOS); 
   }

       this.loading.hide()
     } ,
     error => {this.loading.hide();
       
   this.locationStore = [];
       alert( error.error.error);
     }
     );

  }

  getLocacionesVirtuales(){ 
    this.locationVirtual  = [];
    
    this.serviceCaja.getLocacionesVirtuales()
    .subscribe(
     (datos:select)=>{
        console.log(datos);    
      this.locationVirtual  = [];
     if (datos.numdata > 0 ){ 
       datos.data.forEach((dato:LocationOdoo , index )=>{  
        this.locationVirtual[index] = dato;
        if (this.newEsta.idBodegaVitual == this.locationVirtual[index].id){ 
         this.aLocationVirtual =  this.locationVirtual[index] ; 
         this.asignarLocation(3, this.aLocationVirtual );
        }
       })   
       console.log(this.locationVirtual); 
   }

       this.loading.hide()
     } ,
     error => {this.loading.hide();
       
   this.locationStore = [];
       alert( error.error.error);
     }
     );

  }
  mantenerTiposEsta(){
    this.newEstablecimientoDialog.open(TiposEstablComponent,{data:null})
    .afterClosed()
    .subscribe((confirmado: Boolean)=>{
     // if (confirmado){ 
      this.getTiposEstablecimiento(); 
    //}
    })
  }
  Cancelar(){
    this.newEsta =  new establecimientoModel(undefined);
  this.aLocationFisico = this.objIni   ;
  this.aLocationPOS   = this.objIni   ;  
  this.aLocationVirtual  = this.objIni   ;
     
  }
  getEstablecimiento(){ 
    this.serviceCaja.getAllEstablecimientos()
     .subscribe(
      (datos:select)=>{
         console.log(datos);
         this.establecimientos = [];   
    if (datos.numdata > 0 ){ 
      
      datos.data.forEach((dato:Establecimientos , index )=>{
        this.establecimientos[index] = new establecimientoModel( dato );
      }) 
    //  this.aLocationFisico  = {'id':0};
      console.log(this.establecimientos);
      this.newEsta.tipo = 0;
      this.newEsta.estado = 0;
    }

        this.loading.hide()
      } ,
      error => {this.loading.hide();
        
    this.establecimientos = [];
        alert( error.error.error);
      }
      );
  }

  
  getTiposEstablecimiento(){ 
    this.serviceCaja.getTiposEstablecimientos()
     .subscribe(
      (datos:select)=>{
         console.log(datos);
         this.tiposEsta = [];   
    if (datos.numdata > 0 ){ 
      
      datos.data.forEach((dato:TiposEstablecimientos , index )=>{
        this.tiposEsta[index] = new TiposEstablecimientosModel( dato );
      }) 
      console.log(this.tiposEsta);
    }

        this.loading.hide()
      } ,
      error => {this.loading.hide();
        
    this.tiposEsta = [];
        alert( error.error.error);
      }
      );
  }

  
  setActualizaCaja(estaActualiza : establecimientoModel){
    this.Cancelar();
    this.newEsta = estaActualiza ;  

    this.locationStore.forEach((dato:LocationOdoo , index )=>{
      
      if (this.newEsta.idAuxiliar == dato.id){ 
       this.aLocationFisico  =  this.locationStore[index];
       this.getLocacionesAlternas(this.aLocationFisico.id); 
       this.getLocacionesVirtuales() 
       this.asignarLocation(1, this.aLocationFisico ); 
      }
    }) 
 
  }
 

  ngOnInit(): void {
  }
  guardarCaja(){
   console.log('nueva caja',this.newEsta.nombre)
   if (typeof(this.newEsta.nombre) === 'undefined'){
    this.loading.hide();
    alert('Debe ingresar el Nombre del establecimiento');
    return;
   }
   if (typeof(this.newEsta.descripcion) === 'undefined'){
    this.newEsta.descripcion = this.newEsta.nombre ;
   }else{
    if ( this.newEsta.descripcion.trim() === ''){
      this.newEsta.descripcion = this.newEsta.nombre ;
     }
   }

   console.log('this.newEsta.idAuxiliar : '+this.newEsta.idAuxiliar,'this.newEsta.tipo '+this.newEsta.tipo )
   if(this.newEsta.tipo == 1) {
  
   if ( this.newEsta.idAuxiliar  ==  0 ){
    this.loading.hide();
    alert('Debe seleccionar la locacion fisica a la que pertenece');
    return;
   }
   
   if ( this.newEsta.idBodegaStock  == 0 ){
    this.loading.hide();
    alert('Debe seleccionar la locacion POS a la que pertenece');
    return;
   }
   if ( this.newEsta.idBodegaVitual == 0 ){
    this.loading.hide();
    alert('Debe seleccionar la locacion virtual a la que apuntara el establecimiento');
    return;
   }}
   this.loading.show(); 
 
   this.serviceCaja.setEstablecimiento(this.newEsta).subscribe(
    (respuesta:any)=>{console.log(respuesta)
     
    if (respuesta.error === 'ok'){
      alert('datos ingresados con exito');  
      this.newEsta =  new establecimientoModel(undefined);
      this.getEstablecimiento();
    }else{
      alert(respuesta.error);
      this.loading.hide();
    }
    }

   )
  }


}
