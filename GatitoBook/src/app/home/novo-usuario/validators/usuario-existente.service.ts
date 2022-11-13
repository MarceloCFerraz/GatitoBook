import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { first, map, switchMap } from "rxjs";
import { NovoUsuarioService } from "../novo-usuario.service";

@Injectable({
    providedIn: "root",
})
export class UsuarioExistenteService {
    constructor(private _novoUsuarioService: NovoUsuarioService) {}

    verifyExistingUser() {
        return (control: AbstractControl) => {
            return control.valueChanges.pipe(
                switchMap((nomeUsuario) =>
                    this._novoUsuarioService.verifyExistingUser(nomeUsuario)
                ),
                map((usuarioExiste) =>
                    usuarioExiste ? { usuarioExistente: true } : null
                ),
                first()
            );
        };
    }
}
