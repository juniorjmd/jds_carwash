import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cajaRequest, categoriaRequest, cntClaseRequest, cntCuentaMayorRequest, cntGrupoRequest, cntSubCuentaRequest, empleadoRequest, establecimientosRequest, marcaRequest } from 'src/app/interfaces/producto-request';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { cajasServices } from 'src/app/services/Cajas.services';
import { CntContablesService } from 'src/app/services/cntContables.service';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { LoginService } from 'src/app/services/login.services';
import { ProductoService } from 'src/app/services/producto.service';
import { usuarioService } from 'src/app/services/usuario.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario?:Usuario
  constructor(
    private _servProducto:ProductoService,
    private _ServLogin : LoginService,
    private inicioService:DatosInicialesService ,
    private cntService:CntContablesService ,  
    private serviceCaja:cajasServices , 
    private _Router: Router , private usuarioService:usuarioService,  
  ) { 

    const height = window.innerHeight;
    //alert(height)
  }

    

  print() {
    const printContent = document.getElementById('print-section');
    const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')!;
    WindowPrt.document.write(printContent!.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.addEventListener('afterprint', () => {
      WindowPrt.close();
    });
    WindowPrt.print();
  }
  ngOnInit(): void {
    this.inicioService.getVendedores().subscribe({next: (datos:empleadoRequest) =>{
      this.inicioService.setArrayVendedores(datos.data)
    },error:error=>Swal.fire(JSON.stringify(error))
    })
    this.inicioService.getDatosIniSucursal().subscribe({next :  (data:any)=>{
       data;
      this.inicioService.chageSucursal(data[0])
      //console.log('sucursal',data[0]);
    } ,
    error: error => {
      Swal.fire(JSON.stringify(error))
       
    }}
      ); 
    
     
      this.serviceCaja.getCuentasContablesEstablecimientoUsuario().subscribe({next:(value:cajaRequest)=>{
        //console.log('getCuentasContablesEstablecimientoUsuario' , value) 

          this.inicioService.validarCuentasContablesEstablecimiento(value.data[0] )  
          
      }, error: error => {
        Swal.fire('getCuentasContablesEstablecimientoUsuario', JSON.stringify(error))
         
      }})
    

    this.getUsuarioLogeado(); 



    this._servProducto.getCategorias().subscribe({next:(datos:categoriaRequest)=>{ 
      this._servProducto.asignarCategorias(datos.data.map((x:any)=>x.obj) ) 
   }, error : (e)=>Swal.fire(JSON.stringify(e))})

    this._servProducto.getMarcas().subscribe({next:(datos:marcaRequest)=>{ 
      this._servProducto.asignarMarcas(datos.data ) 
   }, error : (e)=>Swal.fire(JSON.stringify(e))})
    
    this.cntService.getCntCuentasMayores().subscribe({next:(value:cntCuentaMayorRequest)=>{  
      //console.log("getCntCuentasMayores",value )
      this.cntService.changeCuentasM(value.data); 
    },error : (e)=>Swal.fire(JSON.stringify(e))})
    
    this.cntService.getCntGrupos().subscribe({
      next:(value:cntGrupoRequest)=>{ 
      this.cntService.changeGrupo(value.data); 
      //console.log("getCntGrupos",value.data )

    },error : (e)=>Swal.fire(JSON.stringify(e))})

    this.cntService.getCntCuentas().subscribe({
      next:(value:cntSubCuentaRequest)=>{ 
      this.cntService.changeSubCuenta(value.data); 
      //console.log("getCntCuentas",value.data )

    },error : (e)=>Swal.fire(JSON.stringify(e))})


    this.cntService.getCntClases().subscribe({next:(value:cntClaseRequest)=>{ 
      this.cntService.changeClase(value.data); 
      //console.log("getCntClases",value.data )

    },error : (e)=>Swal.fire(JSON.stringify(e))})


    this.cntService.getCntClases().subscribe({next:(value:cntClaseRequest)=>{ 
      this.cntService.changeClase(value.data); 
      //console.log("getCntClases",value.data )

    },error : (e)=>Swal.fire(JSON.stringify(e))})

    this.serviceCaja.getEstablecimientos()
    .subscribe({next: (datos:establecimientosRequest)=>{
        //console.log('datos establecimientosRequest',datos); 
       if (datos.numdata > 0 ){ 
        this.serviceCaja.asignarEstablecimientos( datos.data??null);  
       } 
     } , error:   error => {  Swal.fire(JSON.stringify(error))  
     }}
     );

    // Aquí deberías cargar los datos de `cnt_cuenta` desde el servicio correspondiente
    
  }

  getUsuarioLogeado() {
     
    this._ServLogin.getUsuarioLogeadoAsync().subscribe({next:(datos)=>{
     
    this.usuario = datos.data.usuario;   
    this.usuarioService.changeUsuario(this.usuario); // Actualiza con el usuario logueado

    },error: (error: any) => { 
      Swal.fire('getUsuarioLogeadoAsync',JSON.stringify(error))
    this._Router.navigate(['login']);
  }})  
}

}
