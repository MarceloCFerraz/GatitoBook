import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, mapTo, Observable, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { TokenService } from "../autenticacao/token.service";
import { Animais, Animal } from "./animais";

const API: string = environment.backendAPIUrl;
const NOT_MODIFIED = "304";

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

    excluiAnimal(id: number): Observable<Animal> {
        return this._http.delete<Animal>(`${API}/photos/${id}`);
    }

    curtir(id: number): Observable<boolean> {
        const url = `${API}/photos/${id}/like`;

        return this._http
            .post(
                url,
                {
                    /* body */
                },
                {
                    /* options. necessário para obter mais informações da requisição com o response */
                    observe: "response",
                }
            )
            .pipe(
                /**
                 * pipe é para manipular o fluxo da requisição com operators
                 */
                map(() => {
                    return true;
                }),
                catchError((error) => {
                    return error.status === NOT_MODIFIED
                        ? of(false)
                        : throwError(() => new Error(error));
                })
            );
    }

    upload(descricao: string, allowComments: boolean, file: File) {
        const formData = new FormData();

        formData.append("description", descricao);
        formData.append("allowComments", allowComments ? "true" : "false");
        formData.append("imageFile", file);

        return this._http.post(`${API}/photos/upload`, formData, {
            observe: "events",
            reportProgress: true,
        });
    }
}
