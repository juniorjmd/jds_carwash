import { caja } from "../../interfaces/caja.interface";

export class cajaModel {
  id?: number; 
  nombre?: string;
  descripcion?: string;
  estadoGeneral?: number;
  estadoCaja?: number;
  fechaEstadoGeneral?: Date;
  fechaEstadoCaja?: Date;
  usuarioEstadoCaja?: number;
  usuarioEstadoGeneral?: number;
  nombreEstadoGeneral?: string;
  nombreEstado?: string; 
  asignada?: boolean;
  idUsuario?: number;
  establecimiento?: number;
  nombreEstablecimiento?: string;
  estadoEsta?: number;
  nombreUsuarioEstadoCaja?: string;
  documentoActivoCaja?: number; 
   
  cuentaContableGastos?: number;
  cuentaContableEfectivo?: number;

  nro_scuenta_venta?: number;
  nombre_scuenta_venta?: string;
  cod_cuenta_venta?: number;
  nombre_cuenta_venta?: string;
  nro_scuenta_gastos?: number;
  nombre_scuenta_gastos?: string;
  cod_cuenta_gastos?: number;
  nombre_cuenta_gastos?: string;
  idAuxiliar?: number;
  nombreAuxiliar?: string;
  idBodegaStock?: number;
  idBodegaVitual?: number;
  NameBodegaStock?: string;
  NameBodegaVirtual?: string;
  idCCntCCobrar: number = 0;
  idRetefuenteCompra: number = 0;
  idCCntCPagar: number = 0; 
  idCCntIvaCompra: number = 0;
  idCCnttIvaVenta: number = 0;
  idCCntCostoVenta: number = 0;
  idCCntVenta: number = 0;
  idCCntIngDifBonoRegalo: number = 0;
  
  constructor(cargaCaja: caja | undefined) {
    this.estadoCaja = 0;
    this.estadoGeneral = 0;
    this.establecimiento = 0; 
    if (typeof (cargaCaja) !== 'undefined') {
      this.estadoEsta = cargaCaja.estadoEsta;
      this.id = cargaCaja.id;
      this.establecimiento = cargaCaja.establecimiento;
      this.nombre = cargaCaja.nombre;
      this.descripcion = cargaCaja.descripcion;
      this.estadoGeneral = cargaCaja.estadoGeneral;
      this.estadoCaja = cargaCaja.estadoCaja;
      this.fechaEstadoGeneral = cargaCaja.fechaEstadoGeneral;
      this.fechaEstadoCaja = cargaCaja.fechaEstadoCaja;
      this.usuarioEstadoCaja = cargaCaja.usuarioEstadoCaja;
      this.usuarioEstadoGeneral = cargaCaja.usuarioEstadoGeneral;
      this.asignada = cargaCaja.asignada;
      this.idUsuario = cargaCaja.idUsuario;
      this.nombreEstablecimiento = cargaCaja.nombreEstablecimiento;
      this.nombreUsuarioEstadoCaja = cargaCaja.nombreUsuarioEstadoCaja;
      this.documentoActivoCaja = cargaCaja.documentoActivoCaja;
      this.cuentaContableGastos = cargaCaja.cuentaContableGastos;
      this.cuentaContableEfectivo = cargaCaja.cuentaContableEfectivo;
      this.nro_scuenta_venta = cargaCaja.nro_scuenta_venta;
      this.nombre_scuenta_venta = cargaCaja.nombre_scuenta_venta;
      this.cod_cuenta_venta = cargaCaja.cod_cuenta_venta;
      this.nombre_cuenta_venta = cargaCaja.nombre_cuenta_venta;
      this.nro_scuenta_gastos = cargaCaja.nro_scuenta_gastos;
      this.nombre_scuenta_gastos = cargaCaja.nombre_scuenta_gastos;
      this.cod_cuenta_gastos = cargaCaja.cod_cuenta_gastos;
      this.nombre_cuenta_gastos = cargaCaja.nombre_cuenta_gastos;
      this.idAuxiliar = cargaCaja.idAuxiliar;
      this.nombreAuxiliar = cargaCaja.nombreAuxiliar;
      this.idBodegaStock = cargaCaja.idBodegaStock;
      this.idBodegaVitual = cargaCaja.idBodegaVitual;
      this.NameBodegaStock = cargaCaja.NameBodegaStock;
      this.NameBodegaVirtual = cargaCaja.NameBodegaVirtual;
      this.nombreEstado = cargaCaja.nombreEstado;
      this.nombreEstadoGeneral = cargaCaja.nombreEstadoGeneral;
    }
  }
}
