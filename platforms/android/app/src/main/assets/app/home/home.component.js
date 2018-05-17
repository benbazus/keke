"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { ActivatedRoute } from '@angular/router';
//import { Observable } from "rxjs/Observable";
var frame_1 = require("tns-core-modules/ui/frame");
var topmostFrame = frame_1.topmost();
var page_1 = require("ui/page");
var animations_1 = require("@angular/animations");
var geolocation = require("nativescript-geolocation");
var enums_1 = require("ui/enums");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("Mapbox", function () { return require("nativescript-mapbox").MapboxView; });
var nativescript_directions_1 = require("nativescript-directions");
var geolocation_service_1 = require("~/shared/services/geolocation.service");
var google_play_service_1 = require("~/shared/services/google-play.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(geolocationService, _page, googleService) {
        // if (topmost().ios) {
        //   var navigationBar = topmost().ios.controller.navigationBar;
        //   navigationBar.translucent = false;
        //   navigationBar.setBackgroundImageForBarMetrics(UIImage.new(), UIBarMetrics.Default);
        //   navigationBar.shadowImage = UIImage.new();
        // }
        this.geolocationService = geolocationService;
        this._page = _page;
        this.googleService = googleService;
        this.directions = new nativescript_directions_1.Directions();
        //  this._page.actionBar.backgroundColor = "translucent";
        this._page.actionBarHidden = true;
        geolocation.enableLocationRequest(true);
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.directions.available().then(function (avail) {
            console.log(avail ? "Yes" : "No");
        });
        console.log("checking if geolocation is enabled");
        geolocation.isEnabled().then(function (enabled) {
            console.log("Is geolocation Enabled =", enabled);
            if (enabled) {
                _this.getLocationOnce();
                _this.watch();
            }
            else {
                _this.request();
            }
        }, function (e) {
            console.log("isEnabled error", e);
            _this.request();
        });
    };
    HomeComponent.prototype.request = function () {
        var _this = this;
        console.log("enableLocationRequest()");
        geolocation.enableLocationRequest().then(function () {
            console.log("location is enabled!");
            _this.watch();
        }, function (e) {
            console.log("Failed to enable location service", e);
        });
    };
    HomeComponent.prototype.watch = function () {
        var _this = this;
        console.log("watchLocation()");
        geolocation.watchLocation(function (location) {
            console.log(location);
            _this.startpointLatitude = location.latitude;
            _this.startpointLongitude = location.longitude;
            //  $set:
            // this.startpointLatitude = location.latitude;
            //  this.startpointLongitude = location.longitude;
        }, function (e) {
            console.log("failed to get location");
        }, {
            desiredAccuracy: enums_1.Accuracy.high,
            maximumAge: 5000,
            timeout: 20000
        });
    };
    HomeComponent.prototype.onMapReady = function (args) {
        this.mapbox = args.map;
        var nativeMapView = args.ios ? args.ios : args.android;
        console.log("Mapbox onMapReady for " +
            (args.ios ? "iOS" : "Android") +
            ", native object received: " +
            nativeMapView);
        args.map.addMarkers([
            {
                lat: this.startpointLatitude,
                lng: this.startpointLongitude,
                title: "You are here",
                //subtitle: 'Really really nice location',
                selected: true,
            }
        ]);
    };
    HomeComponent.prototype.onBookTap = function () {
        console.log("onBookTap");
        this.mapbox.getUserLocation().then(function (userLocation) {
            console.log("Current user location: " + userLocation.location.lat + ", " + userLocation.location.lng);
            console.log("Current user speed: " + userLocation.speed);
        });
    };
    HomeComponent.prototype.getLocationOnce = function () {
        var _this = this;
        geolocation
            .getCurrentLocation({ desiredAccuracy: enums_1.Accuracy.high, timeout: 5000 })
            .then(function (location) {
            console.log("startpointLatitude received: " + location.latitude);
            console.log("startpointLongitude received: " + location.longitude);
            _this.startpointLatitude = location.latitude;
            _this.startpointLongitude = location.longitude;
            _this.getCurrentAddress();
        })
            .catch(function (error) {
            console.log("Location error received: " + error);
        });
    };
    HomeComponent.prototype.getCurrentAddress = function () {
        var _this = this;
        console.log("latitude is: " +
            this.startpointLatitude +
            "longitude is:" +
            this.startpointLongitude);
        this.googleService
            .getCurrentLocation(this.startpointLatitude, this.startpointLongitude)
            .then(function (result) {
            //	console.log("The result is : ", result);
            _this.origin = result.results[0].formatted_address;
            console.log("The current address is : ", _this.origin);
        })
            .catch(function (error) {
            console.log("Unable to get current address. Error occured!:", error);
        });
    };
    HomeComponent.prototype.showSideDrawer = function (args) {
        console.log("Show SideDrawer tapped.");
        // Show sidedrawer ...
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "home",
            templateUrl: "./home/home.component.html",
            styleUrls: ["./home/home.component.css"],
            animations: [
                animations_1.trigger("flyInOut", [
                    animations_1.state("in", animations_1.style({ transform: "scale(1)", opacity: 1 })),
                    animations_1.transition("void => *", [
                        animations_1.style({ transform: "scale(0.9)", opacity: 0 }),
                        animations_1.animate("1000ms 100ms ease-out")
                    ])
                ]),
                animations_1.trigger("from-right", [
                    animations_1.state("in", animations_1.style({
                        opacity: 1,
                        transform: "translate(0)"
                    })),
                    animations_1.state("void", animations_1.style({
                        opacity: 0,
                        transform: "translate(20%)"
                    })),
                    animations_1.transition("void => *", [animations_1.animate("600ms 1500ms ease-out")])
                ])
            ]
        }),
        __metadata("design:paramtypes", [geolocation_service_1.GeolocationService, page_1.Page,
            google_play_service_1.GooglePlayService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUlsRCxtREFBbUQ7QUFDbkQsK0NBQStDO0FBQy9DLG1EQUEyRDtBQUMzRCxJQUFNLFlBQVksR0FBVSxlQUFPLEVBQUUsQ0FBQztBQUV0QyxnQ0FBK0I7QUFFL0Isa0RBTTZCO0FBTzdCLHNEQUF3RDtBQUN4RCxrQ0FBb0M7QUFFcEMsMEVBQXdFO0FBQ3hFLGtDQUFlLENBQUMsUUFBUSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxVQUFVLEVBQXpDLENBQXlDLENBQUMsQ0FBQztBQUMzRSxtRUFBcUQ7QUFDckQsNkVBQTJFO0FBQzNFLDZFQUEwRTtBQXNDMUU7SUF1QkUsdUJBQW9CLGtCQUFzQyxFQUFTLEtBQVcsRUFDbkUsYUFBZ0M7UUFFdkMsdUJBQXVCO1FBQ3ZCLGdFQUFnRTtRQUNoRSx1Q0FBdUM7UUFDdkMsd0ZBQXdGO1FBQ3hGLCtDQUErQztRQUMvQyxJQUFJO1FBUlksdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUFTLFVBQUssR0FBTCxLQUFLLENBQU07UUFDbkUsa0JBQWEsR0FBYixhQUFhLENBQW1CO1FBbkJuQyxlQUFVLEdBQUcsSUFBSSxvQ0FBVSxFQUFFLENBQUM7UUE0QnBDLHlEQUF5RDtRQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDbEMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQUEsaUJBc0JDO1FBckJDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSztZQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFD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LENBQUM7Z0JBQ0Ysb0JBQU8sQ0FBQyxZQUFZLEVBQUU7b0JBQ3BCLGtCQUFLLENBQ0gsSUFBSSxFQUNKLGtCQUFLLENBQUM7d0JBQ0osT0FBTyxFQUFFLENBQUM7d0JBQ1YsU0FBUyxFQUFFLGNBQWM7cUJBQzFCLENBQUMsQ0FDSDtvQkFDRCxrQkFBSyxDQUNILE1BQU0sRUFDTixrQkFBSyxDQUFDO3dCQUNKLE9BQU8sRUFBRSxDQUFDO3dCQUNWLFNBQVMsRUFBRSxnQkFBZ0I7cUJBQzVCLENBQUMsQ0FDSDtvQkFDRCx1QkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO2lCQUM1RCxDQUFDO2FBQ0g7U0FDRixDQUFDO3lDQXdCd0Msd0NBQWtCLEVBQWdCLFdBQUk7WUFDcEQsdUNBQWlCO09BeEJoQyxhQUFhLENBME16QjtJQUFELG9CQUFDO0NBQUEsQUExTUQsSUEwTUM7QUExTVksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG4vL2ltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XG4vL2ltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3VpL3RleHQtZmllbGQnO1xuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbi8vaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuLy9pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgRnJhbWUsIHRvcG1vc3QgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9mcmFtZVwiO1xuY29uc3QgdG9wbW9zdEZyYW1lOiBGcmFtZSA9IHRvcG1vc3QoKTtcblxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgYW5pbWF0ZSxcbiAgdHJhbnNpdGlvblxufSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xuaW1wb3J0IHtcbiAgTWFwYm94LFxuICBNYXBTdHlsZSxcbiAgTWFwYm94Vmlld0FwaSxcbiAgVmlld3BvcnQgYXMgTWFwYm94Vmlld3BvcnRcbn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1tYXBib3hcIjtcbmltcG9ydCAqIGFzIGdlb2xvY2F0aW9uIGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcbmltcG9ydCB7IEFjY3VyYWN5IH0gZnJvbSBcInVpL2VudW1zXCI7XG5cbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5yZWdpc3RlckVsZW1lbnQoXCJNYXBib3hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1tYXBib3hcIikuTWFwYm94Vmlldyk7XG5pbXBvcnQgeyBEaXJlY3Rpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kaXJlY3Rpb25zXCI7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgR29vZ2xlUGxheVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvZ29vZ2xlLXBsYXkuc2VydmljZVwiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwifi9tb2RlbHMvbG9jYXRpb25SZXNwb25zZVwiO1xuXG5cbmRlY2xhcmUgdmFyIFVJSW1hZ2U6IGFueTtcbmRlY2xhcmUgdmFyIFVJQmFyTWV0cmljczogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiaG9tZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUvaG9tZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vaG9tZS9ob21lLmNvbXBvbmVudC5jc3NcIl0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKFwiZmx5SW5PdXRcIiwgW1xuICAgICAgc3RhdGUoXCJpblwiLCBzdHlsZSh7IHRyYW5zZm9ybTogXCJzY2FsZSgxKVwiLCBvcGFjaXR5OiAxIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oXCJ2b2lkID0+ICpcIiwgW1xuICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogXCJzY2FsZSgwLjkpXCIsIG9wYWNpdHk6IDAgfSksXG4gICAgICAgIGFuaW1hdGUoXCIxMDAwbXMgMTAwbXMgZWFzZS1vdXRcIilcbiAgICAgIF0pXG4gICAgXSksXG4gICAgdHJpZ2dlcihcImZyb20tcmlnaHRcIiwgW1xuICAgICAgc3RhdGUoXG4gICAgICAgIFwiaW5cIixcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgwKVwiXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgIFwidm9pZFwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDIwJSlcIlxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXCJ2b2lkID0+ICpcIiwgW2FuaW1hdGUoXCI2MDBtcyAxNTAwbXMgZWFzZS1vdXRcIildKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblxuICBvcmlnaW46IGFueTtcbiAgcHJpdmF0ZSBtYXBib3g6IE1hcGJveDtcbiAgcHJpdmF0ZSBkaXJlY3Rpb25zID0gbmV3IERpcmVjdGlvbnMoKTtcblxuICBwdWJsaWMgc3RhcnRwb2ludExvbmdpdHVkZTogbnVtYmVyO1xuICBwdWJsaWMgc3RhcnRwb2ludExhdGl0dWRlOiBudW1iZXI7XG4gIHB1YmxpYyBlbmRwb2ludExvbmdpdHVkZTogbnVtYmVyO1xuICBwdWJsaWMgZW5kcG9pbnRMYXRpdHVkZTogbnVtYmVyO1xuICBwdWJsaWMgdGltZXN0YW1wOiBzdHJpbmc7XG5cbiAgcHVibGljIGhvcml6b250YWxBY2N1cmFjeTogbnVtYmVyO1xuICBwdWJsaWMgdmVydGljYWxBY2N1cmFjeTogbnVtYmVyO1xuICBwdWJsaWMgYWx0aXR1ZGU6IG51bWJlcjtcbiAgcHVibGljIHNwZWVkOiBudW1iZXI7XG5cblxuICBwdWJsaWMgcG9zaXRpb246IFBvc2l0aW9uW107XG4gIFxuXG4gIFxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdlb2xvY2F0aW9uU2VydmljZTogR2VvbG9jYXRpb25TZXJ2aWNlLHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG4gICAgIHByaXZhdGUgZ29vZ2xlU2VydmljZTogR29vZ2xlUGxheVNlcnZpY2UpIHtcblxuICAgICAgLy8gaWYgKHRvcG1vc3QoKS5pb3MpIHtcbiAgICAgIC8vICAgdmFyIG5hdmlnYXRpb25CYXIgPSB0b3Btb3N0KCkuaW9zLmNvbnRyb2xsZXIubmF2aWdhdGlvbkJhcjtcbiAgICAgIC8vICAgbmF2aWdhdGlvbkJhci50cmFuc2x1Y2VudCA9IGZhbHNlO1xuICAgICAgLy8gICBuYXZpZ2F0aW9uQmFyLnNldEJhY2tncm91bmRJbWFnZUZvckJhck1ldHJpY3MoVUlJbWFnZS5uZXcoKSwgVUlCYXJNZXRyaWNzLkRlZmF1bHQpO1xuICAgICAgLy8gICBuYXZpZ2F0aW9uQmFyLnNoYWRvd0ltYWdlID0gVUlJbWFnZS5uZXcoKTtcbiAgICAgIC8vIH1cblxuICAgIC8vICB0aGlzLl9wYWdlLmFjdGlvbkJhci5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zbHVjZW50XCI7XG4gICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIGdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCh0cnVlKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGlyZWN0aW9ucy5hdmFpbGFibGUoKS50aGVuKGF2YWlsID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGF2YWlsID8gXCJZZXNcIiA6IFwiTm9cIik7XG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZyhcImNoZWNraW5nIGlmIGdlb2xvY2F0aW9uIGlzIGVuYWJsZWRcIik7XG4gICAgZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkudGhlbihcbiAgICAgIGVuYWJsZWQgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIklzIGdlb2xvY2F0aW9uIEVuYWJsZWQgPVwiLCBlbmFibGVkKTtcbiAgICAgICAgaWYgKGVuYWJsZWQpIHtcblx0XHRcdFx0XHR0aGlzLmdldExvY2F0aW9uT25jZSgpO1xuXHRcdFx0XHRcdHRoaXMud2F0Y2goKTtcdFx0XHRcdFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVxdWVzdCgpO1xuICAgICAgICB9ICAgICAgICBcbiAgICAgIH0sXG4gICAgICBlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJpc0VuYWJsZWQgZXJyb3JcIiwgZSk7XG4gICAgICAgIHRoaXMucmVxdWVzdCgpO1xuICAgICAgfVxuXHRcdCk7XG5cdFx0XG4gIH1cblxuICByZXF1ZXN0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiZW5hYmxlTG9jYXRpb25SZXF1ZXN0KClcIik7XG4gICAgZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCkudGhlbihcbiAgICAgICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2NhdGlvbiBpcyBlbmFibGVkIVwiKTtcbiAgICAgICAgdGhpcy53YXRjaCgpO1xuICAgICAgfSxcbiAgICAgIGUgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBlbmFibGUgbG9jYXRpb24gc2VydmljZVwiLCBlKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgd2F0Y2goKSB7XG4gICAgY29uc29sZS5sb2coXCJ3YXRjaExvY2F0aW9uKClcIik7XG4gICAgZ2VvbG9jYXRpb24ud2F0Y2hMb2NhdGlvbihcbiAgICAgIGxvY2F0aW9uID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cobG9jYXRpb24pO1xuICAgICAgICB0aGlzLnN0YXJ0cG9pbnRMYXRpdHVkZSA9IGxvY2F0aW9uLmxhdGl0dWRlO1xuICAgICAgICB0aGlzLnN0YXJ0cG9pbnRMb25naXR1ZGUgPSBsb2NhdGlvbi5sb25naXR1ZGU7XG5cbiAgICAgIC8vICAkc2V0OlxuICAgICAgIC8vIHRoaXMuc3RhcnRwb2ludExhdGl0dWRlID0gbG9jYXRpb24ubGF0aXR1ZGU7XG4gICAgICAvLyAgdGhpcy5zdGFydHBvaW50TG9uZ2l0dWRlID0gbG9jYXRpb24ubG9uZ2l0dWRlO1xuICAgICAgfSxcbiAgICAgIGUgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImZhaWxlZCB0byBnZXQgbG9jYXRpb25cIik7XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IEFjY3VyYWN5LmhpZ2gsXG4gICAgICAgIG1heGltdW1BZ2U6IDUwMDAsXG4gICAgICAgIHRpbWVvdXQ6IDIwMDAwXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gICBvbk1hcFJlYWR5KGFyZ3MpIHtcbiAgICAgdGhpcy5tYXBib3ggPSBhcmdzLm1hcDtcbiAgICAgdmFyIG5hdGl2ZU1hcFZpZXcgPSBhcmdzLmlvcyA/IGFyZ3MuaW9zIDogYXJncy5hbmRyb2lkO1xuICAgICBjb25zb2xlLmxvZyhcbiAgICAgICBcIk1hcGJveCBvbk1hcFJlYWR5IGZvciBcIiArXG4gICAgICAgICAoYXJncy5pb3MgPyBcImlPU1wiIDogXCJBbmRyb2lkXCIpICtcbiAgICAgICAgIFwiLCBuYXRpdmUgb2JqZWN0IHJlY2VpdmVkOiBcIiArXG4gICAgICAgICBuYXRpdmVNYXBWaWV3XG4gICAgICk7XG4gICAgIGFyZ3MubWFwLmFkZE1hcmtlcnMoW1xuICAgICAgIHtcbiAgICAgICAgIGxhdDogdGhpcy5zdGFydHBvaW50TGF0aXR1ZGUsXG4gICAgICAgICBsbmc6IHRoaXMuc3RhcnRwb2ludExvbmdpdHVkZSxcbiAgICAgICAgIHRpdGxlOiBcIllvdSBhcmUgaGVyZVwiLFxuICAgICAgICAgLy9zdWJ0aXRsZTogJ1JlYWxseSByZWFsbHkgbmljZSBsb2NhdGlvbicsXG4gICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICAgICB9XG4gICAgIF0pO1xuICAgfVxuXG5cdFxuICBvbkJvb2tUYXAoKSB7XG5cdFx0Y29uc29sZS5sb2coXCJvbkJvb2tUYXBcIik7XG5cdFx0dGhpcy5tYXBib3guZ2V0VXNlckxvY2F0aW9uKCkudGhlbihcbiAgICAgIGZ1bmN0aW9uKHVzZXJMb2NhdGlvbikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgdXNlciBsb2NhdGlvbjogXCIgKyAgdXNlckxvY2F0aW9uLmxvY2F0aW9uLmxhdCArIFwiLCBcIiArIHVzZXJMb2NhdGlvbi5sb2NhdGlvbi5sbmcpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgdXNlciBzcGVlZDogXCIgKyAgdXNlckxvY2F0aW9uLnNwZWVkKTtcbiAgICAgIH0pO1xuICB9XG5cblx0Z2V0TG9jYXRpb25PbmNlKCkge1xuICAgIGdlb2xvY2F0aW9uXG4gICAgICAuZ2V0Q3VycmVudExvY2F0aW9uKHsgZGVzaXJlZEFjY3VyYWN5OiBBY2N1cmFjeS5oaWdoLCB0aW1lb3V0OiA1MDAwIH0pXG4gICAgICAudGhlbihsb2NhdGlvbiA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRwb2ludExhdGl0dWRlIHJlY2VpdmVkOiBcIiArIGxvY2F0aW9uLmxhdGl0dWRlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydHBvaW50TG9uZ2l0dWRlIHJlY2VpdmVkOiBcIiArIGxvY2F0aW9uLmxvbmdpdHVkZSk7XG4gICAgICAgIHRoaXMuc3RhcnRwb2ludExhdGl0dWRlID0gbG9jYXRpb24ubGF0aXR1ZGU7XG4gICAgICAgIHRoaXMuc3RhcnRwb2ludExvbmdpdHVkZSA9IGxvY2F0aW9uLmxvbmdpdHVkZTtcbiAgICAgICAgIHRoaXMuZ2V0Q3VycmVudEFkZHJlc3MoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxvY2F0aW9uIGVycm9yIHJlY2VpdmVkOiBcIiArIGVycm9yKTtcbiAgICAgIH0pO1xuXHR9XG5cdFxuICAgZ2V0Q3VycmVudEFkZHJlc3MoKSB7XG4gICAgIGNvbnNvbGUubG9nKFxuICAgICAgIFwibGF0aXR1ZGUgaXM6IFwiICtcbiAgICAgICAgIHRoaXMuc3RhcnRwb2ludExhdGl0dWRlICtcbiAgICAgICAgIFwibG9uZ2l0dWRlIGlzOlwiICtcbiAgICAgICAgIHRoaXMuc3RhcnRwb2ludExvbmdpdHVkZVxuICAgICApO1xuICAgICB0aGlzLmdvb2dsZVNlcnZpY2VcbiAgICAgICAuZ2V0Q3VycmVudExvY2F0aW9uKHRoaXMuc3RhcnRwb2ludExhdGl0dWRlLCB0aGlzLnN0YXJ0cG9pbnRMb25naXR1ZGUpXG4gICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcblx0IFx0XHQvL1x0Y29uc29sZS5sb2coXCJUaGUgcmVzdWx0IGlzIDogXCIsIHJlc3VsdCk7XG5cdCBcdFx0XHR0aGlzLm9yaWdpbiA9IHJlc3VsdC5yZXN1bHRzWzBdLmZvcm1hdHRlZF9hZGRyZXNzO1xuXHQgXHRcdFx0Y29uc29sZS5sb2coXCJUaGUgY3VycmVudCBhZGRyZXNzIGlzIDogXCIsIHRoaXMub3JpZ2luKTtcbiAgICAgICB9KVxuICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICBjb25zb2xlLmxvZyhcIlVuYWJsZSB0byBnZXQgY3VycmVudCBhZGRyZXNzLiBFcnJvciBvY2N1cmVkITpcIiwgZXJyb3IpO1xuICAgICAgIH0pO1xuXHQgfVxuXG4gICAgc2hvd1NpZGVEcmF3ZXIoYXJnczogRXZlbnREYXRhKSB7XG4gICAgY29uc29sZS5sb2coXCJTaG93IFNpZGVEcmF3ZXIgdGFwcGVkLlwiKTtcbiAgICAvLyBTaG93IHNpZGVkcmF3ZXIgLi4uXG59XG5cbi8vICAgcHVibGljIG9uTWFwUmVhZHkoYXJncykge1xuLy8gICAgIHRoaXMubWFwYm94ID0gYXJncy5tYXA7XG4vLyAgICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UuZ2V0TG9jYXRpb24oKS50aGVuKCgpID0+IHtcbi8vICAgICAgICAgdGhpcy5sb2FkSW5pdGFsTG9jYXRpb24oKS50aGVuKFxuLy8gICAgICAgICAgICAgcGhvdG9zID0+IHtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gcGhvdG9zLm1hcCgocGhvdG8pID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgcGhvdG8uZGlzdGFuY2UgPSB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5nZXREaXN0YW5jZUZyb20oXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KHBob3RvLmxhdGl0dWRlKSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQocGhvdG8ubG9uZ2l0dWRlKSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwaG90bztcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICAgICAgICB0aGlzLmRyb3BNYXJrZXJzKCk7XG4vLyAgICAgICAgICAgICAgICAgdGhpcy5tYXBib3guc2V0Q2VudGVyKHtcbi8vICAgICAgICAgICAgICAgICAgICAgbGF0OiB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5sYXRpdHVkZSxcbi8vICAgICAgICAgICAgICAgICAgICAgbG5nOiB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5sb25naXR1ZGUsXG4vLyAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlXG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbi8vICAgICAgICAgfSk7XG4vLyB9XG5cbi8vIHB1YmxpYyBkcm9wTWFya2VycygpIHtcbi8vICAgbGV0IG1hcmtlcnMgPSB0aGlzLnBvc2l0aW9uLm1hcCgocGhvdG86IFBvc2l0aW9uLCBpbmRleDogbnVtYmVyKSA9PiB7XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgIGxhdDogcGhvdG8ubGF0aXR1ZGUsXG4vLyAgICAgICAgICAgbG5nOiBwaG90by5sb25naXR1ZGUsXG4vLyAgICAgICB9XG4vLyAgIH0pO1xuLy8gICB0aGlzLm1hcGJveC5hZGRNYXJrZXJzKG1hcmtlcnMpO1xuLy8gfVxuXG4vLyAgIHB1YmxpYyBsb2FkSW5pdGFsTG9jYXRpb24oKSB7XG4vLyAgICAgcmV0dXJuIHRoaXMuZ29vZ2xlU2VydmljZS5nZXRDdXJyZW50TG9jYXRpb24odGhpcy5nZW9sb2NhdGlvblNlcnZpY2UubGF0aXR1ZGUsIHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmxvbmdpdHVkZSk7XG4vLyAgIH1cbn1cbiJdfQ==