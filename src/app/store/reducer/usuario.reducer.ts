import { createReducer, on } from "@ngrx/store";
import {
  cargarUsuario,
  cargarUsuarioSuccess,
  cargarUsuarioError,
} from "../actions";
import { Usuario } from "../../models/usuario.model";

export interface UsuarioState {
  id: string;
  users: Usuario;
  loaded: boolean;
  loading: boolean;
  error: any;
}

const UsuarioInitialState: UsuarioState = {
  id: null,
  users: null,
  loaded: false,
  loading: false,
  error: null,
};

const _UsuarioReducer = createReducer(
  UsuarioInitialState,
  on(cargarUsuario, (state, { id }) => ({ ...state, loading: true, id })),
  on(cargarUsuarioSuccess, (state, { usuario }) => ({
    ...state,
    loading: false,
    loaded: true,
    users: { ...usuario },
  })),
  on(cargarUsuarioError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  }))
);

export function UsuarioReducer(state, action) {
  return _UsuarioReducer(state, action);
}
