import { Component, OnInit } from '@angular/core';
import { ServiciosModule } from 'src/app/models/servicios/servicios.module';
import { TipoVehiculoModule } from 'src/app/models/tipo-vehiculo/tipo-vehiculo.module';
import { TiposServiciosModule } from 'src/app/models/tipos-servicios/tipos-servicios.module';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import Swal from 'sweetalert2';
import { loading } from 'src/app/models/app.loading';
import { VehiculosIngresoServicioModule } from 'src/app/models/vehiculos-ingreso-servicio/vehiculos-ingreso-servicio.module';
import { select } from 'src/app/interfaces/generales.interface';
import { ServiciosCostosModule } from 'src/app/models/servicios-costos/servicios-costos.module';
import { EmpleadoModel } from 'src/app/models/empleados/empleados.module';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { MatDialog } from '@angular/material/dialog';
import { EstablecerCajaComponent } from '../establecer-caja/establecer-caja.component';
import { cajaModel } from 'src/app/models/ventas/cajas.model';
import { cajasServices } from 'src/app/services/Cajas.services';
import { caja } from 'src/app/interfaces/caja.interface';
import { ParametrosModel } from 'src/app/models/parametros/parametros.model';
import { FndClienteComponent } from 'src/app/modules/shared/modals/fnd-cliente/fnd-cliente.component';
import { ClientesModel } from 'src/app/models/clientes/clientes.module';
import { tap } from 'rxjs';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css'],
})
export class IngresoComponent implements OnInit {
  ingreso: VehiculosIngresoServicioModule = new VehiculosIngresoServicioModule(  );
  // serviciosAVehiculos:ServiciosModule[] = [];
  cajaEStablecida: cajaModel = new cajaModel(undefined);

  serviciosAmostrar: any[] = [{ id: 0, nombre: 'Escoger tipoServicio' }];
  serviciosAVehiculos: ServiciosCostosModule[] = [];
  tiposVehiculo: TipoVehiculoModule[] = [];
  tiposServicio: TiposServiciosModule[] = [];
  tipo_servicio: number = 0;
  empleados: EmpleadoModel[] = [];
  constructor(   
    private serviceCaja: cajasServices,
    private newAbrirDialog: MatDialog,
    private VehiculosService: VehiculosService,
    private empleadosServices: EmpleadosService,
    private loading: loading
  ) {
    this.establecerCajaInicialDefault();
    this.getTiposServicios();
    this.getTiposVehiculos();
    this.getEmpleados();
  }
  asignarPropietario(){
    this.ingreso.nombrePropietario = 'voy a buscarlo - perate';
    this.ingreso.propietario = 0 ; 
    this.newAbrirDialog.open(FndClienteComponent,{data:{invoker:'Empleados'} })
    .afterClosed()
    .pipe(
      tap((response: {response:boolean , empleado:ClientesModel})=>{
        if (response.response) {  
          this.ingreso.nombrePropietario =response.empleado.nombreCompleto!;
          this.ingreso.propietario = typeof response.empleado.id === 'string' ? parseInt(response.empleado.id, 10) : response.empleado.id!;
        }
      })
    ).subscribe({
      next: () => {},
      error: (error) => Swal.fire('Error:', error),
      complete: () => console.log('buscarCliente completo')
    });   
    
  }
  //**************************************************************************/
  //*****establecer caja predeterminada cuando esta es una sola**************/
  //**************************************************************************/

  establecerCajaInicialDefault() {
    let cajaAux: cajaModel;
    this.loading.show();
    this.serviceCaja.getCajasActivasYparametros().subscribe(
      (datos: any) => {
        console.log(datos);
        let cont: number;
        if (datos[0].numdata == 1) {
          datos[0].data!.forEach((dato: caja) => {
            cajaAux = new cajaModel(dato);

            this.cajaEStablecida.id = cajaAux.id;
            this.cajaEStablecida.nombre = cajaAux.nombre;
          });
          //console.log('cajas : ' , this.cajas);
        } else if (datos[0].numdata > 0) {
          if (datos[1].numdata > 0) {
            let definir = 0;
            datos[1].data!.forEach((dato: ParametrosModel) => {
              if (dato.cod_parametro === 'CAJA_PREDEFINIDA_PARA_INGRESO') {
                definir = dato.par_numerico!;
              }
            });
            datos[0].data!.forEach((dato: caja) => {
              cajaAux = new cajaModel(dato);
              if (definir === cajaAux.id) {
                this.cajaEStablecida.id = cajaAux.id;
                this.cajaEStablecida.nombre = cajaAux.nombre;
              }
            });
          }
          if(this.cajaEStablecida.id == undefined){
            
          }
        }

        this.loading.hide();
      },

      (error) => {
        this.loading.hide();
        alert(error.error.error);
      }
    );
  }

  //**************************************************************************/
  //*****establecer caja predeterminada cuando esta es una sola**************/
  //**************************************************************************/

