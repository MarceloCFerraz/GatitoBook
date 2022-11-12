import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";
import { UsuarioService } from "./usuario/usuario.service";

@Injectable({
    providedIn: "root",
})
export class AutenticacaoService {
    constructor(
        private _httpCliente: HttpClient,
        private _usuarioService: UsuarioService
    ) {}

    autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> {
        const user = {
            userName: usuario,
            password: senha,
        };

        return this._httpCliente
            .post("http://localhost:3000/user/login", user, {
                observe: "response",
            })
            .pipe(
                /*
        Toda vez que eu quero fazer uma operação de efeito colateral 
        - ou seja, não estou alterando o fluxo e nem alterando o 
        resultado, e sim, somente fazendo a operação. Para mim não 
        interessa o resultado, só estou fazendo a operação. Eu uso 
        o operador "tap" do rxjs
      */
                tap((response) => {
                    const authToken =
                        response.headers.get("x-access-token") ?? "";
                    this._usuarioService.salvaToken(authToken);
                })
            );
    }
}
