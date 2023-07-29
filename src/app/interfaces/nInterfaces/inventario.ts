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


