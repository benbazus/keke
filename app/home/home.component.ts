import { Component, NgZone, OnInit } from "@angular/core";
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
import * as geolocation from "nativescript-geolocation";
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
export class HomeComponent implements OnInit {
  //origin: any;
  private mapbox: Mapbox;
  private directions = new Directions();

  //public startpointLongitude: number;
  //public startpointLatitude: number;
  public endpointLongitude: number;
  public endpointLatitude: number;
  public timestamp: string;

  public horizontalAccuracy: number;
  public verticalAccuracy: number;
  public altitude: number;
  public speed: number;

  public position: Position[];

  currentGeoLocation: any;

  public photos: any[];

  constructor(
    private zone: NgZone,
    private geolocationService: GeolocationService,
    private _page: Page,
    private googleService: GooglePlayService,
     private router: Router
  ) {
    if (!geolocation.isEnabled()) {
      geolocation.enableLocationRequest();
    }
   this.mapbox = new Mapbox();
  }


  ngOnInit() {
    console.log("ngOnInit reached");

    this._longitude = 32.5678254;
    this._latitude = 0.3281469;

    this.getLocation();
  }

  
 //=========================== Start Properties =================================
 private _latitude: number;
 public get startpointLatitude(): number {
   console.log("startpointLatitude get reached, and the value is :" + this._latitude);
   return this._latitude;
 }

 public set startpointLatitude(value: number) {
   console.log("startpointLatitude set reached, and the value is :" + value);
   this._latitude = value;
 }

 private _longitude: number;
 public get startpointLongitude(): number {
   console.log("startpointLongitude get reached, and the value is :" + this._longitude);
   return this._longitude;
 }

 public set startpointLongitude(value: number) {
   console.log("startpointLongitude set reached, and the value is :" + value);
   this._longitude = value;
 }


 private _origin: string;
 public get Origin(): string {
   console.log("Origin get reached, and the value is :" + this._origin);
   return this._origin;
 }

 public set Origin(value: string) {
   console.log("Origin set reached, and the value is :" + value);
   this._origin = value;
 }
 //=========================== End Properties =================================

  getLocation() {
		geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, timeout: 8000 })
			.then((location) => {
				console.log("startpointLatitude received: " + location.latitude);
				console.log("startpointLongitude received: " + location.longitude);
				this._latitude = location.latitude;
        this._longitude = location.longitude;

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
      this.centerMap();
      this.addMarkers();

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
    this.mapbox.setCenter({
      lat: this.startpointLatitude,
      lng: this.startpointLongitude,
      animated: true
  });  
}

}
