import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConnectableObservable, Observable } from "rxjs";
import { Usuario } from "src/app/autenticacao/usuario/usuario";
import { UsuarioService } from "src/app/autenticacao/usuario/usuario.service";

@Component({
    selector: "app-cabecalho",
    templateUrl: "./cabecalho.component.html",
    styleUrls: ["./cabecalho.component.css", "../../app.component.css"],
})
export class CabecalhoComponent {
    /**
     * Esta é uma convenção para nomear uma variável do tipo
     * Observable
     */
    user$: Observable<Usuario>;
    usuarioBool: Boolean = false;

    constructor(
        private _usuarioService: UsuarioService,
        private _router: Router
    ) {
        this.user$ = this._usuarioService.retornaUsuario();
    }

    logout() {
        this._usuarioService.logout();
        this._router.navigate([""]);
    }

    usuarioLogado() {
        this.user$.subscribe({
            next: (value) => {
                // console.log(value);
                this.usuarioBool = value.name?.length != undefined;
            },
        });
        // console.log(this.usuarioBool);
        return this.usuarioBool;
    }

    subscribeUsuario() {}
}
