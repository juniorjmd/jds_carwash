import { Component, OnInit } from '@angular/core';
import { TiposServiciosModule } from 'src/app/models/tipos-servicios/tipos-servicios.module';
import Swal from 'sweetalert2';

import { loading } from 'src/app/models/app.loading';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { select } from 'src/app/interfaces/generales.interface';
@Component({
  selector: 'app-tipos-servicios',
  templateUrl: './tipos-servicios.component.html',
  styleUrls: ['./tipos-servicios.component.css'],
})
export class TiposServiciosComponent implements OnInit {
  tiposServicio: TiposServiciosModule[] = [];
  newTipoServicio: TiposServiciosModule = new TiposServiciosModule('', '' );

  constructor(
    private VehiculosService: VehiculosService,
    private loading: loading
  ) {
    this.getTiposServicios();
  }

  public setActualizatipo_servicio(tipo: TiposServiciosModule) {
    this.newTipoServicio = tipo;
  }

  public borrarTipoVehiculo(tipo: TiposServiciosModule) {
    Swal.fire({
      title: `Seguro que quiere borrar el tipo de vehiculo "${tipo.nombre}"`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.VehiculosService.eliminarTiposServicios(tipo).subscribe(
          (respuesta: any) => {
            console.log(respuesta);
            if (respuesta.error === 'ok') {
              this.getTiposServicios();
              Swal.fire('Elemento eliminado con exito!', '', 'success');
            }
          }
        );
      }
    });
  }

  getTiposServicios() {
    this.tiposServicio[0] = new TiposServiciosModule('', '' );
    this.loading.show();
    this.VehiculosService.getTiposServicios().subscribe({
      next: (datos: any) => {
        console.log(datos);
        if (datos.numdata > 0) { 
          
          this.tiposServicio = datos.data!.map((x:any)=> x.obj);
          
          console.log(this.tiposServicio);
        } else {
          this.tiposServicio = [];
        }

        this.loading.hide();
      },
      error: (error: any) => {
        this.loading.hide();
        console.log(error);
        Swal.fire(error.error.error, '', 'error');
      },
    });
  }

  manageTipoVehiculo(): boolean {
    if (this.newTipoServicio.nombre.trim() === '') {
      alert('Debe ingresar el nombre del tipo');
      return false;
    }
    if (this.newTipoServicio.estado === 0) {
      alert('Debe escoger el estado del tipo');
      return false;
    }

    this.loading.show();
    this.VehiculosService.guardarTiposServicios(this.newTipoServicio).subscribe(
      (respuesta: any) => {
        console.log(respuesta);

        if (respuesta.error === 'ok') {
          Swal.fire('datos ingresados con exito');
          this.newTipoServicio = new TiposServiciosModule('', '');
          this.getTiposServicios();
        } else {
          Swal.fire(respuesta.error, '', 'error');
        }
        this.loading.hide();
      }
    );
    return true;
  }

  cancelar() {
    this.newTipoServicio = new TiposServiciosModule('', '' );
  }

  ngOnInit(): void {}
}
