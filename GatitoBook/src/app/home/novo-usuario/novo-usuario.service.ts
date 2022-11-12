import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NovoUsuario } from "./novo-usuario";

@Injectable({
  providedIn: "root",
})
export class NovoUsuarioService {
  apiUrl: string = "http://localhost:3000/user/";

  constructor(private _httpClient: HttpClient) {}

  cadastrar(novoUsuario: NovoUsuario) {
    return this._httpClient.post(this.apiUrl + "signup", novoUsuario);
  }

  verifyExistingUser(nomeUsuario: string) {
    return this._httpClient.get(this.apiUrl + `exists/${nomeUsuario}`);
  }
}
