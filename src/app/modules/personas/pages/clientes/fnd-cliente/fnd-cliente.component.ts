import { Component, Inject, OnInit } from '@angular/core';
import { ClientesOdoo, dfltAnswOdoo } from 'src/app/interfaces/clientes-odoo'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { CiudadModel, DepartamentoModel, PaisModel } from 'src/app/models/maestros.model';
import { MaestroClienteServices } from 'src/app/services/MaestroCliente.services'; 
import { loading } from 'src/app/models/app.loading';  
import { DocumentosModel } from 'src/app/models/ventas/documento.model';
import {ClientesService} from 'src/app/services/Clientes.services' 
import { error } from 'jquery';
import { ClientesModule } from 'src/app/models/clientes/clientes.module';
import { MaestroCliente, fndCliente } from 'src/app/interfaces/maestro-cliente';
import { clienteRequest } from 'src/app/interfaces/producto-request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fnd-cliente',
  templateUrl: './fnd-cliente.component.html',
  styleUrls: ['./fnd-cliente.component.css']
})
export class FndClienteComponent implements OnInit {
 
  
  Ciudad?:CiudadModel ;
  paises?:PaisModel[] = [];
  tipo_direccion:any[] = [] ; 
  Provincias:any[] = [] ;
  titulos:any[] = [] ;
  categorias:any[] = [] ; 
  NwCliente:ClientesModule = new ClientesModule();  
  Ciudades:CiudadModel[] = [];
  departamentos:DepartamentoModel[] = [];
  busqueda:boolean = true;
  crear:boolean = true ; 
  asignarADoc = true;
  documentoActivo:DocumentosModel;
  maestro?:MaestroCliente;
  constructor( public loading : loading, private MaestroClienteServices :MaestroClienteServices , 

    public dialogo: MatDialogRef<FndClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataIngreso:fndCliente ,

    private clientesService:ClientesService       
    ) {  
      this.documentoActivo = this.dataIngreso.docActivo! ; 
      this.NwCliente = this.dataIngreso.clienteIngreso?? new DocumentosModel() ; 
      if(this.dataIngreso.invoker == 'clienteListado'){
        this.busqueda = false;
      }
      if(this.dataIngreso.invoker == 'nuevoCliente'){
        this.busqueda = false;
      }
      if(this.dataIngreso.invoker !== 'ventas'){
        this.asignarADoc = false;
      }
  }

  asignarClienteAlDocumento(){
    if(this.NwCliente.id !== undefined)
     { this.loading.show();
    this.clientesService.asignarClienteAlDocumento(this.documentoActivo.orden , parseInt(this.NwCliente.id.toString()) ).subscribe(
      {next:(value)=>{
         console.log(value)
        if(value.error == 'ok'){this.dialogo.close(true)}else{Swal.fire("error" , value.error , "error")}
        
      },error:(error)=>Swal.fire("error" , JSON.stringify(error) , "error")
      ,complete:()=>this.loading.hide()})
  }}

  getDepartamento(){
    this.Ciudades = [];
    
   console.log('departamentos a filtrar',this.maestro?.departamentos , this.NwCliente.pais)
   this.departamentos = this.maestro?.departamentos.filter(x=> x.cod_pais == this.NwCliente.pais)?? [] ;
   console.log('getDepartamento' , this.departamentos)
  }
  getCiudad(){
   console.log('ciudades a filtrar',this.maestro?.ciudades , this.NwCliente.departamento)
   let ciuArr = (this.maestro)?[...this.maestro.ciudades]:[] ; 
    this.Ciudades =  ciuArr.filter(x=> x.cod_departamento == this.NwCliente.departamento)?? [] ; 
    console.log(this.Ciudades)
  }
  buscarCliente(){
    if (this.NwCliente.numIdentificacion !== undefined && this.NwCliente.tipoIdentificacion!== undefined ){
      this.loading.show();
            this.clientesService.getClientesByNumAndTipId(
              this.NwCliente.numIdentificacion , this.NwCliente.tipoIdentificacion
            ).subscribe({next:(value:clienteRequest)=>{
              console.log(value)
              if(value.numdata== 0){
                Swal.fire( {title:'Persona no encontrada',
                   text:'Desea crearla e ingresarla a la venta?',
                   icon:'question', 
                  showCancelButton: true,
                  confirmButtonText: 'Si', 
                  cancelButtonText:'No'}

                )
                .then((result) => {
                  if (result.isConfirmed) {  
                    this.busqueda =  false
                  }}); 
              }else{
                this.NwCliente =  value.data[0]
                console.log('cliente encontrado' , this.NwCliente)
                this.getDepartamento() 
                this.getCiudad()
                this.busqueda =  false
              }
            },error:(error)=>console.error(error)
          ,complete:()=>this.loading.hide()})
          }
      }
     
crearCliente(){
 
  this.loading.show() 
  //this.documentoActivo.orden;
this.clientesService.setClienteOdoo({...this.NwCliente}).subscribe(
  (respuesta:any)=>{
    let cont = 0;
     console.log('setClienteOdoo',respuesta); 
     if (respuesta.error === 'ok'){
       alert('Datos creados con exito!!')
       if(respuesta.idGenerado){
        this.NwCliente.id =  respuesta.idGenerado[0].Id;
       }
       if (this.documentoActivo != undefined){
            this.asignarClienteAlDocumento();
          }else{
            this.clientesService.changeCliente( this.NwCliente);
            this.dialogo.close(true)
          }
     }else{
       switch(respuesta.error){
         case 'ok_no_insert' :
          alert('El cliente ya existe en odoo!!');
           break;
           default :
           alert(respuesta.error);
           break; 
       }
      
     }
     this.loading.hide();
})
}

asignarDefaultTipoId(){
  if(!this.NwCliente.is_empresa){
    this.NwCliente.tipoIdentificacion = this.maestro?.parametros.ID_TIPO_ID_CEDULA; 
  }else{
    this.NwCliente.tipoIdentificacion = this.maestro?.parametros.ID_TIPO_ID_NIT;  
  } 
}

asignarDefaults(){ 
  this.NwCliente.is_empresa = false; 

  this.NwCliente.pais = this.maestro?.parametros.ID_PAIS_DEFAULT; 
  this.paises = (this.maestro?.paises)?[...this.maestro?.paises]:[];
  this.getDepartamento()
  this.NwCliente.departamento = this.maestro?.parametros.ID_DEP_DEFAULT; 
  this.getCiudad()
  this.NwCliente.ciudad = this.maestro?.parametros.ID_CIUDAD_DEFAULT; 
  this.asignarDefaultTipoId();
  console.log(this.NwCliente)
}
 
  async setMaestros(){
    this.loading.show() 
    this.clientesService.getMaestroClientes().subscribe(
      {next:(value: any)=>{ 
        this.maestro = value.datos; 
        console.log(value);
        this.asignarDefaults();
      }, error:(error: any)=>console.error(error),complete:()=>this.loading.hide() }
    )
   let result = await this.MaestroClienteServices.getMaestrosClientes();
    console.log('termino el trabajo');
     
    this.tipo_direccion = this.MaestroClienteServices.getMaestroClientes('tipo_direccion'); 
    console.log(this.tipo_direccion); 
    this.Provincias =  this.MaestroClienteServices.getMaestroClientes('provincias');
    this.titulos =  this.MaestroClienteServices.getMaestroClientes('titulos');
    this.categorias =  this.MaestroClienteServices.getMaestroClientes('categorias');   
  } 
    
   
  ngOnInit(): void { 
     
    this.setMaestros();
     
  }

}
