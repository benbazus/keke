import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { HomeComponent } from "~/home/home.component";
import { LoginComponent } from "~/login/login.component";
import { SearchComponent } from "~/search/search.component";
import { SignupComponent } from "~/signup/signup.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
  //  { path: "", redirectTo: "/items", pathMatch: "full" },
    { path: "home", component: HomeComponent },    
    { path: "login", component: LoginComponent },
    { path: "search", component: SearchComponent },
    { path: "signup", component: SignupComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }