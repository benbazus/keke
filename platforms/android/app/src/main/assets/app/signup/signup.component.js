"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// import "rxjs/Rx"
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
var SignupComponent = /** @class */ (function () {
    function SignupComponent(router) {
        this.router = router;
        this.input = {
            "firstname": "",
            "lastname": "",
            "email": "",
            "password": ""
        };
    }
    SignupComponent.prototype.ngOnInit = function () { };
    SignupComponent.prototype.register = function () {
        // if(this.input.email && this.input.password) {
        //     let headers = new Headers({ "content-type": "application/json" });
        //     let options = new RequestOptions({ headers: headers });
        //     this.http.post("http://localhost:3000/account", JSON.stringify(this.input), options)
        //         .map(result => result.json())
        //         .subscribe(result => {
        //             this.router.navigate(["/login"]);
        //         });
        // }
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'signup',
            templateUrl: './signup/signup.component.html',
            styleUrls: ['./signup/signup.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpZ251cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQXlDO0FBQ3pDLG1CQUFtQjtBQUNuQiwwREFBMEQ7QUFDMUQsNENBQTRDO0FBQzVDLDhDQUE4QztBQUM5QyxtREFBbUQ7QUFRbkQ7SUFJQyx5QkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNILFdBQVcsRUFBRSxFQUFFO1lBQ2YsVUFBVSxFQUFFLEVBQUU7WUFDZCxPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxFQUFFO1NBQ2pCLENBQUM7SUFDVCxDQUFDO0lBRUQsa0NBQVEsR0FBUixjQUFhLENBQUM7SUFFZCxrQ0FBUSxHQUFSO1FBQ08sZ0RBQWdEO1FBQ2hELHlFQUF5RTtRQUN6RSw4REFBOEQ7UUFDOUQsMkZBQTJGO1FBQzNGLHdDQUF3QztRQUN4QyxpQ0FBaUM7UUFDakMsZ0RBQWdEO1FBQ2hELGNBQWM7UUFDZCxJQUFJO0lBQ1IsQ0FBQztJQXpCUSxlQUFlO1FBTjNCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQzVDLENBQUM7eUNBTTJCLGVBQU07T0FKdEIsZUFBZSxDQTBCM0I7SUFBRCxzQkFBQztDQUFBLEFBMUJELElBMEJDO0FBMUJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbi8vIGltcG9ydCBcInJ4anMvUnhcIlxuLy9pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuLy9pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd1aS90ZXh0LWZpZWxkJztcbi8vaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbi8vaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdzaWdudXAnLFxuXHR0ZW1wbGF0ZVVybDogJy4vc2lnbnVwL3NpZ251cC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL3NpZ251cC9zaWdudXAuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgU2lnbnVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRwdWJsaWMgaW5wdXQ6IGFueTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IFxuXHRcdHRoaXMuaW5wdXQgPSB7XG4gICAgICAgICAgICBcImZpcnN0bmFtZVwiOiBcIlwiLFxuICAgICAgICAgICAgXCJsYXN0bmFtZVwiOiBcIlwiLFxuICAgICAgICAgICAgXCJlbWFpbFwiOiBcIlwiLFxuICAgICAgICAgICAgXCJwYXNzd29yZFwiOiBcIlwiXG4gICAgICAgIH07XG5cdH1cblxuXHRuZ09uSW5pdCgpIHsgfVxuXG5cdHJlZ2lzdGVyKCkge1xuICAgICAgICAvLyBpZih0aGlzLmlucHV0LmVtYWlsICYmIHRoaXMuaW5wdXQucGFzc3dvcmQpIHtcbiAgICAgICAgLy8gICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KTtcbiAgICAgICAgLy8gICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgLy8gICAgIHRoaXMuaHR0cC5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2FjY291bnRcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5pbnB1dCksIG9wdGlvbnMpXG4gICAgICAgIC8vICAgICAgICAgLm1hcChyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSlcbiAgICAgICAgLy8gICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9sb2dpblwiXSk7XG4gICAgICAgIC8vICAgICAgICAgfSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG59Il19