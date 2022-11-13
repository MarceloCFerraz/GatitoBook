import { Component, Input, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";

const API: string = environment.backendAPIUrl;

@Component({
    selector: "app-animal",
    templateUrl: "./animal.component.html",
    styleUrls: ["./animal.component.css"],
})
export class AnimalComponent implements OnInit {
    private urlOriginal = "";

    /**
     * Um componente pode receber parâmetros do
     * componente superior utilizando o decorator @Input
     */
    @Input() descricao = "";

    @Input() set url(url: string) {
        // console.log(url);
        if (url.startsWith("data")) {
            this.urlOriginal = url;
        } else {
            this.urlOriginal = `${API}/imgs/${url}`;
        }
        // console.log(this.urlOriginal);
    }

    get url() {
        return this.urlOriginal;
    }

    constructor() {}

    ngOnInit(): void {}
}