  establecerCaja() {
    this.newAbrirDialog
      .open(EstablecerCajaComponent)
      .afterClosed()
      .subscribe((caja: cajaModel) => {
        console.log('caja_seleccionada', caja);
        if (typeof caja != 'undefined') {this.cajaEStablecida = caja;
          this.serviceCaja.asignarCaja(caja);
        }
      });
  }
  generarIngresoApatios() {
    console.log('caja establecida',this.cajaEStablecida)
    if (this.cajaEStablecida == undefined || this.cajaEStablecida.id == undefined) {
      Swal.fire(
        'Debe establecer una caja para asignar el servicio creado',
        '',
        'error'
      );
      this.establecerCaja();
      return;
    }
    if (this.ingreso.lavador === undefined) {
      Swal.fire('Debe escoger el lavador', '', 'error');
      return;
    }
    if (this.ingreso.cod_tipo_vehiculo == undefined) {
      Swal.fire('Debe escoger el tipo de vehiculo', '', 'error');
      return;
    }
    if (this.ingreso.cod_servicio == undefined) {
      Swal.fire('Debe escoger el servicio', '', 'error');
      return;
    }
    if (this.ingreso.propietario == undefined) {
      Swal.fire('Debe ingresar el propietario', '', 'error');
      return;
    } 
    if (this.ingreso.placaVehiculo == undefined) {
      Swal.fire('Debe ingresar la placa del vehiculo', '', 'error');
      return;
    }

    if (this.ingreso.cajaAsignada! > 0 && this.ingreso.idDocumento! > 0) {
      if (this.ingreso.cajaAsignada != this.cajaEStablecida.id) {
        Swal.fire({
          title:
            `La placa a ingresar tiene una factura activa en la caja : "${this.ingreso.nombreCajaAsignada}" ` +
            `, Desea continuar en esta factura o crear una nueva factura en la caja establecida.`,
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          console.log(result);

          if (result.isDismissed) {
            this.ingreso.cajaAsignada = this.cajaEStablecida.id;
            this.ingreso.nombreCajaAsignada = this.cajaEStablecida.nombre;
            this.ingreso.idDocumento = 0;
          }
          console.log(this.ingreso);

          // return;
          this.loading.show();
          this.VehiculosService.guardarNuevoIngresoServicio(
            this.ingreso
          ).subscribe((respuesta: any) => {
            console.log(respuesta);

            if (respuesta.error === 'ok') {
              Swal.fire('datos ingresados con exito');

              this.ingreso.idDocumento = respuesta.idDocumento;
              this.ingreso.valor = 0;
              this.ingreso.cod_servicio = 0;
              this.tipo_servicio = 0;
              this.cancelar();
            } else {
              try {
                Swal.fire(respuesta.error, '', 'error');
              } catch (error: any) {
                Swal.fire('error en el servidor', '', 'error');
              }
            }
            this.loading.hide();
          });
        });
        return;
      }
    } else {
      this.ingreso.cajaAsignada = this.cajaEStablecida.id;
      this.ingreso.nombreCajaAsignada = this.cajaEStablecida.nombre;
    }
    this.loading.show();
    this.VehiculosService.guardarNuevoIngresoServicio(this.ingreso).subscribe(
      (respuesta: any) => {
        console.log(respuesta);

        if (respuesta.error === 'ok') {
          Swal.fire('datos ingresados con exito');
          this.ingreso.idDocumento = respuesta.idDocumento;
          this.ingreso.valor = 0;
          this.ingreso.cod_servicio = 0;
          this.tipo_servicio = 0;
          this.cancelar();
          //this.getServiciosVehiculos();
        } else {
          try {
            Swal.fire(respuesta.error, '', 'error');
          } catch (error: any) {
            Swal.fire('error en el servidor', '', 'error');
          }
        }
        this.loading.hide();
      }
    );
  }

  cancelar() {
    this.ingreso = new VehiculosIngresoServicioModule();
  }

