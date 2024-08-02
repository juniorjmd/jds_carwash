import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelBase } from '../ModelBase';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ClientesModel extends ModelBase {


  id_actividad?:number;

  constructor(
    @Inject(Number) public tipoIdentificacion?: number, // Valor por defecto definido en el esquema
    @Inject(String) public numIdentificacion?: string,
    @Inject(String) public nombre?: string,
    @Inject(String) public sec_nombre?: string,
    @Inject(String) public apellido?: string,
    @Inject(String) public sec_apellido?: string,
    @Inject(String) public nombreCompleto?: string,
    @Inject(String) public direccionRecibo?: string,
    @Inject(String) public telefono?: string,
    @Inject(String) public email?: string,
    @Inject(Number) public tipDieccion?: number | null,
    @Inject(String) public calle?: string | null,
    @Inject(String) public calle2?: string | null,
    @Inject(String) public barrio?: string | null,
    @Inject(Number) public pais?: number | null,
    @Inject(Number) public departamento?: number | null,
    @Inject(Number) public ciudad?: number | null,
    @Inject(String) public cod_postal?: string | null,
    @Inject(String) public nif?: string | null,
    @Inject(String) public puestoTrabajo?: string | null,
    @Inject(String) public telefono2?: string | null,
    @Inject(String) public pagina?: string | null,
    @Inject(String) public titulo?: string | null,
    @Inject(String) public categoria?: string | null, 
    @Inject(Boolean) public is_empresa?: boolean | null,
    @Inject(Number) public padre_id?: number | null, 


  ) { super() 
   }
}
