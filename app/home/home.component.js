"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { ActivatedRoute } from '@angular/router';
//import { Observable } from "rxjs/Observable";
//import { ObservableProperty } from '~/shared/observable-decorator';
var frame_1 = require("tns-core-modules/ui/frame");
var topmostFrame = frame_1.topmost();
var page_1 = require("ui/page");
var animations_1 = require("@angular/animations");
var geolocation = require("nativescript-geolocation");
var enums_1 = require("ui/enums");
var appversion = require("nativescript-appversion");
var nativescript_directions_1 = require("nativescript-directions");
var geolocation_service_1 = require("~/shared/services/geolocation.service");
var google_play_service_1 = require("~/shared/services/google-play.service");
var router_1 = require("@angular/router");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(zone, geolocationService, _page, googleService, router) {
        // if (topmost().ios) {
        //   var navigationBar = topmost().ios.controller.navigationBar;
        //   navigationBar.translucent = false;
        //   navigationBar.setBackgroundImageForBarMetrics(UIImage.new(), UIBarMetrics.Default);
        //   navigationBar.shadowImage = UIImage.new();
        // }
        this.zone = zone;
        this.geolocationService = geolocationService;
        this._page = _page;
        this.googleService = googleService;
        this.router = router;
        this.directions = new nativescript_directions_1.Directions();
        //  this._page.actionBar.backgroundColor = "translucent";
        // this._page.actionBarHidden = true;
        geolocation.enableLocationRequest(true);
    }
    HomeComponent.prototype.getVersionName = function () {
        appversion.getVersionName().then(function (v) {
            console.log("Your app's version is: " + v);
        });
    };
    HomeComponent.prototype.getVersionCode = function () {
        appversion.getVersionCode().then(function (v) {
            console.log("Your app's version code is: " + v);
        });
    };
    HomeComponent.prototype.getAppId = function () {
        appversion.getAppId().then(function (id) {
            console.log("Your app's id is: " + id);
        });
    };
    HomeComponent.prototype.enableLocationServices = function () {
        var _this = this;
        geolocation.isEnabled().then(function (enabled) {
            if (!enabled) {
                geolocation.enableLocationRequest().then(function () {
                    _this.showLocation();
                    _this.watch();
                });
            }
            else {
                _this.showLocation();
                _this.request();
            }
        });
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("checking if geolocation is enabled");
        geolocation.isEnabled().then(function (enabled) {
            console.log("Is geolocation Enabled =", enabled);
            if (enabled) {
                _this.showLocation();
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
            // this.startpointLatitude.set("startpointLatitude", location.latitude);
            _this.startpointLatitude = location.latitude;
            _this.startpointLongitude = location.longitude;
            // this.Longitude = location.longitude;
            // this.Latitude = location.latitude;
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
                selected: true
            }
        ]);
        this.centerMap(args);
    };
    HomeComponent.prototype.centerMap = function (args) {
        this.mapbox.setCenter({
            lat: this.startpointLatitude,
            lng: this.startpointLongitude,
            animated: false
        });
    };
    HomeComponent.prototype.onBookTap = function () {
        console.log("onBookTap");
        this.mapbox.getUserLocation().then(function (userLocation) {
            console.log("Current user location: " +
                userLocation.location.lat +
                ", " +
                userLocation.location.lng);
            console.log("Current user speed: " + userLocation.speed);
        });
    };
    HomeComponent.prototype.showLocation = function () {
        var _this = this;
        geolocation
            .getCurrentLocation({ desiredAccuracy: enums_1.Accuracy.high, updateDistance: 10, minimumUpdateTime: 1000 * 1 })
            .then(function (location) {
            console.log("startpointLatitude received: " + location.latitude);
            console.log("startpointLongitude received: " + location.longitude);
            _this.startpointLatitude = location.latitude;
            _this.startpointLongitude = location.longitude;
            //  this.Longitude = location.longitude;
            //  this.Latitude = location.latitude;
            _this.mapbox.setCenter({
                lat: location.latitude,
                lng: location.longitude,
                animated: true
            });
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
            _this.currentGeoLocation = result;
            _this.origin = result.results[0].formatted_address;
            console.log("The current address is : ", _this.origin);
        })
            .catch(function (error) {
            console.log("Unable to get current address. Error occured!:", error);
        });
    };
    HomeComponent.prototype.onStartBookingTap = function () {
        console.log(">>>>>>>>Start search Harrssed <<<<<<<<<<: ");
        var navigationExtras = {
            queryParams: { currentGeoLocation: this.currentGeoLocation }
        };
        this.router.navigate(["search"], navigationExtras);
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
        __metadata("design:paramtypes", [core_1.NgZone,
            geolocation_service_1.GeolocationService,
            page_1.Page,
            google_play_service_1.GooglePlayService,
            router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRDtBQUkxRCxtREFBbUQ7QUFDbkQsK0NBQStDO0FBRS9DLHFFQUFxRTtBQUVyRSxtREFBMkQ7QUFDM0QsSUFBTSxZQUFZLEdBQVUsZUFBTyxFQUFFLENBQUM7QUFFdEMsZ0NBQStCO0FBRS9CLGtEQU02QjtBQU83QixzREFBd0Q7QUFDeEQsa0NBQW9DO0FBQ3BDLG9EQUFzRDtBQUN0RCxtRUFBcUQ7QUFDckQsNkVBQTJFO0FBQzNFLDZFQUEwRTtBQUkxRSwwQ0FBMkU7QUFvQzNFO0lBb0JFLHVCQUNVLElBQVksRUFDWixrQkFBc0MsRUFDdEMsS0FBVyxFQUNYLGFBQWdDLEVBQy9CLE1BQWM7UUFHdkIsdUJBQXVCO1FBQ3ZCLGdFQUFnRTtRQUNoRSx1Q0FBdUM7UUFDdkMsd0ZBQXdGO1FBQ3hGLCtDQUErQztRQUMvQyxJQUFJO1FBWkksU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQUMvQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBdEJqQixlQUFVLEdBQUcsSUFBSSxvQ0FBVSxFQUFFLENBQUM7UUFnQ3BDLHlEQUF5RDtRQUMxRCxxQ0FBcUM7UUFDcEMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFHSCxzQ0FBYyxHQUFkO1FBQ0csVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLENBQVM7WUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxzQ0FBYyxHQUFkO1FBQ0cs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bnQsIE5nWm9uZSwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbi8vaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbi8vaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndWkvdGV4dC1maWVsZCc7XG5pbXBvcnQgeyBFdmVudERhdGEsIE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG4vL2ltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbi8vaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcblxuLy9pbXBvcnQgeyBPYnNlcnZhYmxlUHJvcGVydHkgfSBmcm9tICd+L3NoYXJlZC9vYnNlcnZhYmxlLWRlY29yYXRvcic7XG5cbmltcG9ydCB7IEZyYW1lLCB0b3Btb3N0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIjtcbmNvbnN0IHRvcG1vc3RGcmFtZTogRnJhbWUgPSB0b3Btb3N0KCk7XG5cbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuXG5pbXBvcnQge1xuICB0cmlnZ2VyLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIGFuaW1hdGUsXG4gIHRyYW5zaXRpb25cbn0gZnJvbSBcIkBhbmd1bGFyL2FuaW1hdGlvbnNcIjtcbmltcG9ydCB7XG4gIE1hcGJveCxcbiAgTWFwU3R5bGUsXG4gIE1hcGJveFZpZXdBcGksXG4gIFZpZXdwb3J0IGFzIE1hcGJveFZpZXdwb3J0XG59IGZyb20gXCJuYXRpdmVzY3JpcHQtbWFwYm94XCI7XG5pbXBvcnQgKiBhcyBnZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBBY2N1cmFjeSB9IGZyb20gXCJ1aS9lbnVtc1wiO1xuaW1wb3J0ICogYXMgYXBwdmVyc2lvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWFwcHZlcnNpb25cIjtcbmltcG9ydCB7IERpcmVjdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRpcmVjdGlvbnNcIjtcbmltcG9ydCB7IEdlb2xvY2F0aW9uU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9nZW9sb2NhdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBHb29nbGVQbGF5U2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9nb29nbGUtcGxheS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCJ+L21vZGVscy9sb2NhdGlvblJlc3BvbnNlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlUHJvcGVydHkgfSBmcm9tIFwifi9zaGFyZWQvb2JzZXJ2YWJsZS1kZWNvcmF0b3JcIjtcblxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuZGVjbGFyZSB2YXIgVUlJbWFnZTogYW55O1xuZGVjbGFyZSB2YXIgVUlCYXJNZXRyaWNzOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJob21lXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS9ob21lLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9ob21lL2hvbWUuY29tcG9uZW50LmNzc1wiXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoXCJmbHlJbk91dFwiLCBbXG4gICAgICBzdGF0ZShcImluXCIsIHN0eWxlKHsgdHJhbnNmb3JtOiBcInNjYWxlKDEpXCIsIG9wYWNpdHk6IDEgfSkpLFxuICAgICAgdHJhbnNpdGlvbihcInZvaWQgPT4gKlwiLCBbXG4gICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiBcInNjYWxlKDAuOSlcIiwgb3BhY2l0eTogMCB9KSxcbiAgICAgICAgYW5pbWF0ZShcIjEwMDBtcyAxMDBtcyBlYXNlLW91dFwiKVxuICAgICAgXSlcbiAgICBdKSxcbiAgICB0cmlnZ2VyKFwiZnJvbS1yaWdodFwiLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJpblwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDApXCJcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJ2b2lkXCIsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUoMjAlKVwiXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbihcInZvaWQgPT4gKlwiLCBbYW5pbWF0ZShcIjYwMG1zIDE1MDBtcyBlYXNlLW91dFwiKV0pXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgb3JpZ2luOiBhbnk7XG4gIHByaXZhdGUgbWFwYm94OiBNYXBib3g7XG4gIHByaXZhdGUgZGlyZWN0aW9ucyA9IG5ldyBEaXJlY3Rpb25zKCk7XG5cbiAgcHVibGljIHN0YXJ0cG9pbnRMb25naXR1ZGU6IG51bWJlcjtcbiAgcHVibGljIHN0YXJ0cG9pbnRMYXRpdHVkZTogbnVtYmVyO1xuICBwdWJsaWMgZW5kcG9pbnRMb25naXR1ZGU6IG51bWJlcjtcbiAgcHVibGljIGVuZHBvaW50TGF0aXR1ZGU6IG51bWJlcjtcbiAgcHVibGljIHRpbWVzdGFtcDogc3RyaW5nO1xuXG4gIHB1YmxpYyBob3Jpem9udGFsQWNjdXJhY3k6IG51bWJlcjtcbiAgcHVibGljIHZlcnRpY2FsQWNjdXJhY3k6IG51bWJlcjtcbiAgcHVibGljIGFsdGl0dWRlOiBudW1iZXI7XG4gIHB1YmxpYyBzcGVlZDogbnVtYmVyO1xuXG4gIHB1YmxpYyBwb3NpdGlvbjogUG9zaXRpb25bXTtcblxuICBjdXJyZW50R2VvTG9jYXRpb246IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGdlb2xvY2F0aW9uU2VydmljZTogR2VvbG9jYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSBnb29nbGVTZXJ2aWNlOiBHb29nbGVQbGF5U2VydmljZSxcbiAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuXG4gICkge1xuICAgIC8vIGlmICh0b3Btb3N0KCkuaW9zKSB7XG4gICAgLy8gICB2YXIgbmF2aWdhdGlvbkJhciA9IHRvcG1vc3QoKS5pb3MuY29udHJvbGxlci5uYXZpZ2F0aW9uQmFyO1xuICAgIC8vICAgbmF2aWdhdGlvbkJhci50cmFuc2x1Y2VudCA9IGZhbHNlO1xuICAgIC8vICAgbmF2aWdhdGlvbkJhci5zZXRCYWNrZ3JvdW5kSW1hZ2VGb3JCYXJNZXRyaWNzKFVJSW1hZ2UubmV3KCksIFVJQmFyTWV0cmljcy5EZWZhdWx0KTtcbiAgICAvLyAgIG5hdmlnYXRpb25CYXIuc2hhZG93SW1hZ2UgPSBVSUltYWdlLm5ldygpO1xuICAgIC8vIH1cblxuICAgIC8vICB0aGlzLl9wYWdlLmFjdGlvbkJhci5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zbHVjZW50XCI7XG4gICAvLyB0aGlzLl9wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KHRydWUpO1xuICB9XG5cblxuZ2V0VmVyc2lvbk5hbWUoKSB7XG4gICBhcHB2ZXJzaW9uLmdldFZlcnNpb25OYW1lKCkudGhlbigodjogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIllvdXIgYXBwJ3MgdmVyc2lvbiBpczogXCIgKyB2KTtcbiAgfSk7XG59XG5cbmdldFZlcnNpb25Db2RlKCkge1xuICAgYXBwdmVyc2lvbi5nZXRWZXJzaW9uQ29kZSgpLnRoZW4oKHY6IHN0cmluZykgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJZb3VyIGFwcCdzIHZlcnNpb24gY29kZSBpczogXCIgKyB2KTtcbiAgfSk7XG59XG5cblxuZ2V0QXBwSWQoKSB7XG4gIGFwcHZlcnNpb24uZ2V0QXBwSWQoKS50aGVuKChpZDogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIllvdXIgYXBwJ3MgaWQgaXM6IFwiICsgaWQpO1xuICB9KTtcbn1cblxuICBlbmFibGVMb2NhdGlvblNlcnZpY2VzKCk6IHZvaWQge1xuICAgIGdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpLnRoZW4oZW5hYmxlZCA9PiB7XG4gICAgICBpZiAoIWVuYWJsZWQpIHtcbiAgICAgICAgZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zaG93TG9jYXRpb24oKTtcbiAgICAgICAgICB0aGlzLndhdGNoKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93TG9jYXRpb24oKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuIFxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2hlY2tpbmcgaWYgZ2VvbG9jYXRpb24gaXMgZW5hYmxlZFwiKTtcbiAgICBnZW9sb2NhdGlvbi5pc0VuYWJsZWQoKS50aGVuKFxuICAgICAgZW5hYmxlZCA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSXMgZ2VvbG9jYXRpb24gRW5hYmxlZCA9XCIsIGVuYWJsZWQpO1xuICAgICAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgICAgIHRoaXMuc2hvd0xvY2F0aW9uKCk7XG4gICAgICAgICAgdGhpcy53YXRjaCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXNFbmFibGVkIGVycm9yXCIsIGUpO1xuICAgICAgICB0aGlzLnJlcXVlc3QoKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcmVxdWVzdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcImVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpXCIpO1xuICAgIGdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpLnRoZW4oXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9jYXRpb24gaXMgZW5hYmxlZCFcIik7XG4gICAgICAgIHRoaXMud2F0Y2goKTtcbiAgICAgIH0sXG4gICAgICBlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gZW5hYmxlIGxvY2F0aW9uIHNlcnZpY2VcIiwgZSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHdhdGNoKCkge1xuICAgIGNvbnNvbGUubG9nKFwid2F0Y2hMb2NhdGlvbigpXCIpO1xuICAgIGdlb2xvY2F0aW9uLndhdGNoTG9jYXRpb24oXG4gICAgICBsb2NhdGlvbiA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGxvY2F0aW9uKTtcbiAgICAgICAgLy8gdGhpcy5zdGFydHBvaW50TGF0aXR1ZGUuc2V0KFwic3RhcnRwb2ludExhdGl0dWRlXCIsIGxvY2F0aW9uLmxhdGl0dWRlKTtcbiAgICAgICAgdGhpcy5zdGFydHBvaW50TGF0aXR1ZGUgPSBsb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgdGhpcy5zdGFydHBvaW50TG9uZ2l0dWRlID0gbG9jYXRpb24ubG9uZ2l0dWRlO1xuXG4gICAgICAgLy8gdGhpcy5Mb25naXR1ZGUgPSBsb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgICAgLy8gdGhpcy5MYXRpdHVkZSA9IGxvY2F0aW9uLmxhdGl0dWRlO1xuICAgICAgfSxcbiAgICAgIGUgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImZhaWxlZCB0byBnZXQgbG9jYXRpb25cIik7XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IEFjY3VyYWN5LmhpZ2gsXG4gICAgICAgIG1heGltdW1BZ2U6IDUwMDAsXG4gICAgICAgIHRpbWVvdXQ6IDIwMDAwXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG9uTWFwUmVhZHkoYXJncykge1xuICAgIHRoaXMubWFwYm94ID0gYXJncy5tYXA7XG4gICAgdmFyIG5hdGl2ZU1hcFZpZXcgPSBhcmdzLmlvcyA/IGFyZ3MuaW9zIDogYXJncy5hbmRyb2lkO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgXCJNYXBib3ggb25NYXBSZWFkeSBmb3IgXCIgK1xuICAgICAgICAoYXJncy5pb3MgPyBcImlPU1wiIDogXCJBbmRyb2lkXCIpICtcbiAgICAgICAgXCIsIG5hdGl2ZSBvYmplY3QgcmVjZWl2ZWQ6IFwiICtcbiAgICAgICAgbmF0aXZlTWFwVmlld1xuICAgICk7XG4gICAgYXJncy5tYXAuYWRkTWFya2VycyhbXG4gICAgICB7XG4gICAgICAgIGxhdDogdGhpcy5zdGFydHBvaW50TGF0aXR1ZGUsXG4gICAgICAgIGxuZzogdGhpcy5zdGFydHBvaW50TG9uZ2l0dWRlLFxuICAgICAgICB0aXRsZTogXCJZb3UgYXJlIGhlcmVcIixcbiAgICAgICAgLy9zdWJ0aXRsZTogJ1JlYWxseSByZWFsbHkgbmljZSBsb2NhdGlvbicsXG4gICAgICAgIHNlbGVjdGVkOiB0cnVlXG4gICAgICB9XG4gICAgXSk7XG5cbiAgICB0aGlzLmNlbnRlck1hcChhcmdzKTtcbiAgfVxuXG4gcHVibGljIGNlbnRlck1hcChhcmdzOiBhbnkpIHtcbiAgICAgICAgICAgICAgdGhpcy5tYXBib3guc2V0Q2VudGVyKHtcbiAgICAgICAgICAgIGxhdDogdGhpcy5zdGFydHBvaW50TGF0aXR1ZGUsXG4gICAgICAgICAgICBsbmc6IHRoaXMuc3RhcnRwb2ludExvbmdpdHVkZSxcbiAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgb25Cb29rVGFwKCkge1xuICAgIGNvbnNvbGUubG9nKFwib25Cb29rVGFwXCIpO1xuICAgIHRoaXMubWFwYm94LmdldFVzZXJMb2NhdGlvbigpLnRoZW4oZnVuY3Rpb24odXNlckxvY2F0aW9uKSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJDdXJyZW50IHVzZXIgbG9jYXRpb246IFwiICtcbiAgICAgICAgICB1c2VyTG9jYXRpb24ubG9jYXRpb24ubGF0ICtcbiAgICAgICAgICBcIiwgXCIgK1xuICAgICAgICAgIHVzZXJMb2NhdGlvbi5sb2NhdGlvbi5sbmdcbiAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgdXNlciBzcGVlZDogXCIgKyB1c2VyTG9jYXRpb24uc3BlZWQpO1xuICAgIH0pO1xuICB9XG5cbiAgc2hvd0xvY2F0aW9uKCkge1xuICAgIGdlb2xvY2F0aW9uXG4gICAgICAuZ2V0Q3VycmVudExvY2F0aW9uKHsgIGRlc2lyZWRBY2N1cmFjeTogQWNjdXJhY3kuaGlnaCwgdXBkYXRlRGlzdGFuY2U6IDEwLCBtaW5pbXVtVXBkYXRlVGltZTogMTAwMCAqIDEgfSlcbiAgICAgIC50aGVuKGxvY2F0aW9uID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydHBvaW50TGF0aXR1ZGUgcmVjZWl2ZWQ6IFwiICsgbG9jYXRpb24ubGF0aXR1ZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0cG9pbnRMb25naXR1ZGUgcmVjZWl2ZWQ6IFwiICsgbG9jYXRpb24ubG9uZ2l0dWRlKTtcbiAgICAgICAgdGhpcy5zdGFydHBvaW50TGF0aXR1ZGUgPSBsb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgdGhpcy5zdGFydHBvaW50TG9uZ2l0dWRlID0gbG9jYXRpb24ubG9uZ2l0dWRlO1xuXG4gICAgICAvLyAgdGhpcy5Mb25naXR1ZGUgPSBsb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgICAvLyAgdGhpcy5MYXRpdHVkZSA9IGxvY2F0aW9uLmxhdGl0dWRlO1xuXG4gICAgICAgIHRoaXMubWFwYm94LnNldENlbnRlcih7XG4gICAgICAgICAgbGF0OiBsb2NhdGlvbi5sYXRpdHVkZSxcbiAgICAgICAgICBsbmc6IGxvY2F0aW9uLmxvbmdpdHVkZSxcbiAgICAgICAgICBhbmltYXRlZDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmdldEN1cnJlbnRBZGRyZXNzKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMb2NhdGlvbiBlcnJvciByZWNlaXZlZDogXCIgKyBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRBZGRyZXNzKCkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgXCJsYXRpdHVkZSBpczogXCIgK1xuICAgICAgICB0aGlzLnN0YXJ0cG9pbnRMYXRpdHVkZSArXG4gICAgICAgIFwibG9uZ2l0dWRlIGlzOlwiICtcbiAgICAgICAgdGhpcy5zdGFydHBvaW50TG9uZ2l0dWRlXG4gICAgKTtcbiAgICB0aGlzLmdvb2dsZVNlcnZpY2VcbiAgICAgIC5nZXRDdXJyZW50TG9jYXRpb24odGhpcy5zdGFydHBvaW50TGF0aXR1ZGUsIHRoaXMuc3RhcnRwb2ludExvbmdpdHVkZSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuY3VycmVudEdlb0xvY2F0aW9uICA9IHJlc3VsdDtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSByZXN1bHQucmVzdWx0c1swXS5mb3JtYXR0ZWRfYWRkcmVzcztcbiAgICAgICAgY29uc29sZS5sb2coXCJUaGUgY3VycmVudCBhZGRyZXNzIGlzIDogXCIsIHRoaXMub3JpZ2luKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlVuYWJsZSB0byBnZXQgY3VycmVudCBhZGRyZXNzLiBFcnJvciBvY2N1cmVkITpcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxub25TdGFydEJvb2tpbmdUYXAoKSB7XG4gICBjb25zb2xlLmxvZyhcIj4+Pj4+Pj4+U3RhcnQgc2VhcmNoIEhhcnJzc2VkIDw8PDw8PDw8PDw6IFwiKTtcbiAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7IGN1cnJlbnRHZW9Mb2NhdGlvbjogdGhpcy5jdXJyZW50R2VvTG9jYXRpb24gfVxuICAgIH07XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wic2VhcmNoXCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbn1cblxuICBzaG93U2lkZURyYXdlcihhcmdzOiBFdmVudERhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhcIlNob3cgU2lkZURyYXdlciB0YXBwZWQuXCIpO1xuICAgIC8vIFNob3cgc2lkZWRyYXdlciAuLi5cbiAgfVxuXG4gIC8vICAgIHB1YmxpYyBycnJycnJycm9uTWFwUmVhZHkoYXJncykge1xuICAvLyAgICAgIHRoaXMubWFwYm94ID0gYXJncy5tYXA7XG4gIC8vICAgICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UuZ2V0TG9jYXRpb24oKS50aGVuKCgpID0+IHtcbiAgLy8gICAgICAgICAgdGhpcy5sb2FkSW5pdGFsTG9jYXRpb24oKS50aGVuKFxuICAvLyAgICAgICAgICAgbG9jID0+IHtcbiAgLy8gICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gbG9jLm1hcCgobG9jKSA9PiB7XG4gIC8vICAgICAgICAgICAgICAgICAgIGxvYy5kaXN0YW5jZSA9IHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmdldERpc3RhbmNlRnJvbShcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQobG9jLmxhdGl0dWRlKSxcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQobG9jLmxvbmdpdHVkZSkpO1xuICAvLyAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9jO1xuICAvLyAgICAgICAgICAgICAgICAgIH0pO1xuICAvLyAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcE1hcmtlcnMoKTtcbiAgLy8gICAgICAgICAgICAgICAgICB0aGlzLm1hcGJveC5zZXRDZW50ZXIoe1xuICAvLyAgICAgICAgICAgICAgICAgICAgICBsYXQ6IHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmxhdGl0dWRlLFxuICAvLyAgICAgICAgICAgICAgICAgICAgICBsbmc6IHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmxvbmdpdHVkZSxcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWVcbiAgLy8gICAgICAgICAgICAgICAgICB9KTtcbiAgLy8gICAgICAgICAgICAgIH0sXG4gIC8vICAgICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xuICAvLyAgICAgICAgICB9KTtcbiAgLy8gIH1cblxuICAvLyAgcHVibGljIGRyb3BNYXJrZXJzKCkge1xuICAvLyAgICBsZXQgbWFya2VycyA9IHRoaXMucG9zaXRpb24ubWFwKChsb2M6IFBvc2l0aW9uLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gIC8vICAgICAgICByZXR1cm4ge1xuICAvLyAgICAgICAgICAgIGxhdDogbG9jLmxhdGl0dWRlLFxuICAvLyAgICAgICAgICAgIGxuZzogbG9jLmxvbmdpdHVkZSxcbiAgLy8gICAgICAgIH1cbiAgLy8gICAgfSk7XG4gIC8vICAgIHRoaXMubWFwYm94LmFkZE1hcmtlcnMobWFya2Vycyk7XG4gIC8vICB9XG5cbiAgLy8gICAgcHVibGljIGxvYWRJbml0YWxMb2NhdGlvbigpIHtcbiAgLy8gICAgICByZXR1cm4gdGhpcy5nb29nbGVTZXJ2aWNlLmdldEN1cnJlbnRMb2NhdGlvbih0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5sYXRpdHVkZSwgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UubG9uZ2l0dWRlKTtcbiAgLy8gICAgfVxufVxuIl19