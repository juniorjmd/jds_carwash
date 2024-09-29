 
import { Component } from '@angular/core';
import { cntMovCuentasRequest, cntSubCuentaRequest } from 'src/app/interfaces/producto-request';
import { ReporteMovimientoCuentas } from 'src/app/interfaces/reporteMovimientoCuentas.'; 
import { subCuenta, vwCntSubCuentaModel } from 'src/app/models/cnt-sub-cuenta/cnt-sub-cuenta.module';
import { PrinterManager } from 'src/app/models/printerManager';
import { DocumentosModel } from 'src/app/models/ventas/documento.model';
import { cajasServices } from 'src/app/services/Cajas.services';
import { CntContablesService } from 'src/app/services/cntContables.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flujo-de-caja', 
  templateUrl:'./flujoDeCaja.component.html',
  styleUrls: ['./flujoDeCaja.component.css'] 
})
export class flujoDeCajaComponent { 
  resumenVenta?:ReporteMovimientoCuentas;
  resumen:boolean=false;
  hideR:boolean=true;
  hideF:boolean=true;
  documentos : DocumentosModel[] = [];
  cuenta : vwCntSubCuentaModel[] = [];
  cuentas : vwCntSubCuentaModel[] = [];
  cuentaSeleccionada : number  = 0 ;
  cuentaIni : vwCntSubCuentaModel[]  =  [];
  codFactura:string='';
  codCliente:string='';
  fecha1:string;
  fecha2:string; 
  maximo:string; 
  constructor( private cntService:CntContablesService , private serviceCaja:cajasServices){
    this.cuentaIni[0] =  new vwCntSubCuentaModel();
    this.cuentaIni[0].id_scuenta = 0;
    this.cuentaIni[0].nro_scuenta =  0 ;
    this.cuentaIni[0].nombre_scuenta = 'seleccione una auxiliar'
    
    this.cuentaIni[1]  = new vwCntSubCuentaModel(); 
    this.cuentaIni[1].nro_scuenta =  99999999 ;
    this.cuentaIni[1].id_scuenta = 99999999;
    this.cuentaIni[1].nombre_scuenta = 'Todas las cuentas'
    this.cntService.getCntCuentasCajasAsignadas().subscribe({next:(value:cntSubCuentaRequest)=>{
      if(value.numdata>0){
        this.cuentas = [...value.data];
        this.cuenta = [...this.cuentaIni ,  ...value.data];
      }else{Swal.fire('warning','no existen cajas asignadas para realizar el reporte','warning')}
    },error:e=>
    console.error(JSON.stringify(e.error))
    
    })
    this.codFactura = ''; 
   let fecha = new Date();
    this.fecha1 = fecha.getFullYear().toString() +'-'+ (fecha.getMonth() + 1).toString().padStart(2,'0')+'-01' ;
    this.fecha2 = fecha.getFullYear().toString() +'-'+ (fecha.getMonth() + 1).toString().padStart(2,'0')+'-'+ (fecha.getDate()).toString().padStart(2,'0') ;
    this.maximo = this.fecha2 ;
  }

  show(item:any){
   if( item.show == undefined || item.show == false){
    item.show = true;
   }else{item.show = false ;}
  }
  getMovimientosPorFecha(){
     //this.printer_factura_final(); 
    if(this.cuentaSeleccionada == 0){
      Swal.fire('Es necesario escoger una cuenta ','error','error');
      return;
    } 
    //this.printer_factura_final(); 
    if(this.fecha1.trim() === ''){
      Swal.fire('Es necesario escoger la fecha inicial del rango de movimientos','error','error');
      return;
    } 
    if(this.fecha2.trim() === ''){
      Swal.fire('Es necesario escoger la fecha final del rango de movimientos','error','error');
      return;
    }
 let arrayIdsCuenta:number[] = [this.cuentaSeleccionada];

    if(this.cuentaSeleccionada == 99999999){
      arrayIdsCuenta  = [];
      arrayIdsCuenta = this.cuentas.map(x=> x.id_scuenta!)
    }

    this.cntService.getResumenCuentasPorFecha
        (arrayIdsCuenta , this.fecha1.trim(),this.fecha2.trim() ).subscribe({next:
          (datos:cntMovCuentasRequest)=>{
           
        if (datos.numdata > 0 ){
          this.resumenVenta = datos.data  ;
          console.log('getResumenProductosVentas',this.resumenVenta);
          if(this.resumenVenta.movimientos![0] !== undefined){
            this.resumenVenta.movimientos![0].show = true 
          }
          if(this.resumenVenta.resumen![0] !== undefined){
            this.resumenVenta.resumen![0].show = true 
          }
          this.resumenVenta.resumen?.forEach(data=>data.movimientos.sort((a, b) => {
            // Convertir las fechas a objetos Date para comparar correctamente
            const fechaA = new Date(a.fecha);
            const fechaB = new Date(b.fecha); 
            // Comparar las fechas
            return fechaA.getTime() - fechaB.getTime();}))
            
       } else{
        Swal.fire('No existen datos relacionados con la busqueda')
       } 
       this.hideR=true; 
      } ,error:
      (error: any) =>{
        Swal.fire(JSON.stringify(error )); 
        this.hideR=true; 
      }});
  }

  
  async imprimirResumen()
  {  
   let printerManager =  new PrinterManager(this.serviceCaja); 
   if(this.resumenVenta != undefined){ 
    printerManager.printResumenCuentas(false,this.resumenVenta);
  } 
}
}



