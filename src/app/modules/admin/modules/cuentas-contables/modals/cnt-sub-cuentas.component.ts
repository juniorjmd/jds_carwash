import { Component, OnInit } from '@angular/core';
import { cntCuentaMayorRequest, cntSubCuentaRequest } from 'src/app/interfaces/producto-request';
import { CntCuentaMModel } from 'src/app/models/cnt-cuenta-m/cnt-cuenta-m.module';
import { vwCntSubCuentaModel } from 'src/app/models/cnt-sub-cuenta/cnt-sub-cuenta.module';
import { CntContablesService } from 'src/app/services/cntContables.service';

@Component({
  selector: 'modal-cnt-sub-cuentas',
  templateUrl: './cnt-sub-cuentas.component.html',
  styleUrls: ['./cnt-sub-cuentas.component.css']
})
export class ModalCntSubCuentasComponent implements OnInit { 
  newSubcuenta: vwCntSubCuentaModel = new vwCntSubCuentaModel();
  Subcuentas: vwCntSubCuentaModel[] = [];
cuentas: CntCuentaMModel[] = []; // Esta lista debería ser llenada con los datos de la tabla `cnt_cuenta`
constructor(private cntService:CntContablesService){
  this.getAllSubcuentas();
}
modificarSubcuenta(sucCuenta:vwCntSubCuentaModel){}
getAllSubcuentas(){
  this.cntService.getCntCuentas().subscribe( {next:(value:cntSubCuentaRequest)=>{ 
    this.Subcuentas = value.data
    console.log('Subcuentas' , this.Subcuentas) 
   },
  error: (e:any)=>console.error(e.error.error)})



}
ngOnInit() {
  
  this.cntService.currentCntcuentaM.subscribe({next:(value:CntCuentaMModel[] | null)=>{
    this.cuentas = value??[] ;
    console.log(this.cuentas) 
  },error : (e:any)=>console.error(e.error.error)})
  // Aquí deberías cargar los datos de `cnt_cuenta` desde el servicio correspondiente
  
}

onSubmit() {
  // Aquí puedes manejar la lógica de envío del formulario
  console.log(this.newSubcuenta);
}
}
