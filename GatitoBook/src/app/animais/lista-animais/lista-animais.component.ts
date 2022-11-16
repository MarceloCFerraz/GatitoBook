import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
    animais!: Animais;

    constructor(private _activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this._activatedRoute.params.subscribe(() => {
            this.animais = this._activatedRoute.snapshot.data["animais"];
        });
    }
}
