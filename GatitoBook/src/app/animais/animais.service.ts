import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TokenService } from "../autenticacao/token.service";
import { Animais, Animal } from "./animais";

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
        const url = `${API}/${username}/photos`;

        const retorno = this._http.get<Animais>(url);

        return retorno;
    }

    buscaPorId(id: number): Observable<Animal> {
        const url = `${API}/photos/${id}`;

        return this._http.get<Animal>(url);
    }
}
