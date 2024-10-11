import { Component, OnInit } from '@angular/core';
import { cntCuentaMayorRequest, cntSubCuentaRequest } from 'src/app/interfaces/producto-request';
import { CntCuentaMModel } from 'src/app/models/cnt-cuenta-m/cnt-cuenta-m.module';
import { vwCntSubCuentaModel } from 'src/app/models/cnt-sub-cuenta/cnt-sub-cuenta.module';
import { CntContablesService } from 'src/app/services/cntContables.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cnt-sub-cuentas',
  templateUrl: './cnt-sub-cuentas.component.html',
  styleUrls: ['./cnt-sub-cuentas.component.css']
})
export class CntSubCuentasComponent implements OnInit { 
  Subcuentas:vwCntSubCuentaModel[] = [];
  auxSubCuentas:vwCntSubCuentaModel[] = [];
newSubcuenta: vwCntSubCuentaModel = new vwCntSubCuentaModel();
cuentas?: CntCuentaMModel[]  ; // Esta lista debería ser llenada con los datos de la tabla `cnt_cuenta`
constructor(private cntService:CntContablesService){
    this.getAllSubcuentas();
}
filtrarPorNombre( ) {
  this.Subcuentas =  [...this.auxSubCuentas]
  //console.log('codigo cuenta',this.newSubcuenta.cod_cuenta);
  if(this.newSubcuenta.nombre_scuenta && this.newSubcuenta.nombre_scuenta!.trim() != '') {
    if(this.newSubcuenta.cod_cuenta !== undefined &&  this.newSubcuenta.cod_cuenta! > 0 )
    {
      this.Subcuentas =  this.Subcuentas.filter(item => item.nombre_scuenta?.toUpperCase()!.includes(this.newSubcuenta.nombre_scuenta!.toUpperCase()));
      }else{
        this.cntService.getCntCuentasByName(this.newSubcuenta.nombre_scuenta).subscribe( {next:(value:cntSubCuentaRequest)=>{ 
          //console.log('getCntCuentasByName',value)
          this.Subcuentas = value.data;  
          //console.log('Subcuentas' , this.Subcuentas) 
         },
        error: (e:any)=>Swal.fire(e.error.error)})
      } 
  } 
}
cancelar(){
  let idSuc = this.newSubcuenta.cod_cuenta ; 
  this.newSubcuenta= new vwCntSubCuentaModel(); 
  this.newSubcuenta.cod_cuenta = idSuc; 
  this.Subcuentas =  [...this.auxSubCuentas] 
}
filtrarSubCuentas(){
  if(this.newSubcuenta.cod_cuenta != undefined){ 
  this.cntService.getCntCuentasByIdCM(this.newSubcuenta.cod_cuenta).subscribe( {next:(value:cntSubCuentaRequest)=>{ 
    //console.log('getCntCuentasByIdCM',value)
    this.Subcuentas = value.data; 
    this.auxSubCuentas=value.data;
    //console.log('Subcuentas' , this.Subcuentas) 
   },
  error: (e:any)=>Swal.fire(e.error.error)})
}else{this.getAllSubcuentas()}
}
ngOnInit() {
  this.cntService.currentCntcuentaM.subscribe({next:(value:CntCuentaMModel[] | null)=>{
    
    //console.log('currentCntcuentaM - value',value) 
    this.cuentas = value??[] ;
    //console.log('currentCntcuentaM',this.cuentas) 
  },error : (e:any)=>Swal.fire(e.error.error)})
  // Aquí deberías cargar los datos de `cnt_cuenta` desde el servicio correspondiente
  
}
modificarSubcuenta(subcuenta:vwCntSubCuentaModel){
  this.newSubcuenta = {...subcuenta}
}
getAllSubcuentas(){
  this.cntService.getCntCuentas().subscribe( {next:(value:cntSubCuentaRequest)=>{   
    this.Subcuentas = value.data; 
    this.auxSubCuentas=value.data;
    //console.log('Subcuentas' , this.Subcuentas) 
   },
  error: (e:any)=>Swal.fire(e.error.error)})



}
enviarNewRegistro() {
  // Aquí puedes manejar la lógica de envío del formulario
  //console.log('nueva subcuenta' , this.newSubcuenta);
  
  this.cntService.setNewSubCuenta(this.newSubcuenta).subscribe( {next:(value:any)=>{   
    //console.log('Subcuentas' ,value) 
    this.filtrarSubCuentas()
   },
  error: (e:any)=>Swal.fire(e.error.error)})  
}
}
