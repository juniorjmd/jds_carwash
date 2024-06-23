import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { loading } from 'src/app/models/app.loading';
import { TipoVehiculoModule } from '../models/tipo-vehiculo/tipo-vehiculo.module';
import { Usuarios } from '../interfaces/usuario.interface';
import { actions } from '../models/app.db.actions';
import { TABLA } from '../models/app.db.tables';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { UsuarioModel } from '../models/usuario.model';
import { TiposServiciosModule } from '../models/tipos-servicios/tipos-servicios.module';
import { ServiciosModule } from '../models/servicios/servicios.module';
import { procedure } from '../models/app.db.procedure';
import { ServiciosCostosModule } from '../models/servicios-costos/servicios-costos.module';
import { VehiculosIngresoServicioModule } from '../models/vehiculos-ingreso-servicio/vehiculos-ingreso-servicio.module';

@Injectable({
  providedIn: 'root',
})
export class VehiculosService {
  constructor(private http: HttpClient, private loading: loading) {
    console.log('servicios usuarios inicializado');
  }
  //---------------------------------------------------------------------------
  //servicios de costos de servicios
  //---------------------------------------------------------------------------

  getCostosServicios(codServicio: number) {
    let where = [{ columna: 'cod_servicio', tipocomp: '=', dato: codServicio }];
    let datos = {
      action: actions.actionSelect,
      _tabla: vistas.vehiculos_servicios_costos,
      _where: where,
    };
    console.log(
      'servicios de costo servicio activo - getCostosServicios',
      url.action,
      datos,
      httpOptions()
    );
    return this.http.post(url.action, datos, httpOptions());
  }
  eliminarCostosServicios(oldTipoVh: ServiciosCostosModule) {
    let where = [{ columna: 'id', tipocomp: '=', dato: oldTipoVh.id }];
    let datos = {
      action: actions.actionDelete,
      _tabla: TABLA.vehiculos_servicios_costos,
      _where: where,
    };
    return this.http.post(url.action, datos, httpOptions());
  }

  guardarNuevoIngresoServicioold(nuevoTipo: VehiculosIngresoServicioModule) {
    let arrayDatos: any = new Object();
    let where: any[] = [];
    //id, cod_servicio, cod_tipo_vehiculo, valor, estado
    arrayDatos['placaVehiculo'] = nuevoTipo.placaVehiculo;
    arrayDatos['cod_servicio'] = nuevoTipo.cod_servicio;
    arrayDatos['propietario'] = nuevoTipo.propietario;
    arrayDatos['telefono'] = nuevoTipo.telefono;
    arrayDatos['cod_tipo_vehiculo'] = nuevoTipo.cod_tipo_vehiculo;
    arrayDatos['lavador'] = nuevoTipo.lavador;
    arrayDatos['cajaAsignada'] = nuevoTipo.cajaAsignada;
    arrayDatos['valor'] = nuevoTipo.valor;
    arrayDatos['idDocumento'] = nuevoTipo.idDocumento;

    /************************************************/
    let datos = {
      action: actions.actionInsertarDocumentoPorServicioIngresado,
      _arraydatos: arrayDatos,
      _where: null,
    };

    console.log(
      'servicios de creacion servicios de vehiculos activo',
      url.action,
      datos,
      httpOptions()
    );
    return this.http.post(url.action, datos, httpOptions());
  }

  //-------------------------

