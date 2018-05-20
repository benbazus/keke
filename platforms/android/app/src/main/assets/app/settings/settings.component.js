"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
//import { TextField } from 'ui/text-field';
var observable_1 = require("data/observable");
var router_1 = require("@angular/router");
var google_play_service_1 = require("~/shared/services/google-play.service");
var page_1 = require("tns-core-modules/ui/page");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var geolocation_service_1 = require("~/shared/services/geolocation.service");
var appSettings = require("application-settings");
var SettingsComponent = /** @class */ (function (_super) {
    __extends(SettingsComponent, _super);
    function SettingsComponent(_page, route, router, routerExtensions, geolocationService, googleService) {
        var _this = _super.call(this) || this;
        _this._page = _page;
        _this.route = route;
        _this.router = router;
        _this.routerExtensions = routerExtensions;
        _this.geolocationService = geolocationService;
        _this.googleService = googleService;
        _this.getOrigin();
        return _this;
        //  this.router.queryParams.subscribe(params => {
        //  this.searchType = params["searchType"];
        // });
    }
    SettingsComponent.prototype.ngOnInit = function () {
        // 	this.isLoading= true;
        // 	this.isAnonymous = BackendService.isAnonymous;
        // 	this.sub$ = this.route.params;
        // 	this.articles$ = this.sub$.switchMap((params: any) =&#x3E; {
        // 								this.categoryTitle = params[&#x27;categoryTitle&#x27;];
        // 								return &#x3C;any&#x3E;this.firebaseService.getArticleList(params[&#x27;id&#x27;])});&#x9;
        //    this.articles$.subscribe(()=&#x3E;{
        // 			 this.isLoading= false;
        //    });
    };
    SettingsComponent.prototype.getOrigin = function () {
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
    SettingsComponent.prototype.onOriginTap = function (args) {
        var _this = this;
        var originSearch = args.object;
        if (originSearch.text.length !== null || originSearch.text.length === 0)
            if (originSearch.text.length > 2 && originSearch.text.length % 3 === 0) {
                var searchString = originSearch.text.split(" ").join("+");
                this.isloading = true;
                this.googleService.searchLocation(searchString).then(function (data) {
                    //{"predictions":[{"description":"Kampala, Uganda","id":"4004250a4c4934b42dbecf7aba5a594070917eec","matched_substrings":[{"length":6,"offset":0}],"place_id":"ChIJm7N0nQ-8fRcR7G9r2T2QOEU","reference":"CjQnAAAAdHO1DPcdSoBfk9-OsZtHRaSZ7f1O-mEXv0
                    //console.log("The destination : " + data.results[0].name);
                    // console.log("The origin : " + data.predictions[0].description);
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
                }, function (error) {
                    _this.isloading = false;
                    _this.isListViewVisible = false;
                    _this.handleErrors(error);
                });
            }
    };
    SettingsComponent.prototype.onDestinationTap = function (args) {
        var _this = this;
        var originSearch = args.object;
        if (originSearch.text.length !== null || originSearch.text.length === 0)
            if (originSearch.text.length > 2 && originSearch.text.length % 3 === 0) {
                var searchString = originSearch.text.split(" ").join("+");
                this.isloading = true;
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
                    _this.isloading = false;
                }, function (error) {
                    _this.isloading = false;
                    _this.isListViewVisible = false;
                    _this.handleErrors(error);
                });
            }
    };
    SettingsComponent.prototype.handleErrors = function (error) {
        console.error(error.message);
    };
    SettingsComponent.prototype.onSelectedTap = function (args) {
        console.log(">> searchType is <<" + this.searchType);
        if (this.searchType === "destination") {
            console.log(">>Navigation button tapped is for destination <<" +
                JSON.stringify(args.view.bindingContext));
            this.destination = args.view.bindingContext.description;
            appSettings.setString("destination", args.view.bindingContext);
            this.isListViewVisible = false;
        }
        else {
            console.log(">>Navigation button tapped is for origin <<" +
                JSON.stringify(args.view.bindingContext));
            this.origin = args.view.bindingContext.description;
            appSettings.setString("origin", args.view.bindingContext);
            this.isListViewVisible = false;
        }
        // //	this.routerExtensions.back();
        //  this.route.navigate(["booking"]);
    };
    SettingsComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
        this.routerExtensions.back();
        //	topmost().navigate("booking");
    };
    SettingsComponent = __decorate([
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
    ], SettingsComponent);
    return SettingsComponent;
}(observable_1.Observable));
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDZEQUF3RDtBQUN4RCw0Q0FBNEM7QUFDNUMsOENBQXdEO0FBRXhELDBDQUEyRTtBQUMzRSw2RUFBMEU7QUFDMUUsaURBQWdEO0FBRWhELDRGQUEwRjtBQUMxRiw2RUFBMkU7QUFFM0Usa0RBQW9EO0FBT3BEO0lBQXVDLHFDQUFVO0lBVy9DLDJCQUNVLEtBQVcsRUFDWCxLQUFhLEVBQ2IsTUFBc0IsRUFDdEIsZ0JBQWtDLEVBQ2xDLGtCQUFzQyxFQUN0QyxhQUFnQztRQU4xQyxZQVFFLGlCQUFPLFNBS1I7UUFaUyxXQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLFlBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLHNCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsd0JBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxtQkFBYSxHQUFiLGFBQWEsQ0FBbUI7UUFHeEMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOztRQUNqQixpREFBaUQ7UUFDakQsMkNBQTJDO1FBQzNDLE1BQU07SUFDUixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNFLHlCQUF5QjtRQUN6QixrREFBa0Q7UUFDbEQsa0NBQWtDO1FBQ2xDLGdFQUFnRTtRQUNoRSxrRUFBa0U7UUFDbEUsb0dBQW9HO1FBQ3BHLHlDQUF5QztRQUN6Qyw2QkFBNkI7UUFDN0IsU0FBUztJQUNYLENBQUM7SUFFRCxxQ0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixXQUFXLEVBQUU7YUFDYixJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakUs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ekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdCLGlDQUFpQztJQUNuQyxDQUFDO0lBcEpVLGlCQUFpQjtRQUw3QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztTQUM3QyxDQUFDO3lDQWFpQixXQUFJO1lBQ0osZUFBTTtZQUNMLHVCQUFjO1lBQ0osdUNBQWdCO1lBQ2Qsd0NBQWtCO1lBQ3ZCLHVDQUFpQjtPQWpCL0IsaUJBQWlCLENBcUo3QjtJQUFELHdCQUFDO0NBQUEsQUFySkQsQ0FBdUMsdUJBQVUsR0FxSmhEO0FBckpZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbi8vaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndWkvdGV4dC1maWVsZCc7XG5pbXBvcnQgeyBFdmVudERhdGEsIE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5cbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcywgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBHb29nbGVQbGF5U2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9nb29nbGUtcGxheS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgQWNjdXJhY3kgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9lbnVtcy9lbnVtc1wiO1xuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJzZWFyY2hcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NDb21wb25lbnQgZXh0ZW5kcyBPYnNlcnZhYmxlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgaXRlbXM6IE9ic2VydmFibGVBcnJheTxhbnk+O1xuICBwdWJsaWMgbG9jYXRpb25BcnJheTogQXJyYXk8YW55PjtcblxuIGlzTGlzdFZpZXdWaXNpYmxlOiBib29sZWFuO1xuaXNsb2FkaW5nOmJvb2xlYW47XG5cbiAgc2VhcmNoVHlwZTogc3RyaW5nO1xuICBwdWJsaWMgb3JpZ2luOiBzdHJpbmc7XG4gIHB1YmxpYyBkZXN0aW5hdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSByb3V0ZTogUm91dGVyLFxuICAgIHByaXZhdGUgcm91dGVyOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSBnZW9sb2NhdGlvblNlcnZpY2U6IEdlb2xvY2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIGdvb2dsZVNlcnZpY2U6IEdvb2dsZVBsYXlTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5nZXRPcmlnaW4oKTtcbiAgICAvLyAgdGhpcy5yb3V0ZXIucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgLy8gIHRoaXMuc2VhcmNoVHlwZSA9IHBhcmFtc1tcInNlYXJjaFR5cGVcIl07XG4gICAgLy8gfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBcdHRoaXMuaXNMb2FkaW5nPSB0cnVlO1xuICAgIC8vIFx0dGhpcy5pc0Fub255bW91cyA9IEJhY2tlbmRTZXJ2aWNlLmlzQW5vbnltb3VzO1xuICAgIC8vIFx0dGhpcy5zdWIkID0gdGhpcy5yb3V0ZS5wYXJhbXM7XG4gICAgLy8gXHR0aGlzLmFydGljbGVzJCA9IHRoaXMuc3ViJC5zd2l0Y2hNYXAoKHBhcmFtczogYW55KSA9JiN4M0U7IHtcbiAgICAvLyBcdFx0XHRcdFx0XHRcdFx0dGhpcy5jYXRlZ29yeVRpdGxlID0gcGFyYW1zWyYjeDI3O2NhdGVnb3J5VGl0bGUmI3gyNztdO1xuICAgIC8vIFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJiN4M0M7YW55JiN4M0U7dGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0QXJ0aWNsZUxpc3QocGFyYW1zWyYjeDI3O2lkJiN4Mjc7XSl9KTsmI3g5O1xuICAgIC8vICAgIHRoaXMuYXJ0aWNsZXMkLnN1YnNjcmliZSgoKT0mI3gzRTt7XG4gICAgLy8gXHRcdFx0IHRoaXMuaXNMb2FkaW5nPSBmYWxzZTtcbiAgICAvLyAgICB9KTtcbiAgfVxuXG4gIGdldE9yaWdpbigpIHtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZVxuICAgICAgLmdldExvY2F0aW9uKClcbiAgICAgIC50aGVuKGxvY2F0aW9uID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydHBvaW50TGF0aXR1ZGUgcmVjZWl2ZWQ6IFwiICsgbG9jYXRpb24ubGF0aXR1ZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0cG9pbnRMb25naXR1ZGUgcmVjZWl2ZWQ6IFwiICsgbG9jYXRpb24ubG9uZ2l0dWRlKTtcblxuICAgICAgICAvLyAgdGhpcy5vcmlnaW4oKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxvY2F0aW9uIGVycm9yIHJlY2VpdmVkOiBcIiArIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgb25PcmlnaW5UYXAoYXJncykge1xuICAgIGxldCBvcmlnaW5TZWFyY2ggPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgIGlmIChvcmlnaW5TZWFyY2gudGV4dC5sZW5ndGggIT09IG51bGwgfHwgb3JpZ2luU2VhcmNoLnRleHQubGVuZ3RoID09PSAwKVxuICAgICAgaWYgKG9yaWdpblNlYXJjaC50ZXh0Lmxlbmd0aCA+IDIgJiYgb3JpZ2luU2VhcmNoLnRleHQubGVuZ3RoICUgMyA9PT0gMCkge1xuICAgICAgICBjb25zdCBzZWFyY2hTdHJpbmcgPSBvcmlnaW5TZWFyY2gudGV4dC5zcGxpdChcIiBcIikuam9pbihcIitcIik7XG4gICAgICAgIHRoaXMuaXNsb2FkaW5nPSB0cnVlO1xuICAgICAgICB0aGlzLmdvb2dsZVNlcnZpY2Uuc2VhcmNoTG9jYXRpb24oc2VhcmNoU3RyaW5nKS50aGVuKFxuICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgLy97XCJwcmVkaWN0aW9uc1wiOlt7XCJkZXNjcmlwdGlvblwiOlwiS2FtcGFsYSwgVWdhbmRhXCIsXCJpZFwiOlwiNDAwNDI1MGE0YzQ5MzRiNDJkYmVjZjdhYmE1YTU5NDA3MDkxN2VlY1wiLFwibWF0Y2hlZF9zdWJzdHJpbmdzXCI6W3tcImxlbmd0aFwiOjYsXCJvZmZzZXRcIjowfV0sXCJwbGFjZV9pZFwiOlwiQ2hJSm03TjBuUS04ZlJjUjdHOXIyVDJRT0VVXCIsXCJyZWZlcmVuY2VcIjpcIkNqUW5BQUFBZEhPMURQY2RTb0JmazktT3NadEhSYVNaN2YxTy1tRVh2MFxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRoZSBkZXN0aW5hdGlvbiA6IFwiICsgZGF0YS5yZXN1bHRzWzBdLm5hbWUpO1xuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlRoZSBvcmlnaW4gOiBcIiArIGRhdGEucHJlZGljdGlvbnNbMF0uZGVzY3JpcHRpb24pO1xudGhpcy5pc0xpc3RWaWV3VmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheTxhbnk+KCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEucHJlZGljdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5wcmVkaWN0aW9uc1tpXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBwbGFjZUlkOiBkYXRhLnByZWRpY3Rpb25zW2ldLnBsYWNlX2lkLFxuICAgICAgICAgICAgICAgIHNlYXJjaFR5cGU6IFwib3JpZ2luXCJcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuc2VhcmNoVHlwZSA9IFwib3JpZ2luXCI7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWF5IGJlIHRlcnJmaWMgZm9yIG9yaWdpbjogXCIgKyBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaXNsb2FkaW5nPSBmYWxzZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICBcdHRoaXMuaXNsb2FkaW5nPSBmYWxzZTtcbiAgICAgICAgICBcdHRoaXMuaXNMaXN0Vmlld1Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3JzKGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gIH1cblxuICBvbkRlc3RpbmF0aW9uVGFwKGFyZ3MpIHtcbiAgICBsZXQgb3JpZ2luU2VhcmNoID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICBpZiAob3JpZ2luU2VhcmNoLnRleHQubGVuZ3RoICE9PSBudWxsIHx8IG9yaWdpblNlYXJjaC50ZXh0Lmxlbmd0aCA9PT0gMClcbiAgICAgIGlmIChvcmlnaW5TZWFyY2gudGV4dC5sZW5ndGggPiAyICYmIG9yaWdpblNlYXJjaC50ZXh0Lmxlbmd0aCAlIDMgPT09IDApIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoU3RyaW5nID0gb3JpZ2luU2VhcmNoLnRleHQuc3BsaXQoXCIgXCIpLmpvaW4oXCIrXCIpO1xuICAgICAgIHRoaXMuaXNsb2FkaW5nPSB0cnVlO1xuICAgICAgICB0aGlzLmdvb2dsZVNlcnZpY2Uuc2VhcmNoTG9jYXRpb24oc2VhcmNoU3RyaW5nKS50aGVuKFxuICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgIFx0dGhpcy5pc0xpc3RWaWV3VmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheTxhbnk+KCk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5wcmVkaWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLnByZWRpY3Rpb25zW2ldLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIHBsYWNlSWQ6IGRhdGEucHJlZGljdGlvbnNbaV0ucGxhY2VfaWQsXG4gICAgICAgICAgICAgICAgc2VhcmNoVHlwZTogXCJkZXN0aW5hdGlvblwiXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLnNlYXJjaFR5cGUgPSBcImRlc3RpbmF0aW9uXCI7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWF5IGJlIHRlcnJmaWMgZm9yIGRlc3RpbmF0aW9uOiBcIiArIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pc2xvYWRpbmc9IGZhbHNlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIFx0dGhpcy5pc2xvYWRpbmc9IGZhbHNlO1xuICAgICAgICAgIFx0dGhpcy5pc0xpc3RWaWV3VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcnMoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgfVxuICBoYW5kbGVFcnJvcnMoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gIH1cblxuICBwdWJsaWMgb25TZWxlY3RlZFRhcChhcmdzKSB7XG4gICAgY29uc29sZS5sb2coXCI+PiBzZWFyY2hUeXBlIGlzIDw8XCIgKyB0aGlzLnNlYXJjaFR5cGUpO1xuXG4gICAgaWYgKHRoaXMuc2VhcmNoVHlwZSA9PT0gXCJkZXN0aW5hdGlvblwiKSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgXCI+Pk5hdmlnYXRpb24gYnV0dG9uIHRhcHBlZCBpcyBmb3IgZGVzdGluYXRpb24gPDxcIiArXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkoYXJncy52aWV3LmJpbmRpbmdDb250ZXh0KVxuICAgICAgKTtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBhcmdzLnZpZXcuYmluZGluZ0NvbnRleHQuZGVzY3JpcHRpb247XG4gICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJkZXN0aW5hdGlvblwiLCBhcmdzLnZpZXcuYmluZGluZ0NvbnRleHQpO1xuICAgICAgdGhpcy5pc0xpc3RWaWV3VmlzaWJsZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgXCI+Pk5hdmlnYXRpb24gYnV0dG9uIHRhcHBlZCBpcyBmb3Igb3JpZ2luIDw8XCIgK1xuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGFyZ3Mudmlldy5iaW5kaW5nQ29udGV4dClcbiAgICAgICk7XG4gICAgICB0aGlzLm9yaWdpbiA9IGFyZ3Mudmlldy5iaW5kaW5nQ29udGV4dC5kZXNjcmlwdGlvbjtcbiAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhcIm9yaWdpblwiLCBhcmdzLnZpZXcuYmluZGluZ0NvbnRleHQpO1xuICAgICAgdGhpcy5pc0xpc3RWaWV3VmlzaWJsZT0gZmFsc2U7XG4gICAgfVxuICAgIC8vIC8vXHR0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIC8vICB0aGlzLnJvdXRlLm5hdmlnYXRlKFtcImJvb2tpbmdcIl0pO1xuICB9XG5cbiAgb25OYXZCdG5UYXAoKSB7XG4gICAgLy8gVGhpcyBjb2RlIHdpbGwgYmUgY2FsbGVkIG9ubHkgaW4gQW5kcm9pZC5cbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpb24gYnV0dG9uIHRhcHBlZCFcIik7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgICAvL1x0dG9wbW9zdCgpLm5hdmlnYXRlKFwiYm9va2luZ1wiKTtcbiAgfVxufVxuIl19