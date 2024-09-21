import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ProductoVendido } from 'src/app/interfaces/productoVendido.';
import { CategoriasModel } from 'src/app/models/categorias.model';
import { EmpleadoModel } from 'src/app/models/empleados/empleados.module';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'elemt-productosVendidosDropdown',
  templateUrl: './productosVendidos-dropdown.component.html',
  styleUrls: ['./productosVendidos-dropdown.component.css']
})
export class productosVendidosDropdownComponent implements OnInit{

  options:  ProductoVendido [] = [];
  filteredOptions:  ProductoVendido [] = [];
  @Input() selectedValue:  ProductoVendido | null = null;
  @Output() selectionChange: EventEmitter< ProductoVendido > = new EventEmitter(); 
  vueltas :boolean =  false; 
  private inicioService= inject(DatosInicialesService) ;
  
  ngOnInit(): void { 
    console.log('opciones : ',this.options); 
    this.inicioService.getProductosVendidos().subscribe({next:value=>{
      console.log(value);
      let prod =   {idProducto:'0', firstDate: new Date(), lastDate: new Date(), nombre:'Seleccione un Producto para filtrar', nombre2:'', nombre3:''}
      this.options = [prod,  ...value.data]
      this.filteredOptions = [prod,  ...value.data]
      console.log('productos vendidos',this.options);
      
  }})
   
  } 

  filterOptions(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    if(input == ''){
      this.filteredOptions = [... this.options];
    }else{
      
      let prod =   {idProducto:'0', firstDate: new Date(), lastDate: new Date(), nombre:'Seleccione un Producto para filtrar', nombre2:'', nombre3:''}
     
    this.filteredOptions =   [prod, ...this.options.filter(option =>
      option.nombre.toLowerCase().includes(input)
    )];}
    this.showDropdown();
  }
  selectOption(option: ProductoVendido) {
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
