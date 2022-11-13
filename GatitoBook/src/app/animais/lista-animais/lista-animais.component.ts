import { Component, OnInit } from "@angular/core";
import { Observable, switchMap } from "rxjs";
import { UsuarioService } from "src/app/autenticacao/usuario/usuario.service";
import { Animais } from "../animais";
import { AnimaisService } from "../animais.service";

@Component({
    selector: "app-lista-animais",
    templateUrl: "./lista-animais.component.html",
    styleUrls: ["./lista-animais.component.css"],
})
export class ListaAnimaisComponent implements OnInit {
    /**
     * "!:" => variável não instanciada pois será feito
     * no @ngOnInit
     */
    animais$!: Observable<Animais>;

    constructor(
        private _usuarioService: UsuarioService,
        private _animaisService: AnimaisService
    ) {}

    ngOnInit(): void {
        this.animais$ = this._usuarioService.retornaUsuario().pipe(
            /**
             * O objetivo da função pipe é trocar o fluxo das informações
             * dentro de um Observable através de funções do RXJS.
             * Neste caso, ele está mudando o fluxo de "usuário" para
             * "animais" com o switchMap
             */
            switchMap((usuario) => {
                const userName = usuario.name ?? "";

                const retorno = this._animaisService.listaDoUsuario(userName);

                return retorno;
            })
        );
    }
}
