import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CustomConsole } from 'src/app/models/CustomConsole';
import { EmpleadoModel } from 'src/app/models/empleados/empleados.module';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';

@Component({
  selector: 'elemt-empDropdown',
  templateUrl: './empleados-dropdown.component.html',
  styleUrls: ['./empleados-dropdown.component.css']
})
export class EmpleadosDropdownComponent implements OnInit{

   options: EmpleadoModel[] = [];
  @Input() selectedValue: EmpleadoModel| null = null;
  @Output() selectionChange: EventEmitter<EmpleadoModel> = new EventEmitter(); 
  @Output() clickBtnRefress: EventEmitter<void> = new EventEmitter(); // Even
  vueltas :boolean =  false;
  private inicioService= inject(DatosInicialesService) ;
  
  ngOnInit(): void { 
    CustomConsole.log('opciones : ',this.options);
    this.inicioService.currentVendedores.subscribe(vendedores => {
      if (vendedores) {
        // Aquí puedes trabajar con el array de vendedores
        CustomConsole.log('Vendedores actualizados:', vendedores);
        this.options = vendedores;
      }
    });
  } 

  selectOption(option: EmpleadoModel) {
    this.selectedValue = option;
    this.selectionChange.emit(this.selectedValue); 
  }
  triggerExternalFunction() {
    this.clickBtnRefress.emit(); // Emitir el evento
  }
}
