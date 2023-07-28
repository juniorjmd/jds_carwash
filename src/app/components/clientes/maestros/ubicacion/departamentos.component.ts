import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from 'src/app/components/shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { select } from 'src/app/interfaces/generales.interface';
import { departamento } from 'src/app/interfaces/maestros.interface'; 
import { loading } from 'src/app/models/app.loading';
import { DepartamentoModel } from 'src/app/models/maestros.model';
import { MaestroClienteServices } from 'src/app/services/MaestroCliente.services';
import { NewDepartamentoComponent } from './new-departamento.component';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
 
    departamentos: departamento[]  = []  ;
    departamentoChange : DepartamentoModel = new DepartamentoModel();
    numdepartamentos : number = 0 ; 
      constructor( private maestroCliente : MaestroClienteServices,
        private dialogo : MatDialog ,
        private newDep : MatDialog , private loading :loading) { 
      
        this.listarDepartamentos()
  }
  listarDepartamentos(){
    this.loading.show();
    this.maestroCliente.getDepartamentos()
    .subscribe(
      (datos:select)=>{ 
    this.numdepartamentos = datos.numdata;
    if (datos.numdata > 0 ){
      this.departamentos = datos.data;
    }else{
      this.departamentos = [];
    }
        
        console.log(this.departamentos);
        this.loading.hide();
      } ,
      error => { this.loading.hide();
        alert( error.error.error);});
  }
  
  borrar(dep:DepartamentoModel ){
     
    this.dialogo.
    open(DialogoConfirmacionComponent,{data:`Realmente quieres eliminar el Departamento ${dep.nombre}`})
    .afterClosed()
    .subscribe((confirmado: Boolean)=>{
      if (confirmado){
        this.maestroCliente.eliminarDepartamento(dep).subscribe(
          (respuesta:any)=>{console.log(respuesta)
            if (respuesta.error === 'ok'){
              alert('datos eliminados con exito');     
              this.listarDepartamentos();
            } 
          }
        );
      } 
    })
   }
  editarDepartamento (dep : DepartamentoModel){ 
    this.newDep.open(NewDepartamentoComponent,{data:dep})
    .afterClosed()
    .subscribe((confirmado: Boolean)=>{
      if (confirmado){
      this.listarDepartamentos() 
      console.log('se listo');
      
    }
    })
  }
  ngOnInit(): void {
  }

}
