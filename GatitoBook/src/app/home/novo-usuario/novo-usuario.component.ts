import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NovoUsuario } from "./novo-usuario";
import { NovoUsuarioService } from "./novo-usuario.service";
import { minusculoValidator } from "./validators/minusculo.validator";
import { senhaIgualUsernameValidator } from "./validators/senha-igual-username.validator";
import { UsuarioExistenteService } from "./validators/usuario-existente.service";

@Component({
  selector: "app-novo-usuario",
  templateUrl: "./novo-usuario.component.html",
  styleUrls: ["./novo-usuario.component.css"],
})
export class NovoUsuarioComponent implements OnInit {
  novoUsuarioForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _novoUsuarioService: NovoUsuarioService,
    private _usuarioExistenteService: UsuarioExistenteService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.novoUsuarioForm = this._formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        fullName: ["", [Validators.required, Validators.minLength(4)]],
        userName: [
          "",
          [minusculoValidator],
          [this._usuarioExistenteService.verifyExistingUser()],
        ],
        password: [""],
      },
      {
        validators: [senhaIgualUsernameValidator],
      }
    );
  }

  cadastrar() {
    if (this.novoUsuarioForm.valid) {
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this._novoUsuarioService.cadastrar(novoUsuario).subscribe({
        error(err) {
          console.log(err);
          console.log("algo deu errado");
        },
        complete: () => {
          this._router.navigate([""]); // para direcionar para Home após o cadastro, para que possa se logar
        },
      });
    }
  }
}
