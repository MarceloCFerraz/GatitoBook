import { Injectable } from "@angular/core";
import {
    Router,
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of, switchMap, take } from "rxjs";
import { UsuarioService } from "src/app/autenticacao/usuario/usuario.service";
import { Animais } from "../animais";
import { AnimaisService } from "../animais.service";

@Injectable({
    providedIn: "root",
})
export class ListaAnimaisResolver implements Resolve<Animais> {
    constructor(
        private _animaisService: AnimaisService,
        private _usuarioService: UsuarioService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Animais> {
        return this._usuarioService.retornaUsuario().pipe(
            /**
             * O objetivo da função pipe é trocar o fluxo das informações
             * dentro de um Observable através de funções do RXJS.
             * Neste caso, ele está mudando o fluxo de "usuário" para
             * "animais" com o switchMap
             */
            switchMap((usuario) => {
                const userName = usuario.name ?? "";

                return this._animaisService.listaDoUsuario(userName);
            }),
            take(1)
        );
    }
}
