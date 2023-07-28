import { Component, OnInit } from '@angular/core';
import { ClientesOdoo, dfltAnswOdoo } from 'src/app/interfaces/clientes-odoo';
import { select } from 'src/app/interfaces/generales.interface';
import { datosMaestros } from 'src/app/interfaces/maestros.interface';
import { CiudadModel } from 'src/app/models/maestros.model';
import { MaestroClienteServices } from '../../services/MaestroCliente.services';
import { loading } from 'src/app/models/app.loading';
import { answDfltOdoo } from 'src/app/models/app.db.answDfltOdoo.model';


@Component({
  selector: 'app-cliente-nuevo',
  templateUrl: './cliente-nuevo.component.html',
  styleUrls: ['./cliente-nuevo.component.css']
})
export class ClienteNuevoComponent implements OnInit {
  Ciudades:any[] = [];
  paises:any[] = [];
  tipo_direccion:any[];
  companias:any[] ;
  Provincias:any[];
  titulos:any[];
  categorias:any[];
  tipo_identificacion:answDfltOdoo[];
  tipo_identificacionA:answDfltOdoo = new answDfltOdoo() ;
  NwCliente: ClientesOdoo ;
  
  cityN:CiudadModel = new CiudadModel();
  constructor( public loading : loading, private MaestroClienteServices :MaestroClienteServices ) { 
    
    this.cancelar();
    this.setMaestros();
    
    //this.MaestroClienteServices.prueabaGetM();
  }
  
  cancelar(){
    this.NwCliente = { "id": 0,   
    "name": '',
    "parent_id": false,
    "display_name": '',
    "company_type": "",
    "is_company": 'No',
    "email": '',
    "mobile": '',
    "phone": '',
    "type": 'contact',
    "vat": '',
    "lang": '',
    "street": '',
    "city": '',
    "street2": '',
    //-----------------------------
    "state_id": '',
    "zip": '',
    "country_id": '',
    "function": '',
    "category_id": '',
    "title": '',
    "l10n_latam_identification_type_id":this.tipo_identificacionA 
  }
  console.log('tipo iden auxili',this.tipo_identificacionA );
  
  }
  async setMaestros(){
    this.loading.show() 
   let result = await this.MaestroClienteServices.getMaestrosClientes();
    console.log('termino el trabajo');
     
    this.tipo_direccion = this.MaestroClienteServices.getMaestroClientes('tipo_direccion'); 
    console.log(this.tipo_direccion);
    
    this.companias =  [];
    this.Provincias =  this.MaestroClienteServices.getMaestroClientes('provincias');
    this.titulos =  this.MaestroClienteServices.getMaestroClientes('titulos');
    this.categorias =  this.MaestroClienteServices.getMaestroClientes('categorias'); 
    this.loading.hide() 
this.gettipoDocuOdoo(); 
this.getEmpresas();
this.getCategorias();

  //  this.tipo_identificacion =   this.MaestroClienteServices.getMaestroClientes('tipo_identificacion');
    console.log('tipo_direccion',this.tipo_direccion);
    this.cancelar();
    this.getPaises();
    this.getTitulos();
    this.muestraCliente();
    
  }
  getEmpresas(){ 
    this.MaestroClienteServices.setEmpresas().subscribe((datos:select)=>{
     // console.log('EMPRESAS ODDO' , JSON.stringify(datos));
      
      datos.data.forEach(value=>{
        
        this.companias.push({
        "dato": value.id,
        "label":value.display_name,
      })  
      })  
    });

  }
  getTitulos(){ 
    this.MaestroClienteServices.setTitulos().subscribe((datos:select)=>{
     // console.log('EMPRESAS ODDO' , JSON.stringify(datos));
      
      datos.data.forEach(value=>{
        
        this.titulos.push({
        "dato": value.id,
        "label":value.display_name,
      })  
      })  
    });

  }
  
  getCategorias(){ 
    this.MaestroClienteServices.setCategorias().subscribe((datos:select)=>{
       console.log('setCategorias ODDO' , JSON.stringify(datos));
      this.loading.show()
      datos.data.forEach(value=>{
        
        this.categorias.push({
        "dato": value.id,
        "label":value.display_name,
      })  
      }) 
      this.loading.hide() ;
    });

  }
  gettipoDocuOdoo(){

    let tp : answDfltOdoo ;
    this.loading.show() 
    this.tipo_identificacion =[];
    this.MaestroClienteServices.setTiposDocumentos().subscribe((datos:select)=>{
      this.loading.show();
      datos.data.forEach(value=>{
        tp = new answDfltOdoo() ; 
        tp[0] = value.id;
        tp[1] = value.display_name ; 
        this.tipo_identificacion.push(tp) 
      if (value.display_name.toUpperCase() === 'CÉDULA DE CIUDADANÍA' ||  value.display_name.toUpperCase() === 'CEDULA DE CIUDADANIA'  )
      { 
        this.tipo_identificacionA= tp;
      } 
      }) 
       
      console.log('tipo de identificacion final' , this.tipo_identificacion);
      this.NwCliente.l10n_latam_identification_type_id = this.tipo_identificacionA;
      this.loading.hide() 
    });
 
  }

  muestraCliente()
  {
    console.log('change nuevo cliente<',this.NwCliente);
    
  }
  getCiudad(departameto : number){
    this.loading.show() 
    this.Ciudades = []; 
    let selCiudad = 0;
    this.MaestroClienteServices.getCiudadesPorDepartamento(departameto).subscribe((datos:select)=>{
      
      datos.data.forEach(value=>{
        
      this.Ciudades.push({
        "dato": value.id,
        "label":value.nombre,
      }) 
      if (value.nombre.toUpperCase().trim() == 'SANTA MARTA'){ 
        selCiudad =  value.id;
      }
      }) 
    this.NwCliente.city = selCiudad;
    this.loading.hide() 
    })}
  getPaises(){
    /*this.paises = [ {    "dato": 0 ,
   "label":'País'}];*/
   this.loading.show() 
   let selPais = 0;
   this.paises = [];
    this.MaestroClienteServices.getPaises().subscribe((datos:select)=>{
    datos.data.forEach(value=>{
      
    this.paises.push({
      "dato": value.id,
      "label":value.nombre,
    })
    if (  value.nombre.toUpperCase()  == 'COLOMBIA'){
      selPais = value.id;
    }
    })
    console.log(this.paises);
    
    this.NwCliente.country_id = selPais ;

    this.NwCliente.state_id = 0;
    this.NwCliente.city= 0;
    
    if (selPais > 0){
      this.getDepartamento(selPais);
    }
    this.loading.hide() 
  })
}
  getDepartamento(pais:number){
    this.loading.show() 
    console.log(pais);
    let selDEP = 0;
    this.Provincias = [];
    this.Ciudades = [];
    this.MaestroClienteServices.getDepartamentosPorPais(pais).subscribe((datos:select)=>{
      datos.data.forEach(value=>{
        if (  value.nombre.toUpperCase()  == 'MAGDALENA'){
          selDEP = value.id;
        }
        
      this.Provincias.push({
        "dato": value.id,
        "label":value.nombre,
      })
      })

      this.NwCliente.state_id = selDEP;
    this.NwCliente.city= 0;
    if (selDEP > 0){
      this.getCiudad(selDEP);
    }
    this.loading.hide() 
    })
  }
  ngOnInit(): void { 
     
     
  }

}
