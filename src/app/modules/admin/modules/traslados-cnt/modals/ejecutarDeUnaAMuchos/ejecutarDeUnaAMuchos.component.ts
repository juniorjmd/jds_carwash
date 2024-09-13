import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CntOperacionPrestablecidas } from 'src/app/interfaces/traslados_cnt/cnt_operacion_prestablecidas.';
import { TrasladosCuentasModel } from 'src/app/models/trasladosCuentas.';
import { CntContablesService } from 'src/app/services/cntContables.service';
import { newTrasladoAsignarSaldoComponent } from '../newTrasladoAsignarSaldo/newTrasladoAsignarSaldo.component';

@Component({
  selector: 'app-ejecutarDeUnaAMuchos',
  templateUrl: './ejecutarDeUnaAMuchos.component.html',
  styleUrls: ['./ejecutarDeUnaAMuchos.component.css'],
})
export class ejecutarDeUnaAMuchosComponent { 
 
  nombreCuentaDestino :string = ''
  nombreTraslado :string = ''
  idCuentaDestino :number = 0 ; 
  private newAbrirDialog = inject(MatDialog);
  dataProceso?:TrasladosCuentasModel;
  private cntService = inject(CntContablesService);
  constructor(  @Inject(MAT_DIALOG_DATA) public dataIngreso:CntOperacionPrestablecidas,public dialogo: MatDialogRef<newTrasladoAsignarSaldoComponent>,  ){
    this.dataProceso =  new TrasladosCuentasModel();
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

}
