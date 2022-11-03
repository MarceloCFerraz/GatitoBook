import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AutenticacaoService {
  constructor(private _httpCliente: HttpClient) {}

  autenticar(usuario: string, senha: string): Observable<any> {
    const user = {
      userName: usuario,
      password: senha,
    };

    return this._httpCliente.post("http://localhost:3000/user/login", user);
  }
}
