import { AfterViewInit,  Component,  inject,   } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal'; 
import { ColumnasTabla } from 'src/app/interfaces/nInterfaces/columnas-tabla'; 
import {  MatDialog } from '@angular/material/dialog';
import { responseSubC } from 'src/app/interfaces/odoo-prd';
import { tap } from 'rxjs';
import { CntContablesService } from 'src/app/services/cntContables.service';
import { CntOperacionPrestablecidas } from 'src/app/interfaces/traslados_cnt/cnt_operacion_prestablecidas.';
import { newTrasladoAsignarSaldoComponent } from '../../modals/newTrasladoAsignarSaldo/newTrasladoAsignarSaldo.component';
import { EjecutarAsignacionSaldosComponent } from '../../modals/ejecutarAsignacionSaldos/ejecutarAsignacionSaldos.component';

@Component({
  selector: 'app-traslado-para-asignar-saldo',
  templateUrl: './trasladoParaAsignarSaldo.component.html',
  styleUrls: ['./trasladoParaAsignarSaldo.component.css'], 
})
export class TrasladoParaAsignarSaldoComponent implements AfterViewInit {

  ngOnInit(): void { }
  origen = 'grupos';
  datos:CntOperacionPrestablecidas[] =  []
  ColumnasTabla:ColumnasTabla[] = [{ name : 'nombre_preforma' , columna : 'nombre' }, 
    { name : 'descripcion' , columna : 'descripcion' }   ];
  
    
  bsModalRef!: BsModalRef;
  nombreCCntCostoVenta = '';
  idCCntCostoVenta = 0 ; 
  private newAbrirDialog = inject(MatDialog); 
  private cntService = inject(CntContablesService);
constructor(){ 
  /*DESDE_CAJA\nASIGNA_SALDO\nDE_UNA_A_MUCHOS\nDE_MUCHOS_A_UNA */

}

eliminar(item:CntOperacionPrestablecidas){
  this.cntService.deleteItemListadoOprPre(item.id).subscribe({next:(value)=>{ 
   this.ngAfterViewInit(); 
  },error:e=>console.error(e.error.error)})
}
editar(item:CntOperacionPrestablecidas){
  this.newAbrirDialog.open(newTrasladoAsignarSaldoComponent, { data:  item })
.afterClosed() 
.pipe(
  tap((response: responseSubC) => {
    console.log('buscarCuentasContablesGastos',response);
    if(response != undefined){ 
      if (response  ) {    
        this.ngAfterViewInit()
      }  
    }
  })
).subscribe({
  next: () => {},
  error: (error) => console.error('Error:', error),
  complete: () => console.log('buscarCuentasContables completo')
}); 


}
ejecutarPerforma(item:CntOperacionPrestablecidas){
  //EjecutarAsignacionSaldosComponent
  this.newAbrirDialog.open(EjecutarAsignacionSaldosComponent, { data:  item }); 
  

}
  ngAfterViewInit(): void {
    this.cntService.getTrasladoByType('ASIGNA_SALDO').subscribe({next:(value)=>{
      this.datos = value.data;
      console.log('Datos recibidos',this.datos);
      
    },error:e=>console.error(e.error.error)})
  }
openModal() {  
this.newAbrirDialog.open(newTrasladoAsignarSaldoComponent, { data:  null })
.afterClosed() 
.pipe(
  tap((response: responseSubC) => {
    if(response != undefined){ 
      if (response  ) {    
        this.ngAfterViewInit()
      }  
    }
  })
).subscribe({
  next: () => {},
  error: (error) => console.error('Error:', error),
  complete: () => console.log('buscarCuentasContables completo')
}); 

}
}
