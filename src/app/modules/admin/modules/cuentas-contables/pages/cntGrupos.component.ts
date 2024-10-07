import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { cntClaseRequest } from 'src/app/interfaces/producto-request';
import { CntClasesModel } from 'src/app/models/cnt-clases/cnt-clases.module';
import { CntGruposModel } from 'src/app/models/cnt-grupos/cnt-grupos.module';
import { CntContablesService } from 'src/app/services/cntContables.service';

@Component({
  selector: 'app-cnt-grupos',  
  template: `<!-- cnt-grupos.component.html -->
  <form #cntGruposForm="ngForm">
    <div class="form-group">
      <label for="codClase">Código de Clase</label>
      <select id="codClase" class="form-control" [(ngModel)]="newCntGrupos.cod_clase" name="cod_clase" (change)="filtrarPorClases()" required>
        <option *ngFor="let clase of clases" [value]="clase.id_clase">{{ clase.nombre_clase }}</option>
      </select>
    </div>
     
  </form>
  
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h2 class="text-center">Listado de Cuentas</h2>
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr style="text-align: center;">
              
            <th colspan="2" style="background-color: #b1bdc7;">Clase</th>
              <th colspan="2" style="background-color: #91f98e;">Grupo</th>  
            </tr>
            <tr>
              
            <th style="background-color: #b1bdc7;">Código</th>
              <th style="background-color: #b1bdc7;">Nombre</th> 
              <th style="background-color: #91f98e;">Código</th>
              <th style="background-color: #91f98e;">Nombre</th>  
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of Grupos">
               
              <td>{{ item.cod_clase }}</td>
              <td>{{ item.nombre_clase }}</td> 
              <td>{{ item.cod_grupo }}</td>
              <td>{{ item.nombre_grupo }}</td>  
               
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./cntGrupos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CntGruposComponent implements OnInit {
  Grupos:CntGruposModel[]=[];
  auxGrupos:CntGruposModel[]=[];
  newCntGrupos:CntGruposModel = new CntGruposModel();
  clases:CntClasesModel[] =[] ;
  constructor(private cntService:CntContablesService){

  }
  filtrarPorClases(){
    this.Grupos = [...this.auxGrupos];
    if(this.newCntGrupos.cod_clase != undefined  && this.newCntGrupos.cod_clase > 0 ){
      this.Grupos = this.Grupos.filter(x=>x.cod_clase ==  this.newCntGrupos.cod_clase)
    }
  }
  ngOnInit() {  
    this.cntService.currentCntClase.subscribe({next:(value:CntClasesModel[] | null)=>{
      this.clases = (value != undefined)? [...value]:[] ;
      //console.log(this.clases) 
    },error : (e:any)=>console.error(e.error.error)})

    this.cntService.currentCntGrupo.subscribe({next:(value:CntGruposModel[] | null)=>{
      this.Grupos = (value != undefined)? [...value]:[] ;
      this.auxGrupos = this.Grupos;
      //console.log('Grupos =>',this.Grupos) 
    },error : (e:any)=>console.error(e.error.error)})
  }
  }
  
  