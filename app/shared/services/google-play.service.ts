import { Component, Injectable } from "@angular/core";
import { Config } from "../config";

@Injectable()
export class GooglePlayService {

    public constructor() {}

    capitalize(text) {
        return text.replace(/(?:^|\s)\S/g, (a) => {
            return a.toUpperCase();
        });
    }
    
      public getCurrentLocation(latitude: number, longitude: number) {
        var url = `${Config.GEOCODE_URL}latlng=${latitude},${longitude}&key=${Config.API_KEY}`;

         return fetch(url).then((response) => {
            return response.json();
        }).then((json) => {
            return json;
        });
    }

public searchLocation(destination: string) {
        const searchBy = this.capitalize(destination).replace(new RegExp(" ", "g"), "");

        const url = `${Config.AUTOCOMPLETE_URL}input=${searchBy}&types=${Config.SEARCH_TYPE}&language=pt_EN&key=${Config.API_KEY}`;
        
        console.log("The URL is: " + url);
        return fetch(url).then((response) => {
            return response.json();
        }).then((json) => {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " +   JSON.stringify(json));
            return json;
        });
    }

   public getLocationIPByPlaceID(placeid){

        const url = `${Config.SEARCH_BY_PLACEID_URL}placeid=${placeid}&key=${Config.API_KEY}`;
        console.log(">>>>>>>>>>>>url>>>>>>>>>>>>> " +   JSON.stringify(url));
        return fetch(url).then((response) => {
            return response.json();
        }).then((json) => {
            return json;
        });
     

    }


    public  getDistance(origin, destination) {
      
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

}