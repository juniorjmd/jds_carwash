import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal1',
  templateUrl: './modal1.component.html' ,
  providers: [NgbModalConfig, NgbModal]

})
export class Modal1Component implements OnInit {
  btnModal : HTMLElement =  document.getElementById('activaModal') as HTMLElement;
  titleModal : HTMLElement =  document.getElementById('modal-basic-title') as HTMLElement;
  pBodyModal : HTMLElement =  document.getElementById('pBodyModal') as HTMLElement;
  btnActionModal : HTMLElement =  document.getElementById('btnActionModal') as HTMLElement;
  cuerpoModal:HTMLElement = document.getElementById('pBodyModal') as HTMLElement
   @Input() titulo : string = '';
   @Input() btnModalAction : string = '';
   @Input() CuerpoModal: string= '';
  constructor(config: NgbModalConfig, private modalService: NgbModal , private renderer: Renderer2) { 
     // customize default values of modals used by this component tree
     config.backdrop = 'static';
     config.keyboard = false;
  }
  manejoDeError(error:string){
     this.titleModal.innerHTML = 'Error';
     this.btnActionModal.innerHTML = 'Cerrar';
     this.pBodyModal.innerHTML =error;  
     this.btnModal.click();
  }
   open(content) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
    
  }

}
