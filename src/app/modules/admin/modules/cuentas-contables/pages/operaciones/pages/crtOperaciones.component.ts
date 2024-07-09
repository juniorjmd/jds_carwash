import { Component, OnInit } from '@angular/core';
import { cntTransaccionesRequest } from 'src/app/interfaces/producto-request';
import { CntClasesModel } from 'src/app/models/cnt-clases/cnt-clases.module';
import { CntCuentaMModel } from 'src/app/models/cnt-cuenta-m/cnt-cuenta-m.module';
import { CntGruposModel } from 'src/app/models/cnt-grupos/cnt-grupos.module';
import { CntOperacionesModel } from 'src/app/models/cnt-operaciones/cnt-operaciones.module';
import { CntSubCuentaModel, vwCntSubCuentaModel } from 'src/app/models/cnt-sub-cuenta/cnt-sub-cuenta.module';
import { TransaccionesModel, vwTransaccionesModel } from 'src/app/models/transacciones/transacciones.module';
import { CntContablesService } from 'src/app/services/cntContables.service';

@Component({
  selector: 'crear-operaciones',
  templateUrl: './crtOperaciones.component.html',
  styleUrls: ['./crtOperaciones.component.css']
})
export class CrearOperacionesComponent implements OnInit {
  newCntTransacciones: vwTransaccionesModel = new vwTransaccionesModel();
  operCntTransacciones: vwTransaccionesModel[] = [] ;
 newOperacion:CntOperacionesModel= new CntOperacionesModel();
  clases: CntClasesModel[] = []; // Lista de clases
  grupos: CntGruposModel[] = []; // Lista de grupos filtrada por clase
  cuentasMayores: CntCuentaMModel[] = []; // Lista de cuentas mayores filtrada por grupo
  cuentas: vwCntSubCuentaModel[] = []; // Lista de cuentas filtrada por cuenta mayor
 
  Mgrupos: CntGruposModel[] = []; // Lista de grupos filtrada por clase
  McuentasMayores: CntCuentaMModel[] = []; // Lista de cuentas mayores filtrada por grupo
  Mcuentas: vwCntSubCuentaModel[] = [];

  selectedClase: number= 0;
  selectedGrupo: number = 0;
  selectedCuentaMayor: number  =0;
  slclases?: CntClasesModel ; // Lista de clases
  slgrupos?: CntGruposModel ; // Lista de grupos filtrada por clase
  slcuentasMayores?: CntCuentaMModel ; // Lista de cuentas mayores filtrada por grupo
  slcuentas?: vwCntSubCuentaModel;

  constructor(private cntService:CntContablesService){

  }

  ngOnInit(): void {

    this.getTransaccionesTemporales();
    this.cntService.currentCntClase.subscribe({next:(value:CntClasesModel[] | null)=>{
      this.clases = value??[] ;
      console.log(this.clases) 
    },error : (e:any)=>console.error(e.error.error)})
    
    this.cntService.currentCntGrupo.subscribe({next:(value:CntGruposModel[] | null)=>{
      this.Mgrupos = value??[] ;
      console.log(this.clases) 
    },error : (e:any)=>console.error(e.error.error)})
 
    this.cntService.currentCntcuentaM.subscribe({next:(value:CntCuentaMModel[] | null)=>{
      this.McuentasMayores = value??[] ;
      console.log(this.clases) 
    },error : (e:any)=>console.error(e.error.error)})
    this.cntService.currentsubcuenta.subscribe({next:(value:vwCntSubCuentaModel[] | null)=>{
      this.Mcuentas = value??[] ;
      console.log(this.clases) 
    },error : (e:any)=>console.error(e.error.error)})
    


  }

  
  onClaseChange(){
    this.grupos = []; // Lista de grupos filtrada por clase
    this.cuentasMayores  = []; // Lista de cuentas mayores filtrada por grupo
    this.cuentas  = [];  
    this.slcuentas= undefined;
    this.grupos = this.Mgrupos.filter(x=>x.cod_clase == this.selectedClase)

  }
  onGrupoChange(){ // Lista de grupos filtrada por clase
    this.cuentasMayores  = []; // Lista de cuentas mayores filtrada por grupo
    this.cuentas  = [];    // Lista de cuentas mayores filtrada por grupo
    this.slcuentas= undefined;
    this.cuentasMayores = this.McuentasMayores.filter(x=>x.id_grupo == this.selectedGrupo)
  }
  onCuentaMayorChange(){  
     this.slcuentas= undefined;
    this.cuentas  = this.Mcuentas.filter(x=>x.cod_cuenta == this.selectedCuentaMayor)
  }

  getTransaccionesTemporales(){
    this.cntService.getCntTransaccionesTmp().subscribe({next:(value:cntTransaccionesRequest)=>{
      this.operCntTransacciones = value.data
    }})
  }
  onSubmit() {
    // Aquí puedes manejar la lógica de envío del formulario
    this.slcuentas= this.cuentas.filter(x=>x.id_scuenta == this.newCntTransacciones.id_cuenta)[0];
    this.newCntTransacciones.nro_subcuenta =  this.slcuentas.nro_scuenta;
    this.newCntTransacciones.nombre_subcuenta = this.slcuentas.nombre_scuenta ; 
    this.newCntTransacciones.nombre_cuenta = this.slcuentas.nombre_cuenta ; 
    this.newCntTransacciones.nombre_grupo = this.slcuentas.nombre_grupo ; 
    this.newCntTransacciones.nombre_clase = this.slcuentas.nombre_clase ;  
    console.log(this.newCntTransacciones);
    this.cntService.setCntTransaccionesTmp(this.newCntTransacciones).subscribe({next:(value:any)=>{ 
      this.getTransaccionesTemporales();
    }})
   

  }
}
