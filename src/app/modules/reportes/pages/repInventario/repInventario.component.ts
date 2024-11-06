import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { data } from 'jquery';
import { Inventario } from 'src/app/interfaces/inventario.';
import { InventarioAplicadoRequest, ProductoRequest } from 'src/app/interfaces/producto-request';
import { InventarioModule } from 'src/app/modules/admin/modules/inventario/inventario.module';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rep-inventario', 
  templateUrl: `./repInventario.component.html`,
  styleUrls: ['./repInventario.component.css'], 
})
export class RepInventarioComponent implements OnInit {

  private prdService = inject(ProductoService)
  ngOnInit(): void {
    this.prdService.getInventariosAplicados()
    .subscribe({
      next:(val:InventarioAplicadoRequest)=>{
        if(val.numdata>0){
          this.inventarios = val.data
        }
      }
    ,error:(e)=> Swal.fire(JSON.stringify(e))})
  }
     
  
  inventarios:Inventario[] = [] ;
  idInventario:any = 0 ;


 }
