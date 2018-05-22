"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { ActivatedRoute } from '@angular/router';
//import { Observable } from "rxjs/Observable";
var appSettings = require("application-settings");
var frame_1 = require("tns-core-modules/ui/frame");
var topmostFrame = frame_1.topmost();
var page_1 = require("ui/page");
var animations_1 = require("@angular/animations");
var nativescript_mapbox_1 = require("nativescript-mapbox");
var nativescript_geolocation_1 = require("nativescript-geolocation");
var enums_1 = require("ui/enums");
var geolocation_service_1 = require("~/shared/services/geolocation.service");
var google_play_service_1 = require("~/shared/services/google-play.service");
var router_1 = require("@angular/router");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(zone, geolocationService, _page, googleService, router) {
        this.zone = zone;
        this.geolocationService = geolocationService;
        this._page = _page;
        this.googleService = googleService;
        this.router = router;
        this.startpointLongitude = 0.3281469;
        this.startpointLatitude = 32.5678254;
        this.getLocation();
        this.mapbox = new nativescript_mapbox_1.Mapbox();
        if (!nativescript_geolocation_1.isEnabled()) {
            nativescript_geolocation_1.enableLocationRequest();
        }
    }
    HomeComponent.prototype.getLocation = function () {
        var _this = this;
        nativescript_geolocation_1.getCurrentLocation({ desiredAccuracy: enums_1.Accuracy.high, timeout: 8000 })
            .then(function (location) {
            console.log("startpointLatitude received: " + location.latitude);
            console.log("startpointLongitude received: " + location.longitude);
            _this.startpointLatitude = location.latitude;
            _this.startpointLongitude = location.longitude;
            _this.centerMap();
            _this.addMarkers();
            _this.getCurrentAddress();
        }).catch(function (error) {
            console.log("Location error received: " + error);
        });
    };
    HomeComponent.prototype.onStartBookingTap = function () {
        this.router.navigate(["search"]);
    };
    HomeComponent.prototype.getCurrentAddress = function () {
        console.log("latitude is: " +
            this.startpointLatitude +
            "longitude is:" +
            this.startpointLongitude);
        this.googleService
            .getCurrentLocation(this.startpointLatitude, this.startpointLongitude)
            .then(function (result) {
            appSettings.setString("origin", result);
        })
            .catch(function (error) {
            console.log("Unable to get current address. Error occured!:", error);
        });
    };
    HomeComponent.prototype.centerMap = function () {
        this.mapbox.setCenter({
            lat: this.startpointLatitude,
            lng: this.startpointLongitude,
            animated: true
        });
    };
    HomeComponent.prototype.addMarkers = function () {
        this.mapbox.addMarkers([
            {
                lat: this.startpointLatitude,
                lng: this.startpointLongitude,
                selected: true
            }
        ]);
    };
    HomeComponent.prototype.onMapReady = function (args) {
        this.mapbox = args.map;
        this.addMarkers();
        this.centerMap();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUlsRCxtREFBbUQ7QUFDbkQsK0NBQStDO0FBRS9DLGtEQUFxRDtBQUVyRCxtREFBMkQ7QUFDM0QsSUFBTSxZQUFZLEdBQVUsZUFBTyxFQUFFLENBQUM7QUFFdEMsZ0NBQStCO0FBRS9CLGtEQU02QjtBQUM3QiwyREFLNkI7QUFDN0IscUVBQW9IO0FBQ3BILGtDQUFvQztBQUdwQyw2RUFBMkU7QUFDM0UsNkVBQTBFO0FBSTFFLDBDQUEyRTtBQXFDM0U7SUFPRSx1QkFDVSxJQUFZLEVBQ1osa0JBQXNDLEVBQ3RDLEtBQVcsRUFDWCxhQUFnQyxFQUMvQixNQUFjO1FBSmYsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQUMvQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBVGxCLHdCQUFtQixHQUFXLFNBQVMsQ0FBQztRQUN4Qyx1QkFBa0IsR0FBVyxVQUFVLENBQUM7UUFVM0MsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSw0QkFBTSxFQUFFLENBQUM7UUFFNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxvQ0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLGdEQUFxQixFQUFFLENBQUM7UUFDMUIsQ0FBQztJQUVKLENBQUM7SUFFQSxtQ0FBVyxHQUFYO1FBQUEsaUJBYUE7UUFaRCw2Q0FBa0IsQ0FBQyxFQUFFLGVBQWUsRUFBRSxnQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDbkUsSUFBSSxDQUFDLFVBQUMsUUFBUTtZQUNkLE9BQU8sQ0FBQyxHQUFH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WSxFQUFFO29CQUNwQixrQkFBSyxDQUNILElBQUksRUFDSixrQkFBSyxDQUFDO3dCQUNKLE9BQU8sRUFBRSxDQUFDO3dCQUNWLFNBQVMsRUFBRSxjQUFjO3FCQUMxQixDQUFDLENBQ0g7b0JBQ0Qsa0JBQUssQ0FDSCxNQUFNLEVBQ04sa0JBQUssQ0FBQzt3QkFDSixPQUFPLEVBQUUsQ0FBQzt3QkFDVixTQUFTLEVBQUUsZ0JBQWdCO3FCQUM1QixDQUFDLENBQ0g7b0JBQ0QsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztpQkFDNUQsQ0FBQzthQUNIO1NBQ0YsQ0FBQzt5Q0FTZ0IsYUFBTTtZQUNRLHdDQUFrQjtZQUMvQixXQUFJO1lBQ0ksdUNBQWlCO1lBQ3ZCLGVBQU07T0FaZCxhQUFhLENBaUZ6QjtJQUFELG9CQUFDO0NBQUEsQUFqRkQsSUFpRkM7QUFqRlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG4vL2ltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XG4vL2ltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3VpL3RleHQtZmllbGQnO1xuaW1wb3J0IHsgRXZlbnREYXRhLCBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuLy9pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG4vL2ltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5cbmltcG9ydCAgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcblxuaW1wb3J0IHsgRnJhbWUsIHRvcG1vc3QgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9mcmFtZVwiO1xuY29uc3QgdG9wbW9zdEZyYW1lOiBGcmFtZSA9IHRvcG1vc3QoKTtcblxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgYW5pbWF0ZSxcbiAgdHJhbnNpdGlvblxufSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xuaW1wb3J0IHtcbiAgTWFwYm94LFxuICBNYXBTdHlsZSxcbiAgTWFwYm94Vmlld0FwaSxcbiAgVmlld3BvcnQgYXMgTWFwYm94Vmlld3BvcnRcbn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1tYXBib3hcIjtcbmltcG9ydCB7IExvY2F0aW9uLCBnZXRDdXJyZW50TG9jYXRpb24sIGlzRW5hYmxlZCwgZGlzdGFuY2UsIGVuYWJsZUxvY2F0aW9uUmVxdWVzdCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcbmltcG9ydCB7IEFjY3VyYWN5IH0gZnJvbSBcInVpL2VudW1zXCI7XG5pbXBvcnQgKiBhcyBhcHB2ZXJzaW9uIGZyb20gXCJuYXRpdmVzY3JpcHQtYXBwdmVyc2lvblwiO1xuaW1wb3J0IHsgRGlyZWN0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZGlyZWN0aW9uc1wiO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2dlb2xvY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IEdvb2dsZVBsYXlTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2dvb2dsZS1wbGF5LnNlcnZpY2VcIjtcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIn4vbW9kZWxzL2xvY2F0aW9uUmVzcG9uc2VcIjtcbmltcG9ydCB7IE9ic2VydmFibGVQcm9wZXJ0eSB9IGZyb20gXCJ+L3NoYXJlZC9vYnNlcnZhYmxlLWRlY29yYXRvclwiO1xuXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyLCBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQWxlcnRPcHRpb25zIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9ncy9kaWFsb2dzXCI7XG5cbmRlY2xhcmUgdmFyIFVJSW1hZ2U6IGFueTtcbmRlY2xhcmUgdmFyIFVJQmFyTWV0cmljczogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiaG9tZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUvaG9tZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vaG9tZS9ob21lLmNvbXBvbmVudC5jc3NcIl0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKFwiZmx5SW5PdXRcIiwgW1xuICAgICAgc3RhdGUoXCJpblwiLCBzdHlsZSh7IHRyYW5zZm9ybTogXCJzY2FsZSgxKVwiLCBvcGFjaXR5OiAxIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oXCJ2b2lkID0+ICpcIiwgW1xuICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogXCJzY2FsZSgwLjkpXCIsIG9wYWNpdHk6IDAgfSksXG4gICAgICAgIGFuaW1hdGUoXCIxMDAwbXMgMTAwbXMgZWFzZS1vdXRcIilcbiAgICAgIF0pXG4gICAgXSksXG4gICAgdHJpZ2dlcihcImZyb20tcmlnaHRcIiwgW1xuICAgICAgc3RhdGUoXG4gICAgICAgIFwiaW5cIixcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgwKVwiXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgIFwidm9pZFwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDIwJSlcIlxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXCJ2b2lkID0+ICpcIiwgW2FuaW1hdGUoXCI2MDBtcyAxNTAwbXMgZWFzZS1vdXRcIildKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCAge1xuICAvL29yaWdpbjogYW55O1xuICBwcml2YXRlIG1hcGJveDogTWFwYm94O1xuICBwdWJsaWMgc3RhcnRwb2ludExvbmdpdHVkZTogbnVtYmVyID0gMC4zMjgxNDY5O1xuICBwdWJsaWMgc3RhcnRwb2ludExhdGl0dWRlOiBudW1iZXIgPSAzMi41Njc4MjU0O1xuIFxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgZ2VvbG9jYXRpb25TZXJ2aWNlOiBHZW9sb2NhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIGdvb2dsZVNlcnZpY2U6IEdvb2dsZVBsYXlTZXJ2aWNlLFxuICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkge1xuICAgICAgdGhpcy5nZXRMb2NhdGlvbigpO1xuICAgICAgdGhpcy5tYXBib3ggPSBuZXcgTWFwYm94KCk7XG5cbiAgICAgaWYgKCFpc0VuYWJsZWQoKSkge1xuICAgICAgIGVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpO1xuICAgICB9XG4gXG4gIH1cbiAgXG4gICBnZXRMb2NhdGlvbigpIHtcblx0XHRnZXRDdXJyZW50TG9jYXRpb24oeyBkZXNpcmVkQWNjdXJhY3k6IEFjY3VyYWN5LmhpZ2gsIHRpbWVvdXQ6IDgwMDAgfSlcblx0XHRcdC50aGVuKChsb2NhdGlvbikgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcInN0YXJ0cG9pbnRMYXRpdHVkZSByZWNlaXZlZDogXCIgKyBsb2NhdGlvbi5sYXRpdHVkZSk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwic3RhcnRwb2ludExvbmdpdHVkZSByZWNlaXZlZDogXCIgKyBsb2NhdGlvbi5sb25naXR1ZGUpO1xuXHRcdFx0XHR0aGlzLnN0YXJ0cG9pbnRMYXRpdHVkZSA9IGxvY2F0aW9uLmxhdGl0dWRlO1xuICAgICAgICB0aGlzLnN0YXJ0cG9pbnRMb25naXR1ZGUgPSBsb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgICAgIHRoaXMuY2VudGVyTWFwKCk7XG4gICAgICAgIHRoaXMuYWRkTWFya2VycygpO1xuXHRcdFx0XHR0aGlzLmdldEN1cnJlbnRBZGRyZXNzKCk7XG5cdFx0XHR9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMb2NhdGlvbiBlcnJvciByZWNlaXZlZDogXCIgKyBlcnJvcik7XG5cdFx0XHR9KTtcbiAgfVxuICBcbm9uU3RhcnRCb29raW5nVGFwKCkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInNlYXJjaFwiXSk7XG59XG5cbmdldEN1cnJlbnRBZGRyZXNzKCkge1xuICBjb25zb2xlLmxvZyhcbiAgICBcImxhdGl0dWRlIGlzOiBcIiArXG4gICAgICB0aGlzLnN0YXJ0cG9pbnRMYXRpdHVkZSArXG4gICAgICBcImxvbmdpdHVkZSBpczpcIiArXG4gICAgICB0aGlzLnN0YXJ0cG9pbnRMb25naXR1ZGVcbiAgKTtcbiAgdGhpcy5nb29nbGVTZXJ2aWNlXG4gICAgLmdldEN1cnJlbnRMb2NhdGlvbih0aGlzLnN0YXJ0cG9pbnRMYXRpdHVkZSwgdGhpcy5zdGFydHBvaW50TG9uZ2l0dWRlKVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJvcmlnaW5cIiwgIHJlc3VsdCk7ICBcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIlVuYWJsZSB0byBnZXQgY3VycmVudCBhZGRyZXNzLiBFcnJvciBvY2N1cmVkITpcIiwgZXJyb3IpO1xuICAgIH0pO1xufVxuXG4gIGNlbnRlck1hcCgpIHtcbiAgIHRoaXMubWFwYm94LnNldENlbnRlcih7XG4gICAgICAgbGF0OiB0aGlzLnN0YXJ0cG9pbnRMYXRpdHVkZSxcbiAgICAgICBsbmc6IHRoaXMuc3RhcnRwb2ludExvbmdpdHVkZSxcbiAgICAgICBhbmltYXRlZDogdHJ1ZVxuICAgfSk7XG4gfVxuXG5hZGRNYXJrZXJzKCkge1xuICB0aGlzLm1hcGJveC5hZGRNYXJrZXJzKFtcbiAgICB7XG4gICAgICBsYXQ6IHRoaXMuc3RhcnRwb2ludExhdGl0dWRlLFxuICAgICAgbG5nOiB0aGlzLnN0YXJ0cG9pbnRMb25naXR1ZGUsXG4gICAgICBzZWxlY3RlZDogdHJ1ZVxuICAgIH1cbiAgXSk7XG59XG4gb25NYXBSZWFkeShhcmdzKSB7XG4gICAgIHRoaXMubWFwYm94ID0gYXJncy5tYXA7IFxuICAgICB0aGlzLmFkZE1hcmtlcnMoKTtcbiAgICAgdGhpcy5jZW50ZXJNYXAoKTtcbiAgICB9IFxufVxuIl19