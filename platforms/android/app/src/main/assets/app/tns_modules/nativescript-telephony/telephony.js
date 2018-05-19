"use strict";
var application = require("application");
function hasPermission() {
    if (!android.support || !android.support.v4 || !android.support.v4.content || !android.support.v4.content.ContextCompat || !android.support.v4.content.ContextCompat.checkSelfPermission) {
        return true;
    }
    var doesHavePermission = (android.content.pm.PackageManager.PERMISSION_GRANTED
        ==
            android.support.v4.content.ContextCompat.checkSelfPermission(application.android.foregroundActivity, android.Manifest.permission.READ_PHONE_STATE));
    return doesHavePermission;
}
function Telephony() {
    return new Promise(function (resolve, reject) {
        if (hasPermission()) {
            resolve(true);
        }
        else {
            var reqid_1 = Math.floor(Math.random() * 999);
            application.android.addEventListener(application.AndroidApplication.activityRequestPermissionsEvent, function onPermissionsEvent(args) {
                if (args.requestCode == reqid_1 && args.permissions[0] == android.Manifest.permission.READ_PHONE_STATE) {
                    application.android.removeEventListener(application.AndroidApplication.activityRequestPermissionsEvent, onPermissionsEvent);
                    if (args.grantResults[0] == android.content.pm.PackageManager.PERMISSION_GRANTED) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
            });
            android.support.v4.app.ActivityCompat.requestPermissions(application.android.foregroundActivity, [android.Manifest.permission.READ_PHONE_STATE], reqid_1);
        }
    }).then(function (hasPermissions) {
        var manager = application.android.context.getSystemService(android.content.Context.TELEPHONY_SERVICE);
        var results = {
            countryCode: manager.getSimCountryIso() || "",
            simOperator: manager.getSimOperator() || "",
            carrierName: manager.getSimOperatorName() || "",
            callState: manager.getCallState() || "",
            dataActivity: manager.getDataActivity() || "",
            networkType: manager.getNetworkType() || "",
            phoneType: manager.getPhoneType() || "",
            simState: manager.getSimState() || "",
            isNetworkRoaming: manager.isNetworkRoaming() || "",
            mcc: "",
            mnc: "",
        };
        if (results.simOperator.length >= 3) {
            results.mcc = results.simOperator.substring(0, 3);
            results.mnc = results.simOperator.substring(3);
        }
        if (hasPermissions) {
            results.phoneNumber = manager.getLine1Number() || "";
            results.deviceId = manager.getDeviceId() || "";
            results.deviceSoftwareVersion = manager.getDeviceSoftwareVersion() || "";
            results.simSerialNumber = manager.getSimSerialNumber() || "";
            results.subscriberId = manager.getSubscriberId() || "";
        }
        return Promise.resolve(results);
    });
}
exports.Telephony = Telephony;
