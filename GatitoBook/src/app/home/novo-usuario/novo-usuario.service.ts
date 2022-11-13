import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { NovoUsuario } from "./novo-usuario";

const API: string = environment.backendAPIUrl;

@Injectable({
    providedIn: "root",
})
export class NovoUsuarioService {
    constructor(private _httpClient: HttpClient) {}

    cadastrar(novoUsuario: NovoUsuario) {
        return this._httpClient.post(`${API}/user/signup`, novoUsuario);
    }

    verifyExistingUser(nomeUsuario: string) {
        return this._httpClient.get(`${API}/user/exists/${nomeUsuario}`);
    }
}
