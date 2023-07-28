import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PrdExistenciasModule { 
 
  
  constructor(

    @Inject(String) public id_usuario_ult_mov :number ,
    @Inject(String) public fecha_ult_mov:string, 
    @Inject(String) public ult_mov:string, 
    @Inject(String) public cantInicial:string, 
    @Inject(String) public cantActual:string, 
    @Inject(String) public compras:string, 
    @Inject(String) public ventas:string,
    @Inject(String) public devoluciones:string, 
    @Inject(String) public stock:string, 
    @Inject(String) public remisionada:string, 
    @Inject(String) public nombre_completo:string, 
    @Inject(String) public nombreBodega:string, 
    @Inject(String) public descripcionBodega:string,
    @Inject(String) public nombreUsuario_ult_mov:string,
    @Inject(String) public nombreUsuario_creacion:string,
    ){

    }
  
}
