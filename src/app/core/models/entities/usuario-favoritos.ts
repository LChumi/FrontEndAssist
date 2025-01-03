import {Usuario} from "@models/entities/usuario";
import {Programa} from "@models/entities/programa";

export interface UsuarioFavoritos {
  codigo:   number;
  empresa:  number;
  usuario:  Usuario;
  programa: Programa;
}
