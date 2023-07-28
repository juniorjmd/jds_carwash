import { Component, OnInit } from '@angular/core';
import { select } from 'src/app/interfaces/generales.interface';
import { TiposEstablecimientosModel } from 'src/app/models/tipos-establecimientos.model';
import { cajasServices } from 'src/app/services/Cajas.services';
import { loading } from 'src/app/models/app.loading';
@Component({
  selector: 'app-tipos-establ',
  templateUrl: './tipos-establ.component.html',
  styleUrls: ['./tipos-establ.component.css']
})
export class TiposEstablComponent implements OnInit {
   
  tiposEsta: TiposEstablecimientosModel[] = [];
  newTipEstabl : TiposEstablecimientosModel = new TiposEstablecimientosModel(undefined); 
  constructor( private serviceCaja : cajasServices ,     
    private loading : loading ) {
      this.getTiposEstablecimiento(); 
    
  } 
  Cancelar(){
    this.newTipEstabl =  new TiposEstablecimientosModel(undefined);
  }

  
  getTiposEstablecimiento(){ 
    this.serviceCaja.getAllTiposEstablecimientos()
         .subscribe(
      (datos:select)=>{
         console.log(datos);
         this.tiposEsta = [];   
    if (datos.numdata > 0 ){ 
      
      datos.data.forEach((dato:TiposEstablecimientosModel , index )=>{
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

  setActualizaCaja(estaActualiza : TiposEstablecimientosModel){
    this.newTipEstabl = estaActualiza ; 
    console.log('setActualizaCaja',this.newTipEstabl, estaActualiza);
  }
 

  ngOnInit(): void {
  }
  guardarCaja(){
   console.log('nueva caja',this.newTipEstabl.nombre)
   if (typeof(this.newTipEstabl.nombre) === 'undefined'){
    this.loading.hide();
    alert('Debe ingresar el Nombre de la caja');
    return;
   }
   if (typeof(this.newTipEstabl.descripcion) === 'undefined'){
    this.newTipEstabl.descripcion = this.newTipEstabl.nombre ;
   }else{
    if ( this.newTipEstabl.descripcion.trim() === ''){
      this.newTipEstabl.descripcion = this.newTipEstabl.nombre ;
     }
   }
   
   this.loading.show(); 
   this.serviceCaja.setTipoEstablecimiento(this.newTipEstabl).subscribe(
    (respuesta:any)=>{console.log(respuesta)
     
    if (respuesta.error === 'ok'){
      alert('datos ingresados con exito');  
      this.newTipEstabl =  new TiposEstablecimientosModel(undefined);
      this.getTiposEstablecimiento();
    }else{
      alert(respuesta.error);
      this.loading.hide();
    }
    }

   )
  }


}

