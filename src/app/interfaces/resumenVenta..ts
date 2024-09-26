export interface ResumenVenta {  
    usuarioGenerador:string; 
    fechaInicial:Date;
    fechaFinal:Date;
    descripcion:string; 
    cantidadVendida: number; 
    totalVenta: number;
    resumen: VentaDiaria[];
    mayorDiaVenta: VentaDiaria;
    menorDiaVenta: VentaDiaria;
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