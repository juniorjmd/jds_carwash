import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { cntDocOperacionesRequest, cntOperacionesRequest,  cntTipDocOperacionesRequest } from 'src/app/interfaces/producto-request'; 
import { CntOperacionesModel } from 'src/app/models/cnt-operaciones/cnt-operaciones.module'; 
import { CntContablesService } from 'src/app/services/cntContables.service';

@Component({
  selector: 'listar-operaciones',
  templateUrl: './listarOperacionesAutomaticas.component.html',
  styleUrls: ['./listarOperacionesAutomaticas.component.css']
})
export class ListarOperacionesAutomaticasComponent implements OnInit {
  operaciones: CntOperacionesModel[] = [];  

  docOperaciones:  {"idDocumento":number , "idDocumentoFinal":string}[] = []
  tipDocOperaciones: {"tipoDocumentoFinal":number , "nombreTipoDocumentoFinal":string}[]  = [];  

  selTipoDocuemto:number= 0;
  selIdDocumento:number = 0;
  constructor(private cntService:CntContablesService,  private _Router: Router , ){
    
  }
  enviarOperacionCurrent(operacion:CntOperacionesModel){
       this.cntService.changeOperacion(operacion);
       this._Router.navigate(['home','admin','cuentasContables',        
        'operaciones','detalle']);///home/admin/cuentasContables/operaciones/listar
  }
  ngOnInit(): void {
      
    this.cntService.getCntOperacionesAuto().subscribe({next:(value:cntOperacionesRequest )=>{
      this.operaciones =  value.data; 
    },error : (e:any)=>console.error(e.error.error)}) 
    
  this.cntService.getDocumentosOperacionesAuto().subscribe({next:(value:cntDocOperacionesRequest )=>{
    this.docOperaciones =  value.data; 
  },error : (e:any)=>console.error(e.error.error)}) 


  this.cntService.getTipDocOperacionesAuto().subscribe({next:(value:cntTipDocOperacionesRequest )=>{
    this.tipDocOperaciones =  value.data; 
  },error : (e:any)=>console.error(e.error.error)}) 



  }
  
  buscarPorDocumento( ){ 

    if(this.selIdDocumento <=  0 ) return ; 


     
  this.cntService.getDocumentosOperacionesAuto().subscribe({next:(value:cntDocOperacionesRequest )=>{
    this.docOperaciones =  value.data; 
  },error : (e:any)=>console.error(e.error.error)}) 


  this.cntService.getTipDocOperacionesAuto().subscribe({next:(value:cntTipDocOperacionesRequest )=>{
    this.tipDocOperaciones =  value.data; 
  },error : (e:any)=>console.error(e.error.error)}) 

  }

  buscarPorTipoDocumento( ){
    
    if(this.selTipoDocuemto <=  0 ) return ; 
     
      this.cntService.getDocumentosOperacionesAuto().subscribe({next:(value:cntDocOperacionesRequest )=>{
        this.docOperaciones =  value.data; 
      },error : (e:any)=>console.error(e.error.error)}) 


      this.cntService.getTipDocOperacionesAuto().subscribe({next:(value:cntTipDocOperacionesRequest )=>{
        this.tipDocOperaciones =  value.data; 
      },error : (e:any)=>console.error(e.error.error)}) 

  }
 
}
