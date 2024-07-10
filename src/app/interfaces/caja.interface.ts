export interface caja {
    id: number;
    nombre: string;
    descripcion: string;
    estadoGeneral: number;
    estadoCaja: number;
    usuarioEstadoCaja: number;
    usuarioEstadoGeneral: number;
    fechaEstadoCaja: Date;
    fechaEstadoGeneral: Date;
    establecimiento: number;
    asignada?: boolean;
    idUsuario?: number;
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
    nombreEstado?: string;
    nombreEstadoGeneral?: string;
  }
  