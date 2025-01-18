import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { cajaRequest } from 'src/app/interfaces/producto-request';
import { CustomConsole } from 'src/app/models/CustomConsole';
import { PrinterManager } from 'src/app/models/printerManager';
import { cajaModel } from 'src/app/models/ventas/cajas.model';
import { cajasResumenModel } from 'src/app/models/ventas/cajasResumen.model';
import { cajasServices } from 'src/app/services/Cajas.services';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import Swal from 'sweetalert2';
import { DefinirBaseCajaComponent } from '../../modals/definir-base-caja/definir-base-caja.component';
import { ResumenCajaComponent } from '../../modals/resumen-caja/resumen-caja.component';

import { loading } from 'src/app/models/app.loading'; 
@Component({
  selector: 'app-cerrar-caja',
  templateUrl: './cerrar-caja.component.html',
  styleUrls: ['./cerrar-caja.component.css']
})
export class CerrarCajaComponent implements OnInit {
  cajas : cajaModel[]=[];
  cajaAbierta !: cajaModel;
  cajaAbiertaFlag:boolean = false;
  flagCajasDisponibles:boolean = true;
  constructor(private serviceCaja : cajasServices ,  private inicioService : DatosInicialesService ,
    private _Router : Router,
    private loading : loading, private cajaService : cajasServices,
    private newAbrirCajaDialog : MatDialog) { 
      this.getCajas()
      this.serviceCaja.getCuentasContablesEstablecimientoUsuario().subscribe({next:(value:cajaRequest)=>{
        CustomConsole.log('getCuentasContablesEstablecimientoUsuario' , value)
        this.inicioService.validarCuentasContablesEstablecimiento(value.data[0] )  
      }})
    
    }

  ngOnInit(): void {
  }
  abrirResumen(cajaResumen : cajasResumenModel){
    
    /*["/home", "pos"]*/ 
    let printerManager : PrinterManager =  new PrinterManager(this.serviceCaja);;;
    printerManager?.printClose(cajaResumen)
    this.newAbrirCajaDialog.open(ResumenCajaComponent,{ data:cajaResumen})
    .afterClosed()
    .subscribe((confirmado: Boolean)=>{
      if (confirmado){ 
        this.getCajas()
    }
    })
  }
  cerrar_parcial(caja :cajaModel){
    let cajaResumen:cajasResumenModel ;    
    this.loading.show()
    this.serviceCaja.cerrarCajaParcial(caja)
       .subscribe(
        (respuesta:any)=>{
          CustomConsole.log(respuesta)
         
        if (respuesta.error === 'ok'){ 
           
      if (respuesta.numdata > 0 ){ 
        respuesta.data!.forEach((dato:any   )=>{
          cajaResumen =  dato  ;

          CustomConsole.log(cajaResumen, dato , dato); 
        }) 
        this.abrirResumen(cajaResumen );
        
        this.loading.hide();
      } 

        }else{
          Swal.fire(respuesta.error);
          this.loading.hide();
        }
       
        }
        );}
  cerrar(caja :cajaModel ){
    let cajaResumen:cajasResumenModel ;    
    this.loading.show()
    this.serviceCaja.cerrarCaja(caja)
       .subscribe(
        (respuesta:any)=>{
          CustomConsole.log(respuesta)
         
        if (respuesta.error === 'ok'){ 
           
      if (respuesta.numdata > 0 ){ 
        respuesta.data!.forEach((dato:any   )=>{
          cajaResumen =  dato  ;

          CustomConsole.log(cajaResumen, dato , dato); 
        }) 
        this.abrirResumen(cajaResumen );
        
        this.loading.hide();
      } 

        }else{
          Swal.fire(respuesta.error);
          this.loading.hide();
        }
       
        }
        );
  }

   getResumenCaja(caja:cajaModel){
    let cajaResumen:cajasResumenModel = new cajasResumenModel() ; 
    this.loading.show()
    this.serviceCaja.resumenCaja(caja)
       .subscribe(
        (datos:any)=>{
           CustomConsole.log(datos);  
      if (datos.numdata > 0 ){ 
        datos.data!.forEach((dato:any   )=>{
          cajaResumen = dato.json ; 
        }) 
        this.abrirResumen(cajaResumen );
      } 
  
          this.loading.hide()
        } ,
        error => {this.loading.hide();
          Swal.fire( error.error.error);
        }
        );
   }
  getCajas(){
    this.flagCajasDisponibles = true;
    this.cajas[0] = new cajaModel(undefined) ;
    let cajaAux :cajaModel;
    this.loading.show()
    this.serviceCaja.getCajasActivas()
       .subscribe( {next:
        (datos:cajaRequest)=>{        
          let cont = 0;
           CustomConsole.log('getCajasUsuario',datos);
           this.cajaAbiertaFlag = false;   
      if (datos.numdata > 0 ){ 
          this.cajas = datos.data;
         }else{
        this.cajas = [];
        this.flagCajasDisponibles = false;
      }
  
          this.loading.hide()
        } ,
        error: (error : any) => {this.loading.hide();
          Swal.fire( error.error.error);
        } } 
        );
  }
  asignarCaja(caja : cajaModel){
    /*["/home", "pos"]*/ 
    CustomConsole.log(caja);
    
      this.newAbrirCajaDialog.open(DefinirBaseCajaComponent,{data:caja})
      .afterClosed()
      .subscribe((confirmado: Boolean)=>{
        if (confirmado){ 
          this._Router.navigate(["/home","pos","ventas"]);
      }
      })
  }
  continuar(){
    this._Router.navigate(["/home","pos","ventas"]);
  }

  continuar_caja_suspendida(caja : cajaModel){
    
    this.loading.show() 
    this.cajaService.abrirCaja(caja, 0).subscribe( {next:
      (respuesta:any)=>{
        CustomConsole.log(respuesta)
       
      if (respuesta.error === 'ok'){
       Swal.fire( respuesta.datos[0].msg ); 
       this.continuar();
      }else{
        Swal.fire(respuesta.error);
      }
      this.loading.hide();
     
      },
      error:(error : any) => {this.loading.hide();
        Swal.fire( error.error.error);
      }}
      );
  } 
  
}
