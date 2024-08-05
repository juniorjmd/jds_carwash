import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { responseSubC } from 'src/app/interfaces/odoo-prd';
import { cntSubCuentaRequest, cntSubCuentaVwRequest, cntTransaccionesRequest } from 'src/app/interfaces/producto-request';
import { CntClasesModel } from 'src/app/models/cnt-clases/cnt-clases.module';
import { CntCuentaMModel } from 'src/app/models/cnt-cuenta-m/cnt-cuenta-m.module';
import { CntGruposModel } from 'src/app/models/cnt-grupos/cnt-grupos.module';
import { CntOperacionesModel } from 'src/app/models/cnt-operaciones/cnt-operaciones.module';
import { CntSubCuentaModel, subCuenta, vwCntSubCuentaModel } from 'src/app/models/cnt-sub-cuenta/cnt-sub-cuenta.module';
import { TransaccionesModel, vwTransaccionesModel } from 'src/app/models/transacciones/transacciones.module';
import { ModalCntSubCuentasComponent } from 'src/app/modules/admin/modals/cuentasContables/cnt-sub-cuentas.component';
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
  subCuentaCreacion:number = 0; 

  constructor(private cntService:CntContablesService , 
    private newAbrirDialog: MatDialog, ){

  }

  cancelarOperacion(){ 
    this.cntService.deleteListadoOprTmp().subscribe({next:(value:any)=>{ 
      console.log('cancelarOperacion' , value); 
      this.operCntTransacciones = [];
      this.limpiarMovimiento();
    }})
  }

  buscarCuentasContables( ){
    let data :subCuenta = {
      clase: this.selectedClase,
      grupo: this.selectedGrupo,
      cuenta: this.selectedCuentaMayor,
      subcuenta:0,
    }
    this.newAbrirDialog.open(ModalCntSubCuentasComponent, { data : data })
    .afterClosed() 
    .pipe(
      tap((response: responseSubC) => { 
        console.log('buscarCuentasContablesGastos',response);
        if (response.confirmado && response.datoDevolucion !== undefined ) {  
          this.subCuentaCreacion = response.datoDevolucion.id_scuenta!; 
          this.cntService.getCntCuentasById(this.subCuentaCreacion).subscribe({next:(value:cntSubCuentaVwRequest)=>{
            if(value.numdata > 0 ){
              this.Mcuentas = [...this.Mcuentas , ...value.data  ];
              this.cntService.changeSubCuenta(this.Mcuentas);
              this.cuentas  = this.Mcuentas.filter(x=>x.cod_cuenta == this.selectedCuentaMayor);
            }
    
          }, error:error=>console.error(error.error.error)
          })

        }  
      })
    ).subscribe({
      next: () => {},
      error: (error) => console.error('Error:', error),
      complete: () => console.log('buscarCuentasContables completo')
    }); 
  }


  eliminarDato(dato:TransaccionesModel){}
  editar(dato:TransaccionesModel){}

  limpiarMovimiento(){
    this.newCntTransacciones = new vwTransaccionesModel(); // Crear una nueva instancia del modelo
    this.selectedClase = 0;
    this.selectedGrupo = 0;
    this.selectedCuentaMayor = 0;
    this.slcuentas = undefined;
  }
  guardarOperacion(){}
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
      if (this.subCuentaCreacion > 0 ){
        this.onCuentaMayorChange() 
       this.newCntTransacciones.id_cuenta= this.subCuentaCreacion;
      }
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
  
    
    this.cuentasMayores = this.McuentasMayores.filter(x=>x.cod_grupo == this.selectedGrupo)
  }
  onCuentaMayorChange(){  
     this.slcuentas= undefined;
     console.log('onCuentaMayorChange', this.Mcuentas , this.selectedCuentaMayor);
    this.cuentas  = this.Mcuentas.filter(x=>x.cod_cuenta == this.selectedCuentaMayor)

    if(this.cuentas.length == 0){
      this.cntService.getCntCuentasByIdCM(this.selectedCuentaMayor).subscribe({next:(value:cntSubCuentaVwRequest)=>{
        if(value.numdata > 0 ){
          this.Mcuentas = [...this.Mcuentas , ...value.data  ];
          this.cntService.changeSubCuenta(this.Mcuentas);
          this.cuentas  = this.Mcuentas.filter(x=>x.cod_cuenta == this.selectedCuentaMayor);
        }

      }, error:error=>console.error(error.error.error)
      })
    }
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
