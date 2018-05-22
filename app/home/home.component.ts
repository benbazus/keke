import { Component, NgZone } from "@angular/core";
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
import { EventData, Observable } from "data/observable";
//import { ActivatedRoute } from '@angular/router';
//import { Observable } from "rxjs/Observable";

import  * as appSettings from "application-settings";

import { Frame, topmost } from "tns-core-modules/ui/frame";
const topmostFrame: Frame = topmost();

import { Page } from "ui/page";

import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
import {
  Mapbox,
  MapStyle,
  MapboxViewApi,
  Viewport as MapboxViewport
} from "nativescript-mapbox";
import { Location, getCurrentLocation, isEnabled, distance, enableLocationRequest } from "nativescript-geolocation";
import { Accuracy } from "ui/enums";
import * as appversion from "nativescript-appversion";
import { Directions } from "nativescript-directions";
import { GeolocationService } from "~/shared/services/geolocation.service";
import { GooglePlayService } from "~/shared/services/google-play.service";
import { Position } from "~/models/locationResponse";
import { ObservableProperty } from "~/shared/observable-decorator";

import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { AlertOptions } from "tns-core-modules/ui/dialogs/dialogs";

declare var UIImage: any;
declare var UIBarMetrics: any;

@Component({
  selector: "home",
  templateUrl: "./home/home.component.html",
  styleUrls: ["./home/home.component.css"],
  animations: [
    trigger("flyInOut", [
      state("in", style({ transform: "scale(1)", opacity: 1 })),
      transition("void => *", [
        style({ transform: "scale(0.9)", opacity: 0 }),
        animate("1000ms 100ms ease-out")
      ])
    ]),
    trigger("from-right", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translate(0)"
        })
      ),
      state(
        "void",
        style({
          opacity: 0,
          transform: "translate(20%)"
        })
      ),
      transition("void => *", [animate("600ms 1500ms ease-out")])
    ])
  ]
})
export class HomeComponent  {
  //origin: any;
  private mapbox: Mapbox;
  public startpointLongitude: number = 0.3281469;
  public startpointLatitude: number = 32.5678254;
 

  constructor(
    private zone: NgZone,
    private geolocationService: GeolocationService,
    private _page: Page,
    private googleService: GooglePlayService,
     private router: Router
  ) {
      this.getLocation();
      this.mapbox = new Mapbox();

     if (!isEnabled()) {
       enableLocationRequest();
     }
 
  }
  
   getLocation() {
		getCurrentLocation({ desiredAccuracy: Accuracy.high, timeout: 8000 })
			.then((location) => {
				console.log("startpointLatitude received: " + location.latitude);
				console.log("startpointLongitude received: " + location.longitude);
				this.startpointLatitude = location.latitude;
        this.startpointLongitude = location.longitude;
        this.centerMap();
        this.addMarkers();
				this.getCurrentAddress();
			}).catch((error) => {
        console.log("Location error received: " + error);
			});
  }
  
onStartBookingTap() {
    this.router.navigate(["search"]);
}

getCurrentAddress() {
  console.log(
    "latitude is: " +
      this.startpointLatitude +
      "longitude is:" +
      this.startpointLongitude
  );
  this.googleService
    .getCurrentLocation(this.startpointLatitude, this.startpointLongitude)
    .then(result => {
      appSettings.setString("origin",  result);  
    })
    .catch(error => {
      console.log("Unable to get current address. Error occured!:", error);
    });
}

  centerMap() {
   this.mapbox.setCenter({
       lat: this.startpointLatitude,
       lng: this.startpointLongitude,
       animated: true
   });
 }

addMarkers() {
  this.mapbox.addMarkers([
    {
      lat: this.startpointLatitude,
      lng: this.startpointLongitude,
      selected: true
    }
  ]);
}
 onMapReady(args) {
     this.mapbox = args.map; 
     this.addMarkers();
     this.centerMap();
    } 
}