  getEmpleados() {
    this.empleados = [];
    this.loading.show();
    this.empleadosServices.getEmpleadosLavador()
    .subscribe({next:     (datos: any) => {
        console.log(datos);

        if (datos.numdata > 0) {
          datos.data!.forEach((dato: any, index: number) => {
            this.empleados.push(dato.objeto);
          });
          console.log('getEmpleadosLavador - empleados', this.empleados);
        } else {
          this.empleados = [];
        }

        this.loading.hide();
      },error:
      (error) => {
        this.loading.hide();
        console.log('error getEmpleadosLavador',error);
        Swal.fire(error.error.error, '', 'error');
      }}
    );
  }
  validarPlaca() {
    //vw_vehiculos_propietario

    if (this.ingreso.placaVehiculo == undefined) {
      return;
    }
    this.loading.show();
    this.VehiculosService.getVehiculos_propietario(
      this.ingreso.placaVehiculo!
    ).subscribe({next:
      (datos: any) => {
        console.log('getVehiculos_propietario',datos);
        let dato: any = {
          placaVehiculo: '',
          propietario: 0,
          nombrePropietario : '',
          telefono: '',
          cod_tipo_vehiculo: 0,
          idDocumento: 0,
          cajaAsignada: 0,  
          tipoDocumento:0, 
		      nombreCajaAsignada:'',   
		     nombreTipoDoc:'' 
        };

        if (datos.numdata > 0) {
          dato = datos.data[0]; 
        } 
        console.log(dato);
        this.ingreso.propietario = dato.propietario; 
        this.ingreso.nombrePropietario = dato.nombrePropietario; 
        this.ingreso.cod_tipo_vehiculo = dato.cod_tipo_vehiculo;
        this.ingreso.idDocumento = (dato.nombreTipoDoc == 'EnBlanco' ) ? dato.idDocumento:undefined;
        this.ingreso.cajaAsignada =(dato.nombreTipoDoc == 'EnBlanco' ) ? dato.cajaAsignada:undefined;
        this.ingreso.nombreCajaAsignada = (dato.nombreTipoDoc == 'EnBlanco' ) ? dato.nombreCajaAsignada:'';
        this.getServiciosVehiculos();
        this.loading.hide();
      },error:
      (error) => {
        this.loading.hide();
        console.log(error);
        Swal.fire(error.error.error, '', 'error');
      }}
    );
  }

  getTiposServicios() {
    this.tiposServicio = [];
    this.serviciosAVehiculos = [];
    this.tiposVehiculo = [];

    this.tiposServicio[0] = new TiposServiciosModule('', '');
    this.loading.show();
    this.VehiculosService.getTiposServicios().subscribe({next:
      (datos: any) => {
        console.log(datos); 
        if (datos.numdata > 0) {
          this.tiposServicio = datos.data!.map((x:any) => x.obj );
          console.log('tiposervicio' , this.tiposServicio);
        } else {
          this.tiposServicio = [];
        } 
      },error:  (error) => {
        this.loading.hide();
        console.log(error);
        Swal.fire(error.error.error, '', 'error');
      },complete:()=>  this.loading.hide() }
    );
  }

  optenerValor() {
    this.ingreso.valor = 0;
    this.serviciosAVehiculos!.forEach((servicio: ServiciosCostosModule) => {
      if (servicio.cod_servicio == this.ingreso.cod_servicio) {
        this.ingreso.valor = servicio.valor;
      }
    });
    console.log('optener el valor del servicio', this.ingreso);
  }

  mostrarServicioPorTipo() {
    this.ingreso.cod_servicio = 0;
    this.serviciosAmostrar = [{ id: 0, nombre: 'Escoger tipoServicio' }];
    if (this.tipo_servicio <= 0) {
      return;
    }
    let cont = 0;
    console.log('mostrarServicioPorTipo' , this.serviciosAVehiculos, 'tipo de servicio' , this.tipo_servicio )
    this.serviciosAmostrar = this.serviciosAVehiculos.filter(x=>x.tipo_servicio == this.tipo_servicio)
    console.log(this.serviciosAmostrar)
    
  }
  getServiciosVehiculos() {
    this.serviciosAVehiculos = [];
    // alert(this.ingreso.cod_tipo_vehiculo  )
    if (this.ingreso.cod_tipo_vehiculo == undefined) {
      return;
    }
    this.loading.show();
    this.VehiculosService.getServiciosPorTipoVehiculo(
      this.ingreso.cod_tipo_vehiculo
    ).subscribe({next:
      (datos: any) => {
        console.log(datos);

        if (datos.numdata > 0) {
          this.serviciosAVehiculos = datos.data.map( (x:any)=>x.obj!);
          console.log(this.serviciosAVehiculos);
          this.mostrarServicioPorTipo();
        } else {
          this.serviciosAVehiculos = [];
        }

        this.loading.hide();
      },error:
      (error) => {
        this.loading.hide();
        console.log(error);
        Swal.fire(error.error.error, '', 'error');
      }}
    );
  }

  getTiposVehiculos() {
    this.tiposVehiculo = [];
    this.tiposVehiculo[0] = new TipoVehiculoModule('', '');
    this.loading.show();
    this.VehiculosService.geTiposVehiculos().subscribe({next:
      (datos: any) => {
        console.log('geTiposVehiculos', datos);

        if (datos.numdata > 0) {
          this.tiposVehiculo = datos.data  
          console.log(this.tiposVehiculo);
        } else {
          this.tiposVehiculo = [];
        }

        this.loading.hide();
      },error:   (error) => {
        this.loading.hide();
        console.log(error);
        Swal.fire(error.error.error, '', 'error');
      }}
    );
  }

  ngOnInit(): void {
    this.serviceCaja.currentCaja.subscribe({next:(caja)=>  this.cajaEStablecida = (caja!= undefined) ? caja : this.cajaEStablecida })
  }
}
