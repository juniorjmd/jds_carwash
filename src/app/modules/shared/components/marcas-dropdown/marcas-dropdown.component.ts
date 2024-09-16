import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { EmpleadoModel } from 'src/app/models/empleados/empleados.module';
import { MarcasModel } from 'src/app/models/marcas/marcas.module';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'elemt-marcaDropdown',
  templateUrl: './marcas-dropdown.component.html',
  styleUrls: ['./marcas-dropdown.component.css']
})
export class MarcasDropdownComponent implements OnInit{

  options: MarcasModel[] = [];
  filteredOptions: MarcasModel[] = [];
  @Input() selectedValue: MarcasModel| null = null;
  @Output() selectionChange: EventEmitter<MarcasModel> = new EventEmitter(); 
  vueltas :boolean =  false; 
  private prdService= inject(ProductoService) ;
  
  ngOnInit(): void { 
    console.log('opciones : ',this.options);
    this.prdService.currentMarcas.subscribe((value:MarcasModel[]|null)=>{
      if(value != undefined){
        this.options = value;  
        this.filteredOptions = [... this.options];
      
        }})  
   
  } 

  filterOptions(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    if(input == ''){
      this.filteredOptions = [... this.options];
    }else{
    this.filteredOptions = this.options.filter(option =>
      option.nombre.toLowerCase().includes(input)
    );}
    this.showDropdown();
  }
  selectOption(option: MarcasModel) {
    this.selectedValue = option;
    this.selectionChange.emit(this.selectedValue); 
  }
 
  showDropdown() {
    const dropdownButton = document.querySelector('.ddMarcas') as HTMLElement;
    const dropdownFiltro = document.querySelector('.ddMarcasFiltro') as HTMLElement;
    console.log(dropdownButton);
    
    if (dropdownButton && dropdownButton.getAttribute('aria-expanded') === 'false') {
      dropdownButton.ariaExpanded
      dropdownButton.click();
      dropdownFiltro.focus();
    }
  }
}
