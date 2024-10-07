import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CntClasesModel } from 'src/app/models/cnt-clases/cnt-clases.module';
import { CntCuentaMModel } from 'src/app/models/cnt-cuenta-m/cnt-cuenta-m.module';
import { CntGruposModel } from 'src/app/models/cnt-grupos/cnt-grupos.module';
import { CntContablesService } from 'src/app/services/cntContables.service';

@Component({
  selector: 'app-cnt-cuentas-m', 
  template: `<!-- cnt-cuenta.component.html -->
  <form #cntCuentaForm="ngForm">
    <div class="row">
    <div class="col"> <div class="form-group">
      <label for="codGrupo">Clase</label>
      <select id="codGrupo" class="form-control" [(ngModel)]="newCntCuenta.cod_clase" (change)="filtrarPorClase()" name="cod_grupo" required>
        <option *ngFor="let clase of clases" [value]="clase.cod_clase">{{ clase.nombre_clase }}</option>
      </select>
    </div></div>
    <div class="col"> <div class="form-group">
      <label for="codGrupo">Grupo</label>
      <select id="codGrupo" class="form-control" [(ngModel)]="newCntCuenta.cod_grupo" name="cod_grupo" (change)="filtrarPorGrupo()" required>
        <option *ngFor="let grupo of grupos" [value]="grupo.id_grupo">{{ grupo.nombre_grupo }}</option>
      </select>
    </div></div> 
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
              <th colspan="2"  style="background-color: #91c1f5;">Cuenta</th> 
            </tr>
            <tr>
              
            <th style="background-color: #b1bdc7;">Código</th>
              <th style="background-color: #b1bdc7;">Nombre</th> 
              <th style="background-color: #91f98e;">Código</th>
              <th style="background-color: #91f98e;">Nombre</th> 
              <th  style="background-color: #91c1f5;">Código</th>
              <th style="background-color: #91c1f5;">Nombre</th> 
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of CuentasMayores">
               
              <td>{{ item.cod_clase }}</td>
              <td>{{ item.nombre_clase }}</td> 
              <td>{{ item.cod_grupo }}</td>
              <td>{{ item.nombre_grupo }}</td> 
              <td>{{ item.cod_cuenta }}</td>
              <td>{{ item.nombre_cuenta!.trim() }}</td>
               
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
  `,
  styleUrls: ['./cntCuentasM.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CntCuentasMComponent {
  CuentasMayores:CntCuentaMModel[] = [];
  auxCuentasMayores:CntCuentaMModel[] = [];
  newCntCuenta: CntCuentaMModel = new CntCuentaMModel();
  grupos: CntGruposModel[] = [];
  auxGrupos: CntGruposModel[] = [];
  clases: CntClasesModel[] = []; // Esta lista debería ser llenada con los datos de la tabla `cnt_grupos`
 constructor(private cntService:CntContablesService){

  }
  filtrarPorClase()
  {
    this.grupos = [...this.auxGrupos]
    this.CuentasMayores = [...this.auxCuentasMayores]; 
    if(this.newCntCuenta.cod_clase != undefined && this.newCntCuenta.cod_clase > 0 ){ 
      this.grupos =  this.grupos.filter(x=> x.cod_clase == this.newCntCuenta.cod_clase  )
      this.CuentasMayores = this.CuentasMayores.filter(x=> x.cod_clase == this.newCntCuenta.cod_clase  )
    }
  }
  filtrarPorGrupo(){
    this.CuentasMayores = [...this.auxCuentasMayores]; 
    if(this.newCntCuenta.cod_grupo != undefined && this.newCntCuenta.cod_grupo > 0 ){  
      this.CuentasMayores = this.CuentasMayores.filter(x=> x.cod_grupo == this.newCntCuenta.cod_grupo  )
    }
  }
  ngOnInit() {
    // Aquí deberías cargar los datos de `cnt_grupos` desde el servicio correspondiente 
    this.cntService.currentCntGrupo.subscribe( gruposR  =>{
      this.grupos = (gruposR!= undefined)? [...gruposR!]:[] ;
      this.auxGrupos = this.grupos 
    }   )
    this.cntService.currentCntClase.subscribe( clases  =>{
      this.clases = (clases != undefined)? [...clases!]:[] ;
      
    }   )
    this.cntService.currentCntcuentaM.subscribe( CuentasMayores  => { this.CuentasMayores = (CuentasMayores!= undefined)? [...CuentasMayores!]:[]  ;
      this.auxCuentasMayores = this.CuentasMayores;
      //console.log('cuentasMayores => ' ,this.CuentasMayores )
    } )
  }

  onSubmit() {
    // Aquí puedes manejar la lógica de envío del formulario
    //console.log(this.newCntCuenta);
  }





  
}
