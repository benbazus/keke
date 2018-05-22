import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeolocationService } from '~/shared/services/geolocation.service';

import { Page, Color } from "ui/page";

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

import { ModalComponent } from '~/booking/modal.component';

//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { GooglePlayService } from '~/shared/services/google-play.service';

@Component({
	selector: 'booking',
	templateUrl: './booking/booking.component.html',
	styleUrls: ['./booking/booking.component.css']
})

export class BookingComponent implements OnInit {

  @ViewChild(ModalComponent) modal: ModalComponent;

	private mapbox: Mapbox;
	
	public startpointLongitude: number = 42.696552;
    public startpointLatitude: number = 23.32601;
	public endpointLongitude: number = 40.71448;
	public endpointLatitude: number = -74.00598;


//	public geoJson: GeoJson[];
	message: string;
	

	constructor(private page: Page,
		 private router: Router,
		private zone: NgZone, 
		private googleService: GooglePlayService) {
	
	//		this.page.actionBarHidden = true;
		
	 }

	ngOnInit() { 

		this.doAddPolyline();
	}

 //=========================== Start Properties =================================
  private _latitude: number;
  public get Latitude(): number {
    console.log("Latitude get reached, and the value is :" + this._latitude);
    return this._latitude;
  }

  public set Latitude(value: number) {
    console.log("Latitude set reached, and the value is :" + value);
    this._latitude = value;
  }

  private _longitude: number;
  public get Longitude(): number {
    console.log("Longitude get reached, and the value is :" + this._longitude);
    return this._longitude;
  }

  public set Longitude(value: number) {
    console.log("Longitude set reached, and the value is :" + value);
    this._longitude = value;
  }

  //=========================== End Properties =================================
  
searchDestination() {
	 console.log(">>>>>>>>>>>> search Origin <<<<<<<<<<<<<: ");
    let navigationExtras: NavigationExtras = {
      queryParams: { searchType: "origin" }
    };
    this.router.navigate(["search"], navigationExtras);
    //this.router.navigate(["chat"], navigationExtras);
}
 

	public doSetCenter(): void {
		this.mapbox.setCenter(
			{
			  lat: 52.3602160,
			  lng: 4.8891680,
			  animated: true
			}
		).then(
			result => {
			  console.log("Mapbox setCenter done");
			},
			(error: string) => {
			  console.log("mapbox setCenter error: " + error);
			}
		);
	  }

	  	  public doAddPolyline(): void {
		this.mapbox.addPolyline({
		  id: 1,
		  color: "#30BCFF",
		  width: 5,
		  opacity: 0.6,
		  points: [
			{
			  lat: 52.3923633,
			  lng: 4.9026489
			},
			{
			  lat: 52.3709879,
			  lng: 4.9555206
			},
			{
			  lat: 52.3542155,
			  lng: 4.9308013
			},
			{
			  lat: 52.3537961,
			  lng: 4.8799896
			},
			{
			  lat: 52.3701494,
			  lng: 4.8360443
			},
			{
			  lat: 52.3864966,
			  lng: 4.8621368
			},
			{
			  lat: 52.3848202,
			  lng: 4.8868560
			}
		  ]
		}).then(
			result => {
			  console.log("Mapbox addPolyline done");
			},
			(error: string) => {
			  console.log("mapbox addPolyline error: " + error);
			}
		);
		}
		
		onNavBtnTap() {
			this.router.navigate(["home"]);
		}


		getIPAddress(placeId) {
			// console.log("<<<<<<<<<<<<<<< placeId is: >>>>>>>>>>>>>>>>>>>>" + placeId);
	 
			 this.googleService
				 .getLocationIPByPlaceID(placeId)
				 .then(results => {
					// console.log("Output" + JSON.stringify(this.data));
	 
					// console.log("data.result.geometry.lat :  " + JSON.stringify(results.result.geometry.lat));
	 
					 const coordinates = [results.result.geometry];
					// const newMarker   = new GeoJson(coordinates, { message: this.message })
					 
					// console.log("Output coordinates" + JSON.stringify(results.result));
				 //  console.log("Output coordinates" + JSON.stringify(results.result.geometry));
					 console.log("Output coordinates" + JSON.stringify(coordinates));
					 //console.log("newMarker" + JSON.stringify(newMarker));
	 
					 // result.results.forEach(element => {
					 //   this.locationSearch.push({ country: element.country, streetname: element.country});
					 // });
				 //  console.log("Output" + JSON.stringify(this.geoJson));
					 // this.origin = result.results[0].formatted_address;
				 })
				 .catch(error => {
					console.log("Error occured in retrieving IP address:", error);
				 });
		 }

}