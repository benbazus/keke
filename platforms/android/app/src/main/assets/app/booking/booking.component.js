"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var modal_component_1 = require("~/booking/modal.component");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
var router_1 = require("@angular/router");
var google_play_service_1 = require("~/shared/services/google-play.service");
var BookingComponent = /** @class */ (function () {
    function BookingComponent(page, router, zone, googleService) {
        //		this.page.actionBarHidden = true;
        this.page = page;
        this.router = router;
        this.zone = zone;
        this.googleService = googleService;
        this.startpointLongitude = 42.696552;
        this.startpointLatitude = 23.32601;
        this.endpointLongitude = 40.71448;
        this.endpointLatitude = -74.00598;
    }
    BookingComponent.prototype.ngOnInit = function () {
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
    BookingComponent.prototype.onNavBtnTap = function () {
        this.router.navigate(["home"]);
    };
    BookingComponent.prototype.getIPAddress = function (placeId) {
        // console.log("<<<<<<<<<<<<<<< placeId is: >>>>>>>>>>>>>>>>>>>>" + placeId);
        this.googleService
            .getLocationIPByPlaceID(placeId)
            .then(function (results) {
            // console.log("Output" + JSON.stringify(this.data));
            // console.log("data.result.geometry.lat :  " + JSON.stringify(results.result.geometry.lat));
            var coordinates = [results.result.geometry];
            // const newMarker   = new GeoJson(coordinates, { message: this.message })
            // console.log("Output coordinates" + JSON.stringify(results.result));
            //  console.log("Output coordinates" + JSON.stringify(results.result.geometry));
            console.log("Output coordinates" + JSON.stringify(coordinates));
            //console.log("newMarker" + JSON.stringify(newMarker));
            // result.results.forEach(element => {
            //   this.locationSearch.push({ country: element.country, streetname: element.country});
            // });
            //  console.log("Output" + JSON.stringify(this.geoJson));
            // this.origin = result.results[0].formatted_address;
        })
            .catch(function (error) {
            console.log("Error occured in retrieving IP address:", error);
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
            google_play_service_1.GooglePlayService])
    ], BookingComponent);
    return BookingComponent;
}());
exports.BookingComponent = BookingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va2luZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJib29raW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRjtBQUdqRixnQ0FBc0M7QUFrQnRDLDZEQUEyRDtBQUUzRCwwREFBMEQ7QUFDMUQsNENBQTRDO0FBQzVDLDhDQUE4QztBQUM5QywwQ0FBMkU7QUFDM0UsNkVBQTBFO0FBUTFFO0lBZ0JDLDBCQUFvQixJQUFVLEVBQ3BCLE1BQWMsRUFDZixJQUFZLEVBQ1osYUFBZ0M7UUFFekMscUNBQXFDO1FBTGpCLFNBQUksR0FBSixJQUFJLENBQU07UUFDcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNmLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixrQkFBYSxHQUFiLGFBQWEsQ0FBbUI7UUFibEMsd0JBQW1CLEdBQVcsU0FBUyxDQUFDO1FBQ3JDLHVCQUFrQixHQUFXLFFBQVEsQ0FBQztRQUN6QyxzQkFBaUIsR0FBVyxRQUFRLENBQUM7UUFDckMscUJBQWdCLEdBQVcsQ0FBQyxRQUFRLENBQUM7SUFjM0MsQ0FBQztJQUVGLG1DQUFRLEdBQVI7UUFFQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUlBLHNCQUFXLHNDQUFRO2FBQW5CO1lBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzthQUVELFVBQW9CLEtBQWE7WUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDOzs7T0FMQTtJQVFELHNCQUFXLHVDQUFTO2FBQXBCO1lBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsR0FBRyxJQUFJ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Q0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEUsdURBQXVEO1lBRXZELHNDQUFzQztZQUN0Qyx3RkFBd0Y7WUFDeEYsTUFBTTtZQUNQLHlEQUF5RDtZQUN4RCxxREFBcUQ7UUFDdEQsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSztZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBOUp5QjtRQUExQixnQkFBUyxDQUFDLGdDQUFjLENBQUM7a0NBQVEsZ0NBQWM7bURBQUM7SUFGdEMsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO1NBQzlDLENBQUM7eUNBa0J5QixXQUFJO1lBQ1osZUFBTTtZQUNULGFBQU07WUFDRyx1Q0FBaUI7T0FuQjdCLGdCQUFnQixDQWtLNUI7SUFBRCx1QkFBQztDQUFBLEFBbEtELElBa0tDO0FBbEtZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgTmdab25lLCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSAnfi9zaGFyZWQvc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZSc7XG5cbmltcG9ydCB7IFBhZ2UsIENvbG9yIH0gZnJvbSBcInVpL3BhZ2VcIjtcblxuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICBhbmltYXRlLFxuICB0cmFuc2l0aW9uXG59IGZyb20gXCJAYW5ndWxhci9hbmltYXRpb25zXCI7XG5pbXBvcnQge1xuICBNYXBib3gsXG4gIE1hcFN0eWxlLFxuICBNYXBib3hWaWV3QXBpLFxuICBWaWV3cG9ydCBhcyBNYXBib3hWaWV3cG9ydFxufSBmcm9tIFwibmF0aXZlc2NyaXB0LW1hcGJveFwiO1xuaW1wb3J0ICogYXMgZ2VvbG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xuaW1wb3J0IHsgQWNjdXJhY3kgfSBmcm9tIFwidWkvZW51bXNcIjtcblxuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tICd+L2Jvb2tpbmcvbW9kYWwuY29tcG9uZW50JztcblxuLy9pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuLy9pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd1aS90ZXh0LWZpZWxkJztcbi8vaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBHb29nbGVQbGF5U2VydmljZSB9IGZyb20gJ34vc2hhcmVkL3NlcnZpY2VzL2dvb2dsZS1wbGF5LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdib29raW5nJyxcblx0dGVtcGxhdGVVcmw6ICcuL2Jvb2tpbmcvYm9va2luZy5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2Jvb2tpbmcvYm9va2luZy5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBCb29raW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBAVmlld0NoaWxkKE1vZGFsQ29tcG9uZW50KSBtb2RhbDogTW9kYWxDb21wb25lbnQ7XG5cblx0cHJpdmF0ZSBtYXBib3g6IE1hcGJveDtcblx0XG5cdHB1YmxpYyBzdGFydHBvaW50TG9uZ2l0dWRlOiBudW1iZXIgPSA0Mi42OTY1NTI7XG4gICAgcHVibGljIHN0YXJ0cG9pbnRMYXRpdHVkZTogbnVtYmVyID0gMjMuMzI2MDE7XG5cdHB1YmxpYyBlbmRwb2ludExvbmdpdHVkZTogbnVtYmVyID0gNDAuNzE0NDg7XG5cdHB1YmxpYyBlbmRwb2ludExhdGl0dWRlOiBudW1iZXIgPSAtNzQuMDA1OTg7XG5cblxuLy9cdHB1YmxpYyBnZW9Kc29uOiBHZW9Kc29uW107XG5cdG1lc3NhZ2U6IHN0cmluZztcblx0XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLFxuXHRcdCBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuXHRcdHByaXZhdGUgem9uZTogTmdab25lLCBcblx0XHRwcml2YXRlIGdvb2dsZVNlcnZpY2U6IEdvb2dsZVBsYXlTZXJ2aWNlKSB7XG5cdFxuXHQvL1x0XHR0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcblx0XHRcblx0IH1cblxuXHRuZ09uSW5pdCgpIHsgXG5cblx0XHR0aGlzLmRvQWRkUG9seWxpbmUoKTtcblx0fVxuXG4gLy89PT09PT09PT09PT09PT09PT09PT09PT09PT0gU3RhcnQgUHJvcGVydGllcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgcHJpdmF0ZSBfbGF0aXR1ZGU6IG51bWJlcjtcbiAgcHVibGljIGdldCBMYXRpdHVkZSgpOiBudW1iZXIge1xuICAgIGNvbnNvbGUubG9nKFwiTGF0aXR1ZGUgZ2V0IHJlYWNoZWQsIGFuZCB0aGUgdmFsdWUgaXMgOlwiICsgdGhpcy5fbGF0aXR1ZGUpO1xuICAgIHJldHVybiB0aGlzLl9sYXRpdHVkZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgTGF0aXR1ZGUodmFsdWU6IG51bWJlcikge1xuICAgIGNvbnNvbGUubG9nKFwiTGF0aXR1ZGUgc2V0IHJlYWNoZWQsIGFuZCB0aGUgdmFsdWUgaXMgOlwiICsgdmFsdWUpO1xuICAgIHRoaXMuX2xhdGl0dWRlID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9sb25naXR1ZGU6IG51bWJlcjtcbiAgcHVibGljIGdldCBMb25naXR1ZGUoKTogbnVtYmVyIHtcbiAgICBjb25zb2xlLmxvZyhcIkxvbmdpdHVkZSBnZXQgcmVhY2hlZCwgYW5kIHRoZSB2YWx1ZSBpcyA6XCIgKyB0aGlzLl9sb25naXR1ZGUpO1xuICAgIHJldHVybiB0aGlzLl9sb25naXR1ZGU7XG4gIH1cblxuICBwdWJsaWMgc2V0IExvbmdpdHVkZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgY29uc29sZS5sb2coXCJMb25naXR1ZGUgc2V0IHJlYWNoZWQsIGFuZCB0aGUgdmFsdWUgaXMgOlwiICsgdmFsdWUpO1xuICAgIHRoaXMuX2xvbmdpdHVkZSA9IHZhbHVlO1xuICB9XG5cbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT0gRW5kIFByb3BlcnRpZXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIFxuc2VhcmNoRGVzdGluYXRpb24oKSB7XG5cdCBjb25zb2xlLmxvZyhcIj4+Pj4+Pj4+Pj4+PiBzZWFyY2ggT3JpZ2luIDw8PDw8PDw8PDw8PDw6IFwiKTtcbiAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7IHNlYXJjaFR5cGU6IFwib3JpZ2luXCIgfVxuICAgIH07XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wic2VhcmNoXCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcImNoYXRcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xufVxuIFxuXG5cdHB1YmxpYyBkb1NldENlbnRlcigpOiB2b2lkIHtcblx0XHR0aGlzLm1hcGJveC5zZXRDZW50ZXIoXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzYwMjE2MCxcblx0XHRcdCAgbG5nOiA0Ljg4OTE2ODAsXG5cdFx0XHQgIGFuaW1hdGVkOiB0cnVlXG5cdFx0XHR9XG5cdFx0KS50aGVuKFxuXHRcdFx0cmVzdWx0ID0+IHtcblx0XHRcdCAgY29uc29sZS5sb2coXCJNYXBib3ggc2V0Q2VudGVyIGRvbmVcIik7XG5cdFx0XHR9LFxuXHRcdFx0KGVycm9yOiBzdHJpbmcpID0+IHtcblx0XHRcdCAgY29uc29sZS5sb2coXCJtYXBib3ggc2V0Q2VudGVyIGVycm9yOiBcIiArIGVycm9yKTtcblx0XHRcdH1cblx0XHQpO1xuXHQgIH1cblxuXHQgIFx0ICBwdWJsaWMgZG9BZGRQb2x5bGluZSgpOiB2b2lkIHtcblx0XHR0aGlzLm1hcGJveC5hZGRQb2x5bGluZSh7XG5cdFx0ICBpZDogMSxcblx0XHQgIGNvbG9yOiBcIiMzMEJDRkZcIixcblx0XHQgIHdpZHRoOiA1LFxuXHRcdCAgb3BhY2l0eTogMC42LFxuXHRcdCAgcG9pbnRzOiBbXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzkyMzYzMyxcblx0XHRcdCAgbG5nOiA0LjkwMjY0ODlcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzcwOTg3OSxcblx0XHRcdCAgbG5nOiA0Ljk1NTUyMDZcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzU0MjE1NSxcblx0XHRcdCAgbG5nOiA0LjkzMDgwMTNcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzUzNzk2MSxcblx0XHRcdCAgbG5nOiA0Ljg3OTk4OTZcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzcwMTQ5NCxcblx0XHRcdCAgbG5nOiA0LjgzNjA0NDNcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzg2NDk2Nixcblx0XHRcdCAgbG5nOiA0Ljg2MjEzNjhcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHQgIGxhdDogNTIuMzg0ODIwMixcblx0XHRcdCAgbG5nOiA0Ljg4Njg1NjBcblx0XHRcdH1cblx0XHQgIF1cblx0XHR9KS50aGVuKFxuXHRcdFx0cmVzdWx0ID0+IHtcblx0XHRcdCAgY29uc29sZS5sb2coXCJNYXBib3ggYWRkUG9seWxpbmUgZG9uZVwiKTtcblx0XHRcdH0sXG5cdFx0XHQoZXJyb3I6IHN0cmluZykgPT4ge1xuXHRcdFx0ICBjb25zb2xlLmxvZyhcIm1hcGJveCBhZGRQb2x5bGluZSBlcnJvcjogXCIgKyBlcnJvcik7XG5cdFx0XHR9XG5cdFx0KTtcblx0XHR9XG5cdFx0XG5cdFx0b25OYXZCdG5UYXAoKSB7XG5cdFx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJob21lXCJdKTtcblx0XHR9XG5cblxuXHRcdGdldElQQWRkcmVzcyhwbGFjZUlkKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcIjw8PDw8PDw8PDw8PDw8PCBwbGFjZUlkIGlzOiA+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+PlwiICsgcGxhY2VJZCk7XG5cdCBcblx0XHRcdCB0aGlzLmdvb2dsZVNlcnZpY2Vcblx0XHRcdFx0IC5nZXRMb2NhdGlvbklQQnlQbGFjZUlEKHBsYWNlSWQpXG5cdFx0XHRcdCAudGhlbihyZXN1bHRzID0+IHtcblx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhcIk91dHB1dFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKSk7XG5cdCBcblx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhcImRhdGEucmVzdWx0Lmdlb21ldHJ5LmxhdCA6ICBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdHMucmVzdWx0Lmdlb21ldHJ5LmxhdCkpO1xuXHQgXG5cdFx0XHRcdFx0IGNvbnN0IGNvb3JkaW5hdGVzID0gW3Jlc3VsdHMucmVzdWx0Lmdlb21ldHJ5XTtcblx0XHRcdFx0XHQvLyBjb25zdCBuZXdNYXJrZXIgICA9IG5ldyBHZW9Kc29uKGNvb3JkaW5hdGVzLCB7IG1lc3NhZ2U6IHRoaXMubWVzc2FnZSB9KVxuXHRcdFx0XHRcdCBcblx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhcIk91dHB1dCBjb29yZGluYXRlc1wiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0cy5yZXN1bHQpKTtcblx0XHRcdFx0IC8vICBjb25zb2xlLmxvZyhcIk91dHB1dCBjb29yZGluYXRlc1wiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0cy5yZXN1bHQuZ2VvbWV0cnkpKTtcblx0XHRcdFx0XHQgY29uc29sZS5sb2coXCJPdXRwdXQgY29vcmRpbmF0ZXNcIiArIEpTT04uc3RyaW5naWZ5KGNvb3JkaW5hdGVzKSk7XG5cdFx0XHRcdFx0IC8vY29uc29sZS5sb2coXCJuZXdNYXJrZXJcIiArIEpTT04uc3RyaW5naWZ5KG5ld01hcmtlcikpO1xuXHQgXG5cdFx0XHRcdFx0IC8vIHJlc3VsdC5yZXN1bHRzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0XHRcdFx0IC8vICAgdGhpcy5sb2NhdGlvblNlYXJjaC5wdXNoKHsgY291bnRyeTogZWxlbWVudC5jb3VudHJ5LCBzdHJlZXRuYW1lOiBlbGVtZW50LmNvdW50cnl9KTtcblx0XHRcdFx0XHQgLy8gfSk7XG5cdFx0XHRcdCAvLyAgY29uc29sZS5sb2coXCJPdXRwdXRcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuZ2VvSnNvbikpO1xuXHRcdFx0XHRcdCAvLyB0aGlzLm9yaWdpbiA9IHJlc3VsdC5yZXN1bHRzWzBdLmZvcm1hdHRlZF9hZGRyZXNzO1xuXHRcdFx0XHQgfSlcblx0XHRcdFx0IC5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJFcnJvciBvY2N1cmVkIGluIHJldHJpZXZpbmcgSVAgYWRkcmVzczpcIiwgZXJyb3IpO1xuXHRcdFx0XHQgfSk7XG5cdFx0IH1cblxufSJdfQ==