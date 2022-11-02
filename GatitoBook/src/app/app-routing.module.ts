import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
    // Esta forma acima é o redirecionamento com lazy loading
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
