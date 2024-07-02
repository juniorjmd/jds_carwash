import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { CntClasesModel } from 'src/app/models/cnt-clases/cnt-clases.module';

@Component({
  selector: 'app-cnt-clase',  
  template: `<!-- cnt-clase.component.html -->
  <form #cntClaseForm="ngForm">
    <div class="form-group">
      <label for="codClase">Código de Clase</label>
      <input type="number" id="codClase" class="form-control" [(ngModel)]="newCntClase.cod_clase" name="cod_clase">
    </div>
    
    <div class="form-group">
      <label for="nombreClase">Nombre de Clase</label>
      <input type="text" id="nombreClase" class="form-control" [(ngModel)]="newCntClase.nombre_clase" name="nombre_clase" required>
    </div>
    
    <button type="submit" class="btn btn-primary" [disabled]="!cntClaseForm.form.valid">Submit</button>
  </form>`,
  styleUrls: ['./cnt_clase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CntClaseComponent implements OnInit {

  newCntClase:CntClasesModel  = new CntClasesModel();


  onSubmit() {
    // Aquí puedes manejar la lógica de envío del formulario
    console.log(this.newCntClase);
  }

  ngOnInit(): void { }

}
