import { Component, OnInit } from '@angular/core';
import { select } from 'src/app/interfaces/generales.interface';
import { ciudad } from 'src/app/interfaces/maestros.interface';
import { MaestroClienteServices } from 'src/app/services/MaestroCliente.services';

import { loading } from 'src/app/models/app.loading';
import { CiudadModel } from 'src/app/models/maestros.model';

import { NewCiudadComponent } from './new-ciudad.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from 'src/app/components/shared/dialogo-confirmacion/dialogo-confirmacion.component';


@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {
ciudades :ciudad[] = [];
ciudadChange : CiudadModel = new CiudadModel();
numCiudades : number = 0 ;

////////////////////////////
  constructor(private maestroCliente : MaestroClienteServices,
    private loading : loading ,
    private dialogo : MatDialog ,
    private newCiudad : MatDialog , 
    ) { 
        
      this.listar();
  }
  
  editar(city : CiudadModel){ 
    this.loading.show();
    this.newCiudad.open(NewCiudadComponent,{data:city})
    .afterClosed()
    .subscribe((confirmado: Boolean)=>{
      if (confirmado){
      this.listar()  
      this.loading.show();
    }
    })
  }

  
  
  borrar(CityD:CiudadModel ){
     
    this.dialogo.
    open(DialogoConfirmacionComponent,{data:`Realmente quieres eliminar el Ciudad ${CityD.nombre}`})
    .afterClosed()
    .subscribe((confirmado: Boolean)=>{
      if (confirmado){
        this.maestroCliente.eliminarCiudades(CityD).subscribe(
          (respuesta:any)=>{console.log(respuesta)
            if (respuesta.error === 'ok'){
              alert('datos eliminados con exito');     
              this.listar();
            } 
          }
        );
      } 
    })
   }
  listar(){
    this.loading.show();
    this.maestroCliente.getCiudades()
      .subscribe(
        (datos:select)=>{
          
      this.numCiudades = datos.numdata;
      if (datos.numdata > 0 ){
        this.ciudades = datos.data;
      }else{
        this.ciudades = [];
      }
          this.loading.hide()
        } ,
        error => {this.loading.hide();
          alert( error.error.error);
        }
        );
      
  }

  ngOnInit(): void {
  }

}
