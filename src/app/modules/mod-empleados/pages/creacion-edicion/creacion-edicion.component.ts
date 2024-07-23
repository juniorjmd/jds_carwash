import { Component, OnInit } from '@angular/core';
import { EmpleadoModel } from 'src/app/models/empleados/empleados.module';
import { TiposEmpleadoModule } from 'src/app/models/tipos-empleado/tipos-empleado.module';
import { EmpleadosService } from 'src/app/services/empleados.service'; 
import Swal from 'sweetalert2'; 
import { loading } from 'src/app/models/app.loading';   
import { ClientesModel } from 'src/app/models/clientes/clientes.module';
import { MatDialog } from '@angular/material/dialog';
import { FndClienteComponent } from 'src/app/modules/shared/modals/fnd-cliente/fnd-cliente.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-creacion-edicion',
  templateUrl: './creacion-edicion.component.html',
  styleUrls: ['./creacion-edicion.component.css']
})
export class CreacionEdicionComponent implements OnInit {
  nuevoEmpleado : EmpleadoModel = new EmpleadoModel() ;
  nuevaPersona : ClientesModel = new ClientesModel() ;
  tipoEmpleado :TiposEmpleadoModule[] = [];
  empleados :EmpleadoModel[] = [];

  constructor( private empleadosServices :EmpleadosService ,  private loading : loading ,   private newAbrirDialog: MatDialog,) { 
    this.nuevaPersona.nombre =''; 
    this.nuevaPersona.sec_nombre ='';  
    this.nuevaPersona.apellido =''; 
    this.nuevaPersona.sec_apellido =''; 

    this.getTipoEmpleado();
    this.getEmpleados();
   }

