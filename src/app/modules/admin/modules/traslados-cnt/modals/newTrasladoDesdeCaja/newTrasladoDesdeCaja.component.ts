import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { responseSubC } from 'src/app/interfaces/odoo-prd';
import { CntOperacionPrestablecidas } from 'src/app/interfaces/traslados_cnt/cnt_operacion_prestablecidas.';
import { ModalCntSubCuentasComponent } from 'src/app/modules/admin/modals/cuentasContables/cnt-sub-cuentas.component';
import { CntContablesService } from 'src/app/services/cntContables.service';

@Component({
  selector: 'app-new-traslado-desde-caja', 
  templateUrl: './newTrasladoDesdeCaja.component.html',
  styleUrls: ['./newTrasladoDesdeCaja.component.css'], 
})
export class NewTrasladoDesdeCajaComponent { 
  nombreCuentaDestino :string = ''
  nombreTraslado :string = ''
  idCuentaDestino :number = 0 ; 
  private newAbrirDialog = inject(MatDialog);
  dataProceso?:CntOperacionPrestablecidas
  private cntService = inject(CntContablesService);
  constructor(  @Inject(MAT_DIALOG_DATA) public dataIngreso:CntOperacionPrestablecidas, ){
   if(this.dataIngreso != undefined)this.dataProceso = dataIngreso;
   else{ this.dataProceso = {  tipo : '' ,  nombre_preforma : '', descripcion : '', activo : true}}
  }

buscarCuentaContable(){
 

this.newAbrirDialog.open(ModalCntSubCuentasComponent, { data:  null })
.afterClosed() 
.pipe(
  tap((response: responseSubC) => {
    if (response.confirmado && response.datoDevolucion !== undefined ) {    
      this.nombreCuentaDestino = response.datoDevolucion.nombre_scuenta!;
      this.idCuentaDestino = response.datoDevolucion.id_scuenta!;   
      console.log('buscarCuentasContablesGastos',response , this.nombreCuentaDestino , response.datoDevolucion.nombre_scuenta!,
      this.idCuentaDestino , response.datoDevolucion.id_scuenta!   ) ;
      
    }  
  })
).subscribe({
  next: () => {},
  error: (error) => console.error('Error:', error),
  complete: () => console.log('buscarCuentasContables completo')
}); 
  
}


guardar(){
  
}
}
