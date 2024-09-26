import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'; 
import { UsuarioConVentaModel } from 'src/app/models/usuario.model';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';

@Component({
  selector: 'elemt-usuarioDropdown',
  templateUrl: './usuario-dropdown.component.html',
  styleUrls: ['./usuario-dropdown.component.css']
})
export class usuarioDropdownComponent implements OnInit{

   options: UsuarioConVentaModel[] = [];
   @Input() selectedValue: UsuarioConVentaModel| null = null;
   @Input() conVentas: boolean  = false;
  @Output() selectionChange: EventEmitter<UsuarioConVentaModel> = new EventEmitter(); 
  @Output() clickBtnRefress: EventEmitter<void> = new EventEmitter(); // Even
  vueltas :boolean =  false;
  private inicioService= inject(DatosInicialesService) ;
  
  ngOnInit(): void { 
    console.log('opciones : ',this.options);
   
   if(!this.conVentas){
    this.inicioService.getUsuarios().subscribe(vendedores => {
      if (vendedores.numdata > 0) {
        // Aquí puedes trabajar con el array de vendedores
        console.log('Vendedores actualizados:', vendedores);
        this.options = vendedores.data;
      }
    });
  }else{

      
      this.inicioService.getUsuariosConVentas().subscribe(vendedores => {
        if (vendedores.numdata > 0) {
          // Aquí puedes trabajar con el array de vendedores
          console.log('Vendedores actualizados:', vendedores);
          this.options = vendedores.data;
        }
      });
    }



  } 

  selectOption(option: UsuarioConVentaModel) {
    this.selectedValue = option;
    this.selectionChange.emit({...this.selectedValue}); 
  }
  triggerExternalFunction() {
    this.clickBtnRefress.emit(); // Emitir el evento
  }
}
