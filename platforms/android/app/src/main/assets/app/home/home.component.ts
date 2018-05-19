import { Component, NgZone, OnInit } from "@angular/core";
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
import { EventData, Observable } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
//import { Observable } from "rxjs/Observable";

//import { ObservableProperty } from '~/shared/observable-decorator';

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

//import { registerElement } from "nativescript-angular/element-registry";
//registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);

import { Directions } from "nativescript-directions";
import { GeolocationService } from "~/shared/services/geolocation.service";
import { GooglePlayService } from "~/shared/services/google-play.service";
import { Position } from "~/models/locationResponse";
import { ObservableProperty } from "~/shared/observable-decorator";


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
export class HomeComponent  implements OnInit  {


  origin: any;
  private mapbox: Mapbox;
  private directions = new Directions();

  public startpointLongitude: number;
  public startpointLatitude: number;
  public endpointLongitude: number;
  public endpointLatitude: number;
  public timestamp: string;

  public horizontalAccuracy: number;
  public verticalAccuracy: number;
  public altitude: number;
  public speed: number;


  public position: Position[];
  


  
  constructor(private zone: NgZone,
  private geolocationService: GeolocationService,
    private _page: Page,
     private googleService: GooglePlayService) {
 
      // if (topmost().ios) {
      //   var navigationBar = topmost().ios.controller.navigationBar;
      //   navigationBar.translucent = false;
      //   navigationBar.setBackgroundImageForBarMetrics(UIImage.new(), UIBarMetrics.Default);
      //   navigationBar.shadowImage = UIImage.new();
      // }

    //  this._page.actionBar.backgroundColor = "translucent";
    this._page.actionBarHidden = true;
    geolocation.enableLocationRequest(true);
  }


  //=========================== Start Properties =================================
  private _latitude:number;
  public get Latitude(): number {
    console.log("Latitude get reached, and the value is :" + this._latitude);
    return this._latitude;
  }

  public set Latitude(value: number) {
    console.log("Latitude set reached, and the value is :" + value);
    this._latitude = value;
  }
  

  private _longitude:number;
  public get Longitude(): number {
    console.log("Longitude get reached, and the value is :" + this._longitude);
    return this._longitude;
  }

  public set Longitude(value: number) {
    console.log("Longitude set reached, and the value is :" + value);
    this._longitude = value;
  }

    //=========================== End Properties =================================

  ngOnInit() {
    this.directions.available().then(avail => {
      console.log(avail ? "Yes" : "No");
    });

    console.log("checking if geolocation is enabled");
    geolocation.isEnabled().then(
      enabled => {
        console.log("Is geolocation Enabled =", enabled);
        if (enabled) {
					this.getLocationOnce();
					this.watch();				
        } else {
          this.request();
        }        
      },
      e => {
        console.log("isEnabled error", e);
        this.request();
      }
		);
		
  }

  request() {
    console.log("enableLocationRequest()");
    geolocation.enableLocationRequest().then(
      () => {
        console.log("location is enabled!");
        this.watch();
      },
      e => {
        console.log("Failed to enable location service", e);
      }
    );
  }

  watch() {
    console.log("watchLocation()");
    geolocation.watchLocation(
      location => {
        console.log(location);
       // this.startpointLatitude.set("startpointLatitude", location.latitude);
        this.startpointLatitude=location.latitude;
        this.startpointLongitude = location.longitude;
        
        this.Longitude = location.longitude;
        this.Latitude= location.latitude;

      },
      e => {
        console.log("failed to get location");
      },
      {
        desiredAccuracy: Accuracy.high,
        maximumAge: 5000,
        timeout: 20000
      }
    );
  }

    onMapReady(args) {
      this.mapbox = args.map;
      var nativeMapView = args.ios ? args.ios : args.android;
      console.log(
        "Mapbox onMapReady for " +
          (args.ios ? "iOS" : "Android") +
          ", native object received: " +
          nativeMapView
      );
      args.map.addMarkers([
        {
          lat: this.startpointLatitude,
          lng: this.startpointLongitude,
          title: "You are here",
          //subtitle: 'Really really nice location',
          selected: true,
        }
      ]);
    }

	
  onBookTap() {
		console.log("onBookTap");
		this.mapbox.getUserLocation().then(
      function(userLocation) {
        console.log("Current user location: " +  userLocation.location.lat + ", " + userLocation.location.lng);
        console.log("Current user speed: " +  userLocation.speed);
      });
  }

	getLocationOnce() {
    geolocation
      .getCurrentLocation({ desiredAccuracy: Accuracy.high, timeout: 5000 })
      .then(location => {
        console.log("startpointLatitude received: " + location.latitude);
        console.log("startpointLongitude received: " + location.longitude);
        this.startpointLatitude = location.latitude;
        this.startpointLongitude = location.longitude;
        
        this.Longitude = location.longitude;
        this.Latitude= location.latitude;
        
        this.mapbox.setCenter({
          lat: location.latitude,
          lng: location.longitude,
          animated: true
      });

        this.getCurrentAddress();
      })
      .catch(error => {
        console.log("Location error received: " + error);
      });
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
	 		//	console.log("The result is : ", result);
	 			this.origin = result.results[0].formatted_address;
	 			console.log("The current address is : ", this.origin);
       })
       .catch(error => {
         console.log("Unable to get current address. Error occured!:", error);
       });
	 }

    showSideDrawer(args: EventData) {
    console.log("Show SideDrawer tapped.");
    // Show sidedrawer ...
}

   public rrrrrrrronMapReady(args) {
     this.mapbox = args.map;
     this.geolocationService.getLocation().then(() => {
         this.loadInitalLocation().then(
          loc => {
                 this.position = loc.map((loc) => {
                  loc.distance = this.geolocationService.getDistanceFrom(
                         parseFloat(loc.latitude),
                         parseFloat(loc.longitude));
                     return loc;
                 });
                 this.dropMarkers();
                 this.mapbox.setCenter({
                     lat: this.geolocationService.latitude,
                     lng: this.geolocationService.longitude,
                     animated: true
                 });
             },
             error => console.log(error));
         });
 }

 public dropMarkers() {
   let markers = this.position.map((loc: Position, index: number) => {
       return {
           lat: loc.latitude,
           lng: loc.longitude,
       }
   });
   this.mapbox.addMarkers(markers);
 }

   public loadInitalLocation() {
     return this.googleService.getCurrentLocation(this.geolocationService.latitude, this.geolocationService.longitude);
   }
}
