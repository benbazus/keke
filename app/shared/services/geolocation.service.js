"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var geolocation = require("nativescript-geolocation");
var humanizeDistance = require("humanize-distance");
var GeolocationService = /** @class */ (function () {
    function GeolocationService() {
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdlb2xvY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBMkM7QUFFM0MsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDdEQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUdwRDtJQUtJO0lBRUksQ0FBQztJQUVFLHdDQUFXLEdBQWxCO1FBQUEsaUJBYUM7UUFaRyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQ2QsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNaLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDO29CQUNyQyxPQUFPLENBQUMsS0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7WUFDeEMsQ0FBQztRQUNMLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVNLDRDQUFlLEdBQXRCLFVBQXVCLFFBQWdCLEVBQUUsU0FBaUI7UUFDdEQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqSixDQUFDO0lBRU8sZ0RBQW1CLEdBQTNCO1FBQUEsaUJBY0M7UUFiRyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQ2QsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNaLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztpQkFDakQsSUFBSSxDQUFDLFVBQUEsUUFBUTtnQkFDVixLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQ2xDLEtBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztnQkFDcEMsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSztnQkFDUixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUExQ1Esa0JBQWtCO1FBRDlCLGlCQUFVLEVBQUU7O09BQ0Esa0JBQWtCLENBNEM5QjtJQUFELHlCQUFDO0NBQUEsQUE1Q0QsSUE0Q0M7QUE1Q1ksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwifi9zaGFyZWQvY29uZmlnXCI7XHJcbnZhciBnZW9sb2NhdGlvbiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIik7XHJcbnZhciBodW1hbml6ZURpc3RhbmNlID0gcmVxdWlyZShcImh1bWFuaXplLWRpc3RhbmNlXCIpO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2VvbG9jYXRpb25TZXJ2aWNlIHtcclxuICAgIFxyXG4gICAgcHVibGljIGxhdGl0dWRlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbG9uZ2l0dWRlOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcblxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TG9jYXRpb24oKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoXHJcbiAgICAgICAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLl9nZXRDdXJyZW50TG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuX2dldEN1cnJlbnRMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERpc3RhbmNlRnJvbShsYXRpdHVkZTogbnVtYmVyLCBsb25naXR1ZGU6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGh1bWFuaXplRGlzdGFuY2UoeyBsYXRpdHVkZTogbGF0aXR1ZGUsIGxvbmdpdHVkZTogbG9uZ2l0dWRlIH0sIHsgbGF0aXR1ZGU6IHRoaXMubGF0aXR1ZGUsIGxvbmdpdHVkZTogdGhpcy5sb25naXR1ZGUgfSwgJ2VuLVVTJywgJ3VzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0Q3VycmVudExvY2F0aW9uKCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKFxyXG4gICAgICAgICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oeyB0aW1lb3V0OiAyMDAwMCB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4obG9jYXRpb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF0aXR1ZGUgPSBsb2NhdGlvbi5sYXRpdHVkZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvbmdpdHVkZSA9IGxvY2F0aW9uLmxvbmdpdHVkZTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59Il19