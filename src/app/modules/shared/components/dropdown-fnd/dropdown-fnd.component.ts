import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-dropdown-fnd',
  templateUrl: './dropdown-fnd.component.html',
  styleUrls: ['./dropdown-fnd.component.css']
})
export class DropdownFndComponent implements AfterViewInit  {
  @Output() optionSelected = new EventEmitter<number>();
  selectedOption!: string;
  @Input() title!:string;
  @Input() OptionField!:string;
  @Input() options !: any[]  ;

  private searchTerms = new Subject<string>();


  
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        this.searchTerms.next(term);
        return this.options
          .filter(option => option[this.OptionField].toLowerCase().includes(term.toLowerCase()))
          .map(option => option[this.OptionField]); // Solo retornar los valores de OptionField
      })
    );

  onSelectOption(id: number) { 
    this.optionSelected.emit(id);
  }
   ngAfterViewInit() { 

    }
    onSelectItem(item: any) { // Utilizamos el método para manejar el evento (selectItem) 
    const selectedOption = this.options.find(option => option[this.OptionField] === item.item);
    if (selectedOption) {
      this.onSelectOption(selectedOption.id); 
    }
  }
}
