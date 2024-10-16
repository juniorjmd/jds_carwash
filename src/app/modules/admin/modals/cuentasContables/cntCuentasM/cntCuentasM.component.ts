import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CntClasesModel } from 'src/app/models/cnt-clases/cnt-clases.module';
import { CntCuentaMModel } from 'src/app/models/cnt-cuenta-m/cnt-cuenta-m.module';
import { CntGruposModel } from 'src/app/models/cnt-grupos/cnt-grupos.module';
import { CntContablesService } from 'src/app/services/cntContables.service';

@Component({
  selector: 'modal-cnt-cuentas-m', 
  template: `<!-- cnt-cuenta.component.html -->
  <form #cntCuentaForm="ngForm">
    <div class="form-group">
      <label for="codGrupo">Código de Grupo</label>
      <select id="codGrupo" class="form-control" [(ngModel)]="newCntCuenta.cod_grupo" name="cod_grupo" required>
        <option *ngFor="let grupo of grupos" [value]="grupo.id_grupo">{{ grupo.nombre_grupo }}</option>
      </select>
    </div>
    
    <div class="form-group">
      <label for="codCuenta">Código de Cuenta</label>
      <input type="number" id="codCuenta" class="form-control" [(ngModel)]="newCntCuenta.cod_cuenta" name="cod_cuenta" required>
    </div>
    
    <div class="form-group">
      <label for="nombreCuenta">Nombre de Cuenta</label>
      <input type="text" id="nombreCuenta" class="form-control" [(ngModel)]="newCntCuenta.nombre_cuenta" name="nombre_cuenta" required>
    </div>
    
    <button type="submit" class="btn btn-primary" [disabled]="!cntCuentaForm.form.valid">Submit</button>
  </form>
  `,
  styleUrls: ['./cntCuentasM.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCntCuentasMComponent {

  newCntCuenta: CntCuentaMModel = new CntCuentaMModel();
  grupos: CntGruposModel[] = []; // Esta lista debería ser llenada con los datos de la tabla `cnt_grupos`
 constructor(private cntService:CntContablesService){

  }
  ngOnInit() {
    // Aquí deberías cargar los datos de `cnt_grupos` desde el servicio correspondiente
    
    this.cntService.currentCntGrupo.subscribe( gruposR  =>  this.grupos = gruposR??[]   )
  }

  onSubmit() {
    // Aquí puedes manejar la lógica de envío del formulario
    //CustomConsole.log(this.newCntCuenta);
  }





  
}
