export interface SoporteOperacion { 
    fecha:Date;
    debito: number;
    credito: number;
    tercero: string;
    usuario: string;
    vendedor: string;
    documento: number;
    nombreOpr: string;
    comprobante: number;
    descripcionOpr: string;
    establecimiento: number;
    movimientos: SoporteOperacionMovimiento[]; 
    arrEsta: ArrEsta;
}
export interface SoporteOperacionMovimiento {
    cuenta: number;
    debito: number;
    credito: number;
    tercero: string;
    usuario: string;
    nombreCuenta: string;
}

interface ArrEsta {
    nit: string;
    logo: string;
    pais: string;
    tel1: string;
    tel2: string;
    ciudad: string;
    nombre: string;
    direccion: string;
    descripcion: string;
    departamento: string;
}