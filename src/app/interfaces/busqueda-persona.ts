import { ClientesModel } from "../models/clientes/clientes.module";

export interface BusquedaPersona {
    response:boolean,
    persona :ClientesModel|null,    
    empleado :ClientesModel|null
}