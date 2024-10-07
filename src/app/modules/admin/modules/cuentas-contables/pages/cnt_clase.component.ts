import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { CntClasesModel } from 'src/app/models/cnt-clases/cnt-clases.module';
import { CntContablesService } from 'src/app/services/cntContables.service';

@Component({
  selector: 'app-cnt-clase',  
  template: `<!-- cnt-clase.component.html --> 
   <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h2 class="text-center">Listado de Clases</h2>
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr style="text-align: center;"> 
            <th colspan="2" style="background-color: #b1bdc7;">Clase</th> 
            </tr>
            <tr>
              
            <th style="background-color: #b1bdc7;">Código</th>
              <th style="background-color: #b1bdc7;">Nombre</th>  
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of Clases">
               
              <td>{{ item.cod_clase }}</td>
              <td>{{ item.nombre_clase }}</td>   
               
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./cnt_clase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CntClaseComponent implements OnInit {
 
  Clases:CntClasesModel[] = [];
  constructor(private cntService:CntContablesService){

  }
  

  ngOnInit(): void {
    
    this.cntService.currentCntClase.subscribe({next:(value:CntClasesModel[] | null)=>{
      this.Clases = (value != undefined)? [...value]:[] ;
      //console.log(this.Clases) 
    },error : (e:any)=>console.error(e.error.error)})
   }

}
