import { Usuario } from "./usuario.interface";

export interface UsuarioResponseInterface {
    error : string ;
    data: {
        usuario: Usuario;
      };
}
