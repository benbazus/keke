"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
var LoginComponent = /** @class */ (function () {
    function LoginComponent() {
        this.input = {
            "email": "",
            "password": ""
        };
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.login = function () {
        // if(this.input.email && this.input.password) {
        //     let headers = new Headers({ "content-type": "application/json" });
        //     let options = new RequestOptions({ headers: headers });
        //     this.http.post("http://localhost:3000/login", JSON.stringify(this.input), options)
        //         .map(result => result.json())
        //         .subscribe(result => {
        //             this.router.navigate(["/blogs"], { "queryParams": result });
        //         });
        // }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './login/login.component.html',
            styleUrls: ['./login/login.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQWtEO0FBQ2xELDBEQUEwRDtBQUMxRCw0Q0FBNEM7QUFDNUMsOENBQThDO0FBQzlDLG1EQUFtRDtBQVFuRDtJQUlDO1FBQ0MsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNILE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEVBQUU7U0FDakIsQ0FBQztJQUNSLENBQUM7SUFFRixpQ0FBUSxHQUFSLGNBQWEsQ0FBQztJQUdkLDhCQUFLLEdBQUw7UUFDTyxnREFBZ0Q7UUFDaEQseUVBQXlFO1FBQ3pFLDhEQUE4RDtRQUM5RCx5RkFBeUY7UUFDekYsd0NBQXdDO1FBQ3hDLGlDQUFpQztRQUNqQywyRUFBMkU7UUFDM0UsY0FBYztRQUNkLElBQUk7SUFDUixDQUFDO0lBeEJRLGNBQWM7UUFOMUIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDMUMsQ0FBQzs7T0FFVyxjQUFjLENBeUIxQjtJQUFELHFCQUFDO0NBQUEsQUF6QkQsSUF5QkM7QUF6Qlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbi8vaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndWkvdGV4dC1maWVsZCc7XG4vL2ltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG4vL2ltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbG9naW4nLFxuXHR0ZW1wbGF0ZVVybDogJy4vbG9naW4vbG9naW4uY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0cHVibGljIGlucHV0OiBhbnk7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5pbnB1dCA9IHtcbiAgICAgICAgICAgIFwiZW1haWxcIjogXCJcIixcbiAgICAgICAgICAgIFwicGFzc3dvcmRcIjogXCJcIlxuICAgICAgICB9O1xuXHQgfVxuXG5cdG5nT25Jbml0KCkgeyB9XG5cblxuXHRsb2dpbigpIHtcbiAgICAgICAgLy8gaWYodGhpcy5pbnB1dC5lbWFpbCAmJiB0aGlzLmlucHV0LnBhc3N3b3JkKSB7XG4gICAgICAgIC8vICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSk7XG4gICAgICAgIC8vICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIC8vICAgICB0aGlzLmh0dHAucG9zdChcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9sb2dpblwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmlucHV0KSwgb3B0aW9ucylcbiAgICAgICAgLy8gICAgICAgICAubWFwKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKVxuICAgICAgICAvLyAgICAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2Jsb2dzXCJdLCB7IFwicXVlcnlQYXJhbXNcIjogcmVzdWx0IH0pO1xuICAgICAgICAvLyAgICAgICAgIH0pO1xuICAgICAgICAvLyB9XG4gICAgfVxufSJdfQ==