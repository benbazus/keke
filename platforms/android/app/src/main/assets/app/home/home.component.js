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
//import { registerElement } from "nativescript-angular/element-registry";
//registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);
var nativescript_directions_1 = require("nativescript-directions");
var geolocation_service_1 = require("~/shared/services/geolocation.service");
var google_play_service_1 = require("~/shared/services/google-play.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(zone, geolocationService, _page, googleService) {
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
        __metadata("design:paramtypes", [core_1.NgZone,
            geolocation_service_1.GeolocationService,
            page_1.Page,
            google_play_service_1.GooglePlayService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRDtBQUkxRCxtREFBbUQ7QUFDbkQsK0NBQStDO0FBRS9DLHFFQUFxRTtBQUVyRSxtREFBMkQ7QUFDM0QsSUFBTSxZQUFZLEdBQVUsZUFBTyxFQUFFLENBQUM7QUFFdEMsZ0NBQStCO0FBRS9CLGtEQU02QjtBQU83QixzREFBd0Q7QUFDeEQsa0NBQW9DO0FBRXBDLDBFQUEwRTtBQUMxRSw2RUFBNkU7QUFFN0UsbUVBQXFEO0FBQ3JELDZFQUEyRTtBQUMzRSw2RUFBMEU7QUF1QzFFO0lBd0JFLHVCQUFvQixJQUFZLEVBQ3hCLGtCQUFzQyxFQUNwQyxLQUFXLEVBQ1YsYUFBZ0M7UUFFdkMsdUJBQXVCO1FBQ3ZCLGdFQUFnRTtRQUNoRSx1Q0FBdUM7UUFDdkMsd0ZBQXdGO1FBQ3hGLCtDQUErQztRQUMvQyxJQUFJO1FBVlksU0FBSSxHQUFKLElBQUksQ0FBUTtRQUN4Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3BDLFVBQUssR0FBTCxLQUFLLENBQU07UUFDVixrQkFBYSxHQUFiLGFBQWEsQ0FBbUI7UUF0Qm5DLGVBQVUsR0FBRyxJQUFJLG9DQUFVLEVBQUUsQ0FBQztRQStCcEMseURBQXlEO1FBQ3pELElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNsQyxXQUFXLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUtELHNCQUFXLG1DQUFRO2FBQW5CO1lBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzthQUVELFVBQW9CLEtBQWE7WUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FB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QUM7b0JBQ3pELHVCQUFVLENBQUMsV0FBVyxFQUFFO3dCQUN0QixrQkFBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7d0JBQzlDLG9CQUFPLENBQUMsdUJBQXVCLENBQUM7cUJBQ2pDLENBQUM7aUJBQ0gsQ0FBQztnQkFDRixvQkFBTyxDQUFDLFlBQVksRUFBRTtvQkFDcEIsa0JBQUssQ0FDSCxJQUFJLEVBQ0osa0JBQUssQ0FBQzt3QkFDSixPQUFPLEVBQUUsQ0FBQzt3QkFDVixTQUFTLEVBQUUsY0FBYztxQkFDMUIsQ0FBQyxDQUNIO29CQUNELGtCQUFLLENBQ0gsTUFBTSxFQUNOLGtCQUFLLENBQUM7d0JBQ0osT0FBTyxFQUFFLENBQUM7d0JBQ1YsU0FBUyxFQUFFLGdCQUFnQjtxQkFDNUIsQ0FBQyxDQUNIO29CQUNELHVCQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7aUJBQzVELENBQUM7YUFDSDtTQUNGLENBQUM7eUNBeUIwQixhQUFNO1lBQ0osd0NBQWtCO1lBQzdCLFdBQUk7WUFDSyx1Q0FBaUI7T0EzQmhDLGFBQWEsQ0FtUHpCO0lBQUQsb0JBQUM7Q0FBQSxBQW5QRCxJQW1QQztBQW5QWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgTmdab25lLCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuLy9pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuLy9pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd1aS90ZXh0LWZpZWxkJztcbmltcG9ydCB7IEV2ZW50RGF0YSwgT2JzZXJ2YWJsZSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG4vL2ltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbi8vaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcblxuLy9pbXBvcnQgeyBPYnNlcnZhYmxlUHJvcGVydHkgfSBmcm9tICd+L3NoYXJlZC9vYnNlcnZhYmxlLWRlY29yYXRvcic7XG5cbmltcG9ydCB7IEZyYW1lLCB0b3Btb3N0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIjtcbmNvbnN0IHRvcG1vc3RGcmFtZTogRnJhbWUgPSB0b3Btb3N0KCk7XG5cbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuXG5pbXBvcnQge1xuICB0cmlnZ2VyLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIGFuaW1hdGUsXG4gIHRyYW5zaXRpb25cbn0gZnJvbSBcIkBhbmd1bGFyL2FuaW1hdGlvbnNcIjtcbmltcG9ydCB7XG4gIE1hcGJveCxcbiAgTWFwU3R5bGUsXG4gIE1hcGJveFZpZXdBcGksXG4gIFZpZXdwb3J0IGFzIE1hcGJveFZpZXdwb3J0XG59IGZyb20gXCJuYXRpdmVzY3JpcHQtbWFwYm94XCI7XG5pbXBvcnQgKiBhcyBnZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBBY2N1cmFjeSB9IGZyb20gXCJ1aS9lbnVtc1wiO1xuXG4vL2ltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG4vL3JlZ2lzdGVyRWxlbWVudChcIk1hcGJveFwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LW1hcGJveFwiKS5NYXBib3hWaWV3KTtcblxuaW1wb3J0IHsgRGlyZWN0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZGlyZWN0aW9uc1wiO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2dlb2xvY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IEdvb2dsZVBsYXlTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2dvb2dsZS1wbGF5LnNlcnZpY2VcIjtcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIn4vbW9kZWxzL2xvY2F0aW9uUmVzcG9uc2VcIjtcbmltcG9ydCB7IE9ic2VydmFibGVQcm9wZXJ0eSB9IGZyb20gXCJ+L3NoYXJlZC9vYnNlcnZhYmxlLWRlY29yYXRvclwiO1xuXG5cbmRlY2xhcmUgdmFyIFVJSW1hZ2U6IGFueTtcbmRlY2xhcmUgdmFyIFVJQmFyTWV0cmljczogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiaG9tZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUvaG9tZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vaG9tZS9ob21lLmNvbXBvbmVudC5jc3NcIl0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKFwiZmx5SW5PdXRcIiwgW1xuICAgICAgc3RhdGUoXCJpblwiLCBzdHlsZSh7IHRyYW5zZm9ybTogXCJzY2FsZSgxKVwiLCBvcGFjaXR5OiAxIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oXCJ2b2lkID0+ICpcIiwgW1xuICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogXCJzY2FsZSgwLjkpXCIsIG9wYWNpdHk6IDAgfSksXG4gICAgICAgIGFuaW1hdGUoXCIxMDAwbXMgMTAwbXMgZWFzZS1vdXRcIilcbiAgICAgIF0pXG4gICAgXSksXG4gICAgdHJpZ2dlcihcImZyb20tcmlnaHRcIiwgW1xuICAgICAgc3RhdGUoXG4gICAgICAgIFwiaW5cIixcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgwKVwiXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgIFwidm9pZFwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDIwJSlcIlxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXCJ2b2lkID0+ICpcIiwgW2FuaW1hdGUoXCI2MDBtcyAxNTAwbXMgZWFzZS1vdXRcIildKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCAgaW1wbGVtZW50cyBPbkluaXQgIHtcblxuXG4gIG9yaWdpbjogYW55O1xuICBwcml2YXRlIG1hcGJveDogTWFwYm94O1xuICBwcml2YXRlIGRpcmVjdGlvbnMgPSBuZXcgRGlyZWN0aW9ucygpO1xuXG4gIHB1YmxpYyBzdGFydHBvaW50TG9uZ2l0dWRlOiBudW1iZXI7XG4gIHB1YmxpYyBzdGFydHBvaW50TGF0aXR1ZGU6IG51bWJlcjtcbiAgcHVibGljIGVuZHBvaW50TG9uZ2l0dWRlOiBudW1iZXI7XG4gIHB1YmxpYyBlbmRwb2ludExhdGl0dWRlOiBudW1iZXI7XG4gIHB1YmxpYyB0aW1lc3RhbXA6IHN0cmluZztcblxuICBwdWJsaWMgaG9yaXpvbnRhbEFjY3VyYWN5OiBudW1iZXI7XG4gIHB1YmxpYyB2ZXJ0aWNhbEFjY3VyYWN5OiBudW1iZXI7XG4gIHB1YmxpYyBhbHRpdHVkZTogbnVtYmVyO1xuICBwdWJsaWMgc3BlZWQ6IG51bWJlcjtcblxuXG4gIHB1YmxpYyBwb3NpdGlvbjogUG9zaXRpb25bXTtcbiAgXG5cblxuICBcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gIHByaXZhdGUgZ2VvbG9jYXRpb25TZXJ2aWNlOiBHZW9sb2NhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfcGFnZTogUGFnZSxcbiAgICAgcHJpdmF0ZSBnb29nbGVTZXJ2aWNlOiBHb29nbGVQbGF5U2VydmljZSkge1xuIFxuICAgICAgLy8gaWYgKHRvcG1vc3QoKS5pb3MpIHtcbiAgICAgIC8vICAgdmFyIG5hdmlnYXRpb25CYXIgPSB0b3Btb3N0KCkuaW9zLmNvbnRyb2xsZXIubmF2aWdhdGlvbkJhcjtcbiAgICAgIC8vICAgbmF2aWdhdGlvbkJhci50cmFuc2x1Y2VudCA9IGZhbHNlO1xuICAgICAgLy8gICBuYXZpZ2F0aW9uQmFyLnNldEJhY2tncm91bmRJbWFnZUZvckJhck1ldHJpY3MoVUlJbWFnZS5uZXcoKSwgVUlCYXJNZXRyaWNzLkRlZmF1bHQpO1xuICAgICAgLy8gICBuYXZpZ2F0aW9uQmFyLnNoYWRvd0ltYWdlID0gVUlJbWFnZS5uZXcoKTtcbiAgICAgIC8vIH1cblxuICAgIC8vICB0aGlzLl9wYWdlLmFjdGlvbkJhci5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zbHVjZW50XCI7XG4gICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIGdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCh0cnVlKTtcbiAgfVxuXG5cbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT0gU3RhcnQgUHJvcGVydGllcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgcHJpdmF0ZSBfbGF0aXR1ZGU6bnVtYmVyO1xuICBwdWJsaWMgZ2V0IExhdGl0dWRlKCk6IG51bWJlciB7XG4gICAgY29uc29sZS5sb2coXCJMYXRpdHVkZSBnZXQgcmVhY2hlZCwgYW5kIHRoZSB2YWx1ZSBpcyA6XCIgKyB0aGlzLl9sYXRpdHVkZSk7XG4gICAgcmV0dXJuIHRoaXMuX2xhdGl0dWRlO1xuICB9XG5cbiAgcHVibGljIHNldCBMYXRpdHVkZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgY29uc29sZS5sb2coXCJMYXRpdHVkZSBzZXQgcmVhY2hlZCwgYW5kIHRoZSB2YWx1ZSBpcyA6XCIgKyB2YWx1ZSk7XG4gICAgdGhpcy5fbGF0aXR1ZGUgPSB2YWx1ZTtcbiAgfVxuICBcblxuICBwcml2YXRlIF9sb25naXR1ZGU6bnVtYmVyO1xuICBwdWJsaWMgZ2V0IExvbmdpdHVkZSgpOiBudW1iZXIge1xuICAgIGNvbnNvbGUubG9nKFwiTG9uZ2l0dWRlIGdldCByZWFjaGVkLCBhbmQgdGhlIHZhbHVlIGlzIDpcIiArIHRoaXMuX2xvbmdpdHVkZSk7XG4gICAgcmV0dXJuIHRoaXMuX2xvbmdpdHVkZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgTG9uZ2l0dWRlKHZhbHVlOiBudW1iZXIpIHtcbiAgICBjb25zb2xlLmxvZyhcIkxvbmdpdHVkZSBzZXQgcmVhY2hlZCwgYW5kIHRoZSB2YWx1ZSBpcyA6XCIgKyB2YWx1ZSk7XG4gICAgdGhpcy5fbG9uZ2l0dWRlID0gdmFsdWU7XG4gIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09IEVuZCBQcm9wZXJ0aWVzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGlyZWN0aW9ucy5hdmFpbGFibGUoKS50aGVuKGF2YWlsID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGF2YWlsID8gXCJZZXNcIiA6IFwiTm9cIik7XG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZyhcImNoZWNraW5nIGlmIGdlb2xvY2F0aW9uIGlzIGVuYWJsZWRcIik7XG4gICAgZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkudGhlbihcbiAgICAgIGVuYWJsZWQgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIklzIGdlb2xvY2F0aW9uIEVuYWJsZWQgPVwiLCBlbmFibGVkKTtcbiAgICAgICAgaWYgKGVuYWJsZWQpIHtcblx0XHRcdFx0XHR0aGlzLmdldExvY2F0aW9uT25jZSgpO1xuXHRcdFx0XHRcdHRoaXMud2F0Y2goKTtcdFx0XHRcdFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVxdWVzdCgpO1xuICAgICAgICB9ICAgICAgICBcbiAgICAgIH0sXG4gICAgICBlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJpc0VuYWJsZWQgZXJyb3JcIiwgZSk7XG4gICAgICAgIHRoaXMucmVxdWVzdCgpO1xuICAgICAgfVxuXHRcdCk7XG5cdFx0XG4gIH1cblxuICByZXF1ZXN0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiZW5hYmxlTG9jYXRpb25SZXF1ZXN0KClcIik7XG4gICAgZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCkudGhlbihcbiAgICAgICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2NhdGlvbiBpcyBlbmFibGVkIVwiKTtcbiAgICAgICAgdGhpcy53YXRjaCgpO1xuICAgICAgfSxcbiAgICAgIGUgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBlbmFibGUgbG9jYXRpb24gc2VydmljZVwiLCBlKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgd2F0Y2goKSB7XG4gICAgY29uc29sZS5sb2coXCJ3YXRjaExvY2F0aW9uKClcIik7XG4gICAgZ2VvbG9jYXRpb24ud2F0Y2hMb2NhdGlvbihcbiAgICAgIGxvY2F0aW9uID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cobG9jYXRpb24pO1xuICAgICAgIC8vIHRoaXMuc3RhcnRwb2ludExhdGl0dWRlLnNldChcInN0YXJ0cG9pbnRMYXRpdHVkZVwiLCBsb2NhdGlvbi5sYXRpdHVkZSk7XG4gICAgICAgIHRoaXMuc3RhcnRwb2ludExhdGl0dWRlPWxvY2F0aW9uLmxhdGl0dWRlO1xuICAgICAgICB0aGlzLnN0YXJ0cG9pbnRMb25naXR1ZGUgPSBsb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgICAgIFxuICAgICAgICB0aGlzLkxvbmdpdHVkZSA9IGxvY2F0aW9uLmxvbmdpdHVkZTtcbiAgICAgICAgdGhpcy5MYXRpdHVkZT0gbG9jYXRpb24ubGF0aXR1ZGU7XG5cbiAgICAgIH0sXG4gICAgICBlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJmYWlsZWQgdG8gZ2V0IGxvY2F0aW9uXCIpO1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiBBY2N1cmFjeS5oaWdoLFxuICAgICAgICBtYXhpbXVtQWdlOiA1MDAwLFxuICAgICAgICB0aW1lb3V0OiAyMDAwMFxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICAgIG9uTWFwUmVhZHkoYXJncykge1xuICAgICAgdGhpcy5tYXBib3ggPSBhcmdzLm1hcDtcbiAgICAgIHZhciBuYXRpdmVNYXBWaWV3ID0gYXJncy5pb3MgPyBhcmdzLmlvcyA6IGFyZ3MuYW5kcm9pZDtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBcIk1hcGJveCBvbk1hcFJlYWR5IGZvciBcIiArXG4gICAgICAgICAgKGFyZ3MuaW9zID8gXCJpT1NcIiA6IFwiQW5kcm9pZFwiKSArXG4gICAgICAgICAgXCIsIG5hdGl2ZSBvYmplY3QgcmVjZWl2ZWQ6IFwiICtcbiAgICAgICAgICBuYXRpdmVNYXBWaWV3XG4gICAgICApO1xuICAgICAgYXJncy5tYXAuYWRkTWFya2VycyhbXG4gICAgICAgIHtcbiAgICAgICAgICBsYXQ6IHRoaXMuc3RhcnRwb2ludExhdGl0dWRlLFxuICAgICAgICAgIGxuZzogdGhpcy5zdGFydHBvaW50TG9uZ2l0dWRlLFxuICAgICAgICAgIHRpdGxlOiBcIllvdSBhcmUgaGVyZVwiLFxuICAgICAgICAgIC8vc3VidGl0bGU6ICdSZWFsbHkgcmVhbGx5IG5pY2UgbG9jYXRpb24nLFxuICAgICAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgICAgICB9XG4gICAgICBdKTtcbiAgICB9XG5cblx0XG4gIG9uQm9va1RhcCgpIHtcblx0XHRjb25zb2xlLmxvZyhcIm9uQm9va1RhcFwiKTtcblx0XHR0aGlzLm1hcGJveC5nZXRVc2VyTG9jYXRpb24oKS50aGVuKFxuICAgICAgZnVuY3Rpb24odXNlckxvY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCB1c2VyIGxvY2F0aW9uOiBcIiArICB1c2VyTG9jYXRpb24ubG9jYXRpb24ubGF0ICsgXCIsIFwiICsgdXNlckxvY2F0aW9uLmxvY2F0aW9uLmxuZyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCB1c2VyIHNwZWVkOiBcIiArICB1c2VyTG9jYXRpb24uc3BlZWQpO1xuICAgICAgfSk7XG4gIH1cblxuXHRnZXRMb2NhdGlvbk9uY2UoKSB7XG4gICAgZ2VvbG9jYXRpb25cbiAgICAgIC5nZXRDdXJyZW50TG9jYXRpb24oeyBkZXNpcmVkQWNjdXJhY3k6IEFjY3VyYWN5LmhpZ2gsIHRpbWVvdXQ6IDUwMDAgfSlcbiAgICAgIC50aGVuKGxvY2F0aW9uID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydHBvaW50TGF0aXR1ZGUgcmVjZWl2ZWQ6IFwiICsgbG9jYXRpb24ubGF0aXR1ZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0cG9pbnRMb25naXR1ZGUgcmVjZWl2ZWQ6IFwiICsgbG9jYXRpb24ubG9uZ2l0dWRlKTtcbiAgICAgICAgdGhpcy5zdGFydHBvaW50TGF0aXR1ZGUgPSBsb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgdGhpcy5zdGFydHBvaW50TG9uZ2l0dWRlID0gbG9jYXRpb24ubG9uZ2l0dWRlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5Mb25naXR1ZGUgPSBsb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgICAgIHRoaXMuTGF0aXR1ZGU9IGxvY2F0aW9uLmxhdGl0dWRlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5tYXBib3guc2V0Q2VudGVyKHtcbiAgICAgICAgICBsYXQ6IGxvY2F0aW9uLmxhdGl0dWRlLFxuICAgICAgICAgIGxuZzogbG9jYXRpb24ubG9uZ2l0dWRlLFxuICAgICAgICAgIGFuaW1hdGVkOiB0cnVlXG4gICAgICB9KTtcblxuICAgICAgICB0aGlzLmdldEN1cnJlbnRBZGRyZXNzKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMb2NhdGlvbiBlcnJvciByZWNlaXZlZDogXCIgKyBlcnJvcik7XG4gICAgICB9KTtcblx0fVxuXHRcbiAgIGdldEN1cnJlbnRBZGRyZXNzKCkge1xuICAgICBjb25zb2xlLmxvZyhcbiAgICAgICBcImxhdGl0dWRlIGlzOiBcIiArXG4gICAgICAgICB0aGlzLnN0YXJ0cG9pbnRMYXRpdHVkZSArXG4gICAgICAgICBcImxvbmdpdHVkZSBpczpcIiArXG4gICAgICAgICB0aGlzLnN0YXJ0cG9pbnRMb25naXR1ZGVcbiAgICAgKTtcbiAgICAgdGhpcy5nb29nbGVTZXJ2aWNlXG4gICAgICAgLmdldEN1cnJlbnRMb2NhdGlvbih0aGlzLnN0YXJ0cG9pbnRMYXRpdHVkZSwgdGhpcy5zdGFydHBvaW50TG9uZ2l0dWRlKVxuICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG5cdCBcdFx0Ly9cdGNvbnNvbGUubG9nKFwiVGhlIHJlc3VsdCBpcyA6IFwiLCByZXN1bHQpO1xuXHQgXHRcdFx0dGhpcy5vcmlnaW4gPSByZXN1bHQucmVzdWx0c1swXS5mb3JtYXR0ZWRfYWRkcmVzcztcblx0IFx0XHRcdGNvbnNvbGUubG9nKFwiVGhlIGN1cnJlbnQgYWRkcmVzcyBpcyA6IFwiLCB0aGlzLm9yaWdpbik7XG4gICAgICAgfSlcbiAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgY29uc29sZS5sb2coXCJVbmFibGUgdG8gZ2V0IGN1cnJlbnQgYWRkcmVzcy4gRXJyb3Igb2NjdXJlZCE6XCIsIGVycm9yKTtcbiAgICAgICB9KTtcblx0IH1cblxuICAgIHNob3dTaWRlRHJhd2VyKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIGNvbnNvbGUubG9nKFwiU2hvdyBTaWRlRHJhd2VyIHRhcHBlZC5cIik7XG4gICAgLy8gU2hvdyBzaWRlZHJhd2VyIC4uLlxufVxuXG4gICBwdWJsaWMgcnJycnJycnJvbk1hcFJlYWR5KGFyZ3MpIHtcbiAgICAgdGhpcy5tYXBib3ggPSBhcmdzLm1hcDtcbiAgICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UuZ2V0TG9jYXRpb24oKS50aGVuKCgpID0+IHtcbiAgICAgICAgIHRoaXMubG9hZEluaXRhbExvY2F0aW9uKCkudGhlbihcbiAgICAgICAgICBsb2MgPT4ge1xuICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gbG9jLm1hcCgobG9jKSA9PiB7XG4gICAgICAgICAgICAgICAgICBsb2MuZGlzdGFuY2UgPSB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5nZXREaXN0YW5jZUZyb20oXG4gICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VGbG9hdChsb2MubGF0aXR1ZGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQobG9jLmxvbmdpdHVkZSkpO1xuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvYztcbiAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgIHRoaXMuZHJvcE1hcmtlcnMoKTtcbiAgICAgICAgICAgICAgICAgdGhpcy5tYXBib3guc2V0Q2VudGVyKHtcbiAgICAgICAgICAgICAgICAgICAgIGxhdDogdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UubGF0aXR1ZGUsXG4gICAgICAgICAgICAgICAgICAgICBsbmc6IHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmxvbmdpdHVkZSxcbiAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbiAgICAgICAgIH0pO1xuIH1cblxuIHB1YmxpYyBkcm9wTWFya2VycygpIHtcbiAgIGxldCBtYXJrZXJzID0gdGhpcy5wb3NpdGlvbi5tYXAoKGxvYzogUG9zaXRpb24sIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICByZXR1cm4ge1xuICAgICAgICAgICBsYXQ6IGxvYy5sYXRpdHVkZSxcbiAgICAgICAgICAgbG5nOiBsb2MubG9uZ2l0dWRlLFxuICAgICAgIH1cbiAgIH0pO1xuICAgdGhpcy5tYXBib3guYWRkTWFya2VycyhtYXJrZXJzKTtcbiB9XG5cbiAgIHB1YmxpYyBsb2FkSW5pdGFsTG9jYXRpb24oKSB7XG4gICAgIHJldHVybiB0aGlzLmdvb2dsZVNlcnZpY2UuZ2V0Q3VycmVudExvY2F0aW9uKHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmxhdGl0dWRlLCB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5sb25naXR1ZGUpO1xuICAgfVxufVxuIl19