import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable({
    providedIn: "root",
})
export class LoginGuard implements CanLoad {
    constructor(
        private _usuarioService: UsuarioService,
        private _router: Router
    ) {}

    canLoad(
        route: Route,
        segments: UrlSegment[]
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        var retorno: boolean = true;

        if (this._usuarioService.estaLogado()) {
            this._router.navigate(["animais"]);
            retorno = false;
        }

        return retorno;
    }
}
