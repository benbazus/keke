import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { GeolocationService } from '~/shared/services/geolocation.service';
import { HomeComponent } from '~/home/home.component';
import { LoginComponent } from '~/login/login.component';
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SignupComponent } from '~/signup/signup.component';
import { SearchComponent } from '~/search/search.component';
import { ChatComponent } from '~/chat/chat.component';
import { GooglePlayService } from '~/shared/services/google-play.service';


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
       NativeScriptCommonModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        SignupComponent,
        HomeComponent,
        LoginComponent,
        ChatComponent,
        SearchComponent
    ],
    providers: [
         GeolocationService,
         GooglePlayService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
