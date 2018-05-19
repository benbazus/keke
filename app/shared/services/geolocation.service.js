"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdlb2xvY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBMkM7QUFFM0MsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDdEQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUdwRDtJQUtJO0lBRUksQ0FBQztJQUVMLHVDQUFVLEdBQVYsVUFBVyxJQUFJO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUlNLHdDQUFXLEdBQWxCO1FBQUEsaUJBYUM7UUFaRyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQ2QsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNaLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDO29CQUNyQyxPQUFPLENBQUMsS0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7WUFDeEMsQ0FBQztRQUNMLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVNLDRDQUFlLEdBQXRCLFVBQXVCLFFBQWdCLEVBQUUsU0FBaUI7UUFDdEQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqSixDQUFDO0lBRU8sZ0RBQW1CLEdBQTNCO1FBQUEsaUJBZ0JDO1FBZkcsTUFBTSxDQUFDLElBQUksT0FBTyxDQUNkLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDWixXQUFXLENBQUMsa0JBQWtCLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7aUJBQ2pELElBQUksQ0FBQyxVQUFBLFFBQVE7Z0JBRVYsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUNsQyxLQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7Z0JBRXBDLE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFBLEtBQUs7Z0JBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBcERRLGtCQUFrQjtRQUQ5QixpQkFBVSxFQUFFOztPQUNBLGtCQUFrQixDQXNEOUI7SUFBRCx5QkFBQztDQUFBLEFBdERELElBc0RDO0FBdERZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIn4vc2hhcmVkL2NvbmZpZ1wiO1xyXG52YXIgZ2VvbG9jYXRpb24gPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCIpO1xyXG52YXIgaHVtYW5pemVEaXN0YW5jZSA9IHJlcXVpcmUoXCJodW1hbml6ZS1kaXN0YW5jZVwiKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdlb2xvY2F0aW9uU2VydmljZSB7XHJcbiAgICBcclxuICAgIHB1YmxpYyBsYXRpdHVkZTogbnVtYmVyO1xyXG4gICAgcHVibGljIGxvbmdpdHVkZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG5cclxuICAgICkgeyB9XHJcblxyXG4gICAgY2FwaXRhbGl6ZSh0ZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZSgvKD86XnxcXHMpXFxTL2csIChhKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0TG9jYXRpb24oKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoXHJcbiAgICAgICAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLl9nZXRDdXJyZW50TG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuX2dldEN1cnJlbnRMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERpc3RhbmNlRnJvbShsYXRpdHVkZTogbnVtYmVyLCBsb25naXR1ZGU6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGh1bWFuaXplRGlzdGFuY2UoeyBsYXRpdHVkZTogbGF0aXR1ZGUsIGxvbmdpdHVkZTogbG9uZ2l0dWRlIH0sIHsgbGF0aXR1ZGU6IHRoaXMubGF0aXR1ZGUsIGxvbmdpdHVkZTogdGhpcy5sb25naXR1ZGUgfSwgJ2VuLVVTJywgJ3VzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0Q3VycmVudExvY2F0aW9uKCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKFxyXG4gICAgICAgICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oeyB0aW1lb3V0OiAyMDAwMCB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4obG9jYXRpb24gPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhdGl0dWRlID0gbG9jYXRpb24ubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb25naXR1ZGUgPSBsb2NhdGlvbi5sb25naXR1ZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbn0iXX0=