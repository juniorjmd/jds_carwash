export interface ResumenVenta {  
    usuarioGenerador:string;
    mayorDiaVenta: VentaDiaria;
    menorDiaVenta: VentaDiaria;
    cantidadVendida: number; 
    totalVenta: number;
    resumen: VentaDiaria[];
 }


export interface VentaDiaria {
    fecha: string;
    cantidad: number;
    totalVendido: number;
  }
   