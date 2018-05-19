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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvREFBcUU7QUFDckUsc0NBQTJEO0FBQzNELGdGQUE4RTtBQUM5RSw2Q0FBaUQ7QUFDakQsaURBQStDO0FBQy9DLDZFQUEyRTtBQUMzRSx3REFBc0Q7QUFDdEQsMkRBQXlEO0FBQ3pELHNEQUF1RTtBQUN2RSw4REFBNEQ7QUFDNUQsOERBQTREO0FBQzVELHdEQUFzRDtBQUN0RCw2RUFBMEU7QUFDMUUsK0RBQTZEO0FBQzdELGlFQUErRDtBQUcvRCwwRUFBd0U7QUFDeEUsNkRBQTJEO0FBQzNELGtDQUFlLENBQUMsUUFBUSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxVQUFVLEVBQXpDLENBQXlDLENBQUMsQ0FBQztBQWtDM0U7SUFIQTs7TUFFRTtJQUNGO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBaENyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLCtCQUF1QjtnQkFDeEIsaUNBQXdCO2dCQUN2Qiw4QkFBZ0I7YUFDbkI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osa0NBQWU7Z0JBQ2YsOEJBQWE7Z0JBQ2IsZ0NBQWM7Z0JBQ2QsOEJBQWE7Z0JBQ2Isb0NBQWdCO2dCQUNoQixrQ0FBZTtnQkFDZixnQ0FBYzthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDTix3Q0FBa0I7Z0JBQ2xCLHVDQUFpQjtnQkFDakIsMEJBQVc7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tICd+L3NoYXJlZC9zZXJ2aWNlcy9nZW9sb2NhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gJ34vaG9tZS9ob21lLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSAnfi9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFNpZ251cENvbXBvbmVudCB9IGZyb20gJ34vc2lnbnVwL3NpZ251cC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTZWFyY2hDb21wb25lbnQgfSBmcm9tICd+L3NlYXJjaC9zZWFyY2guY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2hhdENvbXBvbmVudCB9IGZyb20gJ34vY2hhdC9jaGF0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdvb2dsZVBsYXlTZXJ2aWNlIH0gZnJvbSAnfi9zaGFyZWQvc2VydmljZXMvZ29vZ2xlLXBsYXkuc2VydmljZSc7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnfi9zaGFyZWQvc2VydmljZXMvdXNlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQm9va2luZ0NvbXBvbmVudCB9IGZyb20gJ34vYm9va2luZy9ib29raW5nLmNvbXBvbmVudCc7XHJcblxyXG5cclxuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcclxuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tICd+L2Jvb2tpbmcvbW9kYWwuY29tcG9uZW50JztcclxucmVnaXN0ZXJFbGVtZW50KFwiTWFwYm94XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtbWFwYm94XCIpLk1hcGJveFZpZXcpO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGJvb3RzdHJhcDogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBBcHBDb21wb25lbnQsXHJcbiAgICAgICAgU2lnbnVwQ29tcG9uZW50LFxyXG4gICAgICAgIEhvbWVDb21wb25lbnQsXHJcbiAgICAgICAgTG9naW5Db21wb25lbnQsXHJcbiAgICAgICAgQ2hhdENvbXBvbmVudCxcclxuICAgICAgICBCb29raW5nQ29tcG9uZW50LFxyXG4gICAgICAgIFNlYXJjaENvbXBvbmVudCxcclxuICAgICAgICBNb2RhbENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgICBHZW9sb2NhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgIEdvb2dsZVBsYXlTZXJ2aWNlLFxyXG4gICAgICAgICBVc2VyU2VydmljZVxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbi8qXHJcblBhc3MgeW91ciBhcHBsaWNhdGlvbiBtb2R1bGUgdG8gdGhlIGJvb3RzdHJhcE1vZHVsZSBmdW5jdGlvbiBsb2NhdGVkIGluIG1haW4udHMgdG8gc3RhcnQgeW91ciBhcHBcclxuKi9cclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuIl19