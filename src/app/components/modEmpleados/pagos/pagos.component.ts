import { Component, OnInit } from '@angular/core';
import { EmpleadosModule } from 'src/app/models/empleados/empleados.module';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { loading } from 'src/app/models/app.loading';  
import { fechaBusqueda, select } from 'src/app/interfaces/generales.interface';
import Swal from 'sweetalert2'; 
import { AcumuladosEmpleadosModule } from 'src/app/models/acumulados-empleados/acumulados-empleados.module';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  valorAnticipo:number = 0; descripcionAticipo:string='';
  indexEmpleado:number = 0;
  empleado :EmpleadosModule = new EmpleadosModule();
  empleados :EmpleadosModule[] = [this.empleado];
  empleadosConAcumulados :EmpleadosModule[] = [];
  acumulado:AcumuladosEmpleadosModule[] = [] ; 
  listaAcumulados:any = [this.acumulado];

  fechasBusqueda:fechaBusqueda[] = [{
    fechaInicio:Date(),
    fechaFin:Date()}]
  ;
  constructor(private empleadosServices :EmpleadosService ,  private loading : loading ) { 
   this.getEmpleados();
  }
  generarAticipo(){
    if(this.empleado.id <= 0){Swal.fire('Es necesario escoger un empleado para generar el anticipo','')
      return;
    }
    if(this.valorAnticipo <= 0){Swal.fire('Es necesario ingresar un valor mayor a cero para generar el anticipo','')
      return;
    }
    if(this.descripcionAticipo.trim() == ''){Swal.fire('Es necesario ingresar la descripcion para generar el anticipo','')
      return;
    }

    
this.loading.show(); 
this.empleadosServices.guardarAnticipoEmpleado(this.empleado, this.valorAnticipo , this.descripcionAticipo.trim()).subscribe(
 (respuesta:any)=>{console.log(respuesta)
  
 if (respuesta.error === 'ok'){
  Swal.fire('datos ingresados con exito');  
  this.valorAnticipo =0 ;
  this.descripcionAticipo = '';
  this.getEmpleados();
 }else{ 
  Swal.fire(respuesta.error, '', 'error');
 }
 this.loading.hide(); 
 })
  }
  validarValor(index ){ 
  console.log(
    this.empleadosConAcumulados[index] ) ;
    /*,item.maximoDescuento, item.valorADescontarEnPago*/
    if( this.empleadosConAcumulados[index].valorADescontarEnPago < 0 ){
      this.empleadosConAcumulados[index].valorADescontarEnPago  = 0;
    }
    if( this.empleadosConAcumulados[index].valorADescontarEnPago >  this.empleadosConAcumulados[index].maximoDescuento  ){
      this.empleadosConAcumulados[index].valorADescontarEnPago  =  this.empleadosConAcumulados[index].maximoDescuento;
    }
  }

  validarElPago(empleado:EmpleadosModule, index:number , fechas:fechaBusqueda){
   let pagosHtml:string =  `<h1>empleado :${empleado.nombreCompleto}</h1><hr>
   pago de la liquidacion desde el <b>${fechas.fechaInicio}</b> al <b>${fechas.fechaFin}</b><hr>
   <h3>total acumulado : <b>${empleado.TotalAcumuladoPendientes} </b> menos de anticipos <b> ${empleado.valorADescontarEnPago}</b></h3> <hr>
    total a Pagar : <h3><b>${empleado.TotalAcumuladoPendientes - empleado.valorADescontarEnPago}</b></h3> 
   `; 
  Swal.fire({html:pagosHtml, width: '900px', showConfirmButton:true, confirmButtonText:'Pagar' ,cancelButtonColor:'red', cancelButtonText :'Cancelar',showCancelButton:true}).then(value=>{
    console.log(value);
    if(value.isConfirmed){
      this.generarPago(empleado, index , fechas);
    }
  });
  }
  generarPago(Empleado:EmpleadosModule, index:number , fechas:fechaBusqueda){
this.loading.show(); 
this.empleadosServices.guardarPagoEmpleado(Empleado , fechas).subscribe(
 (respuesta:any)=>{console.log(respuesta)
  
 if (respuesta.error === 'ok'){
  Swal.fire('datos ingresados con exito');  
  this.getEmpleados();
 }else{ 
  Swal.fire(respuesta.error, '', 'error');
 }
 this.loading.hide(); 
 })

  }

  validarEmpleado(){
    this.empleado = this.empleados[this.indexEmpleado]
    console.log('empleado',this.empleado);
    
  }
  getEmpleados(){  
     
  this.empleado  = new EmpleadosModule(); 
    this.empleados = [this.empleado];
    this.empleadosConAcumulados = [];  
    let contAcumulados = 0;
    let empleadosAux :EmpleadosModule = new EmpleadosModule(); 
     this.loading.show()
     this.empleadosServices.getEmpleados().subscribe(
       (datos:select)=>{
          console.log(datos);
          
     if (datos.numdata > 0 ){ 
       datos.data.forEach((dato:any , index )=>{ 
        this.empleados.push(dato.objeto);
        empleadosAux = dato.objeto;
        if(empleadosAux.numeroAcumuladosPendientes > 0 ){
          empleadosAux.valorADescontarEnPago =  empleadosAux.maximoDescuento  
            this.empleadosConAcumulados.push(empleadosAux);
            this.fechasBusqueda[contAcumulados].fechaFin = empleadosAux.fechaMaximaAcumulados ; 
            this.fechasBusqueda[contAcumulados].fechaInicio = empleadosAux.fechaMinimaAcumulados ;  
        }
        if(this.indexEmpleado>0){
          this.empleado  = this.empleados[this.indexEmpleado] ;  
        }
       }) 
       console.log('empleados',this.empleados);
     }else{
       this.empleados = [];
     }
 
         this.loading.hide();
       } ,
       error => {this.loading.hide();
         console.log(error)
         Swal.fire( error.error.error, '', 'error');
       }
       );
   }  
   
  removeGetActivo(a:string){
    console.log(a);
    $('.likcontPrd').each(function(){
       $(this).removeClass('active')
    }) ;
    
    $('#'+a ).addClass('active') 
    $('.contPrd').css('display' , 'none')
    const elemDiv = document.getElementById(a.trim()+'Div') 
    elemDiv.style.display = 'block'
  }

