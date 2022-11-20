import { HttpEvent, HttpEventType } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { AnimaisService } from "../animais.service";

@Component({
    selector: "app-novo-animal",
    templateUrl: "./novo-animal.component.html",
    styleUrls: ["./novo-animal.component.css"],
})
export class NovoAnimalComponent implements OnInit {
    formularioAnimal!: FormGroup;
    file!: File;
    preview!: string;
    concluded = 0;

    constructor(
        private _animaisService: AnimaisService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.formularioAnimal = this._formBuilder.group({
            file: ["", Validators.required],
            description: ["", Validators.maxLength(300)],
            allowComments: [true],
        });
    }

    gravarArquivo(arquivo: any) {
        const [file] = arquivo?.files; // ????
        this.file = file;

        const reader = new FileReader();

        reader.onload = (event: any) => (this.preview = event.target.result);
        reader.readAsDataURL(file);
    }

    upload() {
        const allowComments =
            this.formularioAnimal.get("allowComments")?.value ?? false;

        const description =
            this.formularioAnimal.get("description")?.value ?? "";

        this._animaisService
            .upload(description, allowComments, this.file)
            .pipe(finalize(() => this._router.navigate(["animais"])))
            .subscribe({
                next: (event: HttpEvent<any>) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        const total = event.total ?? 1;
                        this.concluded = Math.round(
                            100 * (event.loaded / total)
                        );
                    }
                },
                error: (error) => console.log(error),
            });
    }
}
