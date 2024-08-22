import { Component, Inject, OnInit } from '@angular/core'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { CiudadModel, DepartamentoModel, PaisModel } from 'src/app/models/maestros.model';
import { MaestroClienteServices } from 'src/app/services/MaestroCliente.services'; 
import { loading } from 'src/app/models/app.loading';  
import { DocumentosModel } from 'src/app/models/ventas/documento.model';
import {ClientesService} from 'src/app/services/Clientes.services'  
import { ClientesModel } from 'src/app/models/clientes/clientes.module';
import { MaestroCliente, fndCliente } from 'src/app/interfaces/maestro-cliente';
import { clienteRequest } from 'src/app/interfaces/producto-request';
import Swal from 'sweetalert2'; 
import { BusquedaPersona } from 'src/app/interfaces/busqueda-persona';

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
  NwCliente:ClientesModel = new ClientesModel();  
  ClientesResult:ClientesModel[] = [];
  Ciudades:CiudadModel[] = [];
  departamentos:DepartamentoModel[] = [];
  busqueda:boolean = true;
  empresaShwich : boolean = true;
  crear:boolean = true ; 
  asignarADoc = true;
  buscarPorNombre = false;
  devolverPersona = false;  
  mostrarListado = false;
  documentoActivo:DocumentosModel;
  maestro?:MaestroCliente;
  retorno:BusquedaPersona;
   asignarEmpleado = false;
  constructor( public loading : loading, private MaestroClienteServices :MaestroClienteServices , 

    public dialogo: MatDialogRef<FndClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataIngreso:fndCliente ,

    private clientesService:ClientesService       
    ) {  
      this.retorno ={
        response:false,
        persona :null,    
        empleado :null
      } ;
     // console.log('datos de ingreso ' ,  this.dataIngreso)
      this.documentoActivo = this.dataIngreso.docActivo! ; 
      this.NwCliente = this.dataIngreso.clienteIngreso?? new ClientesModel() ; 
      if(this.dataIngreso.invoker == 'clienteListado'){
        this.busqueda = false;
      }



      if(this.dataIngreso.invoker == 'Empleados'){
        this.empresaShwich = false;
        this.asignarEmpleado = true;
      }
      if(this.dataIngreso.invoker == 'nuevoCliente'){
        this.busqueda = false;
      } 
      if(this.dataIngreso.invoker != 'ventas'){
        this.asignarADoc = false;
      }
      if(this.dataIngreso.invoker == 'cuentasPorCobrarVentas' 
        || this.dataIngreso.invoker == 'gasto'){
          this.asignarADoc = false; 
        this.asignarEmpleado =  false;
        this.crear =  false
        this.devolverPersona = true;

      }

 if( this.dataIngreso.invoker == 'gasto'){
          this.buscarPorNombre = true;
          this.asignarADoc = false; 
          this.asignarEmpleado =  false;
          this.crear =  true
          this.devolverPersona = true; 
          this.mostrarListado = true
          
      }
      if(this.dataIngreso.invoker == 'compra'){
        this.asignarADoc = true;         
        this.mostrarListado = true 
        this.buscarPorNombre = true;
      }
      if(this.dataIngreso.invoker == 'cuentasXpagar'){
        this.asignarADoc = false;         
        this.mostrarListado = true 
        this.buscarPorNombre = true;
        this.buscarPorNombre = true;
      }
      
  }
  seleccionar(cliente:ClientesModel){
    this.NwCliente = {...cliente};
    
    this.clientesService.changeCliente( this.NwCliente);
    if(this.dataIngreso.invoker == 'cuentasXpagar'){
      this.pasarComoEmpleado();
      return
    }
    if(!this.asignarADoc){
    if (this.asignarEmpleado || this.devolverPersona){
      this.pasarComoEmpleado();
      return
    }}else{
      if(this.NwCliente.id !== undefined)
     { this.loading.show();
          this.clientesService.asignarClienteAlDocumento(this.documentoActivo.orden , parseInt(this.NwCliente.id.toString()) ).subscribe(
            {next:(value)=>{
              console.log(value)
              if(value.error == 'ok'){
                if (this.asignarEmpleado || this.devolverPersona){
                  this.pasarComoEmpleado();
                   
                }else{
                    this.dialogo.close(true)
                }


              }else{Swal.fire("error" , value.error , "error")}
              
            },error:(error)=>Swal.fire("error" , JSON.stringify(error) , "error")
            ,complete:()=>this.loading.hide()})
        }
    }
  }
  eliminar(cliente:ClientesModel){
    this.NwCliente = {...cliente};
  }
  editarCliente(cliente:ClientesModel){
      this.NwCliente = {...cliente};
      this.mostrarListado = false
  }
  pasarComoEmpleado(){
    this.retorno= {response:true , empleado: this.NwCliente , persona:this.NwCliente}
    this.dialogo.close(this.retorno)

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
                if(this.dataIngreso.invoker == 'cuentasPorCobrarVentas'){
                  this.pasarComoEmpleado();
                }else{
                console.log('cliente encontrado' , this.NwCliente)
                this.getDepartamento() 
                this.getCiudad()
                this.busqueda =  false
              }
              }
            },error:(error)=>console.error(error)
          ,complete:()=>this.loading.hide()})
          }
      }


      buscarClientePorNombre(){
        if (this.NwCliente.nombreCompleto !== undefined && this.NwCliente.nombreCompleto!== undefined ){
          this.loading.show();
          if(this.dataIngreso.invoker=='cuentasXpagar' ){
            
            this.clientesService.getProveedorByNombre(
              this.NwCliente.nombreCompleto  
            ).subscribe({next:(value:clienteRequest)=>{
              console.log(value)
              if(value.numdata== 0){
                Swal.fire('no se encuentra el proveedor','','info')
              }else{
                this.NwCliente =  value.data[0] 
                this.ClientesResult = value.data; 
                console.log('cliente encontrado' , this.NwCliente)
                this.getDepartamento() 
                this.getCiudad()
                this.busqueda =  false 
            }},error:(error)=>console.error(error.error.error)
          ,complete:()=>this.loading.hide()})

          }else{
                this.clientesService.getClientesByNombre(
                  this.NwCliente.nombreCompleto  
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
                        this.busqueda =  false;
                        this.mostrarListado = false;
                      }}); 
                  }else{
                    this.NwCliente =  value.data[0] 
                    this.ClientesResult = value.data;
                    if(this.dataIngreso.invoker == 'cuentasPorCobrarVentas'){
                      this.pasarComoEmpleado();
                    }else{
                    console.log('cliente encontrado' , this.NwCliente)
                    this.getDepartamento() 
                    this.getCiudad()
                    this.busqueda =  false
                  }
                  }
                },error:(error)=>console.error(error)
              ,complete:()=>this.loading.hide()})
          }




              }
          }    
  

  buscarClienteFinal(){
        if (this.NwCliente.numIdentificacion !== undefined && this.NwCliente.tipoIdentificacion!== undefined ){
          this.loading.show();
                this.clientesService.getClientesByNumAndTipId(
                  this.NwCliente.numIdentificacion , this.NwCliente.tipoIdentificacion
                ).subscribe({next:(value:clienteRequest)=>{
                  console.log(value)
                  if(value.numdata== 0){

                   if (this.crear ){

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
                      Swal.fire('persona no encontrada','la persona no se encuentra en la base de datos','error');
                      this.dialogo.close({response:false , empleado: new ClientesModel()});
                    }
                  }else{
                    this.NwCliente =  value.data[0]  
                    if(this.dataIngreso.invoker == 'cuentasXpagar'){
                      this.pasarComoEmpleado();
                      return
                    }
                    if (this.documentoActivo != undefined){
                      this.asignarClienteAlDocumento();
                    }else{
                      this.clientesService.changeCliente( this.NwCliente);
                      if (this.asignarEmpleado || this.devolverPersona){
                        this.pasarComoEmpleado();
                      }else{
                          this.dialogo.close(true)
                      }
                    }
                  }
                },error:(error)=>console.error(error)
              ,complete:()=>this.loading.hide()})
              }
          }    
     
