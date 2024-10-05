import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { caja } from 'src/app/interfaces/caja.interface'; 
import { loading } from 'src/app/models/app.loading';
import { cajaModel } from 'src/app/models/ventas/cajas.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { cajasServices } from 'src/app/services/Cajas.services'; 

@Component({
  selector: 'app-usuario-detalle',
  template: `
     <div class="container-fluid modal_container">
     <div class="row">
        <div class="col-sm-12  ">
            <h2 class='centrado'>Asignar Cajas a Usuario</h2>
        </div>
    </div><hr>
    <div class="row">
        <div class="col-sm-12  ">
          <b> {{usuarioActual.nombreCompleto}}</b>
        </div></div>
    <div class="row">
        <div class="col-sm-12  ">
          usuario : <b> {{usuarioActual.Login}}</b>
        </div></div><hr>
    <div class="row" *ngIf="cajas.length > 0">
        <div class="col-sm-12  " style="color: blue;">
          <ul *ngIf="cajas.length > 0">
            <li *ngFor="let caja of cajas; let i = index">
            <mat-checkbox [(ngModel)]="opciones[i]">
              {{caja.nombre}}</mat-checkbox>
            </li>
          </ul>
            <table class='table' *ngIf="cajas.length <= 0">  
              <tbody >
              <tr><td>No existen cajas para asignar al usuario</td></tr>
              </tbody>
            </table>
        </div>
    </div>
     <div class="row"  *ngIf="cajas.length > 0">
     <div class="col-sm-5  ">
          <button type="button" class="btn btn-primary" (click) = 'guardarRelacion()'>Guardar</button>
        </div>
        <div class="col-sm-5  ">
          <button type="button" class="btn btn-danger" (click)= 'cerrarDialog()'>Cancelar</button>
        </div></div>
     </div>
  `,
  styles: [
  ]
})
export class UsuarioDetalleComponent implements OnInit {


  cajas :cajaModel[]  = [];
  opciones:boolean[] = [];
  usuarioActual:UsuarioModel ;  
  constructor(@Inject(MAT_DIALOG_DATA) public usuario: UsuarioModel ,
  private loading : loading ,
  private serviceCaja : cajasServices,
  public dialogo: MatDialogRef<UsuarioDetalleComponent>
  ) {
                 this.usuarioActual = usuario;
                 this.getCajas();
                }

  ngOnInit(): void {
  }
  
getCajas(){
  this.cajas[0] = new cajaModel(undefined);
  
  this.loading.show()
  this.serviceCaja.getCajasPorUsuario(this.usuarioActual.ID)
     .subscribe(
      (datos:any)=>{
         console.log('getCajasPorUsuario',datos);
         
    if (datos.numdata > 0 ){ 
      datos.data!.forEach((dato:caja , index :number)=>{
        this.cajas[index] = new cajaModel( dato );
        this.opciones[index] = this.cajas[index].asignada!;
      }) 
      console.log(this.cajas);
    }else{
      this.cajas = [];
    }

        this.loading.hide()
      } ,
      error => {this.loading.hide();
        alert( error.error.error);
      }
      );
}
cerrarDialog(){
  this.dialogo.close(false);
}
guardarRelacion(){
  console.log('opciones',this.opciones)
  let OpcionesEnvio:number[] = []; 
  let count = 0;
  this.opciones!.forEach((values,index)=>{
    if(values && this.cajas[index].id != undefined){
      OpcionesEnvio[count] = this.cajas[index].id!;
      count++;
    }
    
  })
  if (OpcionesEnvio.length > 0){
    this.loading.show(); 
   this.serviceCaja.setCajasAUsuarios(this.usuarioActual.ID,OpcionesEnvio).subscribe(
    (respuesta:any)=>{console.log(respuesta)
     
    if (respuesta.error === 'ok'){
      alert('datos ingresados con exito');  
      this.loading.hide();
      this.cerrarDialog()
    }else{
      alert(respuesta.error);
      this.loading.hide();
    }
    }

   )
  }else{
    alert('debe escoger las cajas a asignar!!!')
  }
  console.log(OpcionesEnvio);
}
}