   abrirBuscarCliente(){
    this.newAbrirDialog.open(FndClienteComponent,{data:{invoker:'Empleados'} })
    .afterClosed()
    .pipe(
      tap((response: {response:boolean , empleado:ClientesModel})=>{
        if (response.response) {  
          this.nuevaPersona = response.empleado;
          this.nuevoEmpleado.persona  = response.empleado; 
          this.nuevoEmpleado.idPersona = typeof this.nuevaPersona.id === 'string' ? parseInt(this.nuevaPersona.id, 10) : this.nuevaPersona.id!;
          
        }
      })
    ).subscribe({
      next: () => {},
      error: (error) => console.error('Error:', error),
      complete: () => console.log('buscarCliente completo')
    });   
  }
  manageEmpleado(){
    if( this.nuevaPersona?.nombre ==='' ){ Swal.fire( 'Debe ingresar el primer nombre', '', 'error');    return ;     }
    if( this.nuevaPersona?.apellido ==='' ){ Swal.fire( 'Debe ingresar el primer apellido', '', 'error');  return;}
    if( this.nuevoEmpleado.monto_dia! < 0 ){ Swal.fire( 'Debe ingresar el valor del Dia para los empleados administrativos o el porcentaje del pago por servicio para los cleaners', '', 'error');  return;}
    if( this.nuevoEmpleado.tipo == 0 ){ Swal.fire( 'debe seleccionar el tipo de empleado', '', 'error');  return; }
    this.loading.show(); 
    this.empleadosServices.guardarEmpleado(this.nuevoEmpleado).
    subscribe({next: (respuesta:any)=>{console.log(respuesta)
      if (respuesta.error === 'ok'){
         Swal.fire('datos ingresados con exito');  
         this.nuevoEmpleado =    new    EmpleadoModel( ); 
         this.nuevaPersona =    new    ClientesModel( );  
         this.getEmpleados();
        }else{   Swal.fire(respuesta.error, '', 'error');  }
     },
     error:error=>  {Swal.fire('Error' , error.error.error,'error');this.loading.hide();} , 
     complete: () => this.loading.hide() })
   
   }
   mostarPagos(empleado:EmpleadoModel){
    let pagosHtml:string =  `<h1>Pagos realizados al empleado : <br>${empleado.persona?.nombreCompleto}</h1>
     <table class='table' style='font-size:12px'> 
     <tr>
     <td class="centrado"  colspan="6">Pagos Realizados</td></tr>
     <tr>
     <td>por concepto de</td>
     <td>Num días</td>
     <td>Num servicios</td>
     <td>Total parcial</td>
     <td>Anticipos</td>
     <td>Total</td>
     </tr>
    `;
    
    if(empleado.pagosEmpleados != undefined){
    empleado.pagosEmpleados!.forEach(pago=>{
      pagosHtml +=`<tr> `;
      pagosHtml +=`<td>${pago.porConceptoDe}</td> `;
      pagosHtml +=`<td nowrap>${pago.diasTrabajados}</td> `;
      pagosHtml +=`<td nowrap>${pago.serviciosTrabajados}</td> `;
      pagosHtml +=`<td nowrap>${pago.totalParcial}</td> `;
      pagosHtml +=`<td nowrap>${pago.anticipos}</td> `;
      pagosHtml +=`<td nowrap>${pago.totalPagado}</td> `;
      pagosHtml +=`</tr> `;
    })
  }
    let cont = 0;
    if( empleado.pagosAnticiposEmpleados != undefined){
    empleado.pagosAnticiposEmpleados!.forEach(pago=>{
      if (pago.NombreEstado!.trim() =='PENDIENTE_POR_LIQUIDAR'){
        if(cont === 0){ 
        pagosHtml +=  `<tr>
        <td class="centrado" colspan="6">Abonos pendientes por liquidar</td></tr>
        <tr>
        <td colspan='2' >Descripción</td>
        <td>Fecha</td>
        <td>Total parcial</td>
        <td>Descontado</td>
        <td>Total Actual</td>
        </tr>
       `;}
     
      pagosHtml +=`<tr> `;
      pagosHtml +=`<td  colspan='2' >${pago.descripcion}</td> `;
      pagosHtml +=`<td nowrap>${pago.fecha}</td> `; 
      pagosHtml +=`<td nowrap>${pago.totalParcial}</td> `;
      pagosHtml +=`<td nowrap>${pago.anticipos}</td> `;
      pagosHtml +=`<td nowrap>${pago.totalPagado - pago.anticipos}</td> `;
      pagosHtml +=`</tr> `;
      cont++;
        }} 
  )}
    pagosHtml += '</table>'



    Swal.fire({html:pagosHtml, width: '900px'});
  }
  editarEmpleado(empleado:EmpleadoModel){
    this.nuevoEmpleado = {...empleado};

    this.nuevaPersona = empleado.persona!
  }
  mostarAcumulado(empleado:EmpleadoModel){
    let pagosHtml:string =  `<h1>Pagos realizados al empleado : <br>${empleado.persona?.nombreCompleto}</h1>
     <table class='table' style='font-size:12px'> 
     <tr>
     <td>Empleado</td>
     <td>Servicios</td>
     <td>Fecha</td>
     <td>Hora</td>
     <td>Valor</td>
     <td>Estado</td>
     </tr>`;
  if (empleado.AcumuladosEmpleados != undefined){
    empleado.AcumuladosEmpleados!.forEach(pago=>{
      pagosHtml +=`<tr> `;
      pagosHtml +=`<td>${pago.nombreEmpleado}</td> `;
      pagosHtml +=`<td nowrap>${pago.nombreServicio}</td> `;
      pagosHtml +=`<td nowrap>${pago.fecha}</td> `;
      pagosHtml +=`<td nowrap>${pago.hora}</td> `;
      pagosHtml +=`<td nowrap>${pago.valor}</td> `;
      pagosHtml +=`<td nowrap>${pago.nombre_estado}</td> `;
      pagosHtml +=`</tr> `;
    });
  }
    
    pagosHtml += '</table>'



    Swal.fire({html:pagosHtml, width: '900px'});

  }
   cancelar(){
    this.nuevoEmpleado = new EmpleadoModel( );
   }
   eliminarEmpleado(empleado:EmpleadoModel){}
   getEmpleados(){ 
    this.empleados = []; 
     this.loading.show()
     this.empleadosServices.getEmpleados()
     .subscribe({next: (datos:any)=>{
          console.log(datos);
          
     if (datos.numdata > 0 ){ 
       datos.data!.forEach((dato:any )=>{ 
        this.empleados.push(dato.objeto);
       }) 
       console.log('empleados',this.empleados);
     }else{
       this.empleados = [];
     }
 
         this.loading.hide();
       } ,
       error: error => {this.loading.hide();
         console.log(error)
         Swal.fire('Error Busqueda', error.error.error,  'error');
       }}
       );
   }  
   
  getTipoEmpleado(){ 
    this.tipoEmpleado[0] =   new TiposEmpleadoModule(''); 
    this.loading.show()
    this.empleadosServices.getTiposEmpleados().subscribe(
      {next:(datos:any)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      this.tipoEmpleado = datos.data ; 
      console.log(this.tipoEmpleado);
    }else{
      this.tipoEmpleado = [];
    }

        this.loading.hide()
      } ,
      error: (error : any) => {this.loading.hide();
        console.log(error)
        Swal.fire( error.error.error, '', 'error');
      }}
      );
  }  
  ngOnInit(): void {
  }

}
