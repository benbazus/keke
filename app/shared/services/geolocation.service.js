"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var config_1 = require("~/shared/config");
var geolocation = require("nativescript-geolocation");
var humanizeDistance = require("humanize-distance");
var GeolocationService = /** @class */ (function () {
    function GeolocationService() {
    }
    GeolocationService.prototype.capitalize = function (text) {
        return text.replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        });
    };
    GeolocationService.prototype.getLocationIPByPlaceID = function (placeid) {
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
    GeolocationService.prototype.getDistance = function (origin, destination) {
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
    GeolocationService.prototype.searchLocation = function (destination) {
        var searchBy = this.capitalize(destination).replace(new RegExp(" ", "g"), "");
        var url = config_1.Config.AUTOCOMPLETE_URL + "input=" + searchBy + "&types=" + config_1.Config.SEARCH_TYPE + "&language=pt_EN&key=" + config_1.Config.API_KEY;
        console.log("###############################");
        console.log("################### url=" + url);
        console.log("###############################");
        console.log("The URL is: " + url);
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (json) {
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " +   JSON.stringify(json));
            return json;
        });
    };
    GeolocationService.prototype.getCurrentLocation = function (latitude, longitude) {
        var url = config_1.Config.GEOCODE_URL + "latlng=" + latitude + "," + longitude + "&key=" + config_1.Config.API_KEY;
        console.log("###############################");
        console.log("################### url=" + url);
        console.log("###############################");
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (json) {
            return json;
        });
    };
    GeolocationService.prototype.getLocation = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!geolocation.isEnabled()) {
                geolocation.enableLocationRequest().then(function () {
                    resolve(_this._getCurrentLocation());
                });
            }
            else {
                resolve(_this._getCurrentLocation());
            }
        });
    };
    GeolocationService.prototype.getDistanceFrom = function (latitude, longitude) {
        return humanizeDistance({ latitude: latitude, longitude: longitude }, { latitude: this.latitude, longitude: this.longitude }, 'en-US', 'us');
    };
    GeolocationService.prototype._getCurrentLocation = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            geolocation.getCurrentLocation({ timeout: 20000 })
                .then(function (location) {
                _this.latitude = location.latitude;
                _this.longitude = location.longitude;
                resolve();
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    GeolocationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], GeolocationService);
    return GeolocationService;
}());
exports.GeolocationService = GeolocationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdlb2xvY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBMkM7QUFDM0MsMENBQXlDO0FBQ3pDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3RELElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFHcEQ7SUFLSTtJQUVJLENBQUM7SUFFTCx1Q0FBVSxHQUFWLFVBQVcsSUFBSTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxtREFBc0IsR0FBdEIsVUFBdUIsT0FBTztRQUUxQixJQUFNLEdBQUcsR0FBTSxlQUFNLENBQUMscUJBQXFCLGdCQUFXLE9BQU8sYUFBUSxlQUFNLENBQUMsT0FBUyxDQUFDO1FBRXRGLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixHQUFHLE9BQU8sQ0FBQyxDQUFBO1FBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEdBQUcsR0FBRyxDQUFDLENBQUE7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO1FBRTlDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBUTtZQUM1QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7WUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBR1AsQ0FBQztJQUdELHdDQUFXLEdBQVgsVUFBWSxNQUFNLEVBQUUsV0FBVztRQUUzQixvTEFBb0w7UUFFcEwsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9FLElBQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXpGLElBQU0sR0FBRyxHQUFNLGVBQU0sQ0FBQyxhQUFhLGVBQVUsWUFBWSxxQkFBZ0IsaUJBQWlCLGFBQVEsZUFBTSxDQUFDLE9BQVMsQ0FBQztRQUVuSCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUE7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUMsQ0FBQTtRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUE7UUFFN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO1lBQzVCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtZQUNULE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0QsMkNBQWMsR0FBZCxVQUFlLFdBQW1CO1FBRTlCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVoRixJQUFNLEdBQUcsR0FBTSxlQUFNLENBQUMsZ0JBQWdCLGNBQVMsUUFBUSxlQUFVLGVBQU0sQ0FBQyxXQUFXLDRCQUF1QixlQUFNLENBQUMsT0FBUyxDQUFDO1FBRTNILE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLEdBQUcsQ0FBQyxDQUFBO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtRQUU5QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7WUFDNUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO1lBQ1YsMkVBQTJFO1lBQzFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0QsK0NBQWtCLEdBQWxCLFVBQW1CLFFBQVEsRUFBRSxTQUFTO1FBRWxDLElBQUksR0FBRyxHQUFNLGVBQU0sQ0FBQyxXQUFXLGVBQVUsUUFBUSxTQUFJLFNBQVMsYUFBUSxlQUFNLENBQUMsT0FBUyxDQUFDO1FBRXZGLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLEdBQUcsQ0FBQyxDQUFBO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtRQUU5QyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7WUFDNUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO1lBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx3Q0FBVyxHQUFsQjtRQUFBLGlCQWFDO1FBWkcsTUFBTSxDQUFDLElBQUksT0FBTyxDQUNkLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDWixFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FBQztvQkFDckMsT0FBTyxDQUFDLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7Z0JBQ3hDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLE9BQU8sQ0FBQyxLQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUM7UUFDTCxDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFTSw0Q0FBZSxHQUF0QixVQUF1QixRQUFnQixFQUFFLFNBQWlCO1FBQ3RELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDakosQ0FBQztJQUVPLGdEQUFtQixHQUEzQjtRQUFBLGlCQWdCQztRQWZHLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FDZCxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ1osV0FBVyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO2lCQUNqRCxJQUFJLENBQUMsVUFBQSxRQUFRO2dCQUVWLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztnQkFDbEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO2dCQUVwQyxPQUFPLEVBQUUsQ0FBQztZQUNkLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBQSxLQUFLO2dCQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQTlIUSxrQkFBa0I7UUFEOUIsaUJBQVUsRUFBRTs7T0FDQSxrQkFBa0IsQ0FnSTlCO0lBQUQseUJBQUM7Q0FBQSxBQWhJRCxJQWdJQztBQWhJWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCJ+L3NoYXJlZC9jb25maWdcIjtcclxudmFyIGdlb2xvY2F0aW9uID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiKTtcclxudmFyIGh1bWFuaXplRGlzdGFuY2UgPSByZXF1aXJlKFwiaHVtYW5pemUtZGlzdGFuY2VcIik7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHZW9sb2NhdGlvblNlcnZpY2Uge1xyXG4gICAgXHJcbiAgICBwdWJsaWMgbGF0aXR1ZGU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBsb25naXR1ZGU6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuXHJcbiAgICApIHsgfVxyXG5cclxuICAgIGNhcGl0YWxpemUodGV4dCkge1xyXG4gICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoLyg/Ol58XFxzKVxcUy9nLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExvY2F0aW9uSVBCeVBsYWNlSUQocGxhY2VpZCl7XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IGAke0NvbmZpZy5TRUFSQ0hfQllfUExBQ0VJRF9VUkx9cGxhY2VpZD0ke3BsYWNlaWR9JmtleT0ke0NvbmZpZy5BUElfS0VZfWA7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1wiKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyMjIyBwbGFjZWlkPVwiICsgcGxhY2VpZClcclxuICAgICAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjIyMgdXJsPVwiICsgdXJsKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1wiKVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICB9KS50aGVuKChqc29uKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xyXG4gICAgICAgIH0pO1xyXG4gICAgIFxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0RGlzdGFuY2Uob3JpZ2luLCBkZXN0aW5hdGlvbikge1xyXG4gICAgICBcclxuICAgICAgICAvLyBcImh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9kaXJlY3Rpb25zL2pzb24/b3JpZ2luPTc1Kzl0aCtBdmUrTmV3K1lvcmssK05ZJmRlc3RpbmF0aW9uPU1ldExpZmUrU3RhZGl1bSsxK01ldExpZmUrU3RhZGl1bStEcitFYXN0K1J1dGhlcmZvcmQsK05KKzA3MDczJmtleT1ZT1VSX0FQSV9LRVlcIlxyXG4gICBcclxuICAgICAgICBjb25zdCBzZWFyY2hPcmlnaW4gPSB0aGlzLmNhcGl0YWxpemUob3JpZ2luKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCIgXCIsIFwiZ1wiKSwgXCJcIik7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoRGVzdGluYXRpb24gPSB0aGlzLmNhcGl0YWxpemUoZGVzdGluYXRpb24pLnJlcGxhY2UobmV3IFJlZ0V4cChcIiBcIiwgXCJnXCIpLCBcIlwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gYCR7Q29uZmlnLkRJUkVDVElPTl9VUkx9b3JpZ2luPSR7c2VhcmNoT3JpZ2lufSZkZXN0aW5hdGlvbj0ke3NlYXJjaERlc3RpbmF0aW9ufSZrZXk9JHtDb25maWcuQVBJX0tFWX1gO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCB1cmwpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIilcclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBVUkwgaXM6IFwiICsgdXJsKTtcclxuICAgICAgICByZXR1cm4gZmV0Y2godXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIH0pLnRoZW4oKGpzb24pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNlYXJjaExvY2F0aW9uKGRlc3RpbmF0aW9uOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgY29uc3Qgc2VhcmNoQnkgPSB0aGlzLmNhcGl0YWxpemUoZGVzdGluYXRpb24pLnJlcGxhY2UobmV3IFJlZ0V4cChcIiBcIiwgXCJnXCIpLCBcIlwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gYCR7Q29uZmlnLkFVVE9DT01QTEVURV9VUkx9aW5wdXQ9JHtzZWFyY2hCeX0mdHlwZXM9JHtDb25maWcuU0VBUkNIX1RZUEV9Jmxhbmd1YWdlPXB0X0VOJmtleT0ke0NvbmZpZy5BUElfS0VZfWA7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1wiKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyMjIyB1cmw9XCIgKyB1cmwpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXCIpXHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUaGUgVVJMIGlzOiBcIiArIHVybCk7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICB9KS50aGVuKChqc29uKSA9PiB7XHJcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCI+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4gXCIgKyAgIEpTT04uc3RyaW5naWZ5KGpzb24pKTtcclxuICAgICAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldEN1cnJlbnRMb2NhdGlvbihsYXRpdHVkZSwgbG9uZ2l0dWRlKSB7XHJcblxyXG4gICAgICAgIHZhciB1cmwgPSBgJHtDb25maWcuR0VPQ09ERV9VUkx9bGF0bG5nPSR7bGF0aXR1ZGV9LCR7bG9uZ2l0dWRlfSZrZXk9JHtDb25maWcuQVBJX0tFWX1gO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcIilcclxuICAgICAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjIyMgdXJsPVwiICsgdXJsKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1wiKVxyXG5cclxuICAgICAgICByZXR1cm4gZmV0Y2godXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIH0pLnRoZW4oKGpzb24pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldExvY2F0aW9uKCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKFxyXG4gICAgICAgICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5fZ2V0Q3VycmVudExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLl9nZXRDdXJyZW50TG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREaXN0YW5jZUZyb20obGF0aXR1ZGU6IG51bWJlciwgbG9uZ2l0dWRlOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBodW1hbml6ZURpc3RhbmNlKHsgbGF0aXR1ZGU6IGxhdGl0dWRlLCBsb25naXR1ZGU6IGxvbmdpdHVkZSB9LCB7IGxhdGl0dWRlOiB0aGlzLmxhdGl0dWRlLCBsb25naXR1ZGU6IHRoaXMubG9uZ2l0dWRlIH0sICdlbi1VUycsICd1cycpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dldEN1cnJlbnRMb2NhdGlvbigpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShcclxuICAgICAgICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHsgdGltZW91dDogMjAwMDAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGxvY2F0aW9uID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXRpdHVkZSA9IGxvY2F0aW9uLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9uZ2l0dWRlID0gbG9jYXRpb24ubG9uZ2l0dWRlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59Il19