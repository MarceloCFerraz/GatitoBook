import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TokenService } from "../autenticacao/token.service";
import { Animais } from "./animais";

const API: string = environment.backendAPIUrl;

@Injectable({
    providedIn: "root",
})
export class AnimaisService {
    constructor(
        private _http: HttpClient,
        private _tokenService: TokenService
    ) {}

    listaDoUsuario(username: string): Observable<Animais> {
        const token = this._tokenService.retornaToken();
        const headers = new HttpHeaders().append("x-access-token", token);
        const url = `${API}/${username}/photos`;

        const retorno = this._http.get<Animais>(url, { headers });

        return retorno;
    }
}
