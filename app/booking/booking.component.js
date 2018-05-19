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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va2luZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJib29raW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRjtBQUNqRiw2RUFBMkU7QUFFM0UsZ0NBQXNDO0FBZXRDLHNEQUF3RDtBQUd4RCw2REFBMkQ7QUFFM0QsMERBQTBEO0FBQzFELDRDQUE0QztBQUM1Qyw4Q0FBOEM7QUFDOUMsMENBQTJFO0FBUTNFO0lBV0MsMEJBQW9CLElBQVUsRUFDcEIsTUFBYyxFQUNmLElBQVksRUFDWixrQkFBc0M7UUFIM0IsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNwQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2YsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFSeEMsd0JBQW1CLEdBQVcsU0FBUyxDQUFDO1FBQ3JDLHVCQUFrQixHQUFXLFFBQVEsQ0FBQztRQUN6QyxzQkFBaUIsR0FBVyxRQUFRLENBQUM7UUFDckMscUJBQWdCLEdBQVcsQ0FBQyxRQUFRLENBQUM7UUFNM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBRWpDLENBQUM7SUFFRixtQ0FBUSxHQUFSO1FBQ0MsRUFBRSxDQUFBLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQztZQUMxQixXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFHRiw0Q0FBaUIsR0FBakI7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7UUFDeEQsSUFBSSxnQkFBZ0IsR0FBcUI7WUFDdkMsV0FBVyxFQUFFLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTtTQUN0QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25ELG1EQUFtRDtJQUN2RCxDQUFDO0lBR08sc0NBQVcsR0FBbEI7UUFDQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDcEI7WUFDRSxHQUFHLEVBQUUsVUFBVTtZQUNmLEdBQUcsRUFBRSxTQUFTO1lBQ2QsUUFBUSxFQUFFLElBQUk7U0FDZixDQUNELENBQUMsSUFBSSxDQUNMLFVBQUEsTUFBTTtZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN2QyxDQUFDLEVBQ0QsVUFBQyxLQUFhO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQ0QsQ0FBQztJQUNELENBQUM7SUFFUyx3Q0FBYSxHQUFwQjtRQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3RCLEVBQUUsRUFBRSxDQUFDO1lBQ0wsS0FBSyxFQUFFLFNBQVM7WUFDaEIsS0FBSyxFQUFFLENBQUM7WUFDUixPQUFPLEVBQUUsR0FBRztZQUNaLE1BQU0sRUFBRTtnQkFDVDtvQkFDRSxHQUFHLEVBQUUsVUFBVTtvQkFDZixHQUFHLEVBQUUsU0FBUztpQkFDZjtnQkFDRDtvQkFDRSxHQUFHLEVBQUUsVUFBVTtvQkFDZixHQUFHLEVBQUUsU0FBUztpQkFDZjtnQkFDRDtvQkFDRSxHQUFHLEVBQUUsVUFBVTtvQkFDZixHQUFHLEVBQUUsU0FBUztpQkFDZjtnQkFDRDtvQkFDRSxHQUFHLEVBQUUsVUFBVTtvQkFDZixHQUFHLEVBQUUsU0FBUztpQkFDZjtnQkFDRDtvQkFDRSxHQUFHLEVBQUUsVUFBVTtvQkFDZixHQUFHLEVBQUUsU0FBUztpQkFDZjtnQkFDRDtvQkFDRSxHQUFHLEVBQUUsVUFBVTtvQkFDZixHQUFHLEVBQUUsU0FBUztpQkFDZjtnQkFDRDtvQkFDRSxHQUFHLEVBQUUsVUFBVTtvQkFDZixHQUFHLEVBQUUsU0FBUztpQkFDZjthQUNDO1NBQ0YsQ0FBQyxDQUFDLElBQUksQ0FDTixVQUFBLE1BQU07WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDekMsQ0FBQyxFQUNELFVBQUMsS0FBYTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUNELENBQUM7SUFDRCxDQUFDO0lBaEd5QjtRQUExQixnQkFBUyxDQUFDLGdDQUFjLENBQUM7a0NBQVEsZ0NBQWM7bURBQUM7SUFGdEMsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO1NBQzlDLENBQUM7eUNBYXlCLFdBQUk7WUFDWixlQUFNO1lBQ1QsYUFBTTtZQUNRLHdDQUFrQjtPQWRuQyxnQkFBZ0IsQ0FtRzVCO0lBQUQsdUJBQUM7Q0FBQSxBQW5HRCxJQW1HQztBQW5HWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE5nWm9uZSwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdlb2xvY2F0aW9uU2VydmljZSB9IGZyb20gJ34vc2hhcmVkL3NlcnZpY2VzL2dlb2xvY2F0aW9uLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBQYWdlLCBDb2xvciB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgYW5pbWF0ZSxcbiAgdHJhbnNpdGlvblxufSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xuaW1wb3J0IHtcbiAgTWFwYm94LFxuICBNYXBTdHlsZSxcbiAgTWFwYm94Vmlld0FwaSxcbiAgVmlld3BvcnQgYXMgTWFwYm94Vmlld3BvcnRcbn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1tYXBib3hcIjtcbmltcG9ydCAqIGFzIGdlb2xvY2F0aW9uIGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcbmltcG9ydCB7IEFjY3VyYWN5IH0gZnJvbSBcInVpL2VudW1zXCI7XG5cbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnfi9ib29raW5nL21vZGFsLmNvbXBvbmVudCc7XG5cbi8vaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbi8vaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndWkvdGV4dC1maWVsZCc7XG4vL2ltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyLCBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdib29raW5nJyxcblx0dGVtcGxhdGVVcmw6ICcuL2Jvb2tpbmcvYm9va2luZy5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2Jvb2tpbmcvYm9va2luZy5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBCb29raW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBAVmlld0NoaWxkKE1vZGFsQ29tcG9uZW50KSBtb2RhbDogTW9kYWxDb21wb25lbnQ7XG5cblx0cHJpdmF0ZSBtYXBib3g6IE1hcGJveDtcblx0XG5cdHB1YmxpYyBzdGFydHBvaW50TG9uZ2l0dWRlOiBudW1iZXIgPSA0Mi42OTY1NTI7XG4gICAgcHVibGljIHN0YXJ0cG9pbnRMYXRpdHVkZTogbnVtYmVyID0gMjMuMzI2MDE7XG5cdHB1YmxpYyBlbmRwb2ludExvbmdpdHVkZTogbnVtYmVyID0gNDAuNzE0NDg7XG5cdHB1YmxpYyBlbmRwb2ludExhdGl0dWRlOiBudW1iZXIgPSAtNzQuMDA1OTg7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLFxuXHRcdCBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuXHRcdHByaXZhdGUgem9uZTogTmdab25lLCBcblx0XHRwcml2YXRlIGdlb2xvY2F0aW9uU2VydmljZTogR2VvbG9jYXRpb25TZXJ2aWNlKSB7XG5cdFx0dGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG5cdFx0XG5cdCB9XG5cblx0bmdPbkluaXQoKSB7IFxuXHRcdGlmKCFnZW9sb2NhdGlvbi5pc0VuYWJsZWQpe1xuXHRcdFx0Z2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7XG5cdFx0fVxuXHRcdHRoaXMuZG9BZGRQb2x5bGluZSgpO1xuXHR9XG5cblxuc2VhcmNoRGVzdGluYXRpb24oKSB7XG5cdCBjb25zb2xlLmxvZyhcIj4+Pj4+Pj4+Pj4+PiBzZWFyY2ggT3JpZ2luIDw8PDw8PDw8PDw8PDw6IFwiKTtcbiAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7IHNlYXJjaFR5cGU6IFwib3JpZ2luXCIgfVxuICAgIH07XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wic2VhcmNoXCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcImNoYXRcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xufVxuIFxuXG5cdHB1YmxpYyBkb1NldENlbnRlcigpOiB2b2lkIHtcblx0XHR0aGlzLm1hcGJveC5zZXRDZW50ZXIoXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzYwMjE2MCxcblx0XHRcdCAgbG5nOiA0Ljg4OTE2ODAsXG5cdFx0XHQgIGFuaW1hdGVkOiB0cnVlXG5cdFx0XHR9XG5cdFx0KS50aGVuKFxuXHRcdFx0cmVzdWx0ID0+IHtcblx0XHRcdCAgY29uc29sZS5sb2coXCJNYXBib3ggc2V0Q2VudGVyIGRvbmVcIik7XG5cdFx0XHR9LFxuXHRcdFx0KGVycm9yOiBzdHJpbmcpID0+IHtcblx0XHRcdCAgY29uc29sZS5sb2coXCJtYXBib3ggc2V0Q2VudGVyIGVycm9yOiBcIiArIGVycm9yKTtcblx0XHRcdH1cblx0XHQpO1xuXHQgIH1cblxuXHQgIFx0ICBwdWJsaWMgZG9BZGRQb2x5bGluZSgpOiB2b2lkIHtcblx0XHR0aGlzLm1hcGJveC5hZGRQb2x5bGluZSh7XG5cdFx0ICBpZDogMSxcblx0XHQgIGNvbG9yOiBcIiMzMEJDRkZcIixcblx0XHQgIHdpZHRoOiA1LFxuXHRcdCAgb3BhY2l0eTogMC42LFxuXHRcdCAgcG9pbnRzOiBbXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzkyMzYzMyxcblx0XHRcdCAgbG5nOiA0LjkwMjY0ODlcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzcwOTg3OSxcblx0XHRcdCAgbG5nOiA0Ljk1NTUyMDZcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzU0MjE1NSxcblx0XHRcdCAgbG5nOiA0LjkzMDgwMTNcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzUzNzk2MSxcblx0XHRcdCAgbG5nOiA0Ljg3OTk4OTZcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzcwMTQ5NCxcblx0XHRcdCAgbG5nOiA0LjgzNjA0NDNcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzg2NDk2Nixcblx0XHRcdCAgbG5nOiA0Ljg2MjEzNjhcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzg0ODIwMixcblx0XHRcdCAgbG5nOiA0Ljg4Njg1NjBcblx0XHRcdH1cblx0XHQgIF1cblx0XHR9KS50aGVuKFxuXHRcdFx0cmVzdWx0ID0+IHtcblx0XHRcdCAgY29uc29sZS5sb2coXCJNYXBib3ggYWRkUG9seWxpbmUgZG9uZVwiKTtcblx0XHRcdH0sXG5cdFx0XHQoZXJyb3I6IHN0cmluZykgPT4ge1xuXHRcdFx0ICBjb25zb2xlLmxvZyhcIm1hcGJveCBhZGRQb2x5bGluZSBlcnJvcjogXCIgKyBlcnJvcik7XG5cdFx0XHR9XG5cdFx0KTtcblx0ICB9XG59Il19