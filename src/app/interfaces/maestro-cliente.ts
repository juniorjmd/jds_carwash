import { ClientesModule } from "../models/clientes/clientes.module";
import { CiudadModel, DepartamentoModel, PaisModel } from "../models/maestros.model";
import { TipoIdentificacionModule } from "../models/tipo-identificacion/tipo-identificacion.module";
import { DocumentosModel } from "../models/ventas/documento.model";
import { TipoDeDocumentos } from "./tipo-de-documentos";

export interface MaestroCliente {
    ciudades:CiudadModel[],
    departamentos:DepartamentoModel[],
    paises:PaisModel[],
    tipo_id_clientes:TipoIdentificacionModule[],
    empresas:ClientesModule[]
    parametros : {
            ID_CIUDAD_DEFAULT:number,
            ID_DEP_DEFAULT:number,
            ID_PAIS_DEFAULT:number,
            ID_TIPO_ID_CEDULA:number,
            ID_TIPO_ID_NIT:number,
        },
}

export interface fndCliente { 
    docActivo : DocumentosModel|undefined ,
    clienteIngreso:ClientesModule
    invoker:string ,
}