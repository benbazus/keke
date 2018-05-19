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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsNkRBQXdEO0FBQ3hELDRDQUE0QztBQUM1Qyw4Q0FBd0Q7QUFDeEQsc0VBQW1FO0FBQ25FLDBDQUEyRTtBQUMzRSw2RUFBMEU7QUFDMUUsaURBQWdEO0FBRWhELDRGQUEwRjtBQUMxRiw2RUFBMkU7QUFTM0U7SUFBcUMsbUNBQVU7SUFZOUMseUJBQW9CLEtBQVcsRUFDcEIsS0FBYSxFQUNaLE1BQXNCLEVBQ3RCLGdCQUFrQyxFQUNsQyxrQkFBc0MsRUFDdkMsYUFBZ0M7UUFMM0MsWUFNQyxpQkFBTyxTQUtOO1FBWGtCLFdBQUssR0FBTCxLQUFLLENBQU07UUFDcEIsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQUNaLFlBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLHNCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsd0JBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN2QyxtQkFBYSxHQUFiLGFBQWEsQ0FBbUI7UUFFeEMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOztRQUNwQixpREFBaUQ7UUFDOUMsMkNBQTJDO1FBQzVDLE1BQU07SUFDUCxDQUFDO0lBRUYsa0NBQVEsR0FBUjtRQUVBLHlCQUF5QjtRQUN6QixrREFBa0Q7UUFDbEQsa0NBQWtDO1FBQ2xDLGdFQUFnRTtRQUNoRSxrRUFBa0U7UUFDbEUsb0dBQW9HO1FBQ3BHLHlDQUF5QztRQUN6Qyw2QkFBNkI7UUFDN0IsU0FBUztJQUNSLENBQUM7SUFFRixtQ0FBUyxHQUFUO1FBQ0csSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRTthQUNsQyxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakUs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Q0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxxQ0FBVyxHQUFYO1FBQ0UsNENBQTRDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsaUNBQWlDO0lBQ25DLENBQUM7SUF0SEY7UUFERSx5Q0FBa0IsRUFBRTs7b0RBQ0M7SUFOWCxlQUFlO1FBTjNCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQzVDLENBQUM7eUNBYzBCLFdBQUk7WUFDYixlQUFNO1lBQ0osdUJBQWM7WUFDSix1Q0FBZ0I7WUFDZCx3Q0FBa0I7WUFDeEIsdUNBQWlCO09BakIvQixlQUFlLENBNkgzQjtJQUFELHNCQUFDO0NBQUEsQUE3SEQsQ0FBcUMsdUJBQVUsR0E2SDlDO0FBN0hZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XG4vL2ltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3VpL3RleHQtZmllbGQnO1xuaW1wb3J0IHsgRXZlbnREYXRhLCBPYnNlcnZhYmxlIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IE9ic2VydmFibGVQcm9wZXJ0eSB9IGZyb20gJ34vc2hhcmVkL29ic2VydmFibGUtZGVjb3JhdG9yJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcywgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBHb29nbGVQbGF5U2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9nb29nbGUtcGxheS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXknO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2dlb2xvY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IEFjY3VyYWN5IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9lbnVtcy9lbnVtcyc7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ3NlYXJjaCcsXG5cdHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vc2VhcmNoL3NlYXJjaC5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBTZWFyY2hDb21wb25lbnQgZXh0ZW5kcyBPYnNlcnZhYmxlIGltcGxlbWVudHMgT25Jbml0ICB7XG5cblxuICBpdGVtczogT2JzZXJ2YWJsZUFycmF5PGFueT47XG5cbiAgQE9ic2VydmFibGVQcm9wZXJ0eSgpXG5cdHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG5cdFxuXHRzZWFyY2hUeXBlOiBzdHJpbmc7XG4gcHVibGljIG9yaWdpbjogc3RyaW5nO1xuICBwdWJsaWMgZGVzdGluYXRpb246IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlOiBQYWdlLFxuXHRcdCAgcHJpdmF0ZSByb3V0ZTogUm91dGVyLFxuXHRcdCAgIHByaXZhdGUgcm91dGVyOiBBY3RpdmF0ZWRSb3V0ZSxcblx0XHQgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG5cdFx0ICAgcHJpdmF0ZSBnZW9sb2NhdGlvblNlcnZpY2U6IEdlb2xvY2F0aW9uU2VydmljZSxcblx0XHQgIHByaXZhdGUgZ29vZ2xlU2VydmljZTogR29vZ2xlUGxheVNlcnZpY2UpIHtcblx0XHRzdXBlcigpO1xuXHRcdCAgdGhpcy5nZXRPcmlnaW4oKTtcblx0Ly8gIHRoaXMucm91dGVyLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgIC8vICB0aGlzLnNlYXJjaFR5cGUgPSBwYXJhbXNbXCJzZWFyY2hUeXBlXCJdO1xuICAgLy8gfSk7XG5cdCB9XG5cblx0bmdPbkluaXQoKSB7XG5cblx0Ly8gXHR0aGlzLmlzTG9hZGluZz0gdHJ1ZTtcblx0Ly8gXHR0aGlzLmlzQW5vbnltb3VzID0gQmFja2VuZFNlcnZpY2UuaXNBbm9ueW1vdXM7XG5cdC8vIFx0dGhpcy5zdWIkID0gdGhpcy5yb3V0ZS5wYXJhbXM7XG5cdC8vIFx0dGhpcy5hcnRpY2xlcyQgPSB0aGlzLnN1YiQuc3dpdGNoTWFwKChwYXJhbXM6IGFueSkgPSYjeDNFOyB7XG5cdC8vIFx0XHRcdFx0XHRcdFx0XHR0aGlzLmNhdGVnb3J5VGl0bGUgPSBwYXJhbXNbJiN4Mjc7Y2F0ZWdvcnlUaXRsZSYjeDI3O107XG5cdC8vIFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJiN4M0M7YW55JiN4M0U7dGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0QXJ0aWNsZUxpc3QocGFyYW1zWyYjeDI3O2lkJiN4Mjc7XSl9KTsmI3g5O1xuXHQvLyAgICB0aGlzLmFydGljbGVzJC5zdWJzY3JpYmUoKCk9JiN4M0U7e1xuXHQvLyBcdFx0XHQgdGhpcy5pc0xvYWRpbmc9IGZhbHNlO1xuXHQvLyAgICB9KTtcblx0IH1cblxuIGdldE9yaWdpbigpIHtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5nZXRMb2NhdGlvbigpXG4gICAgICAudGhlbihsb2NhdGlvbiA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRwb2ludExhdGl0dWRlIHJlY2VpdmVkOiBcIiArIGxvY2F0aW9uLmxhdGl0dWRlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydHBvaW50TG9uZ2l0dWRlIHJlY2VpdmVkOiBcIiArIGxvY2F0aW9uLmxvbmdpdHVkZSk7XG4gICAgIFxuICAgICAgIC8vICB0aGlzLm9yaWdpbigpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9jYXRpb24gZXJyb3IgcmVjZWl2ZWQ6IFwiICsgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuXG5cblx0IG9uT3JpZ2luVGFwKGFyZ3MpIHtcbiAgICBsZXQgb3JpZ2luU2VhcmNoID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICBpZiAob3JpZ2luU2VhcmNoLnRleHQubGVuZ3RoICE9PSBudWxsIHx8IG9yaWdpblNlYXJjaC50ZXh0Lmxlbmd0aCA9PT0gMClcbiAgICAgIGlmIChvcmlnaW5TZWFyY2gudGV4dC5sZW5ndGggPiAyICYmIG9yaWdpblNlYXJjaC50ZXh0Lmxlbmd0aCAlIDMgPT09IDApIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoU3RyaW5nID0gb3JpZ2luU2VhcmNoLnRleHQuc3BsaXQoXCIgXCIpLmpvaW4oXCIrXCIpO1xuICAgICAgICB0aGlzLmdvb2dsZVNlcnZpY2Uuc2VhcmNoTG9jYXRpb24oc2VhcmNoU3RyaW5nKS50aGVuKFxuICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8YW55PigpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLnByZWRpY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGRhdGEucHJlZGljdGlvbnNbaV0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgcGxhY2VJZDogZGF0YS5wcmVkaWN0aW9uc1tpXS5wbGFjZV9pZCxcbiAgICAgICAgICAgICAgICBzZWFyY2hUeXBlOiBcIm9yaWdpblwiXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLnNlYXJjaFR5cGUgPSBcIm9yaWdpblwiO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1heSBiZSB0ZXJyZmljIGZvciBvcmlnaW46IFwiICsgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9ycyhlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICB9XG5cbiAgb25EZXN0aW5hdGlvblRhcChhcmdzKSB7XG4gICAgbGV0IG9yaWdpblNlYXJjaCA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgaWYgKG9yaWdpblNlYXJjaC50ZXh0Lmxlbmd0aCAhPT0gbnVsbCB8fCBvcmlnaW5TZWFyY2gudGV4dC5sZW5ndGggPT09IDApXG4gICAgICBpZiAob3JpZ2luU2VhcmNoLnRleHQubGVuZ3RoID4gMiAmJiBvcmlnaW5TZWFyY2gudGV4dC5sZW5ndGggJSAzID09PSAwKSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaFN0cmluZyA9IG9yaWdpblNlYXJjaC50ZXh0LnNwbGl0KFwiIFwiKS5qb2luKFwiK1wiKTtcbiAgICAgICAgdGhpcy5nb29nbGVTZXJ2aWNlLnNlYXJjaExvY2F0aW9uKHNlYXJjaFN0cmluZykudGhlbihcbiAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PGFueT4oKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5wcmVkaWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLnByZWRpY3Rpb25zW2ldLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIHBsYWNlSWQ6IGRhdGEucHJlZGljdGlvbnNbaV0ucGxhY2VfaWQsXG4gICAgICAgICAgICAgICAgc2VhcmNoVHlwZTogXCJkZXN0aW5hdGlvblwiXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoVHlwZSA9IFwiZGVzdGluYXRpb25cIjtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYXkgYmUgdGVycmZpYyBmb3Igb3JpZ2luOiBcIiArIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcnMoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgfVxuICBoYW5kbGVFcnJvcnMoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG59XG5cbnB1YmxpYyBvblNlbGVjdGVkVGFwKGFyZ3MpIHtcblxuICAgIGNvbnNvbGUubG9nKFwiPj4gc2VhcmNoVHlwZSBpcyA8PFwiICsgdGhpcy5zZWFyY2hUeXBlKTtcblxuICAgIGlmICh0aGlzLnNlYXJjaFR5cGUgPT0gXCJkZXN0aW5hdGlvblwiKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIj4+TmF2aWdhdGlvbiBidXR0b24gdGFwcGVkIGlzIGZvciBkZXN0aW5hdGlvbiA8PFwiICsgSlNPTi5zdHJpbmdpZnkoYXJncy52aWV3LmJpbmRpbmdDb250ZXh0KSk7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uPSBhcmdzLnZpZXcuYmluZGluZ0NvbnRleHQuZGVzY3JpcHRpb247XG4gICAvLyAgLy8gdGhpcy5kYXRhLmRlc3RpbmF0aW9uU3RvcmFnZT0gYXJncy52aWV3LmJpbmRpbmdDb250ZXh0O1xuICAgICAgfVxuICAgLy8gLy9cdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgdGhpcy5yb3V0ZS5uYXZpZ2F0ZShbXCJib29raW5nXCJdKTtcbiAgfVxuXG4gIG9uTmF2QnRuVGFwKCkge1xuICAgIC8vIFRoaXMgY29kZSB3aWxsIGJlIGNhbGxlZCBvbmx5IGluIEFuZHJvaWQuXG4gICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW9uIGJ1dHRvbiB0YXBwZWQhXCIpO1xuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgLy9cdHRvcG1vc3QoKS5uYXZpZ2F0ZShcImJvb2tpbmdcIik7XG4gIH1cbn0iXX0=