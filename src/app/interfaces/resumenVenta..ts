export interface ResumenVenta {  
    usuarioGenerador:string;
    mayorDiaVenta: VentaDiaria;
    menorDiaVenta: VentaDiaria;
    cantidadVendida: number; 
    totalVenta: number;
    resumen: VentaDiaria[];
    productos?:resumenPrd[];
    productoMasVendido?:resumenPrd;
    productoMenosVendido?: resumenPrd; 
 }


export interface VentaDiaria {
    fecha: string;
    cantidad: number;
    totalVendido: number;
  }

  export interface resumenPrd{
    "total": number,
    "nombre": string,
    "cantidad": number,
    "idProducto": string
  } 