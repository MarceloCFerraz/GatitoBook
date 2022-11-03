import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AutenticacaoService } from "src/app/autenticacao/autenticacao.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  usuario: string = "";
  senha: string = "";

  constructor(
    private _authService: AutenticacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this._authService.autenticar(this.usuario, this.senha).subscribe({
      next: (value) => {
        // desta forma é possível acessar as variáveis e
        // funções do arquivo que você está chamando
        // esta função de login
        this.router.navigate(["animais"]);
      },
      error(err) {
        // desta forma NÃO é possível acessar as variáveis e
        // funções do arquivo que você está chamando
        // esta função de login
        console.log(err);
      },
    });
  }
}
