import { Component, OnInit } from '@angular/core';
import { ParametrosService } from 'src/app/services/parametros.service';

import { loading } from 'src/app/models/app.loading'; 
import { select } from 'src/app/interfaces/generales.interface';
import Swal from 'sweetalert2';
import { ParametrosModel } from 'src/app/models/parametros/parametros.model';
@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {
  parametros:ParametrosModel[] = [];
  constructor(
    private parServices :ParametrosService ,  private loading : loading
  ) { this.getParametros();}



  getParametros(){ 
    this.parametros = []; 
     this.loading.show()
     this.parServices.getParametros().subscribe(
       (datos:any )=>{
          //console.log(datos);
          
     if (datos.numdata > 0 ){ 
      this.parametros = datos.data  
       this.parametros!.forEach((parametro,index)=>
       {
        if(parametro.tip_parametro.trim() === 'identificacion' && parametro.nombreTabla!.trim() !== ''){
        this.loading.show()
        this.parServices.getDatosParametrosTabla(parametro.nombreTabla , `${parametro.columnaId!}|id` , `${parametro.columnaDescripcion!}|nombre`).subscribe(
        (datos2:any )=>{ 
          if (datos2.numdata > 0 ){  
            this.parametros[index].datosTabla=  datos2.data
          this.loading.hide();} 
        }
    )
  }else if(parametro.tip_parametro.trim() === 'booleano' ){
    //console.log('parametro booleano' ,    parametro.par_boolean , this.parametros[index].par_boolean); 
            this.parametros[index].datosTabla=  [
              { id:1 , nombre : 'Verdadero' }, 
              { id:0 , nombre : 'Falso' }]
          }
       })
     }else{
       this.parametros = [];
     }
 
         this.loading.hide();
       } ,
       error => {this.loading.hide();
         console.log(error)
         Swal.fire( error.error.error, '', 'error');
       }
       );
   }  
  ngOnInit(): void {
  }

}
