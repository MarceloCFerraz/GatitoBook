import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TokenService } from "../token.service";
import { Usuario } from "./usuario";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private _tokenService: TokenService) {
    if (this._tokenService.possuiToken()) {
      this.decodificaJWT();
    }
  }

  decodificaJWT() {
    const token = this._tokenService.retornaToken();
    const usuario = jwt_decode(token) as Usuario;

    this.usuarioSubject.next(usuario);
  }

  retornaUsuario() {
    return this.usuarioSubject.asObservable();
  }

  salvaToken(token: string) {
    this._tokenService.salvaToken(token);
    this.decodificaJWT();
  }

  logout() {
    this._tokenService.excluiToken();
    this.usuarioSubject.next({});
  }

  estaLogado() {
    this._tokenService.possuiToken();
  }
}
