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
    SignupComponent.prototype.ngOnInit = function () {
        //  email.available((avail: boolean) => {
        //   console.log("Email available? " + avail);
        //});
    };
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
    SignupComponent.prototype.sendMail = function () {
        // let's first create a File object using the tns file module
        // var fs = require("file-system");
        // var appPath = fs.knownFolders.currentApp().path;
        // var logoPath = appPath + "/res/telerik-logo.png";
        // email.compose({
        //   subject: "Yo",
        //   body: "Hello <strong>dude</strong> :)",
        //   to: ['eddyverbruggen@gmail.com', 'to@person2.com'],
        //   cc: ['ccperson@somewhere.com'],
        //   bcc: ['eddy@combidesk.com', 'eddy@x-services.nl'],
        //   attachments: [
        //    {
        //         fileName: 'arrow1.png',
        //         path: 'base64://iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAHGlET1QAAAACAAAAAAAAABQAAAAoAAAAFAAAABQAAAB5EsHiAAAAAEVJREFUSA1iYKAimDhxYjwIU9FIBgaQgZMmTfoPwlOmTJGniuHIhlLNxaOGwiNqNEypkwlGk9RokoIUfaM5ijo5Clh9AAAAAP//ksWFvgAAAEFJREFUY5g4cWL8pEmT/oMwiM1ATTBqONbQHA2W0WDBGgJYBUdTy2iwYA0BrILDI7VMmTJFHqv3yBUEBQsIg/QDAJNpcv6v+k1ZAAAAAElFTkSuQmCC',
        //         mimeType: 'image/png'
        //     },
        //     {
        //         fileName: 'telerik-logo.png',
        //         path: logoPath,
        //         mimeType: 'image/png'
        //   }]
        //}).then(
        //  function() {
        //    console.log("Email composer closed");
        //  }, function(err) {
        //    console.log("Error: " + err);
        //  });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpZ251cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQXlDO0FBRXpDLG1CQUFtQjtBQUNuQiwwREFBMEQ7QUFDMUQsNENBQTRDO0FBQzVDLDhDQUE4QztBQUM5QyxtREFBbUQ7QUFRbkQ7SUFJQyx5QkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNILFdBQVcsRUFBRSxFQUFFO1lBQ2YsVUFBVSxFQUFFLEVBQUU7WUFDZCxPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxFQUFFO1NBQ2pCLENBQUM7SUFDVCxDQUFDO0lBRUQsa0NBQVEsR0FBUjtRQUNFLHlDQUF5QztRQUN6Qyw4Q0FBOEM7UUFDL0MsS0FBSztJQUNOLENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBQ08sZ0RBQWdEO1FBQ2hELHlFQUF5RTtRQUN6RSw4REFBOEQ7UUFDOUQsMkZBQTJGO1FBQzNGLHdDQUF3QztRQUN4QyxpQ0FBaUM7UUFDakMsZ0RBQWdEO1FBQ2hELGNBQWM7UUFDZCxJQUFJO0lBQ1IsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFDSSw2REFBNkQ7UUFDcEUsbUNBQW1DO1FBQ25DLG1EQUFtRDtRQUNuRCxvREFBb0Q7UUFFcEQsa0JBQWtCO1FBQ2hCLG1CQUFtQjtRQUNuQiw0Q0FBNEM7UUFDNUMsd0RBQXdEO1FBQ3hELG9DQUFvQztRQUNwQyx1REFBdUQ7UUFDdkQsbUJBQW1CO1FBQ2xCLE9BQU87UUFDUixrQ0FBa0M7UUFDbEMsNlhBQTZYO1FBQzdYLGdDQUFnQztRQUNoQyxTQUFTO1FBQ1QsUUFBUTtRQUNSLHdDQUF3QztRQUN4QywwQkFBMEI7UUFDMUIsZ0NBQWdDO1FBQ2hDLE9BQU87UUFDUixVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLDJDQUEyQztRQUMzQyxzQkFBc0I7UUFDdEIsbUNBQW1DO1FBQ25DLE9BQU87SUFDTCxDQUFDO0lBNURRLGVBQWU7UUFOM0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7U0FDNUMsQ0FBQzt5Q0FNMkIsZUFBTTtPQUp0QixlQUFlLENBNkQzQjtJQUFELHNCQUFDO0NBQUEsQUE3REQsSUE2REM7QUE3RFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgY29tcG9zZSBhcyBjb21wb3NlRW1haWwgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWVtYWlsXCI7XG4vLyBpbXBvcnQgXCJyeGpzL1J4XCJcbi8vaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbi8vaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndWkvdGV4dC1maWVsZCc7XG4vL2ltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG4vL2ltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnc2lnbnVwJyxcblx0dGVtcGxhdGVVcmw6ICcuL3NpZ251cC9zaWdudXAuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9zaWdudXAvc2lnbnVwLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFNpZ251cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0cHVibGljIGlucHV0OiBhbnk7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikgeyBcblx0XHR0aGlzLmlucHV0ID0ge1xuICAgICAgICAgICAgXCJmaXJzdG5hbWVcIjogXCJcIixcbiAgICAgICAgICAgIFwibGFzdG5hbWVcIjogXCJcIixcbiAgICAgICAgICAgIFwiZW1haWxcIjogXCJcIixcbiAgICAgICAgICAgIFwicGFzc3dvcmRcIjogXCJcIlxuICAgICAgICB9O1xuXHR9XG5cblx0bmdPbkluaXQoKSB7IFxuICAgLy8gIGVtYWlsLmF2YWlsYWJsZSgoYXZhaWw6IGJvb2xlYW4pID0+IHtcbiAgIC8vICAgY29uc29sZS5sb2coXCJFbWFpbCBhdmFpbGFibGU/IFwiICsgYXZhaWwpO1xuICAvL30pO1xuIH1cblxuXHRyZWdpc3RlcigpIHtcbiAgICAgICAgLy8gaWYodGhpcy5pbnB1dC5lbWFpbCAmJiB0aGlzLmlucHV0LnBhc3N3b3JkKSB7XG4gICAgICAgIC8vICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSk7XG4gICAgICAgIC8vICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIC8vICAgICB0aGlzLmh0dHAucG9zdChcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hY2NvdW50XCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuaW5wdXQpLCBvcHRpb25zKVxuICAgICAgICAvLyAgICAgICAgIC5tYXAocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpXG4gICAgICAgIC8vICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbG9naW5cIl0pO1xuICAgICAgICAvLyAgICAgICAgIH0pO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgc2VuZE1haWwoKSB7XG4gICAgICAgIC8vIGxldCdzIGZpcnN0IGNyZWF0ZSBhIEZpbGUgb2JqZWN0IHVzaW5nIHRoZSB0bnMgZmlsZSBtb2R1bGVcbiAvLyB2YXIgZnMgPSByZXF1aXJlKFwiZmlsZS1zeXN0ZW1cIik7XG4gLy8gdmFyIGFwcFBhdGggPSBmcy5rbm93bkZvbGRlcnMuY3VycmVudEFwcCgpLnBhdGg7XG4gLy8gdmFyIGxvZ29QYXRoID0gYXBwUGF0aCArIFwiL3Jlcy90ZWxlcmlrLWxvZ28ucG5nXCI7XG5cbiAvLyBlbWFpbC5jb21wb3NlKHtcbiAgIC8vICAgc3ViamVjdDogXCJZb1wiLFxuICAgLy8gICBib2R5OiBcIkhlbGxvIDxzdHJvbmc+ZHVkZTwvc3Ryb25nPiA6KVwiLFxuICAgLy8gICB0bzogWydlZGR5dmVyYnJ1Z2dlbkBnbWFpbC5jb20nLCAndG9AcGVyc29uMi5jb20nXSxcbiAgIC8vICAgY2M6IFsnY2NwZXJzb25Ac29tZXdoZXJlLmNvbSddLFxuICAgLy8gICBiY2M6IFsnZWRkeUBjb21iaWRlc2suY29tJywgJ2VkZHlAeC1zZXJ2aWNlcy5ubCddLFxuICAgLy8gICBhdHRhY2htZW50czogW1xuICAgIC8vICAgIHtcbiAgIC8vICAgICAgICAgZmlsZU5hbWU6ICdhcnJvdzEucG5nJyxcbiAgIC8vICAgICAgICAgcGF0aDogJ2Jhc2U2NDovL2lWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCWUFBQUFvQ0FZQUFBRDZ4QXJtQUFBQUNYQklXWE1BQUJZbEFBQVdKUUZKVWlUd0FBQUFIR2xFVDFRQUFBQUNBQUFBQUFBQUFCUUFBQUFvQUFBQUZBQUFBQlFBQUFCNUVzSGlBQUFBQUVWSlJFRlVTQTFpWUtBaW1EaHhZandJVTlGSUJnYVFnWk1tVGZvUHdsT21USkduaXVISWhsTE54YU9Hd2lOcU5FeXBrd2xHazlSb2tvSVVmYU01aWpvNUNsaDlBQUFBQVAvL2tzV0Z2Z0FBQUVGSlJFRlVZNWc0Y1dMOHBFbVQvb013aU0xQVRUQnFPTmJRSEEyVzBXREJHZ0pZQlVkVHkyaXdZQTBCcklMREk3Vk1tVEpGSHF2M3lCVUVCUXNJZy9RREFKTnBjdjZ2K2sxWkFBQUFBRWxGVGtTdVFtQ0MnLFxuICAgLy8gICAgICAgICBtaW1lVHlwZTogJ2ltYWdlL3BuZydcbiAgIC8vICAgICB9LFxuICAgLy8gICAgIHtcbiAgIC8vICAgICAgICAgZmlsZU5hbWU6ICd0ZWxlcmlrLWxvZ28ucG5nJyxcbiAgIC8vICAgICAgICAgcGF0aDogbG9nb1BhdGgsXG4gICAvLyAgICAgICAgIG1pbWVUeXBlOiAnaW1hZ2UvcG5nJ1xuICAgLy8gICB9XVxuICAvL30pLnRoZW4oXG4gIC8vICBmdW5jdGlvbigpIHtcbiAgLy8gICAgY29uc29sZS5sb2coXCJFbWFpbCBjb21wb3NlciBjbG9zZWRcIik7XG4gIC8vICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgLy8gICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnIpO1xuICAvLyAgfSk7XG4gICAgfVxufSJdfQ==