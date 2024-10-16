import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CategoriasModel } from 'src/app/models/categorias.model';
import { CustomConsole } from 'src/app/models/CustomConsole';
import { EmpleadoModel } from 'src/app/models/empleados/empleados.module';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'elemt-categoriasDropdown',
  templateUrl: './categorias-dropdown.component.html',
  styleUrls: ['./categorias-dropdown.component.css']
})
export class CategiasDropdownComponent implements OnInit{

  options: CategoriasModel[] = [];
  filteredOptions: CategoriasModel[] = [];
  @Input() selectedValue: CategoriasModel| null = null;
  @Output() selectionChange: EventEmitter<CategoriasModel> = new EventEmitter(); 
  vueltas :boolean =  false; 
  private prdService= inject(ProductoService) ;
  
  ngOnInit(): void { 
    CustomConsole.log('opciones : ',this.options);
    this.prdService.currentCategorias.subscribe((value:CategoriasModel[]|null)=>{
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
  selectOption(option: CategoriasModel) {
    this.selectedValue = option;
    this.selectionChange.emit(this.selectedValue); 
  }
 
  showDropdown() {
    const dropdownButton = document.querySelector('.ddMarcas') as HTMLElement;
    const dropdownFiltro = document.querySelector('.ddMarcasFiltro') as HTMLElement;
    CustomConsole.log(dropdownButton);
    
    if (dropdownButton && dropdownButton.getAttribute('aria-expanded') === 'false') {
      dropdownButton.ariaExpanded
      dropdownButton.click();
      dropdownFiltro.focus();
    }
  }
}
