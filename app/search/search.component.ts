import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
//import { TextField } from 'ui/text-field';
import { EventData, Observable } from "data/observable";

import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { GooglePlayService } from "~/shared/services/google-play.service";
import { Page } from "tns-core-modules/ui/page";
import { SearchBar } from "ui/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { GeolocationService } from "~/shared/services/geolocation.service";
import { Accuracy } from "tns-core-modules/ui/enums/enums";
import * as appSettings from "application-settings";

@Component({
  selector: "search",
  templateUrl: "./search/search.component.html",
  styleUrls: ["./search/search.component.css"]
})
export class SearchComponent  implements OnInit {
 
  items: ObservableArray<any>;
  public locationArray: Array<any>;

isListViewVisible: boolean = false;
isOriginSearched: boolean = false;
isDestinationSearched: boolean = false;
  
  searchType: string;
  public origin: string;
  public destination: string;


  isBusy: boolean = false;


  constructor(
    private _page: Page,
    private route: Router,
    private router: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private geolocationService: GeolocationService,
    private googleService: GooglePlayService
  ) {
   // this.getOrigin();
    //  this.router.queryParams.subscribe(params => {
    //  this.searchType = params["searchType"];
    // });
  }

  ngOnInit() {
   //  	this.isDestinationSearched = false;
    //   this.isOriginSearched = false;
       
    //   console.log("<< result >> " );

     // var result= JSON.parse(appSettings.getString("origin") || "[]");

     // console.log("<< result <<<<beatup>> " + result);

    // 	this.sub$ = this.route.params;
    // 	this.articles$ = this.sub$.switchMap((params: any) =&#x3E; {
    // 								this.categoryTitle = params[&#x27;categoryTitle&#x27;];
    // 								return &#x3C;any&#x3E;this.firebaseService.getArticleList(params[&#x27;id&#x27;])});&#x9;
    //    this.articles$.subscribe(()=&#x3E;{

        //    this.isBusy = this.isBusy==false ? true : false;
    //    });
  }

  getOrigin() {
    this.geolocationService
      .getLocation()
      .then(location => {
        console.log("startpointLatitude received: " + location.latitude);
        console.log("startpointLongitude received: " + location.longitude);

        //  this.origin();
      })
      .catch(error => {
        console.log("Location error received: " + error);
      });
  }

  onOriginTap(args) {
    let originSearch = <SearchBar>args.object; 
    if(this.isOriginSearched == false)
    {
      if (originSearch.text != null) {
         this.searchforOrigin(originSearch);
      }
    }
  }

   searchforOrigin(originSearch) {

    if (originSearch.text != null || originSearch.text.length != null || originSearch.text.length == 0)

      if (originSearch.text.length > 2 && originSearch.text.length % 3 === 0) {
        const searchString = originSearch.text.split(" ").join("+");
        this.isBusy = true;
        this.googleService.searchLocation(searchString).then(
          data => {

            this.isListViewVisible = true;
            this.items = new ObservableArray<any>();
           
            for (var i = 0; i < data.predictions.length; i++) {
              this.items.push({
                description: data.predictions[i].description,
                placeId: data.predictions[i].place_id
              });              
            }
            this.searchType = "origin";
            this.isBusy= false;
            this.isOriginSearched = true;
          },
          error => {
          	this.isBusy = false;
            this.isListViewVisible = false;
            this.isOriginSearched =false;
            this.handleErrors(error);
          }
        );
      }
  }
 

  onDestinationTap(args) {
    let destinationSearch = <SearchBar>args.object; 
    if(this.isDestinationSearched == false)
    {
      if (destinationSearch.text != null) {
         this.searchforDestination(destinationSearch);
      }
    }
  }

  searchforDestination(destination) {

    if (destination.text != null || destination.text.length != null || destination.text.length == 0)

      if (destination.text.length > 2 && destination.text.length % 3 === 0) {
        const searchString = destination.text.split(" ").join("+");
        this.isBusy = true;
        this.googleService.searchLocation(searchString).then(
          data => {

            this.isListViewVisible = true;
            this.items = new ObservableArray<any>();
           
            for (var i = 0; i < data.predictions.length; i++) {
              this.items.push({
                description: data.predictions[i].description,
                placeId: data.predictions[i].place_id
              });              
            }
            this.searchType = "destination";
            this.isBusy= false;
            this.isDestinationSearched = true;
          },
          error => {
          	this.isBusy = false;
            this.isListViewVisible = false;
            this.isDestinationSearched =false;
            this.handleErrors(error);
          }
        );
      }
  }


  handleErrors(error: any) {
    console.error(error.message);
  }

  public onSelectedTap(args) {

    if (this.searchType == "destination") {
      console.log(">> destination is <<" + this.searchType);

      this.destination = args.view.bindingContext.description;     
      this.isListViewVisible = false;
      this.isDestinationSearched = true;
      //appSettings.setString("destination", args.view.bindingContext);

      if( this.origin != null){
        this.route.navigate(["booking"]);
      }
    } else {
      console.log(">> origin is <<" + this.searchType);

      this.origin = args.view.bindingContext.description;
      this.isListViewVisible = false;
      this.isOriginSearched = true

      console.log("Output coordinates" + JSON.stringify(args.view.bindingContext.placeId));
      this.getIPAddress(args.view.bindingContext.placeId);
    //  appSettings.setString("origin", args.view.bindingContext);
    
    }
    // //	this.routerExtensions.back();
    //  
  }




 onOriginClear() {
  this.isOriginSearched = false;
  this.isListViewVisible = false;
 }
 
 onDestinationClear() {
  console.log(">> onDestinationClear<<" );
  this.isListViewVisible = false;
  this.isDestinationSearched = false;
}

  onNavBtnTap() {
    // This code will be called only in Android.
    console.log(">> onNavBtnTap<<" );
    console.log("Navigation button tapped!");
    this.routerExtensions.back();
   // //	topmost().navigate("booking");
  }

  getIPAddress(placeId) {
    // console.log("<<<<<<<<<<<<<<< placeId is: >>>>>>>>>>>>>>>>>>>>" + placeId);
 
     this.googleService
       .getLocationIPByPlaceID(placeId)
       .then(results => {
        console.log("Output" + JSON.stringify(results));
 
      //   console.log("data.result.geometry.lat :  " + JSON.stringify(results.result.geometry.lat));
 
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
