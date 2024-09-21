import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { categoriaRequest, categoriaVendidosRequest } from 'src/app/interfaces/producto-request';
import { CategoriasVendidasModel } from 'src/app/models/categorias.model';
import { EmpleadoModel } from 'src/app/models/empleados/empleados.module';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'elemt-categoriasVendidasDropdown',
  templateUrl: './categoriasVendidas-dropdown.component.html',
  styleUrls: ['./categoriasVendidas-dropdown.component.css']
})
export class categoriasVendidasDropdownComponent implements OnInit{

  options: CategoriasVendidasModel[] = [];
  filteredOptions: CategoriasVendidasModel[] = [];
  @Input() selectedValue: CategoriasVendidasModel| null = null;
  @Output() selectionChange: EventEmitter<CategoriasVendidasModel> = new EventEmitter(); 
  vueltas :boolean =  false; 
  private prdService= inject(ProductoService) ;
  
  ngOnInit(): void { 
    this.getAllCategorias();
    console.log('opciones : ',this.options);
  /*  this.prdService.currentCategorias.subscribe((value:CategoriasVendidasModel[]|null)=>{
      if(value != undefined){
        this.options = value;  
        this.filteredOptions = [... this.options];
      
        }})   */
  } 

  getAllCategorias(){  
    this.prdService.getCategorias().subscribe({
       next :(datos:categoriaVendidosRequest)=>{
         console.log('getAllCategorias',datos);
      let opt:CategoriasVendidasModel = new CategoriasVendidasModel(null);
       opt.id = 0;
       opt.nombre = 'Seleccione una categoria para filtrar'; 
    if (datos.numdata > 0 ){   
        this.options = datos.data!.map((x:any)=>x.obj) ;   
        this.filteredOptions = [opt ,...this.options];  
    }else{
      this.options = [opt];
    }

       
      } ,
      error: error => { 
        console.log(JSON.stringify(error) ) 
      }}
      );
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
  selectOption(option: CategoriasVendidasModel) {
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
