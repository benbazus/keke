import { Component, NgZone, OnInit } from "@angular/core";
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
import { EventData, Observable } from "data/observable";
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
import * as appversion from "nativescript-appversion";
import { Directions } from "nativescript-directions";
import { GeolocationService } from "~/shared/services/geolocation.service";
import { GooglePlayService } from "~/shared/services/google-play.service";
import { Position } from "~/models/locationResponse";
import { ObservableProperty } from "~/shared/observable-decorator";

import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";

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

  currentGeoLocation: any;

  constructor(
    private zone: NgZone,
    private geolocationService: GeolocationService,
    private _page: Page,
    private googleService: GooglePlayService,
     private router: Router

  ) {
    // if (topmost().ios) {
    //   var navigationBar = topmost().ios.controller.navigationBar;
    //   navigationBar.translucent = false;
    //   navigationBar.setBackgroundImageForBarMetrics(UIImage.new(), UIBarMetrics.Default);
    //   navigationBar.shadowImage = UIImage.new();
    // }

    //  this._page.actionBar.backgroundColor = "translucent";
   // this._page.actionBarHidden = true;
    geolocation.enableLocationRequest(true);
  }


getVersionName() {
   appversion.getVersionName().then((v: string) => {
      console.log("Your app's version is: " + v);
  });
}

getVersionCode() {
   appversion.getVersionCode().then((v: string) => {
      console.log("Your app's version code is: " + v);
  });
}


getAppId() {
  appversion.getAppId().then((id: string) => {
      console.log("Your app's id is: " + id);
  });
}

  enableLocationServices(): void {
    geolocation.isEnabled().then(enabled => {
      if (!enabled) {
        geolocation.enableLocationRequest().then(() => {
          this.showLocation();
          this.watch();
        });
      } else {
        this.showLocation();
        this.request();
      }
    });
  }

 

  ngOnInit() {
    console.log("checking if geolocation is enabled");
    geolocation.isEnabled().then(
      enabled => {
        console.log("Is geolocation Enabled =", enabled);
        if (enabled) {
          this.showLocation();
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
        this.startpointLatitude = location.latitude;
        this.startpointLongitude = location.longitude;

       // this.Longitude = location.longitude;
       // this.Latitude = location.latitude;
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
        selected: true
      }
    ]);

    this.centerMap(args);
  }

 public centerMap(args: any) {
              this.mapbox.setCenter({
            lat: this.startpointLatitude,
            lng: this.startpointLongitude,
            animated: false
        });
    }

  onBookTap() {
    console.log("onBookTap");
    this.mapbox.getUserLocation().then(function(userLocation) {
      console.log(
        "Current user location: " +
          userLocation.location.lat +
          ", " +
          userLocation.location.lng
      );
      console.log("Current user speed: " + userLocation.speed);
    });
  }

  showLocation() {
    geolocation
      .getCurrentLocation({  desiredAccuracy: Accuracy.high, updateDistance: 10, minimumUpdateTime: 1000 * 1 })
      .then(location => {
        console.log("startpointLatitude received: " + location.latitude);
        console.log("startpointLongitude received: " + location.longitude);
        this.startpointLatitude = location.latitude;
        this.startpointLongitude = location.longitude;

      //  this.Longitude = location.longitude;
      //  this.Latitude = location.latitude;

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
        this.currentGeoLocation  = result;
        this.origin = result.results[0].formatted_address;
        console.log("The current address is : ", this.origin);
      })
      .catch(error => {
        console.log("Unable to get current address. Error occured!:", error);
      });
  }

onStartBookingTap() {
   console.log(">>>>>>>>Start search Harrssed <<<<<<<<<<: ");
    let navigationExtras: NavigationExtras = {
      queryParams: { currentGeoLocation: this.currentGeoLocation }
    };
    this.router.navigate(["search"], navigationExtras);
}

  showSideDrawer(args: EventData) {
    console.log("Show SideDrawer tapped.");
    // Show sidedrawer ...
  }

  //    public rrrrrrrronMapReady(args) {
  //      this.mapbox = args.map;
  //      this.geolocationService.getLocation().then(() => {
  //          this.loadInitalLocation().then(
  //           loc => {
  //                  this.position = loc.map((loc) => {
  //                   loc.distance = this.geolocationService.getDistanceFrom(
  //                          parseFloat(loc.latitude),
  //                          parseFloat(loc.longitude));
  //                      return loc;
  //                  });
  //                  this.dropMarkers();
  //                  this.mapbox.setCenter({
  //                      lat: this.geolocationService.latitude,
  //                      lng: this.geolocationService.longitude,
  //                      animated: true
  //                  });
  //              },
  //              error => console.log(error));
  //          });
  //  }

  //  public dropMarkers() {
  //    let markers = this.position.map((loc: Position, index: number) => {
  //        return {
  //            lat: loc.latitude,
  //            lng: loc.longitude,
  //        }
  //    });
  //    this.mapbox.addMarkers(markers);
  //  }

  //    public loadInitalLocation() {
  //      return this.googleService.getCurrentLocation(this.geolocationService.latitude, this.geolocationService.longitude);
  //    }
}
