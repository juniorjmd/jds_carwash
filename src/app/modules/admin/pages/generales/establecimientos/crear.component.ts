import { Component, OnInit } from '@angular/core'; 
import { loading } from 'src/app/models/app.loading';
import { cajasServices } from 'src/app/services/Cajas.services'; 
import { establecimientoModel } from 'src/app/models/ventas/establecimientos.model';
import { Establecimientos } from 'src/app/interfaces/establecimientos.interface';
import { TiposEstablecimientosModel } from 'src/app/models/ventas/tipos-establecimientos.model';
import { TiposEstablecimientos } from 'src/app/interfaces/tipos-establecimientos';
import { MatDialog } from '@angular/material/dialog';
import { TiposEstablComponent } from './tipos-establ.component'; 
import Swal from 'sweetalert2';
import { BodegasModule } from 'src/app/models/bodegas/bodegas.module'; 
import { ModalCntSubCuentasComponent } from '../../../modals/cuentasContables/cnt-sub-cuentas.component';
import { responseSubC } from 'src/app/interfaces/odoo-prd';
import { tap } from 'rxjs';
import { establecimientosRequest } from 'src/app/interfaces/producto-request';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit { 
  
  auxBodega:BodegasModule = {nombre : 'SELECCIONAR LA BODEGA' ,estado:0,   id:0  , descripcion : ''}
  objIni:BodegasModule  = {   estado:0,   id:0  , descripcion : '',  nombre: ''  }   ;
  establecimientos :establecimientoModel[]  = [];
  tiposEsta: TiposEstablecimientosModel[] = [];
  aLocationFisico:BodegasModule = {...this.objIni}   ;
  aLocationPOS:BodegasModule  ={...this.objIni};
  aLocationVirtual:BodegasModule = {...this.objIni};
  locationStore:BodegasModule[]  = [];
  locationPOS:BodegasModule[]  = [];
  locationVirtual:BodegasModule[]  = [];
  newEsta : establecimientoModel = new establecimientoModel(undefined); 
  constructor( private serviceCaja : cajasServices , 
    private newAbrirDialog: MatDialog, 
    private newEstablecimientoDialog : MatDialog ,   
    private loading : loading ) {
      this.Cancelar();
      this.getTiposEstablecimiento(); 
     this.getLocacionPrincipales();
    
  }
  buscarCuentasContables(nombreBusqueda:string){
    this.newAbrirDialog.open(ModalCntSubCuentasComponent, { data:  null })
    .afterClosed() 
    .pipe(
      tap((response: responseSubC) => {
        console.log('buscarCuentasContablesGastos',response);
        if (response.confirmado && response.datoDevolucion !== undefined ) {  
          switch(nombreBusqueda){
            case'cajaGeneral':
            this.newEsta.nombreCCntCajaGeneral = response.datoDevolucion.nombre_scuenta!;
            this.newEsta.idCCntCajaGeneral = response.datoDevolucion.id_scuenta!; 
            break
            case 'IDifBonoRegalo':  
            this.newEsta.nombreCCntIngDifBonoRegalo = response.datoDevolucion.nombre_scuenta!;
            this.newEsta.idCCntIngDifBonoRegalo = response.datoDevolucion.id_scuenta!; 
            break
            case 'retefuente' : 
            this.newEsta.nombreCCntCompras = response.datoDevolucion.nombre_scuenta!;
            this.newEsta.idCCntCompras = response.datoDevolucion.id_scuenta!; 
            break
            case 'cuentasPorPagar' :  
            this.newEsta.nombreCCntCPagar = response.datoDevolucion.nombre_scuenta!;
            this.newEsta.idCCntCPagar = response.datoDevolucion.id_scuenta!; 
            break
            case 'cuentasPorCobrar' : 
            this.newEsta.nombreCCntCCobrar = response.datoDevolucion.nombre_scuenta!;
            this.newEsta.idCCntCCobrar = response.datoDevolucion.id_scuenta!; 
            break 
            case 'ivaEnCompras' : 
            this.newEsta.nombreCCntIvaCompra = response.datoDevolucion.nombre_scuenta!;
            this.newEsta.idCCntIvaCompra = response.datoDevolucion.id_scuenta!; 
            break 
            case 'ivaEnVenta' : 
            this.newEsta.nombreCCnttIvaVenta = response.datoDevolucion.nombre_scuenta!;
            this.newEsta.idCCnttIvaVenta = response.datoDevolucion.id_scuenta!; 
            break

            case 'costoEnVenta' : 
            this.newEsta.nombreCCntCostoVenta = response.datoDevolucion.nombre_scuenta!;
            this.newEsta.idCCntCostoVenta = response.datoDevolucion.id_scuenta!; 
            break
            case 'venta' : 
            this.newEsta.nombreCCntVentas = response.datoDevolucion.nombre_scuenta!;
            this.newEsta.idCCntVenta = response.datoDevolucion.id_scuenta!; 
            break

          }
        }  
      })
    ).subscribe({
      next: () => {},
      error: (error) => console.error('Error:', error),
      complete: () => console.log('buscarCuentasContables completo')
    }); 
  }
  asignarLocation( b:BodegasModule){
    console.log("asignar datos al elemento",b) 
      this.newEsta.idAuxiliar =   (typeof ( b.id! ) === 'number'  )? b.id! : parseInt(b.id!) ;
      this.newEsta.nombreAuxiliar =   b.nombre ;  
      this.newEsta.idBodegaStock =   (typeof ( b.id! ) === 'number'  )? b.id! : parseInt(b.id!) ;
      this.newEsta.NameBodegaStock =   b.nombre ;  
      this.newEsta.idBodegaVitual =    (typeof ( b.id! ) === 'number'  )? b.id! : parseInt(b.id!) ;
      this.newEsta.NameBodegaVirtual =   b.nombre ;  
   
  }
  getLocacionPrincipales(){
this.locationStore = [this.auxBodega];
    this.serviceCaja.getBodegasDisponibles()
    .subscribe({next:     (datos:any)=>{
        console.log(datos);
        this.locationStore = [];   
        this.locationPOS   = [];
      this.locationVirtual  = [];
   if (datos.numdata > 0 ){  
            this.locationStore = datos.data!.map((x:any)=>x.obj) 
            this.locationStore.unshift(this.auxBodega);  
     console.log("this.locationStore" , this.locationStore) 
     this.newEsta.tipo = 0;
     this.newEsta.estado = 0;
    }else{
      this.locationStore   = [this.auxBodega];   }
       this.loading.hide()
     } ,error:    error => {this.loading.hide();
       
   this.locationStore = [];
       Swal.fire('error getLocacionPrincipales' , error.error.error);
      } }
     );
  }
  mantenerTiposEsta(){
    this.newEstablecimientoDialog.open(TiposEstablComponent,{data:null})
    .afterClosed()
    .subscribe((confirmado: Boolean)=>{
     // if (confirmado){ 
      this.getTiposEstablecimiento(); 
    //}
    })
  }
  Cancelar(){
    this.newEsta =  new establecimientoModel(undefined);
  this.aLocationFisico = this.objIni   ;
  this.aLocationPOS   = this.objIni   ;  
  this.aLocationVirtual  = this.objIni   ;
     
  }
  getEstablecimiento(){ 
    this.serviceCaja.getAllEstablecimientos()
     .subscribe({next:   (datos:establecimientosRequest )=>{
         console.log(datos);   
    if (datos.numdata > 0 ){ 
      this.establecimientos = datos.data??[];
      this.serviceCaja.asignarEstablecimientos(datos.data);
      console.log(this.establecimientos);
      this.newEsta.tipo = 0;
      this.newEsta.estado = 0;
    }

        this.loading.hide()
      } , error:    error => {this.loading.hide();
        
    this.establecimientos = [];
        Swal.fire( error.error.error);
      }}
      );
  }

  
  getTiposEstablecimiento(){ 
    this.serviceCaja.getTiposEstablecimientos()
     .subscribe({next:  (datos:any)=>{
         console.log(datos);
         this.tiposEsta = [];   
    if (datos.numdata > 0 ){ 
      
      datos.data!.forEach((dato:TiposEstablecimientos , index:number )=>{
        this.tiposEsta[index] = new TiposEstablecimientosModel( dato );
      }) 
      console.log(this.tiposEsta);
    }

        this.loading.hide()
      } ,error:  error => {this.loading.hide(); 
        this.tiposEsta = [];
        Swal.fire( error.error.error);
      }}
      );
  }

  
  setActualizaCaja(estaActualiza : establecimientoModel){
    this.Cancelar();
    this.newEsta = {...estaActualiza} ;   
    this.aLocationFisico = this.locationStore.filter(x=>{x.id== estaActualiza.idBodegaStock})[0] !;
 
  }
  ngOnInit(): void {
    this.serviceCaja.currentArrEsta.subscribe({next:(esta)=>{
      if(esta){this.establecimientos =  esta}
    }})
  }
  guardarCaja(){
   console.log('nueva caja',this.newEsta.nombre)
   if (typeof(this.newEsta.nombre) === 'undefined'){
    this.loading.hide();
    Swal.fire('Debe ingresar el Nombre del establecimiento');
    return;
   }
   if (typeof(this.newEsta.descripcion) === 'undefined'){
    this.newEsta.descripcion = this.newEsta.nombre ;
   }else{
    if ( this.newEsta.descripcion.trim() === ''){
      this.newEsta.descripcion = this.newEsta.nombre ;
     }
   }

   console.log('this.newEsta.idAuxiliar : '+this.newEsta.idAuxiliar,'this.newEsta.tipo '+this.newEsta.tipo )
   if(this.newEsta.tipo == 1) {
  
   if ( this.newEsta.idAuxiliar  ==  0 ){
    this.loading.hide();
    Swal.fire('Debe seleccionar la locacion fisica a la que pertenece');
    return;
   }
   
   if ( this.newEsta.idBodegaStock  == 0 ){
    this.loading.hide();
    Swal.fire('Debe seleccionar la locacion POS a la que pertenece');
    return;
   }
   if ( this.newEsta.idBodegaVitual == 0 ){
    this.loading.hide();
    Swal.fire('Debe seleccionar la locacion virtual a la que apuntara el establecimiento');
    return;
   }}
   this.loading.show(); 
 
   this.serviceCaja.setEstablecimiento(this.newEsta).subscribe(
    (respuesta:any)=>{console.log(respuesta)
     
    if (respuesta.error === 'ok'){
      Swal.fire('datos ingresados con exito');  
      this.newEsta =  new establecimientoModel(undefined);
      this.getEstablecimiento();
    }else{
      Swal.fire(respuesta.error);
      this.loading.hide();
    }
    }

   )
  }


}
