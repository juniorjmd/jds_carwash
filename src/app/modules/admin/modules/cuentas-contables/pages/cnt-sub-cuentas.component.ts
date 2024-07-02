import { Component, OnInit } from '@angular/core';
import { CntCuentaMModel } from 'src/app/models/cnt-cuenta-m/cnt-cuenta-m.module';
import { CntSubCuentaModel } from 'src/app/models/cnt-sub-cuenta/cnt-sub-cuenta.module';

@Component({
  selector: 'app-cnt-sub-cuentas',
  templateUrl: './cnt-sub-cuentas.component.html',
  styleUrls: ['./cnt-sub-cuentas.component.css']
})
export class CntSubCuentasComponent implements OnInit { 
newSubcuenta: CntSubCuentaModel = new CntSubCuentaModel();
cuentas: CntCuentaMModel[] = []; // Esta lista debería ser llenada con los datos de la tabla `cnt_cuenta`

ngOnInit() {
  // Aquí deberías cargar los datos de `cnt_cuenta` desde el servicio correspondiente
  this.cuentas = [
    { id_cuenta: 1,cod_grupo: 10 ,  cod_cuenta: 1001, nombre_cuenta: 'Cuenta 1' },
    { id_cuenta: 2,cod_grupo: 10 ,   cod_cuenta: 1002, nombre_cuenta: 'Cuenta 2' },
    // Agrega más cuentas según tus datos
  ];
}

onSubmit() {
  // Aquí puedes manejar la lógica de envío del formulario
  console.log(this.newSubcuenta);
}
}
