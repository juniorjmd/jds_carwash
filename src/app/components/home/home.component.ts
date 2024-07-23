import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cajaRequest, categoriaRequest, cntClaseRequest, cntCuentaMayorRequest, cntGrupoRequest, cntSubCuentaRequest, establecimientosRequest, marcaRequest } from 'src/app/interfaces/producto-request';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { cajasServices } from 'src/app/services/Cajas.services';
import { CntContablesService } from 'src/app/services/cntContables.service';
import { DatosInicialesService } from 'src/app/services/DatosIniciales.services';
import { LoginService } from 'src/app/services/login.services';
import { ProductoService } from 'src/app/services/producto.service';
import { usuarioService } from 'src/app/services/usuario.services';

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
  ) { }

    

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
    
    this.inicioService.getDatosIniSucursal().subscribe({next :  (data:any)=>{
       data;
      this.inicioService.chageSucursal(data[0])
      console.log('sucursal',data[0]);
    } ,
    error: error => {
      console.error(error.error.error)
      alert( error.error.error)
    }}
      ); 
    
     
      this.serviceCaja.getCuentasContablesEstablecimientoUsuario().subscribe({next:(value:cajaRequest)=>{
        console.log('getCuentasContablesEstablecimientoUsuario' , value) 

          this.inicioService.validarCuentasContablesEstablecimiento(value.data[0] )  
          
      }})
    

    this.getUsuarioLogeado(); 



    this._servProducto.getCategorias().subscribe({next:(datos:categoriaRequest)=>{ 
      this._servProducto.asignarCategorias(datos.data.map((x:any)=>x.obj) ) 
   }, error : (e)=>console.error(e.error.error)})

    this._servProducto.getMarcas().subscribe({next:(datos:marcaRequest)=>{ 
      this._servProducto.asignarMarcas(datos.data ) 
   }, error : (e)=>console.error(e.error.error)})
    
    this.cntService.getCntCuentasMayores().subscribe({next:(value:cntCuentaMayorRequest)=>{  
      console.log("getCntCuentasMayores",value )
      this.cntService.changeCuentasM(value.data); 
    },error : (e)=>console.error(e.error.error)})
    
    this.cntService.getCntGrupos().subscribe({
      next:(value:cntGrupoRequest)=>{ 
      this.cntService.changeGrupo(value.data); 
      console.log("getCntGrupos",value.data )

    },error : (e)=>console.error(e.error.error)})

    this.cntService.getCntCuentas().subscribe({
      next:(value:cntSubCuentaRequest)=>{ 
      this.cntService.changeSubCuenta(value.data); 
      console.log("getCntCuentas",value.data )

    },error : (e)=>console.error(e.error.error)})


    this.cntService.getCntClases().subscribe({next:(value:cntClaseRequest)=>{ 
      this.cntService.changeClase(value.data); 
      console.log("getCntClases",value.data )

    },error : (e)=>console.error(e.error.error)})


    this.cntService.getCntClases().subscribe({next:(value:cntClaseRequest)=>{ 
      this.cntService.changeClase(value.data); 
      console.log("getCntClases",value.data )

    },error : (e)=>console.error(e.error.error)})

    this.serviceCaja.getEstablecimientos()
    .subscribe({next: (datos:establecimientosRequest)=>{
        console.log('datos establecimientosRequest',datos); 
       if (datos.numdata > 0 ){ 
        this.serviceCaja.asignarEstablecimientos( datos.data??null);  
       } 
     } , error:   error => {  
       alert( error.error.error);
     }}
     );

    // Aquí deberías cargar los datos de `cnt_cuenta` desde el servicio correspondiente
    
  }

  getUsuarioLogeado() {
     
    this._ServLogin.getUsuarioLogeadoAsync().subscribe({next:(datos)=>{
     
    this.usuario = datos.data.usuario;   
    this.usuarioService.changeUsuario(this.usuario); // Actualiza con el usuario logueado

    },error: (error: any) => { 
    console.log(error);
    alert(error.error.error);
    this._Router.navigate(['login']);
  }})  
}

}
