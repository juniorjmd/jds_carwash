export interface Inventario {
    id: number,
    nombre:string,
    descripcion: string,
    estado: string,
    fechaCreacion?: Date,
    fechaAplicacion?: Date,
    id_tipo: number,
    id_categoria?: number,
    id_marca?: number,
    id_proveedor?: number
    tipoInventarioName?: string,
    estadoDescripcion?: string,
}



export interface InventarioApl {
    id: number;
    nombre: string;
    descripcion: string;
    id_tipo: number;
    estado: string;
    fechaCreacion: Date;
    fechaAplicacion: Date;
    id_categoria: number;
    id_marca: number;
    id_proveedor: number;
    usuario: string;
}


export interface InventarioAplDetalle {
    id: bigint;
    cod_producto: string;
    cantidad: number;
    idInventario: bigint;
    referencia?: string | null;
    usuario_creacion: bigint;
    usuario_edicion?: bigint | null;
    fecha_creacion?: Date | null;
    fecha_actualizacion?: Date | null;
    estado?: number | null;
    cantidadAnterios?: number | null;
    cantidadAjuste?: number | null;
    nombre?: string | null;
}