crearCliente(){ 
  console.log('crearCliente' , this.NwCliente);
 // return 
  this.loading.show() 
this.clientesService.setClienteOdoo(this.NwCliente ).subscribe({next:
  (respuesta:any)=>{
    let cont = 0;
     console.log('setClienteOdoo',respuesta); 
     if (respuesta.error === 'ok'){
       alert('Datos creados con exito!!')
       if(respuesta.idGenerado){
        this.NwCliente.id =  respuesta.idGenerado[0].Id; 
       } 
       this.buscarClienteFinal()
     
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
},error:e=>{
  this.loading.hide();
  console.error(e.error.error);
}})
}
     
crearPersonaYDevolverla(){
 
  this.loading.show() 
  //this.documentoActivo.orden;
this.clientesService.setClienteOdoo(this.NwCliente ).subscribe(
  (respuesta:any)=>{
    let cont = 0;
     console.log('setClienteOdoo',respuesta); 
     if (respuesta.error === 'ok'){
       alert('Datos creados con exito!!')
       if(respuesta.idGenerado){
        this.NwCliente.id =  respuesta.idGenerado[0].Id; 
       } 
       this.buscarClienteFinal()
     
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
  
  if (this.NwCliente.is_empresa == undefined)  this.NwCliente.is_empresa = false; 
  if (this.NwCliente.retefuenteCompras == undefined)  this.NwCliente.retefuenteCompras = false; 
  if (this.NwCliente.retefuentesVentas == undefined)  this.NwCliente.retefuentesVentas = false; 
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
