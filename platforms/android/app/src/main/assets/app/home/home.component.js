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
    Object.defineProperty(HomeComponent.prototype, "Latitude", {
        get: function () {
            console.log("Latitude get reached, and the value is :" + this._latitude);
            return this._latitude;
        },
        set: function (value) {
            console.log("Latitude set reached, and the value is :" + value);
            this._latitude = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "Longitude", {
        get: function () {
            console.log("Longitude get reached, and the value is :" + this._longitude);
            return this._longitude;
        },
        set: function (value) {
            console.log("Longitude set reached, and the value is :" + value);
            this._longitude = value;
        },
        enumerable: true,
        configurable: true
    });
    //=========================== End Properties =================================
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
            // this.startpointLatitude.set("startpointLatitude", location.latitude);
            _this.startpointLatitude = location.latitude;
            _this.startpointLongitude = location.longitude;
            _this.Longitude = location.longitude;
            _this.Latitude = location.latitude;
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
            _this.Longitude = location.longitude;
            _this.Latitude = location.latitude;
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
    HomeComponent.prototype.rrrrrrrronMapReady = function (args) {
        var _this = this;
        this.mapbox = args.map;
        this.geolocationService.getLocation().then(function () {
            _this.loadInitalLocation().then(function (loc) {
                _this.position = loc.map(function (loc) {
                    loc.distance = _this.geolocationService.getDistanceFrom(parseFloat(loc.latitude), parseFloat(loc.longitude));
                    return loc;
                });
                _this.dropMarkers();
                _this.mapbox.setCenter({
                    lat: _this.geolocationService.latitude,
                    lng: _this.geolocationService.longitude,
                    animated: true
                });
            }, function (error) { return console.log(error); });
        });
    };
    HomeComponent.prototype.dropMarkers = function () {
        var markers = this.position.map(function (loc, index) {
            return {
                lat: loc.latitude,
                lng: loc.longitude,
            };
        });
        this.mapbox.addMarkers(markers);
    };
    HomeComponent.prototype.loadInitalLocation = function () {
        return this.googleService.getCurrentLocation(this.geolocationService.latitude, this.geolocationService.longitude);
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
        __metadata("design:paramtypes", [geolocation_service_1.GeolocationService,
            page_1.Page,
            google_play_service_1.GooglePlayService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUlsRCxtREFBbUQ7QUFDbkQsK0NBQStDO0FBRS9DLHFFQUFxRTtBQUVyRSxtREFBMkQ7QUFDM0QsSUFBTSxZQUFZLEdBQVUsZUFBTyxFQUFFLENBQUM7QUFFdEMsZ0NBQStCO0FBRS9CLGtEQU02QjtBQU83QixzREFBd0Q7QUFDeEQsa0NBQW9DO0FBRXBDLDBFQUF3RTtBQUN4RSxrQ0FBZSxDQUFDLFFBQVEsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsVUFBVSxFQUF6QyxDQUF5QyxDQUFDLENBQUM7QUFDM0UsbUVBQXFEO0FBQ3JELDZFQUEyRTtBQUMzRSw2RUFBMEU7QUF1QzFFO0lBd0JFLHVCQUFvQixrQkFBc0MsRUFDaEQsS0FBVyxFQUNWLGFBQWdDO1FBRXZDLHVCQUF1QjtRQUN2QixnRUFBZ0U7UUFDaEUsdUNBQXVDO1FBQ3ZDLHdGQUF3RjtRQUN4RiwrQ0FBK0M7UUFDL0MsSUFBSTtRQVRZLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDaEQsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUNWLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQXJCbkMsZUFBVSxHQUFHLElBQUksb0NBQVUsRUFBRSxDQUFDO1FBOEJwQyx5REFBeUQ7UUFDekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBS0Qsc0JBQVcsbUNBQVE7YUFBbkI7WUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN6RSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFD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QUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDekQsdUJBQVUsQ0FBQyxXQUFXLEVBQUU7d0JBQ3RCLGtCQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFDOUMsb0JBQU8sQ0FBQyx1QkFBdUIsQ0FBQztxQkFDakMsQ0FBQztpQkFDSCxDQUFDO2dCQUNGLG9CQUFPLENBQUMsWUFBWSxFQUFFO29CQUNwQixrQkFBSyxDQUNILElBQUksRUFDSixrQkFBSyxDQUFDO3dCQUNKLE9BQU8sRUFBRSxDQUFDO3dCQUNWLFNBQVMsRUFBRSxjQUFjO3FCQUMxQixDQUFDLENBQ0g7b0JBQ0Qsa0JBQUssQ0FDSCxNQUFNLEVBQ04sa0JBQUssQ0FBQzt3QkFDSixPQUFPLEVBQUUsQ0FBQzt3QkFDVixTQUFTLEVBQUUsZ0JBQWdCO3FCQUM1QixDQUFDLENBQ0g7b0JBQ0QsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztpQkFDNUQsQ0FBQzthQUNIO1NBQ0YsQ0FBQzt5Q0F5QndDLHdDQUFrQjtZQUN6QyxXQUFJO1lBQ0ssdUNBQWlCO09BMUJoQyxhQUFhLENBa1B6QjtJQUFELG9CQUFDO0NBQUEsQUFsUEQsSUFrUEM7QUFsUFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG4vL2ltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XG4vL2ltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3VpL3RleHQtZmllbGQnO1xuaW1wb3J0IHsgRXZlbnREYXRhLCBPYnNlcnZhYmxlIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbi8vaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuLy9pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuXG4vL2ltcG9ydCB7IE9ic2VydmFibGVQcm9wZXJ0eSB9IGZyb20gJ34vc2hhcmVkL29ic2VydmFibGUtZGVjb3JhdG9yJztcblxuaW1wb3J0IHsgRnJhbWUsIHRvcG1vc3QgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9mcmFtZVwiO1xuY29uc3QgdG9wbW9zdEZyYW1lOiBGcmFtZSA9IHRvcG1vc3QoKTtcblxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgYW5pbWF0ZSxcbiAgdHJhbnNpdGlvblxufSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xuaW1wb3J0IHtcbiAgTWFwYm94LFxuICBNYXBTdHlsZSxcbiAgTWFwYm94Vmlld0FwaSxcbiAgVmlld3BvcnQgYXMgTWFwYm94Vmlld3BvcnRcbn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1tYXBib3hcIjtcbmltcG9ydCAqIGFzIGdlb2xvY2F0aW9uIGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcbmltcG9ydCB7IEFjY3VyYWN5IH0gZnJvbSBcInVpL2VudW1zXCI7XG5cbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5yZWdpc3RlckVsZW1lbnQoXCJNYXBib3hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1tYXBib3hcIikuTWFwYm94Vmlldyk7XG5pbXBvcnQgeyBEaXJlY3Rpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kaXJlY3Rpb25zXCI7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgR29vZ2xlUGxheVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvZ29vZ2xlLXBsYXkuc2VydmljZVwiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwifi9tb2RlbHMvbG9jYXRpb25SZXNwb25zZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZVByb3BlcnR5IH0gZnJvbSBcIn4vc2hhcmVkL29ic2VydmFibGUtZGVjb3JhdG9yXCI7XG5cblxuZGVjbGFyZSB2YXIgVUlJbWFnZTogYW55O1xuZGVjbGFyZSB2YXIgVUlCYXJNZXRyaWNzOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJob21lXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS9ob21lLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9ob21lL2hvbWUuY29tcG9uZW50LmNzc1wiXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoXCJmbHlJbk91dFwiLCBbXG4gICAgICBzdGF0ZShcImluXCIsIHN0eWxlKHsgdHJhbnNmb3JtOiBcInNjYWxlKDEpXCIsIG9wYWNpdHk6IDEgfSkpLFxuICAgICAgdHJhbnNpdGlvbihcInZvaWQgPT4gKlwiLCBbXG4gICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiBcInNjYWxlKDAuOSlcIiwgb3BhY2l0eTogMCB9KSxcbiAgICAgICAgYW5pbWF0ZShcIjEwMDBtcyAxMDBtcyBlYXNlLW91dFwiKVxuICAgICAgXSlcbiAgICBdKSxcbiAgICB0cmlnZ2VyKFwiZnJvbS1yaWdodFwiLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJpblwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDApXCJcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJ2b2lkXCIsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUoMjAlKVwiXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbihcInZvaWQgPT4gKlwiLCBbYW5pbWF0ZShcIjYwMG1zIDE1MDBtcyBlYXNlLW91dFwiKV0pXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50ICBpbXBsZW1lbnRzIE9uSW5pdCAge1xuXG5cbiAgb3JpZ2luOiBhbnk7XG4gIHByaXZhdGUgbWFwYm94OiBNYXBib3g7XG4gIHByaXZhdGUgZGlyZWN0aW9ucyA9IG5ldyBEaXJlY3Rpb25zKCk7XG5cbiAgcHVibGljIHN0YXJ0cG9pbnRMb25naXR1ZGU6IG51bWJlcjtcbiAgcHVibGljIHN0YXJ0cG9pbnRMYXRpdHVkZTogbnVtYmVyO1xuICBwdWJsaWMgZW5kcG9pbnRMb25naXR1ZGU6IG51bWJlcjtcbiAgcHVibGljIGVuZHBvaW50TGF0aXR1ZGU6IG51bWJlcjtcbiAgcHVibGljIHRpbWVzdGFtcDogc3RyaW5nO1xuXG4gIHB1YmxpYyBob3Jpem9udGFsQWNjdXJhY3k6IG51bWJlcjtcbiAgcHVibGljIHZlcnRpY2FsQWNjdXJhY3k6IG51bWJlcjtcbiAgcHVibGljIGFsdGl0dWRlOiBudW1iZXI7XG4gIHB1YmxpYyBzcGVlZDogbnVtYmVyO1xuXG5cbiAgcHVibGljIHBvc2l0aW9uOiBQb3NpdGlvbltdO1xuICBcblxuXG4gIFxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdlb2xvY2F0aW9uU2VydmljZTogR2VvbG9jYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG4gICAgIHByaXZhdGUgZ29vZ2xlU2VydmljZTogR29vZ2xlUGxheVNlcnZpY2UpIHtcbiBcbiAgICAgIC8vIGlmICh0b3Btb3N0KCkuaW9zKSB7XG4gICAgICAvLyAgIHZhciBuYXZpZ2F0aW9uQmFyID0gdG9wbW9zdCgpLmlvcy5jb250cm9sbGVyLm5hdmlnYXRpb25CYXI7XG4gICAgICAvLyAgIG5hdmlnYXRpb25CYXIudHJhbnNsdWNlbnQgPSBmYWxzZTtcbiAgICAgIC8vICAgbmF2aWdhdGlvbkJhci5zZXRCYWNrZ3JvdW5kSW1hZ2VGb3JCYXJNZXRyaWNzKFVJSW1hZ2UubmV3KCksIFVJQmFyTWV0cmljcy5EZWZhdWx0KTtcbiAgICAgIC8vICAgbmF2aWdhdGlvbkJhci5zaGFkb3dJbWFnZSA9IFVJSW1hZ2UubmV3KCk7XG4gICAgICAvLyB9XG5cbiAgICAvLyAgdGhpcy5fcGFnZS5hY3Rpb25CYXIuYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc2x1Y2VudFwiO1xuICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QodHJ1ZSk7XG4gIH1cblxuXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09IFN0YXJ0IFByb3BlcnRpZXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIHByaXZhdGUgX2xhdGl0dWRlOm51bWJlcjtcbiAgcHVibGljIGdldCBMYXRpdHVkZSgpOiBudW1iZXIge1xuICAgIGNvbnNvbGUubG9nKFwiTGF0aXR1ZGUgZ2V0IHJlYWNoZWQsIGFuZCB0aGUgdmFsdWUgaXMgOlwiICsgdGhpcy5fbGF0aXR1ZGUpO1xuICAgIHJldHVybiB0aGlzLl9sYXRpdHVkZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgTGF0aXR1ZGUodmFsdWU6IG51bWJlcikge1xuICAgIGNvbnNvbGUubG9nKFwiTGF0aXR1ZGUgc2V0IHJlYWNoZWQsIGFuZCB0aGUgdmFsdWUgaXMgOlwiICsgdmFsdWUpO1xuICAgIHRoaXMuX2xhdGl0dWRlID0gdmFsdWU7XG4gIH1cbiAgXG5cbiAgcHJpdmF0ZSBfbG9uZ2l0dWRlOm51bWJlcjtcbiAgcHVibGljIGdldCBMb25naXR1ZGUoKTogbnVtYmVyIHtcbiAgICBjb25zb2xlLmxvZyhcIkxvbmdpdHVkZSBnZXQgcmVhY2hlZCwgYW5kIHRoZSB2YWx1ZSBpcyA6XCIgKyB0aGlzLl9sb25naXR1ZGUpO1xuICAgIHJldHVybiB0aGlzLl9sb25naXR1ZGU7XG4gIH1cblxuICBwdWJsaWMgc2V0IExvbmdpdHVkZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgY29uc29sZS5sb2coXCJMb25naXR1ZGUgc2V0IHJlYWNoZWQsIGFuZCB0aGUgdmFsdWUgaXMgOlwiICsgdmFsdWUpO1xuICAgIHRoaXMuX2xvbmdpdHVkZSA9IHZhbHVlO1xuICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PSBFbmQgUHJvcGVydGllcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRpcmVjdGlvbnMuYXZhaWxhYmxlKCkudGhlbihhdmFpbCA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhhdmFpbCA/IFwiWWVzXCIgOiBcIk5vXCIpO1xuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coXCJjaGVja2luZyBpZiBnZW9sb2NhdGlvbiBpcyBlbmFibGVkXCIpO1xuICAgIGdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpLnRoZW4oXG4gICAgICBlbmFibGVkID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJJcyBnZW9sb2NhdGlvbiBFbmFibGVkID1cIiwgZW5hYmxlZCk7XG4gICAgICAgIGlmIChlbmFibGVkKSB7XG5cdFx0XHRcdFx0dGhpcy5nZXRMb2NhdGlvbk9uY2UoKTtcblx0XHRcdFx0XHR0aGlzLndhdGNoKCk7XHRcdFx0XHRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlcXVlc3QoKTtcbiAgICAgICAgfSAgICAgICAgXG4gICAgICB9LFxuICAgICAgZSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXNFbmFibGVkIGVycm9yXCIsIGUpO1xuICAgICAgICB0aGlzLnJlcXVlc3QoKTtcbiAgICAgIH1cblx0XHQpO1xuXHRcdFxuICB9XG5cbiAgcmVxdWVzdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcImVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpXCIpO1xuICAgIGdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpLnRoZW4oXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9jYXRpb24gaXMgZW5hYmxlZCFcIik7XG4gICAgICAgIHRoaXMud2F0Y2goKTtcbiAgICAgIH0sXG4gICAgICBlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gZW5hYmxlIGxvY2F0aW9uIHNlcnZpY2VcIiwgZSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHdhdGNoKCkge1xuICAgIGNvbnNvbGUubG9nKFwid2F0Y2hMb2NhdGlvbigpXCIpO1xuICAgIGdlb2xvY2F0aW9uLndhdGNoTG9jYXRpb24oXG4gICAgICBsb2NhdGlvbiA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGxvY2F0aW9uKTtcbiAgICAgICAvLyB0aGlzLnN0YXJ0cG9pbnRMYXRpdHVkZS5zZXQoXCJzdGFydHBvaW50TGF0aXR1ZGVcIiwgbG9jYXRpb24ubGF0aXR1ZGUpO1xuICAgICAgICB0aGlzLnN0YXJ0cG9pbnRMYXRpdHVkZT1sb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgdGhpcy5zdGFydHBvaW50TG9uZ2l0dWRlID0gbG9jYXRpb24ubG9uZ2l0dWRlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5Mb25naXR1ZGUgPSBsb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgICAgIHRoaXMuTGF0aXR1ZGU9IGxvY2F0aW9uLmxhdGl0dWRlO1xuXG4gICAgICB9LFxuICAgICAgZSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmFpbGVkIHRvIGdldCBsb2NhdGlvblwiKTtcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGRlc2lyZWRBY2N1cmFjeTogQWNjdXJhY3kuaGlnaCxcbiAgICAgICAgbWF4aW11bUFnZTogNTAwMCxcbiAgICAgICAgdGltZW91dDogMjAwMDBcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgICBvbk1hcFJlYWR5KGFyZ3MpIHtcbiAgICAgIHRoaXMubWFwYm94ID0gYXJncy5tYXA7XG4gICAgICB2YXIgbmF0aXZlTWFwVmlldyA9IGFyZ3MuaW9zID8gYXJncy5pb3MgOiBhcmdzLmFuZHJvaWQ7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJNYXBib3ggb25NYXBSZWFkeSBmb3IgXCIgK1xuICAgICAgICAgIChhcmdzLmlvcyA/IFwiaU9TXCIgOiBcIkFuZHJvaWRcIikgK1xuICAgICAgICAgIFwiLCBuYXRpdmUgb2JqZWN0IHJlY2VpdmVkOiBcIiArXG4gICAgICAgICAgbmF0aXZlTWFwVmlld1xuICAgICAgKTtcbiAgICAgIGFyZ3MubWFwLmFkZE1hcmtlcnMoW1xuICAgICAgICB7XG4gICAgICAgICAgbGF0OiB0aGlzLnN0YXJ0cG9pbnRMYXRpdHVkZSxcbiAgICAgICAgICBsbmc6IHRoaXMuc3RhcnRwb2ludExvbmdpdHVkZSxcbiAgICAgICAgICB0aXRsZTogXCJZb3UgYXJlIGhlcmVcIixcbiAgICAgICAgICAvL3N1YnRpdGxlOiAnUmVhbGx5IHJlYWxseSBuaWNlIGxvY2F0aW9uJyxcbiAgICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgXSk7XG4gICAgfVxuXG5cdFxuICBvbkJvb2tUYXAoKSB7XG5cdFx0Y29uc29sZS5sb2coXCJvbkJvb2tUYXBcIik7XG5cdFx0dGhpcy5tYXBib3guZ2V0VXNlckxvY2F0aW9uKCkudGhlbihcbiAgICAgIGZ1bmN0aW9uKHVzZXJMb2NhdGlvbikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgdXNlciBsb2NhdGlvbjogXCIgKyAgdXNlckxvY2F0aW9uLmxvY2F0aW9uLmxhdCArIFwiLCBcIiArIHVzZXJMb2NhdGlvbi5sb2NhdGlvbi5sbmcpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgdXNlciBzcGVlZDogXCIgKyAgdXNlckxvY2F0aW9uLnNwZWVkKTtcbiAgICAgIH0pO1xuICB9XG5cblx0Z2V0TG9jYXRpb25PbmNlKCkge1xuICAgIGdlb2xvY2F0aW9uXG4gICAgICAuZ2V0Q3VycmVudExvY2F0aW9uKHsgZGVzaXJlZEFjY3VyYWN5OiBBY2N1cmFjeS5oaWdoLCB0aW1lb3V0OiA1MDAwIH0pXG4gICAgICAudGhlbihsb2NhdGlvbiA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRwb2ludExhdGl0dWRlIHJlY2VpdmVkOiBcIiArIGxvY2F0aW9uLmxhdGl0dWRlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydHBvaW50TG9uZ2l0dWRlIHJlY2VpdmVkOiBcIiArIGxvY2F0aW9uLmxvbmdpdHVkZSk7XG4gICAgICAgIHRoaXMuc3RhcnRwb2ludExhdGl0dWRlID0gbG9jYXRpb24ubGF0aXR1ZGU7XG4gICAgICAgIHRoaXMuc3RhcnRwb2ludExvbmdpdHVkZSA9IGxvY2F0aW9uLmxvbmdpdHVkZTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuTG9uZ2l0dWRlID0gbG9jYXRpb24ubG9uZ2l0dWRlO1xuICAgICAgICB0aGlzLkxhdGl0dWRlPSBsb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubWFwYm94LnNldENlbnRlcih7XG4gICAgICAgICAgbGF0OiBsb2NhdGlvbi5sYXRpdHVkZSxcbiAgICAgICAgICBsbmc6IGxvY2F0aW9uLmxvbmdpdHVkZSxcbiAgICAgICAgICBhbmltYXRlZDogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5nZXRDdXJyZW50QWRkcmVzcygpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9jYXRpb24gZXJyb3IgcmVjZWl2ZWQ6IFwiICsgZXJyb3IpO1xuICAgICAgfSk7XG5cdH1cblx0XG4gICBnZXRDdXJyZW50QWRkcmVzcygpIHtcbiAgICAgY29uc29sZS5sb2coXG4gICAgICAgXCJsYXRpdHVkZSBpczogXCIgK1xuICAgICAgICAgdGhpcy5zdGFydHBvaW50TGF0aXR1ZGUgK1xuICAgICAgICAgXCJsb25naXR1ZGUgaXM6XCIgK1xuICAgICAgICAgdGhpcy5zdGFydHBvaW50TG9uZ2l0dWRlXG4gICAgICk7XG4gICAgIHRoaXMuZ29vZ2xlU2VydmljZVxuICAgICAgIC5nZXRDdXJyZW50TG9jYXRpb24odGhpcy5zdGFydHBvaW50TGF0aXR1ZGUsIHRoaXMuc3RhcnRwb2ludExvbmdpdHVkZSlcbiAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuXHQgXHRcdC8vXHRjb25zb2xlLmxvZyhcIlRoZSByZXN1bHQgaXMgOiBcIiwgcmVzdWx0KTtcblx0IFx0XHRcdHRoaXMub3JpZ2luID0gcmVzdWx0LnJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3M7XG5cdCBcdFx0XHRjb25zb2xlLmxvZyhcIlRoZSBjdXJyZW50IGFkZHJlc3MgaXMgOiBcIiwgdGhpcy5vcmlnaW4pO1xuICAgICAgIH0pXG4gICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5hYmxlIHRvIGdldCBjdXJyZW50IGFkZHJlc3MuIEVycm9yIG9jY3VyZWQhOlwiLCBlcnJvcik7XG4gICAgICAgfSk7XG5cdCB9XG5cbiAgICBzaG93U2lkZURyYXdlcihhcmdzOiBFdmVudERhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhcIlNob3cgU2lkZURyYXdlciB0YXBwZWQuXCIpO1xuICAgIC8vIFNob3cgc2lkZWRyYXdlciAuLi5cbn1cblxuICAgcHVibGljIHJycnJycnJyb25NYXBSZWFkeShhcmdzKSB7XG4gICAgIHRoaXMubWFwYm94ID0gYXJncy5tYXA7XG4gICAgIHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmdldExvY2F0aW9uKCkudGhlbigoKSA9PiB7XG4gICAgICAgICB0aGlzLmxvYWRJbml0YWxMb2NhdGlvbigpLnRoZW4oXG4gICAgICAgICAgbG9jID0+IHtcbiAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IGxvYy5tYXAoKGxvYykgPT4ge1xuICAgICAgICAgICAgICAgICAgbG9jLmRpc3RhbmNlID0gdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UuZ2V0RGlzdGFuY2VGcm9tKFxuICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQobG9jLmxhdGl0dWRlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KGxvYy5sb25naXR1ZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2M7XG4gICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICB0aGlzLmRyb3BNYXJrZXJzKCk7XG4gICAgICAgICAgICAgICAgIHRoaXMubWFwYm94LnNldENlbnRlcih7XG4gICAgICAgICAgICAgICAgICAgICBsYXQ6IHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmxhdGl0dWRlLFxuICAgICAgICAgICAgICAgICAgICAgbG5nOiB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5sb25naXR1ZGUsXG4gICAgICAgICAgICAgICAgICAgICBhbmltYXRlZDogdHJ1ZVxuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XG4gICAgICAgICB9KTtcbiB9XG5cbiBwdWJsaWMgZHJvcE1hcmtlcnMoKSB7XG4gICBsZXQgbWFya2VycyA9IHRoaXMucG9zaXRpb24ubWFwKChsb2M6IFBvc2l0aW9uLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgbGF0OiBsb2MubGF0aXR1ZGUsXG4gICAgICAgICAgIGxuZzogbG9jLmxvbmdpdHVkZSxcbiAgICAgICB9XG4gICB9KTtcbiAgIHRoaXMubWFwYm94LmFkZE1hcmtlcnMobWFya2Vycyk7XG4gfVxuXG4gICBwdWJsaWMgbG9hZEluaXRhbExvY2F0aW9uKCkge1xuICAgICByZXR1cm4gdGhpcy5nb29nbGVTZXJ2aWNlLmdldEN1cnJlbnRMb2NhdGlvbih0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5sYXRpdHVkZSwgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UubG9uZ2l0dWRlKTtcbiAgIH1cbn1cbiJdfQ==