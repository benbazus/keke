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

}