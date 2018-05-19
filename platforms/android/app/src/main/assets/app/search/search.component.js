"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
//import { TextField } from 'ui/text-field';
var observable_1 = require("data/observable");
var observable_decorator_1 = require("~/shared/observable-decorator");
var router_1 = require("@angular/router");
var google_play_service_1 = require("~/shared/services/google-play.service");
var page_1 = require("tns-core-modules/ui/page");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var geolocation_service_1 = require("~/shared/services/geolocation.service");
var SearchComponent = /** @class */ (function (_super) {
    __extends(SearchComponent, _super);
    function SearchComponent(_page, route, router, routerExtensions, geolocationService, googleService) {
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
    SearchComponent.prototype.ngOnInit = function () {
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
    SearchComponent.prototype.getOrigin = function () {
        this.geolocationService.getLocation()
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
        if (originSearch.text.length !== null || originSearch.text.length === 0)
            if (originSearch.text.length > 2 && originSearch.text.length % 3 === 0) {
                var searchString = originSearch.text.split(" ").join("+");
                this.googleService.searchLocation(searchString).then(function (data) {
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
                }, function (error) {
                    _this.handleErrors(error);
                });
            }
    };
    SearchComponent.prototype.onDestinationTap = function (args) {
        var _this = this;
        var originSearch = args.object;
        if (originSearch.text.length !== null || originSearch.text.length === 0)
            if (originSearch.text.length > 2 && originSearch.text.length % 3 === 0) {
                var searchString = originSearch.text.split(" ").join("+");
                this.googleService.searchLocation(searchString).then(function (data) {
                    _this.items = new observable_array_1.ObservableArray();
                    for (var i = 0; i < data.predictions.length; i++) {
                        _this.items.push({
                            description: data.predictions[i].description,
                            placeId: data.predictions[i].place_id,
                            searchType: "destination"
                        });
                        _this.searchType = "destination";
                        console.log("may be terrfic for origin: " + i);
                    }
                }, function (error) {
                    _this.handleErrors(error);
                });
            }
    };
    SearchComponent.prototype.handleErrors = function (error) {
        console.error(error.message);
    };
    SearchComponent.prototype.onSelectedTap = function (args) {
        console.log(">> searchType is <<" + this.searchType);
        if (this.searchType == "destination") {
            console.log(">>Navigation button tapped is for destination <<" + JSON.stringify(args.view.bindingContext));
            this.destination = args.view.bindingContext.description;
            //  // this.data.destinationStorage= args.view.bindingContext;
        }
        // //	this.routerExtensions.back();
        this.route.navigate(["booking"]);
    };
    SearchComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
        this.routerExtensions.back();
        //	topmost().navigate("booking");
    };
    __decorate([
        observable_decorator_1.ObservableProperty(),
        __metadata("design:type", String)
    ], SearchComponent.prototype, "message", void 0);
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search',
            templateUrl: './search/search.component.html',
            styleUrls: ['./search/search.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.Router,
            router_1.ActivatedRoute,
            nativescript_angular_1.RouterExtensions,
            geolocation_service_1.GeolocationService,
            google_play_service_1.GooglePlayService])
    ], SearchComponent);
    return SearchComponent;
}(observable_1.Observable));
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsNkRBQXdEO0FBQ3hELDRDQUE0QztBQUM1Qyw4Q0FBd0Q7QUFDeEQsc0VBQW1FO0FBQ25FLDBDQUEyRTtBQUMzRSw2RUFBMEU7QUFDMUUsaURBQWdEO0FBRWhELDRGQUEwRjtBQUMxRiw2RUFBMkU7QUFTM0U7SUFBcUMsbUNBQVU7SUFhOUMseUJBQW9CLEtBQVcsRUFDcEIsS0FBYSxFQUNaLE1BQXNCLEVBQ3RCLGdCQUFrQyxFQUNsQyxrQkFBc0MsRUFDdkMsYUFBZ0M7UUFMM0MsWUFNQyxpQkFBTyxTQUtOO1FBWGtCLFdBQUssR0FBTCxLQUFLLENBQU07UUFDcEIsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQUNaLFlBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLHNCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsd0JBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN2QyxtQkFBYSxHQUFiLGFBQWEsQ0FBbUI7UUFFeEMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOztRQUNwQixpREFBaUQ7UUFDOUMsMkNBQTJDO1FBQzVDLE1BQU07SUFDUCxDQUFDO0lBRUYsa0NBQVEsR0FBUjtRQUVBLHlCQUF5QjtRQUN6QixrREFBa0Q7UUFDbEQsa0NBQWtDO1FBQ2xDLGdFQUFnRTtRQUNoRSxrRUFBa0U7UUFDbEUsb0dBQW9HO1FBQ3BHLHlDQUF5QztRQUN6Qyw2QkFBNkI7UUFDN0IsU0FBUztJQUNSLENBQUM7SUFFRixtQ0FBUyxHQUFUO1FBQ0csSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRTthQUNsQyxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakUs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Q0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxxQ0FBVyxHQUFYO1FBQ0UsNENBQTRDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsaUNBQWlDO0lBQ25DLENBQUM7SUF0SEY7UUFERSx5Q0FBa0IsRUFBRTs7b0RBQ0M7SUFQWCxlQUFlO1FBTjNCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQzVDLENBQUM7eUNBZTBCLFdBQUk7WUFDYixlQUFNO1lBQ0osdUJBQWM7WUFDSix1Q0FBZ0I7WUFDZCx3Q0FBa0I7WUFDeEIsdUNBQWlCO09BbEIvQixlQUFlLENBOEgzQjtJQUFELHNCQUFDO0NBQUEsQUE5SEQsQ0FBcUMsdUJBQVUsR0E4SDlDO0FBOUhZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XG4vL2ltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3VpL3RleHQtZmllbGQnO1xuaW1wb3J0IHsgRXZlbnREYXRhLCBPYnNlcnZhYmxlIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IE9ic2VydmFibGVQcm9wZXJ0eSB9IGZyb20gJ34vc2hhcmVkL29ic2VydmFibGUtZGVjb3JhdG9yJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcywgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBHb29nbGVQbGF5U2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9nb29nbGUtcGxheS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXknO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2dlb2xvY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IEFjY3VyYWN5IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9lbnVtcy9lbnVtcyc7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ3NlYXJjaCcsXG5cdHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vc2VhcmNoL3NlYXJjaC5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBTZWFyY2hDb21wb25lbnQgZXh0ZW5kcyBPYnNlcnZhYmxlIGltcGxlbWVudHMgT25Jbml0ICB7XG5cblxuICBpdGVtczogT2JzZXJ2YWJsZUFycmF5PGFueT47XG4gIHB1YmxpYyBsb2NhdGlvbkFycmF5OiBBcnJheTxhbnk+O1xuXG4gIEBPYnNlcnZhYmxlUHJvcGVydHkoKVxuXHRwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuXHRcblx0c2VhcmNoVHlwZTogc3RyaW5nO1xuIHB1YmxpYyBvcmlnaW46IHN0cmluZztcbiAgcHVibGljIGRlc3RpbmF0aW9uOiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSxcblx0XHQgIHByaXZhdGUgcm91dGU6IFJvdXRlcixcblx0XHQgICBwcml2YXRlIHJvdXRlcjogQWN0aXZhdGVkUm91dGUsXG5cdFx0ICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuXHRcdCAgIHByaXZhdGUgZ2VvbG9jYXRpb25TZXJ2aWNlOiBHZW9sb2NhdGlvblNlcnZpY2UsXG5cdFx0ICBwcml2YXRlIGdvb2dsZVNlcnZpY2U6IEdvb2dsZVBsYXlTZXJ2aWNlKSB7XG5cdFx0c3VwZXIoKTtcblx0XHQgIHRoaXMuZ2V0T3JpZ2luKCk7XG5cdC8vICB0aGlzLnJvdXRlci5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAvLyAgdGhpcy5zZWFyY2hUeXBlID0gcGFyYW1zW1wic2VhcmNoVHlwZVwiXTtcbiAgIC8vIH0pO1xuXHQgfVxuXG5cdG5nT25Jbml0KCkge1xuXG5cdC8vIFx0dGhpcy5pc0xvYWRpbmc9IHRydWU7XG5cdC8vIFx0dGhpcy5pc0Fub255bW91cyA9IEJhY2tlbmRTZXJ2aWNlLmlzQW5vbnltb3VzO1xuXHQvLyBcdHRoaXMuc3ViJCA9IHRoaXMucm91dGUucGFyYW1zO1xuXHQvLyBcdHRoaXMuYXJ0aWNsZXMkID0gdGhpcy5zdWIkLnN3aXRjaE1hcCgocGFyYW1zOiBhbnkpID0mI3gzRTsge1xuXHQvLyBcdFx0XHRcdFx0XHRcdFx0dGhpcy5jYXRlZ29yeVRpdGxlID0gcGFyYW1zWyYjeDI3O2NhdGVnb3J5VGl0bGUmI3gyNztdO1xuXHQvLyBcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICYjeDNDO2FueSYjeDNFO3RoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldEFydGljbGVMaXN0KHBhcmFtc1smI3gyNztpZCYjeDI3O10pfSk7JiN4OTtcblx0Ly8gICAgdGhpcy5hcnRpY2xlcyQuc3Vic2NyaWJlKCgpPSYjeDNFO3tcblx0Ly8gXHRcdFx0IHRoaXMuaXNMb2FkaW5nPSBmYWxzZTtcblx0Ly8gICAgfSk7XG5cdCB9XG5cbiBnZXRPcmlnaW4oKSB7XG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UuZ2V0TG9jYXRpb24oKVxuICAgICAgLnRoZW4obG9jYXRpb24gPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0cG9pbnRMYXRpdHVkZSByZWNlaXZlZDogXCIgKyBsb2NhdGlvbi5sYXRpdHVkZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRwb2ludExvbmdpdHVkZSByZWNlaXZlZDogXCIgKyBsb2NhdGlvbi5sb25naXR1ZGUpO1xuICAgICBcbiAgICAgICAvLyAgdGhpcy5vcmlnaW4oKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxvY2F0aW9uIGVycm9yIHJlY2VpdmVkOiBcIiArIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cblxuXG5cdCBvbk9yaWdpblRhcChhcmdzKSB7XG4gICAgbGV0IG9yaWdpblNlYXJjaCA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgaWYgKG9yaWdpblNlYXJjaC50ZXh0Lmxlbmd0aCAhPT0gbnVsbCB8fCBvcmlnaW5TZWFyY2gudGV4dC5sZW5ndGggPT09IDApXG4gICAgICBpZiAob3JpZ2luU2VhcmNoLnRleHQubGVuZ3RoID4gMiAmJiBvcmlnaW5TZWFyY2gudGV4dC5sZW5ndGggJSAzID09PSAwKSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaFN0cmluZyA9IG9yaWdpblNlYXJjaC50ZXh0LnNwbGl0KFwiIFwiKS5qb2luKFwiK1wiKTtcbiAgICAgICAgdGhpcy5nb29nbGVTZXJ2aWNlLnNlYXJjaExvY2F0aW9uKHNlYXJjaFN0cmluZykudGhlbihcbiAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PGFueT4oKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5wcmVkaWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLnByZWRpY3Rpb25zW2ldLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIHBsYWNlSWQ6IGRhdGEucHJlZGljdGlvbnNbaV0ucGxhY2VfaWQsXG4gICAgICAgICAgICAgICAgc2VhcmNoVHlwZTogXCJvcmlnaW5cIlxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGhpcy5zZWFyY2hUeXBlID0gXCJvcmlnaW5cIjtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYXkgYmUgdGVycmZpYyBmb3Igb3JpZ2luOiBcIiArIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcnMoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgfVxuXG4gIG9uRGVzdGluYXRpb25UYXAoYXJncykge1xuICAgIGxldCBvcmlnaW5TZWFyY2ggPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgIGlmIChvcmlnaW5TZWFyY2gudGV4dC5sZW5ndGggIT09IG51bGwgfHwgb3JpZ2luU2VhcmNoLnRleHQubGVuZ3RoID09PSAwKVxuICAgICAgaWYgKG9yaWdpblNlYXJjaC50ZXh0Lmxlbmd0aCA+IDIgJiYgb3JpZ2luU2VhcmNoLnRleHQubGVuZ3RoICUgMyA9PT0gMCkge1xuICAgICAgICBjb25zdCBzZWFyY2hTdHJpbmcgPSBvcmlnaW5TZWFyY2gudGV4dC5zcGxpdChcIiBcIikuam9pbihcIitcIik7XG4gICAgICAgIHRoaXMuZ29vZ2xlU2VydmljZS5zZWFyY2hMb2NhdGlvbihzZWFyY2hTdHJpbmcpLnRoZW4oXG4gICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheTxhbnk+KCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEucHJlZGljdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5wcmVkaWN0aW9uc1tpXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBwbGFjZUlkOiBkYXRhLnByZWRpY3Rpb25zW2ldLnBsYWNlX2lkLFxuICAgICAgICAgICAgICAgIHNlYXJjaFR5cGU6IFwiZGVzdGluYXRpb25cIlxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFR5cGUgPSBcImRlc3RpbmF0aW9uXCI7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWF5IGJlIHRlcnJmaWMgZm9yIG9yaWdpbjogXCIgKyBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3JzKGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gIH1cbiAgaGFuZGxlRXJyb3JzKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xufVxuXG5wdWJsaWMgb25TZWxlY3RlZFRhcChhcmdzKSB7XG5cbiAgICBjb25zb2xlLmxvZyhcIj4+IHNlYXJjaFR5cGUgaXMgPDxcIiArIHRoaXMuc2VhcmNoVHlwZSk7XG5cbiAgICBpZiAodGhpcy5zZWFyY2hUeXBlID09IFwiZGVzdGluYXRpb25cIikge1xuICAgICAgY29uc29sZS5sb2coXCI+Pk5hdmlnYXRpb24gYnV0dG9uIHRhcHBlZCBpcyBmb3IgZGVzdGluYXRpb24gPDxcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3Mudmlldy5iaW5kaW5nQ29udGV4dCkpO1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbj0gYXJncy52aWV3LmJpbmRpbmdDb250ZXh0LmRlc2NyaXB0aW9uO1xuICAgLy8gIC8vIHRoaXMuZGF0YS5kZXN0aW5hdGlvblN0b3JhZ2U9IGFyZ3Mudmlldy5iaW5kaW5nQ29udGV4dDtcbiAgICAgIH1cbiAgIC8vIC8vXHR0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIHRoaXMucm91dGUubmF2aWdhdGUoW1wiYm9va2luZ1wiXSk7XG4gIH1cblxuICBvbk5hdkJ0blRhcCgpIHtcbiAgICAvLyBUaGlzIGNvZGUgd2lsbCBiZSBjYWxsZWQgb25seSBpbiBBbmRyb2lkLlxuICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGlvbiBidXR0b24gdGFwcGVkIVwiKTtcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIC8vXHR0b3Btb3N0KCkubmF2aWdhdGUoXCJib29raW5nXCIpO1xuICB9XG59Il19