import {  Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
 declarations: [],
 imports: [
  CommonModule
 ]
})
export class ClientesModule { 



  constructor( @Inject(String) public display_name:string  ,
  @Inject(String) public company_type:string,
  @Inject(String) public is_company?:string,
  @Inject(String) public email?:string,
  @Inject(String) public mobile?:string,
  @Inject(String) public phone?:string,
  @Inject(String) public type?:string,
  @Inject(String) public vat?:string,
  @Inject(String) public lang?:string,
  @Inject(String) public street?:string,
  @Inject(String) public city?:string,
  @Inject(String) public street2?:string,
  @Inject(String) public state_id?:string,
  @Inject(String) public zip?:string,
  @Inject(String) public country_id?:string,
  @Inject(String) public  funcion?:string,
  @Inject(String) public category_id?:string,
  @Inject(String) public title?:string,
  @Inject(String)  public l10n_latam_identification_type_id?:string,
  @Inject(String)  public nombre_pais?:string,
  @Inject(String)  public nombre_estado?:string,
  @Inject(String)  public orden?:string,
  @Inject(String)  public id?:number


  )
    {}
}
 