liquidarPagos(auxiliar:EmpleadosModule , index , fechas:{  fechaInicio:Date,fechaFin:Date }){
  this.acumulado = [] ;  
  let porcDescMaximo : number = 0;
  let totalValorAcumulado : number = 0;
   this.loading.show()
   this.empleadosServices.getEmpleadosAcumulados(auxiliar.id ,fechas ).subscribe(
     (datos:select)=>{
        
   if (datos.numdata > 0 ){ 
    
     datos.data.forEach((dato:any  )=>{  
      totalValorAcumulado += parseFloat(dato.valor);
      if (porcDescMaximo <= 0)  porcDescMaximo = dato.porcDescMaximo ;

      this.acumulado.push(dato.obj); 
    
     })    }
     this.listaAcumulados[index] = this.acumulado; 
     this.empleadosConAcumulados[index].TotalAcumuladoPendientes = totalValorAcumulado ; 
     totalValorAcumulado =   Math.round(totalValorAcumulado * (porcDescMaximo / 100 )  * 10) / 10 ; 
     
     
     this.empleadosConAcumulados[index].maximoDescuento =  totalValorAcumulado;
     this.empleadosConAcumulados[index].valorADescontarEnPago =  totalValorAcumulado;
     //console.log('empleado final',this.empleadosConAcumulados[index]);

       this.loading.hide();
     } ,
     error => {this.loading.hide();
       console.log(error)
       Swal.fire( error.error.error, '', 'error');
     }
     );
}
  
  ngOnInit(): void {
    this.removeGetActivo('liquidarAcumuladosLink');
  }


}
