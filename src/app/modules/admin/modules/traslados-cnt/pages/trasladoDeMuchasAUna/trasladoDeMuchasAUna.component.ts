import { CommonModule } from '@angular/common';
import { AfterViewInit,   Component,  inject   } from '@angular/core';
import { BsModalRef  } from 'ngx-bootstrap/modal'; 
import { ColumnasTabla } from 'src/app/interfaces/nInterfaces/columnas-tabla'; 
import {   MatDialog } from '@angular/material/dialog';
import { responseSubC } from 'src/app/interfaces/odoo-prd';
import { tap } from 'rxjs';
import { CntContablesService } from 'src/app/services/cntContables.service';
import { CntOperacionPrestablecidas } from 'src/app/interfaces/traslados_cnt/cnt_operacion_prestablecidas.';
import { newTrasladoDeMuchasAUnaComponent } from '../../modals/newTrasladoDeMuchasAUna/newTrasladoDeMuchasAUna.component';
import { ejecutarDeMuchaAUnaComponent } from '../../modals/ejecutarDeMuchaAUna/ejecutarDeMuchaAUna.component';
import Swal from 'sweetalert2';
import { CustomConsole } from 'src/app/models/CustomConsole';

@Component({
  selector: 'app-traslado-de-muchas-a-una',
  templateUrl: './trasladoDeMuchasAUna.component.html',
  styleUrls: ['./trasladoDeMuchasAUna.component.css'], 
})
export class trasladoDeMuchasAUnaComponent implements AfterViewInit {

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
  },error:e=>Swal.fire(e.error.error)})
}
editar(item:CntOperacionPrestablecidas){
  this.newAbrirDialog.open(newTrasladoDeMuchasAUnaComponent, { data:  item })
.afterClosed() 
.pipe(
  tap((response: responseSubC) => {
    CustomConsole.log('buscarCuentasContablesGastos',response);
    if(response != undefined){ 
      if (response  ) {    
        this.ngAfterViewInit()
      }  
    }
  })
).subscribe({
  next: () => {},
  error: (error) => Swal.fire('Error:', error),
  complete: () => CustomConsole.log('buscarCuentasContables completo')
}); 


}
ejecutarPerforma(item:CntOperacionPrestablecidas){
  this.newAbrirDialog.open(ejecutarDeMuchaAUnaComponent, { data:  item }); 
}
  ngAfterViewInit(): void {
    this.cntService.getTrasladoByType('DE_MUCHOS_A_UNA').subscribe({next:(value)=>{
      this.datos = value.data;
      CustomConsole.log('Datos recibidos',this.datos);
      
    },error:e=>Swal.fire(e.error.error)})
  }
openModal() {  
this.newAbrirDialog.open(newTrasladoDeMuchasAUnaComponent, { data:  null })
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
  error: (error) => Swal.fire('Error:', error),
  complete: () => CustomConsole.log('buscarCuentasContables completo')
}); 

}
}
