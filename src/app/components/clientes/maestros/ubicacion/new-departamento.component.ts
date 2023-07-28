
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Form,NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartamentoModel } from 'src/app/models/maestros.model';
import { MaestroClienteServices } from 'src/app/services/MaestroCliente.services';
import { loading } from 'src/app/models/app.loading';
import { pais } from 'src/app/interfaces/maestros.interface';
import { select } from 'src/app/interfaces/generales.interface';

@Component({
  selector: 'app-new-departamento',
  templateUrl: './new-departamento.component.html',
  styleUrls: ['./new-departamento.component.css']
})
export class NewDepartamentoComponent implements OnInit {
  paises : pais[] = [];
  numpaises:number = 0;
  deprto:DepartamentoModel ;
  constructor(  
               private loading : loading,
               config: NgbModalConfig, 
               private modalService: NgbModal, 
               private maestroServicio : MaestroClienteServices ,
               public dialogo: MatDialogRef<NewDepartamentoComponent>,
               @Inject(MAT_DIALOG_DATA) public depart: DepartamentoModel
  
  ) { this.getPaises()
    this.deprto = depart;
  }

  getPaises(){
    this.loading.show() 
    this.maestroServicio.getPaises().subscribe(
      (datos:select)=>{ 
    this.numpaises = datos.numdata;
    if (datos.numdata > 0 ){
      this.paises = datos.data;
    }else{
      this.paises = [];
    }
        
        console.log(this.paises);
        this.loading.hide() 
      } ,
      error => {this.loading.hide();
        alert( error.error.error);});
   }
   

  limpiarForm(){ 
    this.deprto = new DepartamentoModel();      
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }
  ingresarDepartamento(form : NgForm){
    this.loading.show();
    if(this.deprto.id > 0 ){
        this.maestroServicio.actualizarDepartamentos(this.deprto).subscribe(

          (respuesta:any)=>{console.log(respuesta)
            this.loading.hide();
            if (respuesta.error === 'ok'){
              alert('datos ingresados con exito'); 
              this.confirmado(); 
                 
            } 
            
          }
        
        );
    }else{
      this.maestroServicio.setDepartamentos(this.deprto).subscribe(
        (respuesta:any)=>{console.log(respuesta)
          this.loading.hide();
        if (respuesta.error === 'ok'){
          alert('datos ingresados con exito'); 
          this.confirmado(); 
             
        } 
        }
      
      );
    }
    console.log('nuevo pais',this.deprto)
  }
  ngOnInit(): void {
    
  }

}
