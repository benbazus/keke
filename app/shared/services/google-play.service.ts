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
}