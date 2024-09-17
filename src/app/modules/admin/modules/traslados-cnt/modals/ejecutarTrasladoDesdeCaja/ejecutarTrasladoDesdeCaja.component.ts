import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CntOperacionPrestablecidas } from 'src/app/interfaces/traslados_cnt/cnt_operacion_prestablecidas.';
import { TrasladosCuentasArrModel, TrasladosCuentasModel } from 'src/app/models/trasladosCuentas.';
import { CntContablesService } from 'src/app/services/cntContables.service';
import { newTrasladoAsignarSaldoComponent } from '../newTrasladoAsignarSaldo/newTrasladoAsignarSaldo.component';
import { cajasResumenModel } from 'src/app/models/ventas/cajasResumen.model';
import { cajaModel } from 'src/app/models/ventas/cajas.model';
import { cajasServices } from 'src/app/services/Cajas.services';
import Swal from 'sweetalert2';
import { cajaRequest } from 'src/app/interfaces/producto-request';

@Component({
  selector: 'app-ejecutarTrasladoDesdeCaja',
  templateUrl: './ejecutarTrasladoDesdeCaja.component.html',
  styleUrls: ['./ejecutarTrasladoDesdeCaja.component.css'],
})
export class ejecutarTrasladoDesdeCajaComponent { 
 cajas:cajaModel[] = []; 
  nombreCuentaDestino :string = ''
  nombreTraslado :string = ''
  idCuentaDestino :number = 0 ; 
  private newAbrirDialog = inject(MatDialog);
  dataProceso?:TrasladosCuentasModel;
  valorTraslado:number = 0;
  private cntService = inject(CntContablesService);
  private cajasService = inject(cajasServices);
  public cajaSeleccionada:number = 0;

  constructor(  @Inject(MAT_DIALOG_DATA) public dataIngreso:CntOperacionPrestablecidas,public dialogo: MatDialogRef<newTrasladoAsignarSaldoComponent>,  ){
    this.dataProceso =  new TrasladosCuentasModel();
    this.cajasService.getCajas().subscribe({next:(value:cajaRequest)=>{
      if(value.error != 'ok'){
        Swal.fire('error',value.error,'error')
      }else{ 
        let cajasel:cajaModel = { id: 0, nombre: 'Seleccione una caja origen', 
          idCCntCCobrar:  0,
          idRetefuenteCompra:    0,
          idCCntCPagar:  0, 
          idCCntIvaCompra:    0,
          idCCnttIvaVenta:    0,
          idCCntCostoVenta:    0,
          idCCntVenta:   0,
          idCCntIngDifBonoRegalo:   0 
};

        this.cajas =[{...cajasel}  , ...value.data]  
        console.log('cajaas' , this.cajas);
        
      }
    }, error: e=>Swal.fire('error',e.error.error,'error')})
    /*
     DESDE_CAJA
     ASIGNA_SALDO
     DE_UNA_A_MUCHOS
     DE_MUCHOS_A_UNA
    */ 
   console.log(this.dataIngreso);
   
   if(this.dataIngreso != undefined){
    this.dataProceso  = this.dataProceso.createTraslado( dataIngreso );  
    this.cntService.getCuentasTrasladosPreeEjecucion(this.dataIngreso.id!).subscribe({next:(value)=>{ 
          this.dataProceso!.cuentas =  value.data;
          console.log('cuentas' , value.data);
          
    },error:e=> console.error(e.error.error) })

  }
  }
  ejecutar(){
      console.log('cajaSeleccionada',this.cajaSeleccionada);
      
      if(this.cajaSeleccionada == 0){
        Swal.fire('error','Debe seleccionar el origen del traslado')
      }
      this.dataProceso!.idEstablecimiento = this.cajas[this.cajaSeleccionada].establecimiento!
      if(this.valorTraslado == 0){
        Swal.fire('error','Debe ingresar el valor del traslado')
      }
      this.dataProceso?.cuentas.forEach(x=> x.valor = this.valorTraslado)
      let newCuentaOrigen = new TrasladosCuentasArrModel();
      newCuentaOrigen.idCuenta = this.cajas[this.cajaSeleccionada].idCCntVenta      ;
      newCuentaOrigen.tipo = 'ORIGEN';
      newCuentaOrigen.valor = this.valorTraslado;
      newCuentaOrigen.cuenta = this.cajas[this.cajaSeleccionada].nro_scuenta_venta!;
      newCuentaOrigen.nombre = this.cajas[this.cajaSeleccionada].nombre_scuenta_venta!;

      this.dataProceso?.cuentas.push(newCuentaOrigen);
      this.cntService.ejecutarTrasladosCuentas(this.dataProceso!).subscribe({next:val=>{},error:e=>console.error('error' , e.error.error)
      })
      
  }
}
