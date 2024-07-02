import { Component, OnInit } from '@angular/core';
import { cntCuentaMayorRequest } from 'src/app/interfaces/producto-request';
import { CntCuentaMModel } from 'src/app/models/cnt-cuenta-m/cnt-cuenta-m.module';
import { vwCntSubCuentaModel } from 'src/app/models/cnt-sub-cuenta/cnt-sub-cuenta.module';
import { CntContablesService } from 'src/app/services/cntContables.service';

@Component({
  selector: 'app-cnt-sub-cuentas',
  templateUrl: './cnt-sub-cuentas.component.html',
  styleUrls: ['./cnt-sub-cuentas.component.css']
})
export class ModalCntSubCuentasComponent implements OnInit { 
newSubcuenta: vwCntSubCuentaModel = new vwCntSubCuentaModel();
cuentas: CntCuentaMModel[] = []; // Esta lista debería ser llenada con los datos de la tabla `cnt_cuenta`
constructor(private cntService:CntContablesService){

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
