export interface Recurso {
    id: number;
    idPadre:number[];
    nombre_recurso: string;
    display_nombre: string;
    img: string;
    idtipo: number;
    tipo: string;
    estado: string;
    seleccionado: boolean;
    recursosHijos: Recurso[];
    direccion: string[];
}