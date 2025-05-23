import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cajaModel } from 'src/app/models/ventas/cajas.model';
import { cajasServices } from 'src/app/services/Cajas.services';
import { loading } from 'src/app/models/app.loading';
import { cajasResumenModel } from 'src/app/models/ventas/cajasResumen.model';
import { select } from 'src/app/interfaces/generales.interface';
import { PrinterManager } from 'src/app/models/printerManager';

@Component({
  selector: 'app-resumen-caja',
  templateUrl: './resumen-caja.component.html',
  styleUrls: ['./resumen-caja.component.css']
})
export class ResumenCajaComponent implements OnInit {

  caja:cajaModel ;
  printerManager?:PrinterManager  ;
  cajaResumen:cajasResumenModel;
   constructor( private cajaService : cajasServices,
     public dialogo: MatDialogRef<ResumenCajaComponent>,
     @Inject(MAT_DIALOG_DATA) public cajaResumenImport:cajasResumenModel,
     public loading : loading) { 
       this.cajaResumen  = this.cajaResumenImport;
       this.caja = new cajaModel(this.cajaResumen.caja) 
     }
 
 
  ngOnInit(): void {
  }

  cerrarFormulario(){
    this.dialogo.close(true);
  }
}
