import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoGuard } from "./autenticacao/routing-guard/autenticacao.guard";
import { LoginGuard } from "./autenticacao/routing-guard/login.guard";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "home" },
    {
        path: "home",
        loadChildren: () =>
            import("./home/home.module").then((m) => m.HomeModule),
        // Esta forma acima é o redirecionamento com lazy loading
        canLoad: [LoginGuard],
    },
    {
        path: "animais",
        loadChildren: () =>
            import("./animais/animais.module").then((m) => m.AnimaisModule),
        // Esta forma acima é o redirecionamento com lazy loading
        canLoad: [AutenticacaoGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
