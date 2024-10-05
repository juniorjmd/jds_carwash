export interface ResumenCreditos { 
    numCreditos:number;
    abonos: Abono[];
    cuotas: Cuota[];
    creditos: Credito[];
    cuotas_a_vencerce: Cuota[];
    cuotas_vencidas: Cuota[]; 
    t_totalAbonos: number;
    t_totalActual: number;
    t_abonoInicial: number;
    t_valorInicial: number;  
    usuario_generador: string;
    descripcion: string;
    t_suma_plazos_vencidos: number;
    t_numero_plazos_vencidos: number; 
    fechaInicial :Date;
    fechaFinal:Date;
}

interface Abono {
    id: number;
    estado: number;
    id_cartera:number;
    comprobante: number;
    descripcion: string;
    totalAbonos: number;
    fecha_creacion: string;
    usuario_edicion: string;
    usuario_creacion: string;
    fecha_actualizacion: string;
}

interface Cuota {
    id: number;
    abono: number;
    estado: number;
    fechaPago: string | null;
    id_cartera: number;
    valorCuota: number;
    estadoCuota: string;
    totalActual: number;
    totalPagado: number;
    ultimoAbono: number;
    fechaEdicion: string;
    numero_cuota: number;
    fechaCreacion: string | null;
    fecha_max_pago: string;
    usuarioCreador: number;
    usuarioEdicion: number | null;
}

interface Credito {
    id: number;
    terceroNombre:string;
    cuotas: number;
    estado: number;
    plazos: number;
    idTercero: number;
    comprobante: number;
    descripcion: string;
    totalAbonos: number;
    totalActual: number;
    abonoInicial: number;
    valorInicial: number;
    fecha_creacion: string;
    idFacturaVenta: number;
    usuario_edicion: string | null;
    usuario_creacion: number;
    fecha_ultimo_abono: string | null;
    fecha_actualizacion: string;
    suma_plazos_vencidos: number;
    numero_plazos_vencidos: number;
}

 