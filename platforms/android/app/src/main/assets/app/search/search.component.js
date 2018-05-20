"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var router_1 = require("@angular/router");
var google_play_service_1 = require("~/shared/services/google-play.service");
var page_1 = require("tns-core-modules/ui/page");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var geolocation_service_1 = require("~/shared/services/geolocation.service");
var appSettings = require("application-settings");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(_page, route, router, routerExtensions, geolocationService, googleService) {
        this._page = _page;
        this.route = route;
        this.router = router;
        this.routerExtensions = routerExtensions;
        this.geolocationService = geolocationService;
        this.googleService = googleService;
        // this.getOrigin();
        //  this.router.queryParams.subscribe(params => {
        //  this.searchType = params["searchType"];
        // });
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.isDestinationSearched = false;
        this.isOriginSearched = false;
        console.log("<< result >> ");
        var result = JSON.parse(appSettings.getString("origin") || "[]");
        console.log("<< result <<<<beatup>> " + result);
        // 	this.sub$ = this.route.params;
        // 	this.articles$ = this.sub$.switchMap((params: any) =&#x3E; {
        // 								this.categoryTitle = params[&#x27;categoryTitle&#x27;];
        // 								return &#x3C;any&#x3E;this.firebaseService.getArticleList(params[&#x27;id&#x27;])});&#x9;
        //    this.articles$.subscribe(()=&#x3E;{
        // 			 this.isLoading= false;
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
        var _this = this;
        var originSearch = args.object;
        if (this.isOriginSearched === false) {
            this.isloading = true;
            if (originSearch.text.length !== null || originSearch.text.length === 0)
                if (originSearch.text.length > 2 && originSearch.text.length % 3 === 0) {
                    var searchString = originSearch.text.split(" ").join("+");
                    this.googleService.searchLocation(searchString).then(function (data) {
                        _this.isListViewVisible = true;
                        _this.items = new observable_array_1.ObservableArray();
                        for (var i = 0; i < data.predictions.length; i++) {
                            _this.items.push({
                                description: data.predictions[i].description,
                                placeId: data.predictions[i].place_id,
                                searchType: "origin"
                            });
                            _this.searchType = "origin";
                            console.log("may be terrfic for origin: " + i);
                        }
                        _this.isloading = false;
                        _this.isOriginSearched = true;
                    }, function (error) {
                        _this.isloading = false;
                        _this.isListViewVisible = false;
                        _this.isOriginSearched = false;
                        _this.handleErrors(error);
                    });
                }
        }
    };
    SearchComponent.prototype.onDestinationTap = function (args) {
        var _this = this;
        var originSearch = args.object;
        if (this.isDestinationSearched === false) {
            this.isloading = true;
            if (originSearch.text.length !== null || originSearch.text.length === 0)
                if (originSearch.text.length > 2 && originSearch.text.length % 3 === 0) {
                    var searchString = originSearch.text.split(" ").join("+");
                    this.googleService.searchLocation(searchString).then(function (data) {
                        _this.isListViewVisible = true;
                        _this.items = new observable_array_1.ObservableArray();
                        for (var i = 0; i < data.predictions.length; i++) {
                            _this.items.push({
                                description: data.predictions[i].description,
                                placeId: data.predictions[i].place_id,
                                searchType: "destination"
                            });
                            _this.searchType = "destination";
                            console.log("may be terrfic for destination: " + i);
                        }
                        _this.isDestinationSearched = false;
                        _this.isloading = false;
                    }, function (error) {
                        _this.isDestinationSearched = false;
                        _this.isloading = false;
                        _this.isListViewVisible = false;
                        _this.handleErrors(error);
                    });
                }
        }
    };
    SearchComponent.prototype.handleErrors = function (error) {
        console.error(error.message);
    };
    SearchComponent.prototype.onSelectedTap = function (args) {
        console.log(">> searchType is <<" + this.searchType);
        if (this.searchType === "destination") {
            console.log(">>Navigation button tapped is for destination <<" +
                JSON.stringify(args.view.bindingContext));
            this.destination = args.view.bindingContext.description;
            appSettings.setString("destination", args.view.bindingContext);
            this.isListViewVisible = false;
            this.isDestinationSearched = true;
        }
        else {
            console.log(">>Navigation button tapped is for origin <<" +
                JSON.stringify(args.view.bindingContext));
            this.origin = args.view.bindingContext.description;
            appSettings.setString("origin", args.view.bindingContext);
            this.isListViewVisible = false;
            this.isOriginSearched = true;
        }
        // //	this.routerExtensions.back();
        //  this.route.navigate(["booking"]);
    };
    SearchComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
        this.routerExtensions.back();
        // //	topmost().navigate("booking");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsNkRBQXdEO0FBSXhELDBDQUEyRTtBQUMzRSw2RUFBMEU7QUFDMUUsaURBQWdEO0FBRWhELDRGQUEwRjtBQUMxRiw2RUFBMkU7QUFFM0Usa0RBQW9EO0FBT3BEO0lBaUJFLHlCQUNVLEtBQVcsRUFDWCxLQUFhLEVBQ2IsTUFBc0IsRUFDdEIsZ0JBQWtDLEVBQ2xDLGtCQUFzQyxFQUN0QyxhQUFnQztRQUxoQyxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxrQkFBYSxHQUFiLGFBQWEsQ0FBbUI7UUFFekMsb0JBQW9CO1FBQ25CLGlEQUFpRDtRQUNqRCwyQ0FBMkM7UUFDM0MsTUFBTTtJQUNSLENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLHFCQUFxQixHQUFFLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBRTlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFFLENBQUM7UUFDL0IsSUFBSSxNQUFNLEdBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBRWhFLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFFbEQsa0NBQWtDO1FBQ2xDLGdFQUFnRTtRQUNoRSxrRUFBa0U7UUFDbEUsb0dBQW9HO1FBQ3BHLHlDQUF5QztRQUN6Qyw2QkFBNkI7UUFDN0IsU0FBUztJQUNY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Q0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDcEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FDVCw2Q0FBNkM7Z0JBQzNDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FDM0MsQ0FBQztZQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDO1lBQ25ELFdBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLGlCQUFpQixHQUFFLEtBQUssQ0FBQztZQUM5QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFBO1FBQzlCLENBQUM7UUFDRCxtQ0FBbUM7UUFDbkMscUNBQXFDO0lBQ3ZDLENBQUM7SUFFRCxxQ0FBVyxHQUFYO1FBQ0UsNENBQTRDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUIsb0NBQW9DO0lBQ3JDLENBQUM7SUE3S1UsZUFBZTtRQUwzQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztTQUM3QyxDQUFDO3lDQW1CaUIsV0FBSTtZQUNKLGVBQU07WUFDTCx1QkFBYztZQUNKLHVDQUFnQjtZQUNkLHdDQUFrQjtZQUN2Qix1Q0FBaUI7T0F2Qi9CLGVBQWUsQ0E4SzNCO0lBQUQsc0JBQUM7Q0FBQSxBQTlLRCxJQThLQztBQTlLWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbi8vaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndWkvdGV4dC1maWVsZCc7XG5pbXBvcnQgeyBFdmVudERhdGEsIE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5cbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcywgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBHb29nbGVQbGF5U2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9nb29nbGUtcGxheS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgQWNjdXJhY3kgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9lbnVtcy9lbnVtc1wiO1xuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJzZWFyY2hcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoQ29tcG9uZW50ICBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gXG4gIGl0ZW1zOiBPYnNlcnZhYmxlQXJyYXk8YW55PjtcbiAgcHVibGljIGxvY2F0aW9uQXJyYXk6IEFycmF5PGFueT47XG5cbiBpc0xpc3RWaWV3VmlzaWJsZTogYm9vbGVhbjtcbmlzbG9hZGluZzpib29sZWFuO1xuXG5pc09yaWdpblNlYXJjaGVkOiBib29sZWFuO1xuaXNEZXN0aW5hdGlvblNlYXJjaGVkOiBib29sZWFuO1xuICBzZWFyY2hUeXBlOiBzdHJpbmc7XG4gIHB1YmxpYyBvcmlnaW46IHN0cmluZztcbiAgcHVibGljIGRlc3RpbmF0aW9uOiBzdHJpbmc7XG5cblxuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIHJvdXRlOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICBwcml2YXRlIGdlb2xvY2F0aW9uU2VydmljZTogR2VvbG9jYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgZ29vZ2xlU2VydmljZTogR29vZ2xlUGxheVNlcnZpY2VcbiAgKSB7XG4gICAvLyB0aGlzLmdldE9yaWdpbigpO1xuICAgIC8vICB0aGlzLnJvdXRlci5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAvLyAgdGhpcy5zZWFyY2hUeXBlID0gcGFyYW1zW1wic2VhcmNoVHlwZVwiXTtcbiAgICAvLyB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgICBcdHRoaXMuaXNEZXN0aW5hdGlvblNlYXJjaGVkPSBmYWxzZTtcbiAgICAgICB0aGlzLmlzT3JpZ2luU2VhcmNoZWQgPSBmYWxzZTtcbiAgICAgICBcbiAgICAgICBjb25zb2xlLmxvZyhcIjw8IHJlc3VsdCA+PiBcIiApO1xuICAgICAgdmFyIHJlc3VsdD0gSlNPTi5wYXJzZShhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJvcmlnaW5cIikgfHwgXCJbXVwiKTtcblxuICAgICAgY29uc29sZS5sb2coXCI8PCByZXN1bHQgPDw8PGJlYXR1cD4+IFwiICsgcmVzdWx0KTtcblxuICAgIC8vIFx0dGhpcy5zdWIkID0gdGhpcy5yb3V0ZS5wYXJhbXM7XG4gICAgLy8gXHR0aGlzLmFydGljbGVzJCA9IHRoaXMuc3ViJC5zd2l0Y2hNYXAoKHBhcmFtczogYW55KSA9JiN4M0U7IHtcbiAgICAvLyBcdFx0XHRcdFx0XHRcdFx0dGhpcy5jYXRlZ29yeVRpdGxlID0gcGFyYW1zWyYjeDI3O2NhdGVnb3J5VGl0bGUmI3gyNztdO1xuICAgIC8vIFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJiN4M0M7YW55JiN4M0U7dGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0QXJ0aWNsZUxpc3QocGFyYW1zWyYjeDI3O2lkJiN4Mjc7XSl9KTsmI3g5O1xuICAgIC8vICAgIHRoaXMuYXJ0aWNsZXMkLnN1YnNjcmliZSgoKT0mI3gzRTt7XG4gICAgLy8gXHRcdFx0IHRoaXMuaXNMb2FkaW5nPSBmYWxzZTtcbiAgICAvLyAgICB9KTtcbiAgfVxuXG4gIGdldE9yaWdpbigpIHtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZVxuICAgICAgLmdldExvY2F0aW9uKClcbiAgICAgIC50aGVuKGxvY2F0aW9uID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydHBvaW50TGF0aXR1ZGUgcmVjZWl2ZWQ6IFwiICsgbG9jYXRpb24ubGF0aXR1ZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0cG9pbnRMb25naXR1ZGUgcmVjZWl2ZWQ6IFwiICsgbG9jYXRpb24ubG9uZ2l0dWRlKTtcblxuICAgICAgICAvLyAgdGhpcy5vcmlnaW4oKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxvY2F0aW9uIGVycm9yIHJlY2VpdmVkOiBcIiArIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgb25PcmlnaW5UYXAoYXJncykge1xuICAgIGxldCBvcmlnaW5TZWFyY2ggPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuXG4gICAgaWYodGhpcy5pc09yaWdpblNlYXJjaGVkID09PSBmYWxzZSlcbiAgICB7XG4gICAgICB0aGlzLmlzbG9hZGluZz0gdHJ1ZTtcbiAgICBpZiAob3JpZ2luU2VhcmNoLnRleHQubGVuZ3RoICE9PSBudWxsIHx8IG9yaWdpblNlYXJjaC50ZXh0Lmxlbmd0aCA9PT0gMClcbiAgICAgIGlmIChvcmlnaW5TZWFyY2gudGV4dC5sZW5ndGggPiAyICYmIG9yaWdpblNlYXJjaC50ZXh0Lmxlbmd0aCAlIDMgPT09IDApIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoU3RyaW5nID0gb3JpZ2luU2VhcmNoLnRleHQuc3BsaXQoXCIgXCIpLmpvaW4oXCIrXCIpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5nb29nbGVTZXJ2aWNlLnNlYXJjaExvY2F0aW9uKHNlYXJjaFN0cmluZykudGhlbihcbiAgICAgICAgICBkYXRhID0+IHtcblxudGhpcy5pc0xpc3RWaWV3VmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheTxhbnk+KCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEucHJlZGljdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5wcmVkaWN0aW9uc1tpXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBwbGFjZUlkOiBkYXRhLnByZWRpY3Rpb25zW2ldLnBsYWNlX2lkLFxuICAgICAgICAgICAgICAgIHNlYXJjaFR5cGU6IFwib3JpZ2luXCJcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuc2VhcmNoVHlwZSA9IFwib3JpZ2luXCI7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWF5IGJlIHRlcnJmaWMgZm9yIG9yaWdpbjogXCIgKyBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaXNsb2FkaW5nPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNPcmlnaW5TZWFyY2hlZCA9IHRydWU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgXHR0aGlzLmlzbG9hZGluZz0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzTGlzdFZpZXdWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzT3JpZ2luU2VhcmNoZWQgPWZhbHNlO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcnMoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgfVxuICB9XG5cbiAgb25EZXN0aW5hdGlvblRhcChhcmdzKSB7XG4gICAgbGV0IG9yaWdpblNlYXJjaCA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG5cbiAgICBpZih0aGlzLmlzRGVzdGluYXRpb25TZWFyY2hlZCA9PT0gZmFsc2UpXG4gICAge1xuICAgICAgdGhpcy5pc2xvYWRpbmc9IHRydWU7XG4gICAgaWYgKG9yaWdpblNlYXJjaC50ZXh0Lmxlbmd0aCAhPT0gbnVsbCB8fCBvcmlnaW5TZWFyY2gudGV4dC5sZW5ndGggPT09IDApXG4gICAgICBpZiAob3JpZ2luU2VhcmNoLnRleHQubGVuZ3RoID4gMiAmJiBvcmlnaW5TZWFyY2gudGV4dC5sZW5ndGggJSAzID09PSAwKSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaFN0cmluZyA9IG9yaWdpblNlYXJjaC50ZXh0LnNwbGl0KFwiIFwiKS5qb2luKFwiK1wiKTtcblxuICAgICAgICB0aGlzLmdvb2dsZVNlcnZpY2Uuc2VhcmNoTG9jYXRpb24oc2VhcmNoU3RyaW5nKS50aGVuKFxuICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgIFx0dGhpcy5pc0xpc3RWaWV3VmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheTxhbnk+KCk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5wcmVkaWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLnByZWRpY3Rpb25zW2ldLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIHBsYWNlSWQ6IGRhdGEucHJlZGljdGlvbnNbaV0ucGxhY2VfaWQsXG4gICAgICAgICAgICAgICAgc2VhcmNoVHlwZTogXCJkZXN0aW5hdGlvblwiXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLnNlYXJjaFR5cGUgPSBcImRlc3RpbmF0aW9uXCI7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWF5IGJlIHRlcnJmaWMgZm9yIGRlc3RpbmF0aW9uOiBcIiArIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pc0Rlc3RpbmF0aW9uU2VhcmNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNsb2FkaW5nPSBmYWxzZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNEZXN0aW5hdGlvblNlYXJjaGVkID0gZmFsc2U7XG4gICAgICAgICAgXHR0aGlzLmlzbG9hZGluZz0gZmFsc2U7XG4gICAgICAgICAgXHR0aGlzLmlzTGlzdFZpZXdWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9ycyhlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICB9XG59XG4gIGhhbmRsZUVycm9ycyhlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgfVxuXG4gIHB1YmxpYyBvblNlbGVjdGVkVGFwKGFyZ3MpIHtcbiAgICBjb25zb2xlLmxvZyhcIj4+IHNlYXJjaFR5cGUgaXMgPDxcIiArIHRoaXMuc2VhcmNoVHlwZSk7XG5cbiAgICBpZiAodGhpcy5zZWFyY2hUeXBlID09PSBcImRlc3RpbmF0aW9uXCIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBcIj4+TmF2aWdhdGlvbiBidXR0b24gdGFwcGVkIGlzIGZvciBkZXN0aW5hdGlvbiA8PFwiICtcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShhcmdzLnZpZXcuYmluZGluZ0NvbnRleHQpXG4gICAgICApO1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IGFyZ3Mudmlldy5iaW5kaW5nQ29udGV4dC5kZXNjcmlwdGlvbjtcbiAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhcImRlc3RpbmF0aW9uXCIsIGFyZ3Mudmlldy5iaW5kaW5nQ29udGV4dCk7XG4gICAgICB0aGlzLmlzTGlzdFZpZXdWaXNpYmxlID0gZmFsc2U7XG4gICAgICB0aGlzLmlzRGVzdGluYXRpb25TZWFyY2hlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBcIj4+TmF2aWdhdGlvbiBidXR0b24gdGFwcGVkIGlzIGZvciBvcmlnaW4gPDxcIiArXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkoYXJncy52aWV3LmJpbmRpbmdDb250ZXh0KVxuICAgICAgKTtcbiAgICAgIHRoaXMub3JpZ2luID0gYXJncy52aWV3LmJpbmRpbmdDb250ZXh0LmRlc2NyaXB0aW9uO1xuICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwib3JpZ2luXCIsIGFyZ3Mudmlldy5iaW5kaW5nQ29udGV4dCk7XG4gICAgICB0aGlzLmlzTGlzdFZpZXdWaXNpYmxlPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNPcmlnaW5TZWFyY2hlZCA9IHRydWVcbiAgICB9XG4gICAgLy8gLy9cdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgLy8gIHRoaXMucm91dGUubmF2aWdhdGUoW1wiYm9va2luZ1wiXSk7XG4gIH1cblxuICBvbk5hdkJ0blRhcCgpIHtcbiAgICAvLyBUaGlzIGNvZGUgd2lsbCBiZSBjYWxsZWQgb25seSBpbiBBbmRyb2lkLlxuICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGlvbiBidXR0b24gdGFwcGVkIVwiKTtcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgLy8gLy9cdHRvcG1vc3QoKS5uYXZpZ2F0ZShcImJvb2tpbmdcIik7XG4gIH1cbn1cbiJdfQ==