import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Comentario, Comentarios } from "./comentarios";

const API = environment.backendAPIUrl;

@Injectable({
    providedIn: "root",
})
export class ComentariosService {
    constructor(private _http: HttpClient) {}

    buscaComentario(id: number): Observable<Comentarios> {
        return this._http.get<Comentarios>(`${API}/photos/${id}/comments`);
    }

    incluiComentario(id: number, commentText: string): Observable<Comentario> {
        return this._http.post<Comentario>(`${API}/photos/${id}/comments`, {
            commentText,
        });
    }
}
