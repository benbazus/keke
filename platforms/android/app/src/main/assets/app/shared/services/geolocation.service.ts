
import { Injectable } from "@angular/core";
import { Config } from "~/shared/config";
var geolocation = require("nativescript-geolocation");
var humanizeDistance = require("humanize-distance");

@Injectable()
export class GeolocationService {
    
    public latitude: number;
    public longitude: number;

    constructor(

    ) { }

    capitalize(text) {
        return text.replace(/(?:^|\s)\S/g, (a) => {
            return a.toUpperCase();
        });
    }

    getLocationIPByPlaceID(placeid){

        const url = `${Config.SEARCH_BY_PLACEID_URL}placeid=${placeid}&key=${Config.API_KEY}`;

        console.log("###############################")
        console.log("################### placeid=" + placeid)
        console.log("################### url=" + url)
        console.log("###############################")
    
        return fetch(url).then((response) => {
            return response.json();
        }).then((json) => {
            return json;
        });
     

    }


    getDistance(origin, destination) {
      
        // "https://maps.googleapis.com/maps/api/directions/json?origin=75+9th+Ave+New+York,+NY&destination=MetLife+Stadium+1+MetLife+Stadium+Dr+East+Rutherford,+NJ+07073&key=YOUR_API_KEY"
   
        const searchOrigin = this.capitalize(origin).replace(new RegExp(" ", "g"), "");
        const searchDestination = this.capitalize(destination).replace(new RegExp(" ", "g"), "");

        const url = `${Config.DIRECTION_URL}origin=${searchOrigin}&destination=${searchDestination}&key=${Config.API_KEY}`;

        console.log("==============================")
        console.log( url)
        console.log("==============================")
        
        console.log("The URL is: " + url);
        return fetch(url).then((response) => {
            return response.json();
        }).then((json) => {
            return json;
        });
    }


    searchLocation(destination: string) {

        const searchBy = this.capitalize(destination).replace(new RegExp(" ", "g"), "");

        const url = `${Config.AUTOCOMPLETE_URL}input=${searchBy}&types=${Config.SEARCH_TYPE}&language=pt_EN&key=${Config.API_KEY}`;

        console.log("###############################")
        console.log("################### url=" + url)
        console.log("###############################")
        
        console.log("The URL is: " + url);
        return fetch(url).then((response) => {
            return response.json();
        }).then((json) => {
           // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " +   JSON.stringify(json));
            return json;
        });
    }


    getCurrentLocation(latitude, longitude) {

        var url = `${Config.GEOCODE_URL}latlng=${latitude},${longitude}&key=${Config.API_KEY}`;

        console.log("###############################")
        console.log("################### url=" + url)
        console.log("###############################")

        return fetch(url).then((response) => {
            return response.json();
        }).then((json) => {
            return json;
        });
    }

    public getLocation(): Promise<any> {
        return new Promise(
            (resolve, reject) => {
                if (!geolocation.isEnabled()) {
                    geolocation.enableLocationRequest().then(() => {
                        resolve(this._getCurrentLocation());
                    });
                }
                else {
                    resolve(this._getCurrentLocation());
                }
            }
        );
    }

    public getDistanceFrom(latitude: number, longitude: number): string {
        return humanizeDistance({ latitude: latitude, longitude: longitude }, { latitude: this.latitude, longitude: this.longitude }, 'en-US', 'us');
    }

    private _getCurrentLocation(): Promise<any> {
        return new Promise(
            (resolve, reject) => {
                geolocation.getCurrentLocation({ timeout: 20000 })
                .then(location => {

                    this.latitude = location.latitude;
                    this.longitude = location.longitude;

                    resolve();
                })
                .catch(error => {
                    reject(error);
                })
            }
        );
    }

}