  guardarNuevoIngresoServicio(nuevoTipo: VehiculosIngresoServicioModule) {
    let arrayDatos: any = new Object();
    let where: any[] = [];
    //id, cod_servicio, cod_tipo_vehiculo, valor, estado
    arrayDatos['placaVehiculo'] = nuevoTipo.placaVehiculo;
    arrayDatos['cod_servicio'] = nuevoTipo.cod_servicio;
    arrayDatos['propietario'] = nuevoTipo.propietario;
    arrayDatos['telefono'] = nuevoTipo.telefono;
    arrayDatos['cod_tipo_vehiculo'] = nuevoTipo.cod_tipo_vehiculo;
    arrayDatos['lavador'] = nuevoTipo.lavador;
    arrayDatos['cajaAsignada'] = nuevoTipo.cajaAsignada;
    arrayDatos['valor'] = nuevoTipo.valor;
    arrayDatos['idDocumento'] = nuevoTipo.idDocumento;
    /************************************************/
    let datos = {
      action: actions.actionInsertarDocumentoPorServicioIngresado,
      _tabla: TABLA.vehiculos_servicios_costos,
      _arraydatos: arrayDatos,
      _where: null,
    };

    console.log(
      ' servicios de vehiculos activo guardarNuevoIngresoServicio',
      url.action,
      datos,
      httpOptions()
    );
    return this.http.post(url.action, datos, httpOptions());
  }
  //-----------------------
  guardarCostoServicio(nuevoTipo: ServiciosCostosModule) {
    console.log('costo a guardar', nuevoTipo);
    let arrayDatos: any = new Object();
    let where: any[] = [];
    //id, cod_servicio, cod_tipo_vehiculo, valor, estado
    arrayDatos['cod_servicio'] = nuevoTipo.cod_servicio;
    arrayDatos['cod_tipo_vehiculo'] = nuevoTipo.cod_tipo_vehiculo;
    arrayDatos['valor'] = nuevoTipo.valor;
    arrayDatos['estado'] = nuevoTipo.estado;
    let datos = {
      action: actions.actionInsert,
      _tabla: TABLA.vehiculos_servicios_costos,
      _tablaSelect: '',
      _arraydatos: arrayDatos,
      _where: new Array(),
      _deleteBefore: new Array(),
    };

    if (nuevoTipo.cod_tipo_vehiculo == 999999999) {
      arrayDatos['cod_servicio'] = [nuevoTipo.cod_servicio, 'int'];
      arrayDatos['cod_tipo_vehiculo'] = [nuevoTipo.cod_tipo_vehiculo, 'int'];
      arrayDatos['valor'] = [nuevoTipo.valor, ''];
      arrayDatos['estado'] = [nuevoTipo.estado, 'int'];
      arrayDatos['cod_tipo_vehiculo'] = ['id', 'tabla'];
      datos = {
        action: actions.actionInsertSelect,
        _tabla: TABLA.vehiculos_servicios_costos,
        _tablaSelect: TABLA.tiposVehiculos,
        _arraydatos: arrayDatos,
        _where: [],
        _deleteBefore: [['cod_servicio', '=', nuevoTipo.cod_servicio]],
      };
    }
    if (typeof nuevoTipo.id !== 'undefined') {
      //actualiza
      where = [{ columna: 'id', tipocomp: '=', dato: nuevoTipo.id }];
      datos._where = where;
      datos.action = actions.actionUpdate;
    }

    console.log(
      'servicios de creacion servicios de vehiculos activo',
      url.action,
      datos,
      httpOptions()
    );
    return this.http.post(url.action, datos, httpOptions());
  }

  //---------------------------------------------------------------------------
  //servicios de servicios
  //---------------------------------------------------------------------------

  getServicios() {
    let datos = {
      action: actions.actionSelect,
      _tabla: vistas.vehiculos_servicios,
    };
    console.log(
      'servicios de usuarios activo - getUsuarios',
      url.action,
      datos,
      httpOptions()
    );
    return this.http.post(url.action, datos, httpOptions());
  }

  getVehiculoNoAsignadoAServicios(codServicio: number) {
    let arraydatos = {
      idServicio: codServicio,
    };
    let datos = {
      action: actions.actionProcedure,
      _procedure: procedure.getTiposVehiculosNoAsignadoAservicio,
      _arraydatos: arraydatos,
    };
    console.log(
      'servicios de usuarios activo - getUsuarios',
      url.action,
      datos,
      httpOptions()
    );
    return this.http.post(url.action, datos, httpOptions());
  }

  getServiciosPorTipo(tipo: number) {
    let where = [{ columna: 'tipo_servicio', tipocomp: '=', dato: tipo }];
    let datos = {
      action: actions.actionSelect,
      _tabla: vistas.vehiculos_servicios,
      _where: where,
    };
    console.log(
      'servicios de usuarios activo - getUsuarios',
      url.action,
      datos,
      httpOptions()
    );
    return this.http.post(url.action, datos, httpOptions());
  }

  getServiciosPorTipoVehiculo(tipo: number) {
    let where = [{ columna: 'cod_tipo_vehiculo', tipocomp: '=', dato: tipo }];
    let datos = {
      action: actions.actionSelect,
      _tabla: vistas.vehiculos_servicios_costos,
      _where: where,
    };
    console.log(
      'servicios de usuarios activo - getUsuarios',
      url.action,
      datos,
      httpOptions()
    );
    return this.http.post(url.action, datos, httpOptions());
  }

