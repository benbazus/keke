"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var config_1 = require("../config");
var GooglePlayService = /** @class */ (function () {
    function GooglePlayService() {
    }
    GooglePlayService.prototype.capitalize = function (text) {
        return text.replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        });
    };
    GooglePlayService.prototype.getCurrentLocation = function (latitude, longitude) {
        var url = config_1.Config.GEOCODE_URL + "latlng=" + latitude + "," + longitude + "&key=" + config_1.Config.API_KEY;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (json) {
            return json;
        });
    };
    GooglePlayService.prototype.searchLocation = function (destination) {
        var searchBy = this.capitalize(destination).replace(new RegExp(" ", "g"), "");
        var url = config_1.Config.AUTOCOMPLETE_URL + "input=" + searchBy + "&types=" + config_1.Config.SEARCH_TYPE + "&language=pt_EN&key=" + config_1.Config.API_KEY;
        console.log("The URL is: " + url);
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " + JSON.stringify(json));
            return json;
        });
    };
    GooglePlayService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], GooglePlayService);
    return GooglePlayService;
}());
exports.GooglePlayService = GooglePlayService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLXBsYXkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdvb2dsZS1wbGF5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0Q7QUFDdEQsb0NBQW1DO0FBR25DO0lBRUk7SUFBc0IsQ0FBQztJQUV2QixzQ0FBVSxHQUFWLFVBQVcsSUFBSTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFUSw4Q0FBa0IsR0FBekIsVUFBMEIsUUFBZ0IsRUFBRSxTQUFpQjtRQUMzRCxJQUFJLEdBQUcsR0FBTSxlQUFNLENBQUMsV0FBVyxlQUFVLFFBQVEsU0FBSSxTQUFTLGFBQVEsZUFBTSxDQUFDLE9BQVMsQ0FBQztRQUV0RixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7WUFDN0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO1lBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRSwwQ0FBYyxHQUFyQixVQUFzQixXQUFtQjtRQUNqQyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFaEYsSUFBTSxHQUFHLEdBQU0sZUFBTSxDQUFDLGdCQUFnQixjQUFTLFFBQVEsZUFBVSxlQUFNLENBQUMsV0FBVyw0QkFBdUIsZUFBTSxDQUFDLE9BQVMsQ0FBQztRQUUzSCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7WUFDNUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsR0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEUsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFoQ1EsaUJBQWlCO1FBRDdCLGlCQUFVLEVBQUU7O09BQ0EsaUJBQWlCLENBaUM3QjtJQUFELHdCQUFDO0NBQUEsQUFqQ0QsSUFpQ0M7QUFqQ1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR29vZ2xlUGxheVNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgY2FwaXRhbGl6ZSh0ZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZSgvKD86XnxcXHMpXFxTL2csIChhKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgICAgcHVibGljIGdldEN1cnJlbnRMb2NhdGlvbihsYXRpdHVkZTogbnVtYmVyLCBsb25naXR1ZGU6IG51bWJlcikge1xyXG4gICAgICAgIHZhciB1cmwgPSBgJHtDb25maWcuR0VPQ09ERV9VUkx9bGF0bG5nPSR7bGF0aXR1ZGV9LCR7bG9uZ2l0dWRlfSZrZXk9JHtDb25maWcuQVBJX0tFWX1gO1xyXG5cclxuICAgICAgICAgcmV0dXJuIGZldGNoKHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICB9KS50aGVuKChqc29uKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxucHVibGljIHNlYXJjaExvY2F0aW9uKGRlc3RpbmF0aW9uOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBzZWFyY2hCeSA9IHRoaXMuY2FwaXRhbGl6ZShkZXN0aW5hdGlvbikucmVwbGFjZShuZXcgUmVnRXhwKFwiIFwiLCBcImdcIiksIFwiXCIpO1xyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSBgJHtDb25maWcuQVVUT0NPTVBMRVRFX1VSTH1pbnB1dD0ke3NlYXJjaEJ5fSZ0eXBlcz0ke0NvbmZpZy5TRUFSQ0hfVFlQRX0mbGFuZ3VhZ2U9cHRfRU4ma2V5PSR7Q29uZmlnLkFQSV9LRVl9YDtcclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBVUkwgaXM6IFwiICsgdXJsKTtcclxuICAgICAgICByZXR1cm4gZmV0Y2godXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIH0pLnRoZW4oKGpzb24pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCI+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4gXCIgKyAgIEpTT04uc3RyaW5naWZ5KGpzb24pKTtcclxuICAgICAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=