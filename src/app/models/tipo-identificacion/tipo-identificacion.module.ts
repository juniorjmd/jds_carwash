import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TipoIdentificacionModule {
  constructor(
    @Inject(Number) public id?:number ,
  @Inject(String) public name?:string,  
  @Inject(String) public  description?:string,
  @Inject(String) public  display_name?:string,
  @Inject(String) public  l10n_co_document_code?:string){}
 }
