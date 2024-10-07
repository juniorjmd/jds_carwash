import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CntOperacionPrestablecidas } from 'src/app/interfaces/traslados_cnt/cnt_operacion_prestablecidas.';
import { TrasladosCuentasArrModel, TrasladosCuentasModel } from 'src/app/models/trasladosCuentas.';
import { CntContablesService } from 'src/app/services/cntContables.service';
import { newTrasladoAsignarSaldoComponent } from '../newTrasladoAsignarSaldo/newTrasladoAsignarSaldo.component';
import { SoporteOperacion } from 'src/app/interface/soporte-operacion';
import { cajaRequest, ejecucionTrasladosRequest } from 'src/app/interfaces/producto-request';
import { PrinterManager } from 'src/app/models/printerManager';
import { cajaModel } from 'src/app/models/ventas/cajas.model';
import { cajasServices } from 'src/app/services/Cajas.services';
import Swal from 'sweetalert2';
import { establecimientoModel } from 'src/app/models/ventas/establecimientos.model';

@Component({
  selector: 'app-ejecutar-asignacion-saldos',
  templateUrl: './ejecutarAsignacionSaldos.component.html',
  styleUrls: ['./ejecutarAsignacionSaldos.component.css'],
})
export class EjecutarAsignacionSaldosComponent  { 
  establecimientos:establecimientoModel[] = []; 
   nombreCuentaDestino :string = ''
   nombreTraslado :string = ''
   idCuentaDestino :number = 0 ; 
   saldofinal :number = 0 ; 
   private newAbrirDialog = inject(MatDialog);
   dataProceso?:TrasladosCuentasModel;
   valorTraslado:number = 0;
   private cntService = inject(CntContablesService);
   private cajasService = inject(cajasServices);
   public cajaSeleccionada:number = 0;
 
   constructor(  @Inject(MAT_DIALOG_DATA) public dataIngreso:CntOperacionPrestablecidas,public dialogo: MatDialogRef<newTrasladoAsignarSaldoComponent>,  ){
     this.dataProceso =  new TrasladosCuentasModel();
     
     this.cajasService.currentArrEsta.subscribe({next:(value:establecimientoModel[]|null)=>{
      if(value != undefined && value != null  ){  
        let cajasel:establecimientoModel = {
          id: 0, nombre: 'Seleccione el establecimiento origen',
          idCCntCCobrar: 0,
          idRetefuenteCompra: 0,
          idCCntCPagar: 0,
          idCCntIvaCompra: 0,
          idCCnttIvaVenta: 0,
          idCCntCostoVenta: 0,
          idCCntVenta: 0,
          idCCntIngDifBonoRegalo: 0,
          descripcion: '',
          tipo: 0,
          fecha_creacion: new Date(),
          usuario_creacion: 0,
          estado: 0,
          nombreRetefuenteCompra: '',
          nombreCCntCCobrar: '',
          nombreCCntCPagar: '',
          nombreCCntIngDifBonoRegalo: '',
          nombreCCnttIvaVenta: '',
          nombreCCntIvaCompra: '',
          nombreCCntCostoVenta: '',
          nombreCCntVentas: '',
          nombreCCntCajaGeneral: '',
          idCCntCajaGeneral: 0,
          idRetefuenteVenta: 0,
          idDescuentoCompra: 0,
          idDescuentoVenta: 0,
          nombreRetefuenteVenta: '',
          nombreDescuentoCompra: '',
          nombreDescuentoVenta: '',
          tel1: '',
          tel2: '',
          direccion: '',
          pais: '',
          departamento: '',
          ciudad: '',
          nit: '',
          logo: ''
        };

        this.establecimientos =(value.length>0)?[{...cajasel}  , ...value ] : [...value] ;
        //console.log('cajaas' , this.establecimientos);
        
      }
    }, error: e=>Swal.fire('error',e.error.error,'error')})
     /*
      DESDE_CAJA
      ASIGNA_SALDO
      DE_UNA_A_MUCHOS
      DE_MUCHOS_A_UNA
     */ 
    //console.log(this.dataIngreso);
    
    if(this.dataIngreso != undefined){
     this.dataProceso  = this.dataProceso.createTraslado( dataIngreso );  
     this.cntService.getCuentasTrasladosPreeEjecucion(this.dataIngreso.id!).subscribe({next:(value)=>{ 
           this.dataProceso!.cuentas =  value.data;
           //console.log('cuentas' , value.data);
           
     },error:e=> console.error(e.error.error) })
 
   }
   }
   calcularValorTraslado(){
    let valorSaldo:number =  this.saldofinal||0 ; 
    let origen =  this.dataProceso?.cuentas.find(x=> x.tipo == 'ORIGEN')
    //console.log('origen' , origen);
    
    let valorSaldoActual:number = ( parseFloat(origen!.saldo.toString())||0) ; 
    //console.log('valorSaldoActual' , valorSaldoActual);
    
    if (valorSaldoActual == 0 ){
      this.valorTraslado = valorSaldo * -1
    } else if (valorSaldoActual < 0 ){
      this.valorTraslado = valorSaldoActual + ( valorSaldo * -1)
    } else if (valorSaldoActual > 0  )
            {  this.valorTraslado =    valorSaldoActual - valorSaldo }
   }
   ejecutar(){
       //console.log('cajaSeleccionada',this.cajaSeleccionada);
       
       if(this.cajaSeleccionada == 0){
         Swal.fire('error','Debe seleccionar el origen del traslado')
       }
       this.dataProceso!.idEstablecimiento = this.establecimientos[this.cajaSeleccionada].id!
       if(this.valorTraslado == 0){
         Swal.fire('error','Debe ingresar el valor del traslado')
       }
       this.dataProceso?.cuentas.forEach(x=> x.valor = this.valorTraslado) 
       this.cntService.ejecutarTrasladosCuentas(this.dataProceso!).subscribe({next:(val:ejecucionTrasladosRequest)=>{
         this.printer_soporte_final(val.objeto);
       },error:e=>console.error('error' , e.error.error)
       })
       
   }
 
   
   async printer_soporte_final(soporte:SoporteOperacion) {   
    // //console.log('documento retorno',doc,'sucursal ', this.sucursal); 
     let printM =  new PrinterManager(this.cajasService);  
     printM.printSoporteMovimiento(false,soporte);
     this.dialogo.close(true);
   }
 }
 