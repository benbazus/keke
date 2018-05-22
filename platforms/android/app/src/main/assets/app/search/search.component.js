"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var router_1 = require("@angular/router");
var google_play_service_1 = require("~/shared/services/google-play.service");
var page_1 = require("tns-core-modules/ui/page");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var geolocation_service_1 = require("~/shared/services/geolocation.service");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(_page, route, router, routerExtensions, geolocationService, googleService) {
        this._page = _page;
        this.route = route;
        this.router = router;
        this.routerExtensions = routerExtensions;
        this.geolocationService = geolocationService;
        this.googleService = googleService;
        this.isListViewVisible = false;
        this.isOriginSearched = false;
        this.isDestinationSearched = false;
        this.isBusy = false;
        // this.getOrigin();
        //  this.router.queryParams.subscribe(params => {
        //  this.searchType = params["searchType"];
        // });
    }
    SearchComponent.prototype.ngOnInit = function () {
        //  	this.isDestinationSearched = false;
        //   this.isOriginSearched = false;
        //   console.log("<< result >> " );
        // var result= JSON.parse(appSettings.getString("origin") || "[]");
        // console.log("<< result <<<<beatup>> " + result);
        // 	this.sub$ = this.route.params;
        // 	this.articles$ = this.sub$.switchMap((params: any) =&#x3E; {
        // 								this.categoryTitle = params[&#x27;categoryTitle&#x27;];
        // 								return &#x3C;any&#x3E;this.firebaseService.getArticleList(params[&#x27;id&#x27;])});&#x9;
        //    this.articles$.subscribe(()=&#x3E;{
        //    this.isBusy = this.isBusy==false ? true : false;
        //    });
    };
    SearchComponent.prototype.getOrigin = function () {
        this.geolocationService
            .getLocation()
            .then(function (location) {
            console.log("startpointLatitude received: " + location.latitude);
            console.log("startpointLongitude received: " + location.longitude);
            //  this.origin();
        })
            .catch(function (error) {
            console.log("Location error received: " + error);
        });
    };
    SearchComponent.prototype.onOriginTap = function (args) {
        var originSearch = args.object;
        if (this.isOriginSearched == false) {
            if (originSearch.text != null) {
                this.searchforOrigin(originSearch);
            }
        }
    };
    SearchComponent.prototype.searchforOrigin = function (originSearch) {
        var _this = this;
        if (originSearch.text != null || originSearch.text.length != null || originSearch.text.length == 0)
            if (originSearch.text.length > 2 && originSearch.text.length % 3 === 0) {
                var searchString = originSearch.text.split(" ").join("+");
                this.isBusy = true;
                this.googleService.searchLocation(searchString).then(function (data) {
                    _this.isListViewVisible = true;
                    _this.items = new observable_array_1.ObservableArray();
                    for (var i = 0; i < data.predictions.length; i++) {
                        _this.items.push({
                            description: data.predictions[i].description,
                            placeId: data.predictions[i].place_id
                        });
                    }
                    _this.searchType = "origin";
                    _this.isBusy = false;
                    _this.isOriginSearched = true;
                }, function (error) {
                    _this.isBusy = false;
                    _this.isListViewVisible = false;
                    _this.isOriginSearched = false;
                    _this.handleErrors(error);
                });
            }
    };
    SearchComponent.prototype.onDestinationTap = function (args) {
        var destinationSearch = args.object;
        if (this.isDestinationSearched == false) {
            if (destinationSearch.text != null) {
                this.searchforDestination(destinationSearch);
            }
        }
    };
    SearchComponent.prototype.searchforDestination = function (destination) {
        var _this = this;
        if (destination.text != null || destination.text.length != null || destination.text.length == 0)
            if (destination.text.length > 2 && destination.text.length % 3 === 0) {
                var searchString = destination.text.split(" ").join("+");
                this.isBusy = true;
                this.googleService.searchLocation(searchString).then(function (data) {
                    _this.isListViewVisible = true;
                    _this.items = new observable_array_1.ObservableArray();
                    for (var i = 0; i < data.predictions.length; i++) {
                        _this.items.push({
                            description: data.predictions[i].description,
                            placeId: data.predictions[i].place_id
                        });
                    }
                    _this.searchType = "destination";
                    _this.isBusy = false;
                    _this.isDestinationSearched = true;
                }, function (error) {
                    _this.isBusy = false;
                    _this.isListViewVisible = false;
                    _this.isDestinationSearched = false;
                    _this.handleErrors(error);
                });
            }
    };
    SearchComponent.prototype.handleErrors = function (error) {
        console.error(error.message);
    };
    SearchComponent.prototype.onSelectedTap = function (args) {
        if (this.searchType == "destination") {
            console.log(">> destination is <<" + this.searchType);
            this.destination = args.view.bindingContext.description;
            this.isListViewVisible = false;
            this.isDestinationSearched = true;
            //appSettings.setString("destination", args.view.bindingContext);
            if (this.origin != null) {
                this.route.navigate(["booking"]);
            }
        }
        else {
            console.log(">> origin is <<" + this.searchType);
            this.origin = args.view.bindingContext.description;
            this.isListViewVisible = false;
            this.isOriginSearched = true;
            console.log("Output coordinates" + JSON.stringify(args.view.bindingContext.placeId));
            this.getIPAddress(args.view.bindingContext.placeId);
            //  appSettings.setString("origin", args.view.bindingContext);
        }
        // //	this.routerExtensions.back();
        //  
    };
    SearchComponent.prototype.onOriginClear = function () {
        this.isOriginSearched = false;
        this.isListViewVisible = false;
    };
    SearchComponent.prototype.onDestinationClear = function () {
        console.log(">> onDestinationClear<<");
        this.isListViewVisible = false;
        this.isDestinationSearched = false;
    };
    SearchComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log(">> onNavBtnTap<<");
        console.log("Navigation button tapped!");
        this.routerExtensions.back();
        // //	topmost().navigate("booking");
    };
    SearchComponent.prototype.getIPAddress = function (placeId) {
        // console.log("<<<<<<<<<<<<<<< placeId is: >>>>>>>>>>>>>>>>>>>>" + placeId);
        this.googleService
            .getLocationIPByPlaceID(placeId)
            .then(function (results) {
            console.log("Output" + JSON.stringify(results));
            //   console.log("data.result.geometry.lat :  " + JSON.stringify(results.result.geometry.lat));
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
    SearchComponent = __decorate([
        core_1.Component({
            selector: "search",
            templateUrl: "./search/search.component.html",
            styleUrls: ["./search/search.component.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.Router,
            router_1.ActivatedRoute,
            nativescript_angular_1.RouterExtensions,
            geolocation_service_1.GeolocationService,
            google_play_service_1.GooglePlayService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsNkRBQXdEO0FBSXhELDBDQUEyRTtBQUMzRSw2RUFBMEU7QUFDMUUsaURBQWdEO0FBRWhELDRGQUEwRjtBQUMxRiw2RUFBMkU7QUFTM0U7SUFpQkUseUJBQ1UsS0FBVyxFQUNYLEtBQWEsRUFDYixNQUFzQixFQUN0QixnQkFBa0MsRUFDbEMsa0JBQXNDLEVBQ3RDLGFBQWdDO1FBTGhDLFVBQUssR0FBTCxLQUFLLENBQU07UUFDWCxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQWxCNUMsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQywwQkFBcUIsR0FBWSxLQUFLLENBQUM7UUFPckMsV0FBTSxHQUFZLEtBQUssQ0FBQztRQVd2QixvQkFBb0I7UUFDbkIsaURBQWlEO1FBQ2pELDJDQUEyQztRQUMzQyxNQUFNO0lBQ1IsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFDQyx3Q0FBd0M7UUFDdkMsbUNBQW1DO1FBRW5DLG1DQUFtQztRQUVsQyxtRUFBbUU7UUFFbkUsbURBQW1EO1FBRXBELGtDQUFrQztRQUNsQyxnRUFBZ0U7UUFDaEUsa0VBQWtFO1FBQ2xFLG9HQUFvRztRQUNwRyx5Q0FBeUM7UUFFckMsc0RBQXNEO1FBQzFELFNBQVM7SUFDWCxDQUFDO0lBRUQsbUNBQVMsR0FBVDtRQUNFLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNaLE9BQU8sQ0FB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NE8zQjtJQUFELHNCQUFDO0NBQUEsQUE1T0QsSUE0T0M7QUE1T1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG4vL2ltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3VpL3RleHQtZmllbGQnO1xuaW1wb3J0IHsgRXZlbnREYXRhLCBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuXG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FeHRyYXMsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgR29vZ2xlUGxheVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvZ29vZ2xlLXBsYXkuc2VydmljZVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2dlb2xvY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IEFjY3VyYWN5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZW51bXMvZW51bXNcIjtcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwic2VhcmNoXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vc2VhcmNoL3NlYXJjaC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vc2VhcmNoL3NlYXJjaC5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaENvbXBvbmVudCAgaW1wbGVtZW50cyBPbkluaXQge1xuIFxuICBpdGVtczogT2JzZXJ2YWJsZUFycmF5PGFueT47XG4gIHB1YmxpYyBsb2NhdGlvbkFycmF5OiBBcnJheTxhbnk+O1xuXG5pc0xpc3RWaWV3VmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuaXNPcmlnaW5TZWFyY2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuaXNEZXN0aW5hdGlvblNlYXJjaGVkOiBib29sZWFuID0gZmFsc2U7XG4gIFxuICBzZWFyY2hUeXBlOiBzdHJpbmc7XG4gIHB1YmxpYyBvcmlnaW46IHN0cmluZztcbiAgcHVibGljIGRlc3RpbmF0aW9uOiBzdHJpbmc7XG5cblxuICBpc0J1c3k6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSByb3V0ZTogUm91dGVyLFxuICAgIHByaXZhdGUgcm91dGVyOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSBnZW9sb2NhdGlvblNlcnZpY2U6IEdlb2xvY2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIGdvb2dsZVNlcnZpY2U6IEdvb2dsZVBsYXlTZXJ2aWNlXG4gICkge1xuICAgLy8gdGhpcy5nZXRPcmlnaW4oKTtcbiAgICAvLyAgdGhpcy5yb3V0ZXIucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgLy8gIHRoaXMuc2VhcmNoVHlwZSA9IHBhcmFtc1tcInNlYXJjaFR5cGVcIl07XG4gICAgLy8gfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgIC8vICBcdHRoaXMuaXNEZXN0aW5hdGlvblNlYXJjaGVkID0gZmFsc2U7XG4gICAgLy8gICB0aGlzLmlzT3JpZ2luU2VhcmNoZWQgPSBmYWxzZTtcbiAgICAgICBcbiAgICAvLyAgIGNvbnNvbGUubG9nKFwiPDwgcmVzdWx0ID4+IFwiICk7XG5cbiAgICAgLy8gdmFyIHJlc3VsdD0gSlNPTi5wYXJzZShhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJvcmlnaW5cIikgfHwgXCJbXVwiKTtcblxuICAgICAvLyBjb25zb2xlLmxvZyhcIjw8IHJlc3VsdCA8PDw8YmVhdHVwPj4gXCIgKyByZXN1bHQpO1xuXG4gICAgLy8gXHR0aGlzLnN1YiQgPSB0aGlzLnJvdXRlLnBhcmFtcztcbiAgICAvLyBcdHRoaXMuYXJ0aWNsZXMkID0gdGhpcy5zdWIkLnN3aXRjaE1hcCgocGFyYW1zOiBhbnkpID0mI3gzRTsge1xuICAgIC8vIFx0XHRcdFx0XHRcdFx0XHR0aGlzLmNhdGVnb3J5VGl0bGUgPSBwYXJhbXNbJiN4Mjc7Y2F0ZWdvcnlUaXRsZSYjeDI3O107XG4gICAgLy8gXHRcdFx0XHRcdFx0XHRcdHJldHVybiAmI3gzQzthbnkmI3gzRTt0aGlzLmZpcmViYXNlU2VydmljZS5nZXRBcnRpY2xlTGlzdChwYXJhbXNbJiN4Mjc7aWQmI3gyNztdKX0pOyYjeDk7XG4gICAgLy8gICAgdGhpcy5hcnRpY2xlcyQuc3Vic2NyaWJlKCgpPSYjeDNFO3tcblxuICAgICAgICAvLyAgICB0aGlzLmlzQnVzeSA9IHRoaXMuaXNCdXN5PT1mYWxzZSA/IHRydWUgOiBmYWxzZTtcbiAgICAvLyAgICB9KTtcbiAgfVxuXG4gIGdldE9yaWdpbigpIHtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZVxuICAgICAgLmdldExvY2F0aW9uKClcbiAgICAgIC50aGVuKGxvY2F0aW9uID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydHBvaW50TGF0aXR1ZGUgcmVjZWl2ZWQ6IFwiICsgbG9jYXRpb24ubGF0aXR1ZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0cG9pbnRMb25naXR1ZGUgcmVjZWl2ZWQ6IFwiICsgbG9jYXRpb24ubG9uZ2l0dWRlKTtcblxuICAgICAgICAvLyAgdGhpcy5vcmlnaW4oKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxvY2F0aW9uIGVycm9yIHJlY2VpdmVkOiBcIiArIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgb25PcmlnaW5UYXAoYXJncykge1xuICAgIGxldCBvcmlnaW5TZWFyY2ggPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0OyBcbiAgICBpZih0aGlzLmlzT3JpZ2luU2VhcmNoZWQgPT0gZmFsc2UpXG4gICAge1xuICAgICAgaWYgKG9yaWdpblNlYXJjaC50ZXh0ICE9IG51bGwpIHtcbiAgICAgICAgIHRoaXMuc2VhcmNoZm9yT3JpZ2luKG9yaWdpblNlYXJjaCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgIHNlYXJjaGZvck9yaWdpbihvcmlnaW5TZWFyY2gpIHtcblxuICAgIGlmIChvcmlnaW5TZWFyY2gudGV4dCAhPSBudWxsIHx8IG9yaWdpblNlYXJjaC50ZXh0Lmxlbmd0aCAhPSBudWxsIHx8IG9yaWdpblNlYXJjaC50ZXh0Lmxlbmd0aCA9PSAwKVxuXG4gICAgICBpZiAob3JpZ2luU2VhcmNoLnRleHQubGVuZ3RoID4gMiAmJiBvcmlnaW5TZWFyY2gudGV4dC5sZW5ndGggJSAzID09PSAwKSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaFN0cmluZyA9IG9yaWdpblNlYXJjaC50ZXh0LnNwbGl0KFwiIFwiKS5qb2luKFwiK1wiKTtcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgICAgICB0aGlzLmdvb2dsZVNlcnZpY2Uuc2VhcmNoTG9jYXRpb24oc2VhcmNoU3RyaW5nKS50aGVuKFxuICAgICAgICAgIGRhdGEgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLmlzTGlzdFZpZXdWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PGFueT4oKTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEucHJlZGljdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5wcmVkaWN0aW9uc1tpXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBwbGFjZUlkOiBkYXRhLnByZWRpY3Rpb25zW2ldLnBsYWNlX2lkXG4gICAgICAgICAgICAgIH0pOyAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFR5cGUgPSBcIm9yaWdpblwiO1xuICAgICAgICAgICAgdGhpcy5pc0J1c3k9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc09yaWdpblNlYXJjaGVkID0gdHJ1ZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICBcdHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzTGlzdFZpZXdWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzT3JpZ2luU2VhcmNoZWQgPWZhbHNlO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcnMoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgfVxuIFxuXG4gIG9uRGVzdGluYXRpb25UYXAoYXJncykge1xuICAgIGxldCBkZXN0aW5hdGlvblNlYXJjaCA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7IFxuICAgIGlmKHRoaXMuaXNEZXN0aW5hdGlvblNlYXJjaGVkID09IGZhbHNlKVxuICAgIHtcbiAgICAgIGlmIChkZXN0aW5hdGlvblNlYXJjaC50ZXh0ICE9IG51bGwpIHtcbiAgICAgICAgIHRoaXMuc2VhcmNoZm9yRGVzdGluYXRpb24oZGVzdGluYXRpb25TZWFyY2gpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNlYXJjaGZvckRlc3RpbmF0aW9uKGRlc3RpbmF0aW9uKSB7XG5cbiAgICBpZiAoZGVzdGluYXRpb24udGV4dCAhPSBudWxsIHx8IGRlc3RpbmF0aW9uLnRleHQubGVuZ3RoICE9IG51bGwgfHwgZGVzdGluYXRpb24udGV4dC5sZW5ndGggPT0gMClcblxuICAgICAgaWYgKGRlc3RpbmF0aW9uLnRleHQubGVuZ3RoID4gMiAmJiBkZXN0aW5hdGlvbi50ZXh0Lmxlbmd0aCAlIDMgPT09IDApIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoU3RyaW5nID0gZGVzdGluYXRpb24udGV4dC5zcGxpdChcIiBcIikuam9pbihcIitcIik7XG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5nb29nbGVTZXJ2aWNlLnNlYXJjaExvY2F0aW9uKHNlYXJjaFN0cmluZykudGhlbihcbiAgICAgICAgICBkYXRhID0+IHtcblxuICAgICAgICAgICAgdGhpcy5pc0xpc3RWaWV3VmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheTxhbnk+KCk7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLnByZWRpY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGRhdGEucHJlZGljdGlvbnNbaV0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgcGxhY2VJZDogZGF0YS5wcmVkaWN0aW9uc1tpXS5wbGFjZV9pZFxuICAgICAgICAgICAgICB9KTsgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZWFyY2hUeXBlID0gXCJkZXN0aW5hdGlvblwiO1xuICAgICAgICAgICAgdGhpcy5pc0J1c3k9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc0Rlc3RpbmF0aW9uU2VhcmNoZWQgPSB0cnVlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIFx0dGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNMaXN0Vmlld1Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNEZXN0aW5hdGlvblNlYXJjaGVkID1mYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3JzKGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gIH1cblxuXG4gIGhhbmRsZUVycm9ycyhlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgfVxuXG4gIHB1YmxpYyBvblNlbGVjdGVkVGFwKGFyZ3MpIHtcblxuICAgIGlmICh0aGlzLnNlYXJjaFR5cGUgPT0gXCJkZXN0aW5hdGlvblwiKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIj4+IGRlc3RpbmF0aW9uIGlzIDw8XCIgKyB0aGlzLnNlYXJjaFR5cGUpO1xuXG4gICAgICB0aGlzLmRlc3RpbmF0aW9uID0gYXJncy52aWV3LmJpbmRpbmdDb250ZXh0LmRlc2NyaXB0aW9uOyAgICAgXG4gICAgICB0aGlzLmlzTGlzdFZpZXdWaXNpYmxlID0gZmFsc2U7XG4gICAgICB0aGlzLmlzRGVzdGluYXRpb25TZWFyY2hlZCA9IHRydWU7XG4gICAgICAvL2FwcFNldHRpbmdzLnNldFN0cmluZyhcImRlc3RpbmF0aW9uXCIsIGFyZ3Mudmlldy5iaW5kaW5nQ29udGV4dCk7XG5cbiAgICAgIGlmKCB0aGlzLm9yaWdpbiAhPSBudWxsKXtcbiAgICAgICAgdGhpcy5yb3V0ZS5uYXZpZ2F0ZShbXCJib29raW5nXCJdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCI+PiBvcmlnaW4gaXMgPDxcIiArIHRoaXMuc2VhcmNoVHlwZSk7XG5cbiAgICAgIHRoaXMub3JpZ2luID0gYXJncy52aWV3LmJpbmRpbmdDb250ZXh0LmRlc2NyaXB0aW9uO1xuICAgICAgdGhpcy5pc0xpc3RWaWV3VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgdGhpcy5pc09yaWdpblNlYXJjaGVkID0gdHJ1ZVxuXG4gICAgICBjb25zb2xlLmxvZyhcIk91dHB1dCBjb29yZGluYXRlc1wiICsgSlNPTi5zdHJpbmdpZnkoYXJncy52aWV3LmJpbmRpbmdDb250ZXh0LnBsYWNlSWQpKTtcbiAgICAgIHRoaXMuZ2V0SVBBZGRyZXNzKGFyZ3Mudmlldy5iaW5kaW5nQ29udGV4dC5wbGFjZUlkKTtcbiAgICAvLyAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwib3JpZ2luXCIsIGFyZ3Mudmlldy5iaW5kaW5nQ29udGV4dCk7XG4gICAgXG4gICAgfVxuICAgIC8vIC8vXHR0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIC8vICBcbiAgfVxuXG5cblxuXG4gb25PcmlnaW5DbGVhcigpIHtcbiAgdGhpcy5pc09yaWdpblNlYXJjaGVkID0gZmFsc2U7XG4gIHRoaXMuaXNMaXN0Vmlld1Zpc2libGUgPSBmYWxzZTtcbiB9XG4gXG4gb25EZXN0aW5hdGlvbkNsZWFyKCkge1xuICBjb25zb2xlLmxvZyhcIj4+IG9uRGVzdGluYXRpb25DbGVhcjw8XCIgKTtcbiAgdGhpcy5pc0xpc3RWaWV3VmlzaWJsZSA9IGZhbHNlO1xuICB0aGlzLmlzRGVzdGluYXRpb25TZWFyY2hlZCA9IGZhbHNlO1xufVxuXG4gIG9uTmF2QnRuVGFwKCkge1xuICAgIC8vIFRoaXMgY29kZSB3aWxsIGJlIGNhbGxlZCBvbmx5IGluIEFuZHJvaWQuXG4gICAgY29uc29sZS5sb2coXCI+PiBvbk5hdkJ0blRhcDw8XCIgKTtcbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpb24gYnV0dG9uIHRhcHBlZCFcIik7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgIC8vIC8vXHR0b3Btb3N0KCkubmF2aWdhdGUoXCJib29raW5nXCIpO1xuICB9XG5cbiAgZ2V0SVBBZGRyZXNzKHBsYWNlSWQpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIjw8PDw8PDw8PDw8PDw8PCBwbGFjZUlkIGlzOiA+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+PlwiICsgcGxhY2VJZCk7XG4gXG4gICAgIHRoaXMuZ29vZ2xlU2VydmljZVxuICAgICAgIC5nZXRMb2NhdGlvbklQQnlQbGFjZUlEKHBsYWNlSWQpXG4gICAgICAgLnRoZW4ocmVzdWx0cyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiT3V0cHV0XCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHRzKSk7XG4gXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKFwiZGF0YS5yZXN1bHQuZ2VvbWV0cnkubGF0IDogIFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0cy5yZXN1bHQuZ2VvbWV0cnkubGF0KSk7XG4gXG4gICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IFtyZXN1bHRzLnJlc3VsdC5nZW9tZXRyeV07XG4gICAgICAgIC8vIGNvbnN0IG5ld01hcmtlciAgID0gbmV3IEdlb0pzb24oY29vcmRpbmF0ZXMsIHsgbWVzc2FnZTogdGhpcy5tZXNzYWdlIH0pXG4gICAgICAgICBcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJPdXRwdXQgY29vcmRpbmF0ZXNcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdHMucmVzdWx0KSk7XG4gICAgICAgLy8gIGNvbnNvbGUubG9nKFwiT3V0cHV0IGNvb3JkaW5hdGVzXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHRzLnJlc3VsdC5nZW9tZXRyeSkpO1xuICAgICAgICAgY29uc29sZS5sb2coXCJPdXRwdXQgY29vcmRpbmF0ZXNcIiArIEpTT04uc3RyaW5naWZ5KGNvb3JkaW5hdGVzKSk7XG4gICAgICAgICAvL2NvbnNvbGUubG9nKFwibmV3TWFya2VyXCIgKyBKU09OLnN0cmluZ2lmeShuZXdNYXJrZXIpKTtcbiBcbiAgICAgICAgIC8vIHJlc3VsdC5yZXN1bHRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAvLyAgIHRoaXMubG9jYXRpb25TZWFyY2gucHVzaCh7IGNvdW50cnk6IGVsZW1lbnQuY291bnRyeSwgc3RyZWV0bmFtZTogZWxlbWVudC5jb3VudHJ5fSk7XG4gICAgICAgICAvLyB9KTtcbiAgICAgICAvLyAgY29uc29sZS5sb2coXCJPdXRwdXRcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuZ2VvSnNvbikpO1xuICAgICAgICAgLy8gdGhpcy5vcmlnaW4gPSByZXN1bHQucmVzdWx0c1swXS5mb3JtYXR0ZWRfYWRkcmVzcztcbiAgICAgICB9KVxuICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb2NjdXJlZCBpbiByZXRyaWV2aW5nIElQIGFkZHJlc3M6XCIsIGVycm9yKTtcbiAgICAgICB9KTtcbiAgIH1cbn1cbiJdfQ==