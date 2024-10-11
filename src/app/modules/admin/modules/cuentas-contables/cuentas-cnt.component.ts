import { Component, OnInit } from '@angular/core';
import { cntCuentaMayorRequest, cntGrupoRequest, cntClaseRequest, cntSubCuentaRequest } from 'src/app/interfaces/producto-request';
import { CntContablesService } from 'src/app/services/cntContables.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuentas-cnt',
  templateUrl: './cuentas-cnt.component.html',
  styleUrls: ['./cuentas-cnt.component.css']
})
export class CuentasCntComponent  implements OnInit {
  constructor(private cntService:CntContablesService){

  }
  ngOnInit() {
    this.cntService.getCntCuentasMayores().subscribe({next:(value:cntCuentaMayorRequest)=>{ 
      this.cntService.changeCuentasM(value.data); 
      //console.log("getCntCuentasMayores",value.data )
    },error : (e)=>Swal.fire(e.error.error)})
    
    this.cntService.getCntGrupos().subscribe({
      next:(value:cntGrupoRequest)=>{ 
      this.cntService.changeGrupo(value.data); 
      //console.log("getCntGrupos",value.data )

    },error : (e)=>Swal.fire(e.error.error)})

    this.cntService.getCntCuentas().subscribe({
      next:(value:cntSubCuentaRequest)=>{ 
      this.cntService.changeSubCuenta(value.data); 
      //console.log("getCntCuentas",value.data )

    },error : (e)=>Swal.fire(e.error.error)})


    this.cntService.getCntClases().subscribe({next:(value:cntClaseRequest)=>{ 
      this.cntService.changeClase(value.data); 
      //console.log("getCntClases",value.data )

    },error : (e)=>Swal.fire(e.error.error)})
    // Aquí deberías cargar los datos de `cnt_cuenta` desde el servicio correspondiente
    
  }
  
 }

