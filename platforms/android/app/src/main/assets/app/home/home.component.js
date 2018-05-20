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
var geolocation = require("nativescript-geolocation");
var enums_1 = require("ui/enums");
var nativescript_directions_1 = require("nativescript-directions");
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
        this.directions = new nativescript_directions_1.Directions();
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }
        this.mapbox = new nativescript_mapbox_1.Mapbox();
    }
    HomeComponent.prototype.ngOnInit = function () {
        console.log("ngOnInit reached");
        this._longitude = 32.5678254;
        this._latitude = 0.3281469;
        this.getLocation();
    };
    Object.defineProperty(HomeComponent.prototype, "startpointLatitude", {
        get: function () {
            console.log("startpointLatitude get reached, and the value is :" + this._latitude);
            return this._latitude;
        },
        set: function (value) {
            console.log("startpointLatitude set reached, and the value is :" + value);
            this._latitude = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "startpointLongitude", {
        get: function () {
            console.log("startpointLongitude get reached, and the value is :" + this._longitude);
            return this._longitude;
        },
        set: function (value) {
            console.log("startpointLongitude set reached, and the value is :" + value);
            this._longitude = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "Origin", {
        get: function () {
            console.log("Origin get reached, and the value is :" + this._origin);
            return this._origin;
        },
        set: function (value) {
            console.log("Origin set reached, and the value is :" + value);
            this._origin = value;
        },
        enumerable: true,
        configurable: true
    });
    //=========================== End Properties =================================
    HomeComponent.prototype.getLocation = function () {
        var _this = this;
        geolocation.getCurrentLocation({ desiredAccuracy: enums_1.Accuracy.high, timeout: 8000 })
            .then(function (location) {
            console.log("startpointLatitude received: " + location.latitude);
            console.log("startpointLongitude received: " + location.longitude);
            _this._latitude = location.latitude;
            _this._longitude = location.longitude;
            _this.getCurrentAddress();
        }).catch(function (error) {
            console.log("Location error received: " + error);
        });
    };
    HomeComponent.prototype.onStartBookingTap = function () {
        this.router.navigate(["search"]);
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
            appSettings.setString("origin", result);
            _this.centerMap();
            _this.addMarkers();
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
        this.mapbox.setCenter({
            lat: this.startpointLatitude,
            lng: this.startpointLongitude,
            animated: true
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRDtBQUkxRCxtREFBbUQ7QUFDbkQsK0NBQStDO0FBRS9DLGtEQUFxRDtBQUVyRCxtREFBMkQ7QUFDM0QsSUFBTSxZQUFZLEdBQVUsZUFBTyxFQUFFLENBQUM7QUFFdEMsZ0NBQStCO0FBRS9CLGtEQU02QjtBQUM3QiwyREFLNkI7QUFDN0Isc0RBQXdEO0FBQ3hELGtDQUFvQztBQUVwQyxtRUFBcUQ7QUFDckQsNkVBQTJFO0FBQzNFLDZFQUEwRTtBQUkxRSwwQ0FBMkU7QUFxQzNFO0lBc0JFLHVCQUNVLElBQVksRUFDWixrQkFBc0MsRUFDdEMsS0FBVyxFQUNYLGFBQWdDLEVBQy9CLE1BQWM7UUFKZixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsa0JBQWEsR0FBYixhQUFhLENBQW1CO1FBQy9CLFdBQU0sR0FBTixNQUFNLENBQVE7UUF4QmpCLGVBQVUsR0FBRyxJQUFJLG9DQUFVLEVBQUUsQ0FBQztRQTBCcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3RDLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksNEJBQU0sRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFHRCxnQ0FBUSxHQUFSO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRWhDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBRTNCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNy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LHVCQUFVLENBQUMsV0FBVyxFQUFFO3dCQUN0QixrQkFBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7d0JBQzlDLG9CQUFPLENBQUMsdUJBQXVCLENBQUM7cUJBQ2pDLENBQUM7aUJBQ0gsQ0FBQztnQkFDRixvQkFBTyxDQUFDLFlBQVksRUFBRTtvQkFDcEIsa0JBQUssQ0FDSCxJQUFJLEVBQ0osa0JBQUssQ0FBQzt3QkFDSixPQUFPLEVBQUUsQ0FBQzt3QkFDVixTQUFTLEVBQUUsY0FBYztxQkFDMUIsQ0FBQyxDQUNIO29CQUNELGtCQUFLLENBQ0gsTUFBTSxFQUNOLGtCQUFLLENBQUM7d0JBQ0osT0FBTyxFQUFFLENBQUM7d0JBQ1YsU0FBUyxFQUFFLGdCQUFnQjtxQkFDNUIsQ0FBQyxDQUNIO29CQUNELHVCQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7aUJBQzVELENBQUM7YUFDSDtTQUNGLENBQUM7eUNBd0JnQixhQUFNO1lBQ1Esd0NBQWtCO1lBQy9CLFdBQUk7WUFDSSx1Q0FBaUI7WUFDdkIsZUFBTTtPQTNCZCxhQUFhLENBbUp6QjtJQUFELG9CQUFDO0NBQUEsQUFuSkQsSUFtSkM7QUFuSlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE5nWm9uZSwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbi8vaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbi8vaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndWkvdGV4dC1maWVsZCc7XG5pbXBvcnQgeyBFdmVudERhdGEsIE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG4vL2ltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbi8vaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcblxuaW1wb3J0ICAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuXG5pbXBvcnQgeyBGcmFtZSwgdG9wbW9zdCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ZyYW1lXCI7XG5jb25zdCB0b3Btb3N0RnJhbWU6IEZyYW1lID0gdG9wbW9zdCgpO1xuXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcblxuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICBhbmltYXRlLFxuICB0cmFuc2l0aW9uXG59IGZyb20gXCJAYW5ndWxhci9hbmltYXRpb25zXCI7XG5pbXBvcnQge1xuICBNYXBib3gsXG4gIE1hcFN0eWxlLFxuICBNYXBib3hWaWV3QXBpLFxuICBWaWV3cG9ydCBhcyBNYXBib3hWaWV3cG9ydFxufSBmcm9tIFwibmF0aXZlc2NyaXB0LW1hcGJveFwiO1xuaW1wb3J0ICogYXMgZ2VvbG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xuaW1wb3J0IHsgQWNjdXJhY3kgfSBmcm9tIFwidWkvZW51bXNcIjtcbmltcG9ydCAqIGFzIGFwcHZlcnNpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hcHB2ZXJzaW9uXCI7XG5pbXBvcnQgeyBEaXJlY3Rpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kaXJlY3Rpb25zXCI7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgR29vZ2xlUGxheVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvZ29vZ2xlLXBsYXkuc2VydmljZVwiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwifi9tb2RlbHMvbG9jYXRpb25SZXNwb25zZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZVByb3BlcnR5IH0gZnJvbSBcIn4vc2hhcmVkL29ic2VydmFibGUtZGVjb3JhdG9yXCI7XG5cbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBBbGVydE9wdGlvbnMgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzL2RpYWxvZ3NcIjtcblxuZGVjbGFyZSB2YXIgVUlJbWFnZTogYW55O1xuZGVjbGFyZSB2YXIgVUlCYXJNZXRyaWNzOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJob21lXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS9ob21lLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9ob21lL2hvbWUuY29tcG9uZW50LmNzc1wiXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoXCJmbHlJbk91dFwiLCBbXG4gICAgICBzdGF0ZShcImluXCIsIHN0eWxlKHsgdHJhbnNmb3JtOiBcInNjYWxlKDEpXCIsIG9wYWNpdHk6IDEgfSkpLFxuICAgICAgdHJhbnNpdGlvbihcInZvaWQgPT4gKlwiLCBbXG4gICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiBcInNjYWxlKDAuOSlcIiwgb3BhY2l0eTogMCB9KSxcbiAgICAgICAgYW5pbWF0ZShcIjEwMDBtcyAxMDBtcyBlYXNlLW91dFwiKVxuICAgICAgXSlcbiAgICBdKSxcbiAgICB0cmlnZ2VyKFwiZnJvbS1yaWdodFwiLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJpblwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDApXCJcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJ2b2lkXCIsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUoMjAlKVwiXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbihcInZvaWQgPT4gKlwiLCBbYW5pbWF0ZShcIjYwMG1zIDE1MDBtcyBlYXNlLW91dFwiKV0pXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLy9vcmlnaW46IGFueTtcbiAgcHJpdmF0ZSBtYXBib3g6IE1hcGJveDtcbiAgcHJpdmF0ZSBkaXJlY3Rpb25zID0gbmV3IERpcmVjdGlvbnMoKTtcblxuICAvL3B1YmxpYyBzdGFydHBvaW50TG9uZ2l0dWRlOiBudW1iZXI7XG4gIC8vcHVibGljIHN0YXJ0cG9pbnRMYXRpdHVkZTogbnVtYmVyO1xuICBwdWJsaWMgZW5kcG9pbnRMb25naXR1ZGU6IG51bWJlcjtcbiAgcHVibGljIGVuZHBvaW50TGF0aXR1ZGU6IG51bWJlcjtcbiAgcHVibGljIHRpbWVzdGFtcDogc3RyaW5nO1xuXG4gIHB1YmxpYyBob3Jpem9udGFsQWNjdXJhY3k6IG51bWJlcjtcbiAgcHVibGljIHZlcnRpY2FsQWNjdXJhY3k6IG51bWJlcjtcbiAgcHVibGljIGFsdGl0dWRlOiBudW1iZXI7XG4gIHB1YmxpYyBzcGVlZDogbnVtYmVyO1xuXG4gIHB1YmxpYyBwb3NpdGlvbjogUG9zaXRpb25bXTtcblxuICBjdXJyZW50R2VvTG9jYXRpb246IGFueTtcblxuICBwdWJsaWMgcGhvdG9zOiBhbnlbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGdlb2xvY2F0aW9uU2VydmljZTogR2VvbG9jYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSBnb29nbGVTZXJ2aWNlOiBHb29nbGVQbGF5U2VydmljZSxcbiAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHtcbiAgICBpZiAoIWdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTtcbiAgICB9XG4gICB0aGlzLm1hcGJveCA9IG5ldyBNYXBib3goKTtcbiAgfVxuXG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJuZ09uSW5pdCByZWFjaGVkXCIpO1xuXG4gICAgdGhpcy5fbG9uZ2l0dWRlID0gMzIuNTY3ODI1NDtcbiAgICB0aGlzLl9sYXRpdHVkZSA9IDAuMzI4MTQ2OTtcblxuICAgIHRoaXMuZ2V0TG9jYXRpb24oKTtcbiAgfVxuXG4gIFxuIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09IFN0YXJ0IFByb3BlcnRpZXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gcHJpdmF0ZSBfbGF0aXR1ZGU6IG51bWJlcjtcbiBwdWJsaWMgZ2V0IHN0YXJ0cG9pbnRMYXRpdHVkZSgpOiBudW1iZXIge1xuICAgY29uc29sZS5sb2coXCJzdGFydHBvaW50TGF0aXR1ZGUgZ2V0IHJlYWNoZWQsIGFuZCB0aGUgdmFsdWUgaXMgOlwiICsgdGhpcy5fbGF0aXR1ZGUpO1xuICAgcmV0dXJuIHRoaXMuX2xhdGl0dWRlO1xuIH1cblxuIHB1YmxpYyBzZXQgc3RhcnRwb2ludExhdGl0dWRlKHZhbHVlOiBudW1iZXIpIHtcbiAgIGNvbnNvbGUubG9nKFwic3RhcnRwb2ludExhdGl0dWRlIHNldCByZWFjaGVkLCBhbmQgdGhlIHZhbHVlIGlzIDpcIiArIHZhbHVlKTtcbiAgIHRoaXMuX2xhdGl0dWRlID0gdmFsdWU7XG4gfVxuXG4gcHJpdmF0ZSBfbG9uZ2l0dWRlOiBudW1iZXI7XG4gcHVibGljIGdldCBzdGFydHBvaW50TG9uZ2l0dWRlKCk6IG51bWJlciB7XG4gICBjb25zb2xlLmxvZyhcInN0YXJ0cG9pbnRMb25naXR1ZGUgZ2V0IHJlYWNoZWQsIGFuZCB0aGUgdmFsdWUgaXMgOlwiICsgdGhpcy5fbG9uZ2l0dWRlKTtcbiAgIHJldHVybiB0aGlzLl9sb25naXR1ZGU7XG4gfVxuXG4gcHVibGljIHNldCBzdGFydHBvaW50TG9uZ2l0dWRlKHZhbHVlOiBudW1iZXIpIHtcbiAgIGNvbnNvbGUubG9nKFwic3RhcnRwb2ludExvbmdpdHVkZSBzZXQgcmVhY2hlZCwgYW5kIHRoZSB2YWx1ZSBpcyA6XCIgKyB2YWx1ZSk7XG4gICB0aGlzLl9sb25naXR1ZGUgPSB2YWx1ZTtcbiB9XG5cblxuIHByaXZhdGUgX29yaWdpbjogc3RyaW5nO1xuIHB1YmxpYyBnZXQgT3JpZ2luKCk6IHN0cmluZyB7XG4gICBjb25zb2xlLmxvZyhcIk9yaWdpbiBnZXQgcmVhY2hlZCwgYW5kIHRoZSB2YWx1ZSBpcyA6XCIgKyB0aGlzLl9vcmlnaW4pO1xuICAgcmV0dXJuIHRoaXMuX29yaWdpbjtcbiB9XG5cbiBwdWJsaWMgc2V0IE9yaWdpbih2YWx1ZTogc3RyaW5nKSB7XG4gICBjb25zb2xlLmxvZyhcIk9yaWdpbiBzZXQgcmVhY2hlZCwgYW5kIHRoZSB2YWx1ZSBpcyA6XCIgKyB2YWx1ZSk7XG4gICB0aGlzLl9vcmlnaW4gPSB2YWx1ZTtcbiB9XG4gLy89PT09PT09PT09PT09PT09PT09PT09PT09PT0gRW5kIFByb3BlcnRpZXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZ2V0TG9jYXRpb24oKSB7XG5cdFx0Z2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHsgZGVzaXJlZEFjY3VyYWN5OiBBY2N1cmFjeS5oaWdoLCB0aW1lb3V0OiA4MDAwIH0pXG5cdFx0XHQudGhlbigobG9jYXRpb24pID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJzdGFydHBvaW50TGF0aXR1ZGUgcmVjZWl2ZWQ6IFwiICsgbG9jYXRpb24ubGF0aXR1ZGUpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcInN0YXJ0cG9pbnRMb25naXR1ZGUgcmVjZWl2ZWQ6IFwiICsgbG9jYXRpb24ubG9uZ2l0dWRlKTtcblx0XHRcdFx0dGhpcy5fbGF0aXR1ZGUgPSBsb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgdGhpcy5fbG9uZ2l0dWRlID0gbG9jYXRpb24ubG9uZ2l0dWRlO1xuXG5cdFx0XHRcdHRoaXMuZ2V0Q3VycmVudEFkZHJlc3MoKTtcblx0XHRcdH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxvY2F0aW9uIGVycm9yIHJlY2VpdmVkOiBcIiArIGVycm9yKTtcblx0XHRcdH0pO1xuICB9XG4gIFxub25TdGFydEJvb2tpbmdUYXAoKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wic2VhcmNoXCJdKTtcbn1cblxuZ2V0Q3VycmVudEFkZHJlc3MoKSB7XG4gIGNvbnNvbGUubG9nKFxuICAgIFwibGF0aXR1ZGUgaXM6IFwiICtcbiAgICAgIHRoaXMuc3RhcnRwb2ludExhdGl0dWRlICtcbiAgICAgIFwibG9uZ2l0dWRlIGlzOlwiICtcbiAgICAgIHRoaXMuc3RhcnRwb2ludExvbmdpdHVkZVxuICApO1xuICB0aGlzLmdvb2dsZVNlcnZpY2VcbiAgICAuZ2V0Q3VycmVudExvY2F0aW9uKHRoaXMuc3RhcnRwb2ludExhdGl0dWRlLCB0aGlzLnN0YXJ0cG9pbnRMb25naXR1ZGUpXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhcIm9yaWdpblwiLCAgcmVzdWx0KTtcbiAgICAgIHRoaXMuY2VudGVyTWFwKCk7XG4gICAgICB0aGlzLmFkZE1hcmtlcnMoKTtcblxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiVW5hYmxlIHRvIGdldCBjdXJyZW50IGFkZHJlc3MuIEVycm9yIG9jY3VyZWQhOlwiLCBlcnJvcik7XG4gICAgfSk7XG59XG5cbiAgY2VudGVyTWFwKCkge1xuICAgdGhpcy5tYXBib3guc2V0Q2VudGVyKHtcbiAgICAgICBsYXQ6IHRoaXMuc3RhcnRwb2ludExhdGl0dWRlLFxuICAgICAgIGxuZzogdGhpcy5zdGFydHBvaW50TG9uZ2l0dWRlLFxuICAgICAgIGFuaW1hdGVkOiB0cnVlXG4gICB9KTtcbiB9XG5cbmFkZE1hcmtlcnMoKSB7XG4gIHRoaXMubWFwYm94LmFkZE1hcmtlcnMoW1xuICAgIHtcbiAgICAgIGxhdDogdGhpcy5zdGFydHBvaW50TGF0aXR1ZGUsXG4gICAgICBsbmc6IHRoaXMuc3RhcnRwb2ludExvbmdpdHVkZSxcbiAgICAgIHNlbGVjdGVkOiB0cnVlXG4gICAgfVxuICBdKTtcbn1cbm9uTWFwUmVhZHkoYXJncykge1xuICAgIHRoaXMubWFwYm94ID0gYXJncy5tYXA7XG4gICAgdGhpcy5hZGRNYXJrZXJzKCk7XG4gICAgdGhpcy5tYXBib3guc2V0Q2VudGVyKHtcbiAgICAgIGxhdDogdGhpcy5zdGFydHBvaW50TGF0aXR1ZGUsXG4gICAgICBsbmc6IHRoaXMuc3RhcnRwb2ludExvbmdpdHVkZSxcbiAgICAgIGFuaW1hdGVkOiB0cnVlXG4gIH0pOyAgXG59XG5cbn1cbiJdfQ==