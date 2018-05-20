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
    GooglePlayService.prototype.getLocationIPByPlaceID = function (placeid) {
        var url = config_1.Config.SEARCH_BY_PLACEID_URL + "placeid=" + placeid + "&key=" + config_1.Config.API_KEY;
        console.log("###############################");
        console.log("################### placeid=" + placeid);
        console.log("################### url=" + url);
        console.log("###############################");
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (json) {
            return json;
        });
    };
    GooglePlayService.prototype.getDistance = function (origin, destination) {
        // "https://maps.googleapis.com/maps/api/directions/json?origin=75+9th+Ave+New+York,+NY&destination=MetLife+Stadium+1+MetLife+Stadium+Dr+East+Rutherford,+NJ+07073&key=YOUR_API_KEY"
        var searchOrigin = this.capitalize(origin).replace(new RegExp(" ", "g"), "");
        var searchDestination = this.capitalize(destination).replace(new RegExp(" ", "g"), "");
        var url = config_1.Config.DIRECTION_URL + "origin=" + searchOrigin + "&destination=" + searchDestination + "&key=" + config_1.Config.API_KEY;
        console.log("==============================");
        console.log(url);
        console.log("==============================");
        console.log("The URL is: " + url);
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (json) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLXBsYXkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdvb2dsZS1wbGF5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0Q7QUFDdEQsb0NBQW1DO0FBR25DO0lBRUk7SUFBc0IsQ0FBQztJQUV2QixzQ0FBVSxHQUFWLFVBQVcsSUFBSTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFUSw4Q0FBa0IsR0FBekIsVUFBMEIsUUFBZ0IsRUFBRSxTQUFpQjtRQUMzRCxJQUFJLEdBQUcsR0FBTSxlQUFNLENBQUMsV0FBVyxlQUFVLFFBQVEsU0FBSSxTQUFTLGFBQVEsZUFBTSxDQUFDLE9BQVMsQ0FBQztRQUV0RixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7WUFDN0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO1lBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRSwwQ0FBYyxHQUFyQixVQUFzQixXQUFtQjtRQUNqQyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFaEYsSUFBTSxHQUFHLEdBQU0sZUFBTSxDQUFDLGdCQUFnQixjQUFTLFFBQVEsZUFBVSxlQUFNLENBQUMsV0FBVyw0QkFBdUIsZUFBTSxDQUFDLE9BQVMsQ0FBQztRQUUzSCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7WUFDNUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsR0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEUsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxrREFBc0IsR0FBdEIsVUFBdUIsT0FBTztRQUUxQixJQUFNLEdBQUcsR0FBTSxlQUFNLENBQUMscUJBQXFCLGdCQUFXLE9BQU8sYUFBUSxlQUFNLENBQUMsT0FBUyxDQUFDO1FBRXRGLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixHQUFHLE9BQU8sQ0FBQyxDQUFBO1FBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEdBQUcsR0FBRyxDQUFDLENBQUE7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO1FBRTlDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBUTtZQUM1QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7WUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBR1AsQ0FBQztJQUdELHVDQUFXLEdBQVgsVUFBWSxNQUFNLEVBQUUsV0FBVztRQUUzQixvTEFBb0w7UUFFcEwsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9FLElBQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXpGLElBQU0sR0FBRyxHQUFNLGVBQU0sQ0FBQyxhQUFhLGVBQVUsWUFBWSxxQkFBZ0IsaUJBQWlCLGFBQVEsZUFBTSxDQUFDLE9BQVMsQ0FBQztRQUVuSCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUE7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUMsQ0FBQTtRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUE7UUFFN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO1lBQzVCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtZQUNULE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBeEVRLGlCQUFpQjtRQUQ3QixpQkFBVSxFQUFFOztPQUNBLGlCQUFpQixDQTBFN0I7SUFBRCx3QkFBQztDQUFBLEFBMUVELElBMEVDO0FBMUVZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb25maWdcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdvb2dsZVBsYXlTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIGNhcGl0YWxpemUodGV4dCkge1xyXG4gICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoLyg/Ol58XFxzKVxcUy9nLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAgIHB1YmxpYyBnZXRDdXJyZW50TG9jYXRpb24obGF0aXR1ZGU6IG51bWJlciwgbG9uZ2l0dWRlOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgdXJsID0gYCR7Q29uZmlnLkdFT0NPREVfVVJMfWxhdGxuZz0ke2xhdGl0dWRlfSwke2xvbmdpdHVkZX0ma2V5PSR7Q29uZmlnLkFQSV9LRVl9YDtcclxuXHJcbiAgICAgICAgIHJldHVybiBmZXRjaCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgfSkudGhlbigoanNvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ganNvbjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbnB1YmxpYyBzZWFyY2hMb2NhdGlvbihkZXN0aW5hdGlvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoQnkgPSB0aGlzLmNhcGl0YWxpemUoZGVzdGluYXRpb24pLnJlcGxhY2UobmV3IFJlZ0V4cChcIiBcIiwgXCJnXCIpLCBcIlwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gYCR7Q29uZmlnLkFVVE9DT01QTEVURV9VUkx9aW5wdXQ9JHtzZWFyY2hCeX0mdHlwZXM9JHtDb25maWcuU0VBUkNIX1RZUEV9Jmxhbmd1YWdlPXB0X0VOJmtleT0ke0NvbmZpZy5BUElfS0VZfWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUaGUgVVJMIGlzOiBcIiArIHVybCk7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICB9KS50aGVuKChqc29uKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+IFwiICsgICBKU09OLnN0cmluZ2lmeShqc29uKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExvY2F0aW9uSVBCeVBsYWNlSUQocGxhY2VpZCl7XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IGAke0NvbmZpZy5TRUFSQ0hfQllfUExBQ0VJRF9VUkx9cGxhY2VpZD0ke3BsYWNlaWR9JmtleT0ke0NvbmZpZy5BUElfS0VZfWA7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1wiKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyMjIyBwbGFjZWlkPVwiICsgcGxhY2VpZClcclxuICAgICAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjIyMgdXJsPVwiICsgdXJsKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1wiKVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICB9KS50aGVuKChqc29uKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xyXG4gICAgICAgIH0pO1xyXG4gICAgIFxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0RGlzdGFuY2Uob3JpZ2luLCBkZXN0aW5hdGlvbikge1xyXG4gICAgICBcclxuICAgICAgICAvLyBcImh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9kaXJlY3Rpb25zL2pzb24/b3JpZ2luPTc1Kzl0aCtBdmUrTmV3K1lvcmssK05ZJmRlc3RpbmF0aW9uPU1ldExpZmUrU3RhZGl1bSsxK01ldExpZmUrU3RhZGl1bStEcitFYXN0K1J1dGhlcmZvcmQsK05KKzA3MDczJmtleT1ZT1VSX0FQSV9LRVlcIlxyXG4gICBcclxuICAgICAgICBjb25zdCBzZWFyY2hPcmlnaW4gPSB0aGlzLmNhcGl0YWxpemUob3JpZ2luKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCIgXCIsIFwiZ1wiKSwgXCJcIik7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoRGVzdGluYXRpb24gPSB0aGlzLmNhcGl0YWxpemUoZGVzdGluYXRpb24pLnJlcGxhY2UobmV3IFJlZ0V4cChcIiBcIiwgXCJnXCIpLCBcIlwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gYCR7Q29uZmlnLkRJUkVDVElPTl9VUkx9b3JpZ2luPSR7c2VhcmNoT3JpZ2lufSZkZXN0aW5hdGlvbj0ke3NlYXJjaERlc3RpbmF0aW9ufSZrZXk9JHtDb25maWcuQVBJX0tFWX1gO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCB1cmwpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIilcclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBVUkwgaXM6IFwiICsgdXJsKTtcclxuICAgICAgICByZXR1cm4gZmV0Y2godXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIH0pLnRoZW4oKGpzb24pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59Il19