import { Component, OnInit } from '@angular/core';
import { ParametrosService } from 'src/app/services/parametros.service';

import { loading } from 'src/app/models/app.loading'; 
import { select } from 'src/app/interfaces/generales.interface';
import Swal from 'sweetalert2';
import { ParametrosModule } from 'src/app/models/parametros/parametros.module';
@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {
  parametros:ParametrosModule[] = [];
  constructor(
    private parServices :ParametrosService ,  private loading : loading
  ) { this.getParametros();}



  getParametros(){ 
    this.parametros = []; 
     this.loading.show()
     this.parServices.getParametros().subscribe(
       (datos:any )=>{
          console.log(datos);
          
     if (datos.numdata > 0 ){ 
      this.parametros = datos.data 
       console.log('parametros',this.parametros);
       this.parametros!.forEach((parametro,index)=>
       {if(parametro.tip_parametro.trim() === 'tabla' && parametro.par_tabla!.trim() !== ''){
        this.loading.show()
        this.parServices.getDatosParametrosTabla(parametro.par_tabla).subscribe(
          (datos2:any )=>{
             console.log(datos2);
             
        if (datos2.numdata > 0 ){ 
          let contadorInterno = 0;
          this.parametros[index].datosTabla= [{
            "id" : 0,
            "nombre" : 'ninguno'
          }]
          datos2.data!.forEach((value:any)=>{
            this.parametros[index].datosTabla[contadorInterno].id = value['id'];
            this.parametros[index].datosTabla[contadorInterno].nombre = value[parametro.par_string!];
            contadorInterno++;
          })
        }
        this.loading.hide();}
        
        )


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
