"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var geolocation_service_1 = require("~/shared/services/geolocation.service");
var page_1 = require("ui/page");
var geolocation = require("nativescript-geolocation");
var modal_component_1 = require("~/booking/modal.component");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
var router_1 = require("@angular/router");
var BookingComponent = /** @class */ (function () {
    function BookingComponent(page, router, zone, geolocationService) {
        this.page = page;
        this.router = router;
        this.zone = zone;
        this.geolocationService = geolocationService;
        this.startpointLongitude = 42.696552;
        this.startpointLatitude = 23.32601;
        this.endpointLongitude = 40.71448;
        this.endpointLatitude = -74.00598;
        this.page.actionBarHidden = true;
    }
    BookingComponent.prototype.ngOnInit = function () {
        if (!geolocation.isEnabled) {
            geolocation.enableLocationRequest();
        }
        this.doAddPolyline();
    };
    Object.defineProperty(BookingComponent.prototype, "Latitude", {
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
    Object.defineProperty(BookingComponent.prototype, "Longitude", {
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
    BookingComponent.prototype.searchDestination = function () {
        console.log(">>>>>>>>>>>> search Origin <<<<<<<<<<<<<: ");
        var navigationExtras = {
            queryParams: { searchType: "origin" }
        };
        this.router.navigate(["search"], navigationExtras);
        //this.router.navigate(["chat"], navigationExtras);
    };
    BookingComponent.prototype.doSetCenter = function () {
        this.mapbox.setCenter({
            lat: 52.3602160,
            lng: 4.8891680,
            animated: true
        }).then(function (result) {
            console.log("Mapbox setCenter done");
        }, function (error) {
            console.log("mapbox setCenter error: " + error);
        });
    };
    BookingComponent.prototype.doAddPolyline = function () {
        this.mapbox.addPolyline({
            id: 1,
            color: "#30BCFF",
            width: 5,
            opacity: 0.6,
            points: [
                {
                    lat: 52.3923633,
                    lng: 4.9026489
                },
                {
                    lat: 52.3709879,
                    lng: 4.9555206
                },
                {
                    lat: 52.3542155,
                    lng: 4.9308013
                },
                {
                    lat: 52.3537961,
                    lng: 4.8799896
                },
                {
                    lat: 52.3701494,
                    lng: 4.8360443
                },
                {
                    lat: 52.3864966,
                    lng: 4.8621368
                },
                {
                    lat: 52.3848202,
                    lng: 4.8868560
                }
            ]
        }).then(function (result) {
            console.log("Mapbox addPolyline done");
        }, function (error) {
            console.log("mapbox addPolyline error: " + error);
        });
    };
    __decorate([
        core_1.ViewChild(modal_component_1.ModalComponent),
        __metadata("design:type", modal_component_1.ModalComponent)
    ], BookingComponent.prototype, "modal", void 0);
    BookingComponent = __decorate([
        core_1.Component({
            selector: 'booking',
            templateUrl: './booking/booking.component.html',
            styleUrls: ['./booking/booking.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.Router,
            core_1.NgZone,
            geolocation_service_1.GeolocationService])
    ], BookingComponent);
    return BookingComponent;
}());
exports.BookingComponent = BookingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va2luZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJib29raW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRjtBQUNqRiw2RUFBMkU7QUFFM0UsZ0NBQXNDO0FBZXRDLHNEQUF3RDtBQUd4RCw2REFBMkQ7QUFFM0QsMERBQTBEO0FBQzFELDRDQUE0QztBQUM1Qyw4Q0FBOEM7QUFDOUMsMENBQTJFO0FBUTNFO0lBV0MsMEJBQW9CLElBQVUsRUFDcEIsTUFBYyxFQUNmLElBQVksRUFDWixrQkFBc0M7UUFIM0IsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNwQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2YsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFSeEMsd0JBQW1CLEdBQVcsU0FBUyxDQUFDO1FBQ3JDLHVCQUFrQixHQUFXLFFBQVEsQ0FBQztRQUN6QyxzQkFBaUIsR0FBVyxRQUFRLENBQUM7UUFDckMscUJBQWdCLEdBQVcsQ0FBQyxRQUFRLENBQUM7UUFNM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBRWpDLENBQUM7SUFFRixtQ0FBUSxHQUFSO1FBQ0MsRUFBRSxDQUFBLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQztZQUMxQixXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFJQSxzQkFBVyxzQ0FBUTthQUFuQjtZQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7YUFFRCxVQUFvQixLQUFhO1lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQzs7O09BTEE7SUFRRCxzQkFBVyx1Q0FBUzthQUFwQjtZQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7YUFFRCxVQUFxQixLQUFhO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQzs7O09BTEE7SUFPRCw4RUFBOEU7SUFFaEYsNENBQWlCLEdBQWpCO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1FBQ3hELElBQUksZ0JBQWdCLEdBQXFCO1lBQ3ZDLFdBQVcsRUFBRSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7U0FDdEMsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNuRCxtREFBbUQ7SUFDdkQsQ0FBQztJQUdPLHNDQUFXLEdBQWxCO1FBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQ3BCO1lBQ0UsR0FBRyxFQUFFLFVBQVU7WUFDZixHQUFHLEVBQUUsU0FBUztZQUNkLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FDRCxDQUFDLElBQUksQ0FDTCxVQUFBLE1BQU07WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDdkMsQ0FBQyxFQUNELFVBQUMsS0FBYTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUNELENBQUM7SUFDRCxDQUFDO0lBRVMsd0NBQWEsR0FBcEI7UUFDSixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUN0QixFQUFFLEVBQUUsQ0FBQztZQUNMLEtBQUssRUFBRSxTQUFTO1lBQ2hCLEtBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxFQUFFLEdBQUc7WUFDWixNQUFNLEVBQUU7Z0JBQ1Q7b0JBQ0UsR0FBRyxFQUFFLFVBQVU7b0JBQ2YsR0FBRyxFQUFFLFNBQVM7aUJBQ2Y7Z0JBQ0Q7b0JBQ0UsR0FBRyxFQUFFLFVBQVU7b0JBQ2YsR0FBRyxFQUFFLFNBQVM7aUJBQ2Y7Z0JBQ0Q7b0JBQ0UsR0FBRyxFQUFFLFVBQVU7b0JBQ2YsR0FBRyxFQUFFLFNBQVM7aUJBQ2Y7Z0JBQ0Q7b0JBQ0UsR0FBRyxFQUFFLFVBQVU7b0JBQ2YsR0FBRyxFQUFFLFNBQVM7aUJBQ2Y7Z0JBQ0Q7b0JBQ0UsR0FBRyxFQUFFLFVBQVU7b0JBQ2YsR0FBRyxFQUFFLFNBQVM7aUJBQ2Y7Z0JBQ0Q7b0JBQ0UsR0FBRyxFQUFFLFVBQVU7b0JBQ2YsR0FBRyxFQUFFLFNBQVM7aUJBQ2Y7Z0JBQ0Q7b0JBQ0UsR0FBRyxFQUFFLFVBQVU7b0JBQ2YsR0FBRyxFQUFFLFNBQVM7aUJBQ2Y7YUFDQztTQUNGLENBQUMsQ0FBQyxJQUFJLENBQ04sVUFBQSxNQUFNO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsRUFDRCxVQUFDLEtBQWE7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FDRCxDQUFDO0lBQ0QsQ0FBQztJQXhIeUI7UUFBMUIsZ0JBQVMsQ0FBQyxnQ0FBYyxDQUFDO2tDQUFRLGdDQUFjO21EQUFDO0lBRnRDLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxTQUFTLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztTQUM5QyxDQUFDO3lDQWF5QixXQUFJO1lBQ1osZUFBTTtZQUNULGFBQU07WUFDUSx3Q0FBa0I7T0FkbkMsZ0JBQWdCLENBMkg1QjtJQUFELHVCQUFDO0NBQUEsQUEzSEQsSUEySEM7QUEzSFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBOZ1pvbmUsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tICd+L3NoYXJlZC9zZXJ2aWNlcy9nZW9sb2NhdGlvbi5zZXJ2aWNlJztcblxuaW1wb3J0IHsgUGFnZSwgQ29sb3IgfSBmcm9tIFwidWkvcGFnZVwiO1xuXG5pbXBvcnQge1xuICB0cmlnZ2VyLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIGFuaW1hdGUsXG4gIHRyYW5zaXRpb25cbn0gZnJvbSBcIkBhbmd1bGFyL2FuaW1hdGlvbnNcIjtcbmltcG9ydCB7XG4gIE1hcGJveCxcbiAgTWFwU3R5bGUsXG4gIE1hcGJveFZpZXdBcGksXG4gIFZpZXdwb3J0IGFzIE1hcGJveFZpZXdwb3J0XG59IGZyb20gXCJuYXRpdmVzY3JpcHQtbWFwYm94XCI7XG5pbXBvcnQgKiBhcyBnZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBBY2N1cmFjeSB9IGZyb20gXCJ1aS9lbnVtc1wiO1xuXG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gJ34vYm9va2luZy9tb2RhbC5jb21wb25lbnQnO1xuXG4vL2ltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XG4vL2ltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3VpL3RleHQtZmllbGQnO1xuLy9pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnYm9va2luZycsXG5cdHRlbXBsYXRlVXJsOiAnLi9ib29raW5nL2Jvb2tpbmcuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9ib29raW5nL2Jvb2tpbmcuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgQm9va2luZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQFZpZXdDaGlsZChNb2RhbENvbXBvbmVudCkgbW9kYWw6IE1vZGFsQ29tcG9uZW50O1xuXG5cdHByaXZhdGUgbWFwYm94OiBNYXBib3g7XG5cdFxuXHRwdWJsaWMgc3RhcnRwb2ludExvbmdpdHVkZTogbnVtYmVyID0gNDIuNjk2NTUyO1xuICAgIHB1YmxpYyBzdGFydHBvaW50TGF0aXR1ZGU6IG51bWJlciA9IDIzLjMyNjAxO1xuXHRwdWJsaWMgZW5kcG9pbnRMb25naXR1ZGU6IG51bWJlciA9IDQwLjcxNDQ4O1xuXHRwdWJsaWMgZW5kcG9pbnRMYXRpdHVkZTogbnVtYmVyID0gLTc0LjAwNTk4O1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSxcblx0XHQgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcblx0XHRwcml2YXRlIHpvbmU6IE5nWm9uZSwgXG5cdFx0cHJpdmF0ZSBnZW9sb2NhdGlvblNlcnZpY2U6IEdlb2xvY2F0aW9uU2VydmljZSkge1xuXHRcdHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuXHRcdFxuXHQgfVxuXG5cdG5nT25Jbml0KCkgeyBcblx0XHRpZighZ2VvbG9jYXRpb24uaXNFbmFibGVkKXtcblx0XHRcdGdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpO1xuXHRcdH1cblx0XHR0aGlzLmRvQWRkUG9seWxpbmUoKTtcblx0fVxuXG4gLy89PT09PT09PT09PT09PT09PT09PT09PT09PT0gU3RhcnQgUHJvcGVydGllcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgcHJpdmF0ZSBfbGF0aXR1ZGU6IG51bWJlcjtcbiAgcHVibGljIGdldCBMYXRpdHVkZSgpOiBudW1iZXIge1xuICAgIGNvbnNvbGUubG9nKFwiTGF0aXR1ZGUgZ2V0IHJlYWNoZWQsIGFuZCB0aGUgdmFsdWUgaXMgOlwiICsgdGhpcy5fbGF0aXR1ZGUpO1xuICAgIHJldHVybiB0aGlzLl9sYXRpdHVkZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgTGF0aXR1ZGUodmFsdWU6IG51bWJlcikge1xuICAgIGNvbnNvbGUubG9nKFwiTGF0aXR1ZGUgc2V0IHJlYWNoZWQsIGFuZCB0aGUgdmFsdWUgaXMgOlwiICsgdmFsdWUpO1xuICAgIHRoaXMuX2xhdGl0dWRlID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9sb25naXR1ZGU6IG51bWJlcjtcbiAgcHVibGljIGdldCBMb25naXR1ZGUoKTogbnVtYmVyIHtcbiAgICBjb25zb2xlLmxvZyhcIkxvbmdpdHVkZSBnZXQgcmVhY2hlZCwgYW5kIHRoZSB2YWx1ZSBpcyA6XCIgKyB0aGlzLl9sb25naXR1ZGUpO1xuICAgIHJldHVybiB0aGlzLl9sb25naXR1ZGU7XG4gIH1cblxuICBwdWJsaWMgc2V0IExvbmdpdHVkZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgY29uc29sZS5sb2coXCJMb25naXR1ZGUgc2V0IHJlYWNoZWQsIGFuZCB0aGUgdmFsdWUgaXMgOlwiICsgdmFsdWUpO1xuICAgIHRoaXMuX2xvbmdpdHVkZSA9IHZhbHVlO1xuICB9XG5cbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT0gRW5kIFByb3BlcnRpZXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIFxuc2VhcmNoRGVzdGluYXRpb24oKSB7XG5cdCBjb25zb2xlLmxvZyhcIj4+Pj4+Pj4+Pj4+PiBzZWFyY2ggT3JpZ2luIDw8PDw8PDw8PDw8PDw6IFwiKTtcbiAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7IHNlYXJjaFR5cGU6IFwib3JpZ2luXCIgfVxuICAgIH07XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wic2VhcmNoXCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcImNoYXRcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xufVxuIFxuXG5cdHB1YmxpYyBkb1NldENlbnRlcigpOiB2b2lkIHtcblx0XHR0aGlzLm1hcGJveC5zZXRDZW50ZXIoXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzYwMjE2MCxcblx0XHRcdCAgbG5nOiA0Ljg4OTE2ODAsXG5cdFx0XHQgIGFuaW1hdGVkOiB0cnVlXG5cdFx0XHR9XG5cdFx0KS50aGVuKFxuXHRcdFx0cmVzdWx0ID0+IHtcblx0XHRcdCAgY29uc29sZS5sb2coXCJNYXBib3ggc2V0Q2VudGVyIGRvbmVcIik7XG5cdFx0XHR9LFxuXHRcdFx0KGVycm9yOiBzdHJpbmcpID0+IHtcblx0XHRcdCAgY29uc29sZS5sb2coXCJtYXBib3ggc2V0Q2VudGVyIGVycm9yOiBcIiArIGVycm9yKTtcblx0XHRcdH1cblx0XHQpO1xuXHQgIH1cblxuXHQgIFx0ICBwdWJsaWMgZG9BZGRQb2x5bGluZSgpOiB2b2lkIHtcblx0XHR0aGlzLm1hcGJveC5hZGRQb2x5bGluZSh7XG5cdFx0ICBpZDogMSxcblx0XHQgIGNvbG9yOiBcIiMzMEJDRkZcIixcblx0XHQgIHdpZHRoOiA1LFxuXHRcdCAgb3BhY2l0eTogMC42LFxuXHRcdCAgcG9pbnRzOiBbXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzkyMzYzMyxcblx0XHRcdCAgbG5nOiA0LjkwMjY0ODlcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzcwOTg3OSxcblx0XHRcdCAgbG5nOiA0Ljk1NTUyMDZcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzU0MjE1NSxcblx0XHRcdCAgbG5nOiA0LjkzMDgwMTNcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzUzNzk2MSxcblx0XHRcdCAgbG5nOiA0Ljg3OTk4OTZcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzcwMTQ5NCxcblx0XHRcdCAgbG5nOiA0LjgzNjA0NDNcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzg2NDk2Nixcblx0XHRcdCAgbG5nOiA0Ljg2MjEzNjhcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzg0ODIwMixcblx0XHRcdCAgbG5nOiA0Ljg4Njg1NjBcblx0XHRcdH1cblx0XHQgIF1cblx0XHR9KS50aGVuKFxuXHRcdFx0cmVzdWx0ID0+IHtcblx0XHRcdCAgY29uc29sZS5sb2coXCJNYXBib3ggYWRkUG9seWxpbmUgZG9uZVwiKTtcblx0XHRcdH0sXG5cdFx0XHQoZXJyb3I6IHN0cmluZykgPT4ge1xuXHRcdFx0ICBjb25zb2xlLmxvZyhcIm1hcGJveCBhZGRQb2x5bGluZSBlcnJvcjogXCIgKyBlcnJvcik7XG5cdFx0XHR9XG5cdFx0KTtcblx0ICB9XG59Il19