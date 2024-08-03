 
import {   Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; 
import { ActividadesDescuentoModel } from 'src/app/models/actividadesDescuentoModel'; 
import { ActiDescuentoService } from 'src/app/services/actiDescuento.service';

@Component({
  selector: 'app-modal-change-fecha-actividad', 
  templateUrl: './modalChangeFechaActividad.component.html',
  styleUrls: ['./modalChangeFechaActividad.component.css'],
  
})
export class ModalChangeFechaActividadComponent {

  
  private actividadService =  inject(ActiDescuentoService) 

  constructor(
    public dialogo: MatDialogRef<ModalChangeFechaActividadComponent>,
    @Inject(MAT_DIALOG_DATA) public actividad:ActividadesDescuentoModel ){ 
    }


    enviar(){
      this.actividadService.updateActividad(this.actividad).subscribe({next:(value:any)=>{
        if(value.error== 'ok') this.dialogo.close(true);
      }})
    }
    cancelar(){this.dialogo.close(false);}


    validarFechaFinal(){
      if( this.actividad.fechaInicial! > this.actividad.fechaFinal! ){
        this.actividad.fechaFinal = this.actividad.fechaInicial ;
      } 
    }
    
 }
