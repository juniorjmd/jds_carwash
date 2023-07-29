import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'; 
import { ModalCrearInventarioComponent } from '../../component/modal-crear-inventario/modal-crear-inventario.component'; 
import {  colTablaCnfg } from 'src/app/modules/shared/shared.module';
import { Inventario } from 'src/app/interfaces/nInterfaces/inventario';
import { ColumnasTabla } from 'src/app/interfaces/nInterfaces/columnas-tabla';
import { InventarioService } from 'src/app/services/nServices/inventario.service';
import { ExecuteService } from 'src/app/services/nServices/execute.service';
 

@Component({
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css']
})
export class InventariosComponent implements OnInit {
  origen = 'inventarios';
  datos!:Inventario[] ;
  ColumnasTabla:ColumnasTabla[] = colTablaCnfg.inventario;
    
  bsModalRef!: BsModalRef;
constructor(   private modalService: BsModalService , private invService:InventarioService , private executeService:ExecuteService){ 
 
}
openModal() {
  this.executeService.cerrarModalInventario$.next(false);
  this.bsModalRef = this.modalService.show(ModalCrearInventarioComponent);
}
  
getInventarios(){
  this.invService.getInventarios().subscribe(
    {next:(value)=>{
      console.log(value);
      this.datos = value;
       },
      error:(error)=>{console.error(error);
      }}
  );
}



ngOnInit() {
  this.getInventarios(); 
  this.executeService.optenerListadoInventarios$.subscribe(data => {
    if(data){ 
      this.getInventarios();
       this.executeService.optenerListadoInventarios$.next(false);
 }})
 this.executeService.cerrarModalInventario$.subscribe(data => {
  if(data){ 
    this.bsModalRef.hide(); 
}})


 
 }



}
