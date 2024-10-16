import { Component, Inject, OnInit, NgModule } from '@angular/core'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cajaModel } from 'src/app/models/ventas/cajas.model';
import { loading } from 'src/app/models/app.loading'; 
import { cajasServices } from 'src/app/services/Cajas.services';
import Swal from 'sweetalert2';
import { CustomConsole } from 'src/app/models/CustomConsole';

@Component({
  selector: 'app-definir-base-caja',
  templateUrl: './definir-base-caja.component.html',
  styleUrls: ['./definir-base-caja.component.css']
})
export class DefinirBaseCajaComponent implements OnInit {
 caja:cajaModel ;
 valorIngresar:number= 0;
  constructor( private cajaService : cajasServices,
    public dialogo: MatDialogRef<DefinirBaseCajaComponent>,
    @Inject(MAT_DIALOG_DATA) public cajaImport:cajaModel,
    
    public loading : loading) { 
      this.caja = this.cajaImport;
    }

  ngOnInit(): void {
  }
  cerrarFormulario(){
    this.dialogo.close(false);
  }
  cerrarFormularioTrue(){ 
    if(typeof(this.valorIngresar) == 'undefined'){
      Swal.fire('Debe ingresar el Valor inicial de la caja');
    }else{
      this.loading.show() 
      this.cajaService.abrirCaja(this.caja, this.valorIngresar).subscribe(
        (respuesta:any)=>{
          CustomConsole.log(respuesta)
         
        if (respuesta.error === 'ok'){
         Swal.fire( respuesta.datos[0].msg );  
         this.dialogo.close(true);
        }else{
          Swal.fire(respuesta.error);
        }
        this.loading.hide();
       
        },
        error => {this.loading.hide();
          Swal.fire( error.error.error);
        }
        );
    }
    
  }

}
