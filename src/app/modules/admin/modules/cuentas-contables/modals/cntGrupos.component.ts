import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'; 
import { CntClasesModel } from 'src/app/models/cnt-clases/cnt-clases.module';
import { CntGruposModel } from 'src/app/models/cnt-grupos/cnt-grupos.module';
import { CntContablesService } from 'src/app/services/cntContables.service';

@Component({
  selector: 'app-cnt-grupos',  
  template: `<!-- cnt-grupos.component.html -->
  <form #cntGruposForm="ngForm">
    <div class="form-group">
      <label for="codClase">Código de Clase</label>
      <select id="codClase" class="form-control" [(ngModel)]="newCntGrupos.cod_clase" name="cod_clase" required>
        <option *ngFor="let clase of clases" [value]="clase.id_clase">{{ clase.nombre_clase }}</option>
      </select>
    </div>
    
    <div class="form-group">
      <label for="codGrupo">Código de Grupo</label>
      <input type="number" id="codGrupo" class="form-control" [(ngModel)]="newCntGrupos.cod_grupo" name="cod_grupo" required>
    </div>
    
    <div class="form-group">
      <label for="nombreGrupo">Nombre de Grupo</label>
      <input type="text" id="nombreGrupo" class="form-control" [(ngModel)]="newCntGrupos.nombre_grupo" name="nombre_grupo">
    </div>
    
    <button type="submit" class="btn btn-primary" [disabled]="!cntGruposForm.form.valid">Submit</button>
  </form>
  `,
  styleUrls: ['./cntGrupos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCntGruposComponent implements OnInit {

  newCntGrupos:CntGruposModel = new CntGruposModel();
  clases:CntClasesModel[] =[] ;
  constructor(private cntService:CntContablesService){

  }
  ngOnInit() {
    // Aquí deberías cargar los datos de `cnt_clase` desde el servicio correspondiente
    this.clases = [ 
      // Agrega más clases según tus datos
    ];
    
    this.cntService.currentCntClase.subscribe({next:(value:CntClasesModel[] | null)=>{
      this.clases = value??[] ;
      console.log(this.clases) 
    },error : (e:any)=>console.error(e.error.error)})
  }

  onSubmit() {
    // Aquí puedes manejar la lógica de envío del formulario
    console.log(this.newCntGrupos);
  }
 }