  getVehiculos_propietario(tipo: string) {
    let where = [{ columna: 'placaVehiculo', tipocomp: '=', dato: tipo }];
    let datos = {
      action: actions.actionSelect,
      _tabla: vistas.vehiculos_propietario,
      _where: where,
    };
    console.log(
      'servicios de VEHICULOS activo - getVehiculos_propietario',
      url.action,
      datos,
      httpOptions()
    );
    return this.http.post(url.action, datos, httpOptions());
  }
  eliminarServicios(oldTipoVh: ServiciosModule) {
    let where = [{ columna: 'id', tipocomp: '=', dato: oldTipoVh.id }];
    let datos = {
      action: actions.actionDelete,
      _tabla: TABLA.vehiculos_servicios,
      _where: where,
    };
    return this.http.post(url.action, datos, httpOptions());
  }
  public guardarServicios(nuevoTipo: ServiciosModule) {
    let arrayDatos: any = new Object();
    let where: any[] = [];
    arrayDatos['nombre'] = nuevoTipo.nombre;
    arrayDatos['descripcion'] = nuevoTipo.descripcion;
    arrayDatos['estado'] = nuevoTipo.estado;
    arrayDatos['tipo_servicio'] = nuevoTipo.tipo_servicio;
    arrayDatos['precio_general'] = nuevoTipo.precio_general;
    let datos = {
      action: actions.actionInsert,
      _tabla: TABLA.vehiculos_servicios,
      _arraydatos: arrayDatos,
      _where: [[]],
    };
    if (typeof nuevoTipo.id !== 'undefined') {
      //actualiza
      where = [{ columna: 'id', tipocomp: '=', dato: nuevoTipo.id }];
      datos._where = where;
      datos.action = actions.actionUpdate;
    }

    console.log(
      'servicios de creacion servicios de vehiculos activo',
      url.action,
      datos,
      httpOptions()
    );
    return this.http.post(url.action, datos, httpOptions());
  }

  //---------------------------------------------------------------------------
  //servicios tipos de servicios
  //---------------------------------------------------------------------------

  getTiposServicios() {
    let datos = {
      action: actions.actionSelect,
      _tabla: vistas.vehiculos_servicios_tipos,
    };
    console.log(
      'servicios de usuarios activo - getUsuarios',
      url.action,
      datos,
      httpOptions()
    );
    return this.http.post(url.action, datos, httpOptions());
  }

  eliminarTiposServicios(oldTipoVh: TiposServiciosModule) {
    let where = [{ columna: 'id', tipocomp: '=', dato: oldTipoVh.id }];
    let datos = {
      action: actions.actionDelete,
      _tabla: TABLA.TiposServicios,
      _where: where,
    };
    return this.http.post(url.action, datos, httpOptions());
  }
  public guardarTiposServicios(nuevoTipo: TiposServiciosModule) {
    let arrayDatos: any = new Object();
    let where: any[] = [];
    arrayDatos['usuario_creacion'] = 'USUARIO_LOGUEADO';
    arrayDatos['nombre'] = nuevoTipo.nombre;
    arrayDatos['descripcion'] = nuevoTipo.descripcion;
    arrayDatos['estado'] = nuevoTipo.estado;
    let datos = {
      action: actions.actionInsert,
      _tabla: TABLA.TiposServicios,
      _arraydatos: arrayDatos,
      _where: [[]],
    };
    if (typeof nuevoTipo.id !== 'undefined') {
      //actualiza
      where = [{ columna: 'id', tipocomp: '=', dato: nuevoTipo.id }];
      datos._where = where;
      datos.action = actions.actionUpdate;
    }

    console.log(
      'servicios de creacion tipo de vehiculo activo',
      url.action,
      datos,
      httpOptions()
    );
    return this.http.post(url.action, datos, httpOptions());
  }

  //---------------------------------------------------------------------------
  //servicios tipos de vehiculos
  //---------------------------------------------------------------------------
  geTiposVehiculos() {
    let datos = {
      action: actions.actionSelect,
      _tabla: vistas.vehiculos_tipos,
    };
    console.log(
      'servicios de servicios vehiculos activo - geTiposVehiculos',
      url.action,
      datos,
      httpOptions()
    );
    return this.http.post(url.action, datos, httpOptions());
  }

  eliminarTipoDeVehiculo(oldTipoVh: TipoVehiculoModule) {
    let where = [{ columna: 'id', tipocomp: '=', dato: oldTipoVh.id }];
    let datos = {
      action: actions.actionDelete,
      _tabla: TABLA.tiposVehiculos,
      _where: where,
    };
    return this.http.post(url.action, datos, httpOptions());
  }

  public guardarTipoVehiculo(nuevoTipo: TipoVehiculoModule) {
    let arrayDatos: any = new Object();
    let where: any[] = [];
    arrayDatos['usuario_creacion'] = 'USUARIO_LOGUEADO';
    arrayDatos['nombre'] = nuevoTipo.nombre;
    arrayDatos['descripcion'] = nuevoTipo.descripcion;
    arrayDatos['estado'] = nuevoTipo.estado;
    let datos = {
      action: actions.actionInsert,
      _tabla: TABLA.tiposVehiculos,
      _arraydatos: arrayDatos,
      _where: [[]],
    };
    if (typeof nuevoTipo.id !== 'undefined') {
      //actualiza
      where = [{ columna: 'id', tipocomp: '=', dato: nuevoTipo.id }];
      datos._where = where;
      datos.action = actions.actionUpdate;
    }

    console.log(
      'servicios de creacion tipo de vehiculo activo',
      url.action,
      datos,
      httpOptions()
    );
    return this.http.post(url.action, datos, httpOptions());
  }
}
