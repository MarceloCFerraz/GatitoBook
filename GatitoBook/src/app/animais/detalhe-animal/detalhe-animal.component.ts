import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Animal } from "../animais";
import { AnimaisService } from "../animais.service";

@Component({
    selector: "app-detalhe-animal",
    templateUrl: "./detalhe-animal.component.html",
    styleUrls: ["./detalhe-animal.component.css"],
})
export class DetalheAnimalComponent implements OnInit {
    animalID!: number;
    animal$!: Observable<Animal>;

    constructor(
        private _animaisService: AnimaisService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.animalID = this._activatedRoute.snapshot.params["animalID"];
        console.log(this.animalID);
        this.animal$ = this._animaisService.buscaPorId(this.animalID);
    }

    curtir() {
        this._animaisService.curtir(this.animalID).subscribe((curtida) => {
            console.log(curtida);
            if (curtida) {
                this.animal$ = this._animaisService.buscaPorId(this.animalID);
            }
        });
    }
    delete() {
        this._animaisService.excluiAnimal(this.animalID).subscribe({
            next: () => {
                this._router.navigate(["/animais/"]);
            },
            error: (erro) => {
                console.log(erro);
            },
        });
    }
}
