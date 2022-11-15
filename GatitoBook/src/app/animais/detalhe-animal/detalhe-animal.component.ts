import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
        private _activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.animalID = this._activatedRoute.snapshot.params["animalID"];
        console.log(this.animalID);
        this.animal$ = this._animaisService.buscaPorId(this.animalID);
    }
}
