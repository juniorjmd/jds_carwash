import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { responseSubC } from 'src/app/interfaces/odoo-prd';
import { cntClaseRequest, cntCuentaMayorRequest, cntSubCuentaRequest } from 'src/app/interfaces/producto-request';
import { CntClasesModel } from 'src/app/models/cnt-clases/cnt-clases.module';
import { CntCuentaMModel } from 'src/app/models/cnt-cuenta-m/cnt-cuenta-m.module';
import { CntGruposModel } from 'src/app/models/cnt-grupos/cnt-grupos.module';
import { CntSubCuentaModel, vwCntSubCuentaModel } from 'src/app/models/cnt-sub-cuenta/cnt-sub-cuenta.module';
import { CntContablesService } from 'src/app/services/cntContables.service';

@Component({
  selector: 'modal-cnt-sub-cuentas',
  templateUrl: './cnt-sub-cuentas.component.html',
  styleUrls: ['./cnt-sub-cuentas.component.css']
})
export class ModalCntSubCuentasComponent implements OnInit { 
  Subcuentas:vwCntSubCuentaModel[] = [];
  clases:CntClasesModel[]=[];
  grupos:CntGruposModel[]=[]; 
  cuentas?: CntCuentaMModel[] ;
  AuxCuentas?: CntCuentaMModel[]  ; // Esta lista debería ser llenada con los datos de la tabla `cnt_cuenta`
  AuxGrupos:CntGruposModel[]=[];
  codClase:number = 0;
  codGrupo:number = 0;
  auxSubCuentas:vwCntSubCuentaModel[] = [];
  newSubcuenta: vwCntSubCuentaModel = new vwCntSubCuentaModel();
  SubcuentaDevolucion: vwCntSubCuentaModel = new vwCntSubCuentaModel();
constructor(private cntService:CntContablesService, 
  public dialogo: MatDialogRef<ModalCntSubCuentasComponent>, 
){
    this.getAllSubcuentas();
}
filtrarPorNombre( ) {
  this.Subcuentas =  [...this.auxSubCuentas]
  console.log('codigo cuenta',this.newSubcuenta.cod_cuenta);
  if(this.newSubcuenta.nombre_scuenta  !== undefined  && this.newSubcuenta.nombre_scuenta!.trim() != '') { 
        this.cntService.getCntCuentasByName(this.newSubcuenta.nombre_scuenta).subscribe( {next:(value:cntSubCuentaRequest)=>{ 
          console.log('getCntCuentasByName',value)
          this.Subcuentas = value.data;  
          console.log('Subcuentas' , this.Subcuentas) 
         },
        error: (e:any)=>console.error(e.error.error)})
      } 
  
}
cancelar(){
  let idSuc = this.newSubcuenta.cod_cuenta ; 
  this.newSubcuenta= new vwCntSubCuentaModel(); 
  this.newSubcuenta.cod_cuenta = idSuc; 
  this.Subcuentas =  [...this.auxSubCuentas] 
  this.codClase = 0;
  this.codGrupo  = 0;
}


filtrarSubCuentas(){
  if(this.newSubcuenta.cod_cuenta != undefined){ 
  this.cntService.getCntCuentasByIdCM(this.newSubcuenta.cod_cuenta).subscribe( {next:(value:cntSubCuentaRequest)=>{ 
    console.log('getCntCuentasByIdCM',value)
    this.Subcuentas = value.data; 
    this.auxSubCuentas=value.data;
    console.log('Subcuentas' , this.Subcuentas) 
   },
  error: (e:any)=>console.error(e.error.error)})
}else{this.getAllSubcuentas()}
}

filtrarSubCuentasPorGrupo(){
  if(this.codGrupo != undefined && this.codGrupo > 0 ){ 
    this.cuentas = this.AuxCuentas?.filter(x=>x.cod_grupo == this.codGrupo);
  this.cntService.getCntCuentasByIdGrupo(this.codGrupo).subscribe( {next:(value:cntSubCuentaRequest)=>{ 
    console.log('getCntCuentasByIdCM',value)
    this.Subcuentas = value.data; 
    this.auxSubCuentas=value.data;
    console.log('Subcuentas' , this.Subcuentas) 
   },
  error: (e:any)=>console.error(e.error.error)})
}else{this.getAllSubcuentas()
  this.cuentas = [...this.AuxCuentas!];
}
}
filtrarSubCuentasPorClase(){
  if(this.codClase != undefined && this.codClase > 0 ){ 
    this.grupos = this.AuxGrupos.filter(x=>x.cod_clase == this.codClase) ;
  this.cntService.getCntCuentasByIdClase(this.codClase).subscribe( {next:(value:cntSubCuentaRequest)=>{ 
    console.log('getCntCuentasByIdCM',value)
    this.Subcuentas = value.data; 
    this.auxSubCuentas=value.data;
    console.log('Subcuentas' , this.Subcuentas) 
   },
  error: (e:any)=>console.error(e.error.error)})
}else{this.getAllSubcuentas() 
  this.grupos =[...this.AuxGrupos];
}
}



ngOnInit() {


  this.cntService.currentCntClase.subscribe({next:(value:CntClasesModel[] | null)=>{
    
    console.log('currentCntClase - value',value) 
    this.clases = value??[] ;
    console.log('currentCntClase',this.clases) 
  },error : (e:any)=>console.error(e.error.error)})


  
  this.cntService.currentCntGrupo.subscribe({next:(value:CntGruposModel[] | null)=>{ 
    console.log('currentCntGrupo - value',value) 
    this.grupos = value??[] ;
    this.AuxGrupos = this.grupos;
    console.log('currentCntGrupo',this.grupos) 
  },error : (e:any)=>console.error(e.error.error)})


  this.cntService.currentCntcuentaM.subscribe({next:(value:CntCuentaMModel[] | null)=>{
    
    console.log('currentCntcuentaM - value',value) 
    this.cuentas = value??[] ;
    this.AuxCuentas = this.cuentas;
    console.log('currentCntcuentaM',this.cuentas) 
  },error : (e:any)=>console.error(e.error.error)})
  // Aquí deberías cargar los datos de `cnt_cuenta` desde el servicio correspondiente
  
}
modificarSubcuenta(subcuenta:vwCntSubCuentaModel){
  this.newSubcuenta = {...subcuenta}
}
getAllSubcuentas(){
  this.cntService.getCntCuentas().subscribe( {next:(value:cntSubCuentaRequest)=>{   
    this.Subcuentas = value.data; 
    this.auxSubCuentas=value.data;
    console.log('Subcuentas' , this.Subcuentas) 
   },
  error: (e:any)=>console.error(e.error.error)})



}
enviarNewRegistro() {

  // Aquí puedes manejar la lógica de envío del formulario
  console.log('nueva subcuenta' , this.newSubcuenta);
  
  this.cntService.setNewSubCuenta(this.newSubcuenta).subscribe( {next:(respuesta:any)=>{  

    if (respuesta.error === 'ok'){
      alert('Datos creados con exito!!')
      if(respuesta.idGenerado != undefined){
        this.newSubcuenta.id_scuenta  =  respuesta.idGenerado[0].Id;  
      }  
      this.SubcuentaDevolucion = {...this.newSubcuenta}
      this.cerrarok()  
    } 
   },
  error: (e:any)=>console.error(e.error.error)})  
}

retornarRegistroBusqueda(subCuentaSel:CntSubCuentaModel) {
   this.SubcuentaDevolucion= {...subCuentaSel};
  // Aquí puedes manejar la lógica de envío del formulario
  console.log('nueva subcuenta' , this.newSubcuenta, subCuentaSel); 
  this.cerrarok()  
}
cerrarok(){
  let respuesta:responseSubC = {
    confirmado: true , datoDevolucion: this.SubcuentaDevolucion
  }
   this.dialogo.close(respuesta)
}
}
