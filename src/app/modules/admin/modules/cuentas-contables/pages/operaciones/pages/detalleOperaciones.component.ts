import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cntOperacionesRequest, cntTransaccionesRequest } from 'src/app/interfaces/producto-request';
import { CntClasesModel } from 'src/app/models/cnt-clases/cnt-clases.module';
import { CntCuentaMModel } from 'src/app/models/cnt-cuenta-m/cnt-cuenta-m.module';
import { CntGruposModel } from 'src/app/models/cnt-grupos/cnt-grupos.module';
import { CntOperacionesModel } from 'src/app/models/cnt-operaciones/cnt-operaciones.module';
import { CntSubCuentaModel, vwCntSubCuentaModel } from 'src/app/models/cnt-sub-cuenta/cnt-sub-cuenta.module';
import { TransaccionesModel, vwTransaccionesModel } from 'src/app/models/transacciones/transacciones.module';
import { CntContablesService } from 'src/app/services/cntContables.service';

@Component({
  selector: 'listar-operaciones',
  templateUrl: './detalleOperaciones.component.html',
  styleUrls: ['./detalleOperaciones.component.css']
})
export class DetalleOperacionesComponent implements OnInit {
  operacion?: CntOperacionesModel ;  
  transacciones:vwTransaccionesModel[] =  [];
  constructor(private cntService:CntContablesService , private _Router: Router){
     
  }
 
  ngOnInit(): void {
      
    this.cntService.currentoperacion.subscribe({next:(value:CntOperacionesModel | null )=>{
      this.operacion = value?? undefined ; 
      console.log(this.operacion)
      if(this.operacion !== undefined){
        this.cntService.getCntTransacciones(this.operacion?.id!).subscribe(
          {next:(result:cntTransaccionesRequest)=>{
           this.transacciones= result.data;
           console.log(this.transacciones)
          },error:(e)=>console.error(e.error.error)}
        )
      }

    },error : (e:any)=>console.error(e.error.error)}) 
    


  }
 
}
