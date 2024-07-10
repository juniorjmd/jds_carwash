import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentosModel } from 'src/app/models/ventas/documento.model';

@Component({
  selector: 'elemt-docDropdown',
  templateUrl: './documentos-dropdown.component.html',
  styleUrls: ['./documentos-dropdown.component.css']
})
export class DocumentosDropdownComponent implements OnInit{

  @Input() options: DocumentosModel[] = [];
  @Input() selectedValue: DocumentosModel| null = null;
  @Output() selectionChange: EventEmitter<DocumentosModel> = new EventEmitter(); 
  @Output() clickBtnRefress: EventEmitter<void> = new EventEmitter(); // Even
  vueltas :boolean =  false;
  
  ngOnInit(): void { 
    console.log('opciones : ',this.options);
  } 

  selectOption(option: DocumentosModel) {
    this.selectedValue = option;
    this.selectionChange.emit(this.selectedValue); 
  }
  triggerExternalFunction() {
    this.clickBtnRefress.emit(); // Emitir el evento
  }
}
