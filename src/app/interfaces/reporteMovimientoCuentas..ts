export interface ReporteMovimientoCuentas {
    saldo: number;
    debito: number;
    credito: number;
    resumen?: ResumenCuenta[]; // Cambia 'any' por un tipo más específico si es necesario
    fechaFinal: string;
    descripcion: string;
    movimientos?: CuentaMovimientos[] ; // Asegúrate de que esto refleje correctamente el tipo de datos
    fechaInicial: string;
    usuarioGenerador: string;
    cantidadMovimientos: number;
 }


export interface Movimiento {
    fecha: string;
    debito: number;
    credito: number;
    tercero: string;
    vendedor: string;
    operacion: string;
    establecimiento: number;
    operDescripcion: string;
  }
  
  export interface CuentaMovimientos {
    cuenta: string;
    show?:boolean; 
    saldo: number;
    movimientos: Movimiento[];
  }
  
 

  export interface MovimientoResumen {
    cnt: number;
    fecha: string;
    saldo: number;
    debito: number;
    credito: number;
  }
  
  export interface ResumenCuenta { 
    show?:boolean  ;
    saldo:number;
    cuenta: number; // Cambié el tipo a number para que coincida con tu dato
    movimientos: MovimientoResumen[];
  }
   