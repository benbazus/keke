"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("nativescript-angular/forms");
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var geolocation_service_1 = require("~/shared/services/geolocation.service");
var home_component_1 = require("~/home/home.component");
var login_component_1 = require("~/login/login.component");
var common_1 = require("nativescript-angular/common");
var signup_component_1 = require("~/signup/signup.component");
var search_component_1 = require("~/search/search.component");
var chat_component_1 = require("~/chat/chat.component");
var google_play_service_1 = require("~/shared/services/google-play.service");
var user_service_1 = require("~/shared/services/user.service");
var booking_component_1 = require("~/booking/booking.component");
var settings_component_1 = require("~/settings/settings.component");
var element_registry_1 = require("nativescript-angular/element-registry");
var modal_component_1 = require("~/booking/modal.component");
element_registry_1.registerElement("Mapbox", function () { return require("nativescript-mapbox").MapboxView; });
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                common_1.NativeScriptCommonModule,
                app_routing_1.AppRoutingModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                signup_component_1.SignupComponent,
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                chat_component_1.ChatComponent,
                booking_component_1.BookingComponent,
                search_component_1.SearchComponent,
                settings_component_1.SettingsComponent,
                modal_component_1.ModalComponent
            ],
            providers: [
                geolocation_service_1.GeolocationService,
                google_play_service_1.GooglePlayService,
                user_service_1.UserService
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvREFBcUU7QUFDckUsc0NBQTJEO0FBQzNELGdGQUE4RTtBQUM5RSw2Q0FBaUQ7QUFDakQsaURBQStDO0FBQy9DLDZFQUEyRTtBQUMzRSx3REFBc0Q7QUFDdEQsMkRBQXlEO0FBQ3pELHNEQUF1RTtBQUN2RSw4REFBNEQ7QUFDNUQsOERBQTREO0FBQzVELHdEQUFzRDtBQUN0RCw2RUFBMEU7QUFDMUUsK0RBQTZEO0FBQzdELGlFQUErRDtBQUMvRCxvRUFBa0U7QUFFbEUsMEVBQXdFO0FBQ3hFLDZEQUEyRDtBQUMzRCxrQ0FBZSxDQUFDLFFBQVEsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsVUFBVSxFQUF6QyxDQUF5QyxDQUFDLENBQUM7QUFtQzNFO0lBSEE7O01BRUU7SUFDRjtJQUF5QixDQUFDO0lBQWIsU0FBUztRQWpDckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQiwrQkFBdUI7Z0JBQ3hCLGlDQUF3QjtnQkFDdkIsOEJBQWdCO2FBQ25CO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDRCQUFZO2dCQUNaLGtDQUFlO2dCQUNmLDhCQUFhO2dCQUNiLGdDQUFjO2dCQUNkLDhCQUFhO2dCQUNiLG9DQUFnQjtnQkFDaEIsa0NBQWU7Z0JBQ2Ysc0NBQWlCO2dCQUNqQixnQ0FBYzthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDTix3Q0FBa0I7Z0JBQ2xCLHVDQUFpQjtnQkFDakIsMEJBQVc7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tICd+L3NoYXJlZC9zZXJ2aWNlcy9nZW9sb2NhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gJ34vaG9tZS9ob21lLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSAnfi9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFNpZ251cENvbXBvbmVudCB9IGZyb20gJ34vc2lnbnVwL3NpZ251cC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTZWFyY2hDb21wb25lbnQgfSBmcm9tICd+L3NlYXJjaC9zZWFyY2guY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2hhdENvbXBvbmVudCB9IGZyb20gJ34vY2hhdC9jaGF0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdvb2dsZVBsYXlTZXJ2aWNlIH0gZnJvbSAnfi9zaGFyZWQvc2VydmljZXMvZ29vZ2xlLXBsYXkuc2VydmljZSc7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnfi9zaGFyZWQvc2VydmljZXMvdXNlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQm9va2luZ0NvbXBvbmVudCB9IGZyb20gJ34vYm9va2luZy9ib29raW5nLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNldHRpbmdzQ29tcG9uZW50IH0gZnJvbSBcIn4vc2V0dGluZ3Mvc2V0dGluZ3MuY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xyXG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gJ34vYm9va2luZy9tb2RhbC5jb21wb25lbnQnO1xyXG5yZWdpc3RlckVsZW1lbnQoXCJNYXBib3hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1tYXBib3hcIikuTWFwYm94Vmlldyk7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgYm9vdHN0cmFwOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcclxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudCxcclxuICAgICAgICBTaWdudXBDb21wb25lbnQsXHJcbiAgICAgICAgSG9tZUNvbXBvbmVudCxcclxuICAgICAgICBMb2dpbkNvbXBvbmVudCxcclxuICAgICAgICBDaGF0Q29tcG9uZW50LFxyXG4gICAgICAgIEJvb2tpbmdDb21wb25lbnQsXHJcbiAgICAgICAgU2VhcmNoQ29tcG9uZW50LFxyXG4gICAgICAgIFNldHRpbmdzQ29tcG9uZW50LFxyXG4gICAgICAgIE1vZGFsQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgIEdlb2xvY2F0aW9uU2VydmljZSxcclxuICAgICAgICAgR29vZ2xlUGxheVNlcnZpY2UsXHJcbiAgICAgICAgIFVzZXJTZXJ2aWNlXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuLypcclxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxyXG4qL1xyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxyXG4iXX0=