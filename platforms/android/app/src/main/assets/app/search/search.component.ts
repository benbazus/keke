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

 isListViewVisible: boolean;
isloading:boolean;

isOriginSearched: boolean;
isDestinationSearched: boolean;
  searchType: string;
  public origin: string;
  public destination: string;




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
     	this.isDestinationSearched= false;
       this.isOriginSearched = false;
       
       console.log("<< result >> " );
      var result= JSON.parse(appSettings.getString("origin") || "[]");

      console.log("<< result <<<<beatup>> " + result);

    // 	this.sub$ = this.route.params;
    // 	this.articles$ = this.sub$.switchMap((params: any) =&#x3E; {
    // 								this.categoryTitle = params[&#x27;categoryTitle&#x27;];
    // 								return &#x3C;any&#x3E;this.firebaseService.getArticleList(params[&#x27;id&#x27;])});&#x9;
    //    this.articles$.subscribe(()=&#x3E;{
    // 			 this.isLoading= false;
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

    if(this.isOriginSearched === false)
    {
      this.isloading= true;
    if (originSearch.text.length !== null || originSearch.text.length === 0)
      if (originSearch.text.length > 2 && originSearch.text.length % 3 === 0) {
        const searchString = originSearch.text.split(" ").join("+");
        
        this.googleService.searchLocation(searchString).then(
          data => {

this.isListViewVisible = true;
            this.items = new ObservableArray<any>();
            for (var i = 0; i < data.predictions.length; i++) {
              this.items.push({
                description: data.predictions[i].description,
                placeId: data.predictions[i].place_id,
                searchType: "origin"
              });
              this.searchType = "origin";
              console.log("may be terrfic for origin: " + i);
            }
            this.isloading= false;
            this.isOriginSearched = true;
          },
          error => {
          	this.isloading= false;
            this.isListViewVisible = false;
            this.isOriginSearched =false;
            this.handleErrors(error);
          }
        );
      }
  }
  }

  onDestinationTap(args) {
    let originSearch = <SearchBar>args.object;

    if(this.isDestinationSearched === false)
    {
      this.isloading= true;
    if (originSearch.text.length !== null || originSearch.text.length === 0)
      if (originSearch.text.length > 2 && originSearch.text.length % 3 === 0) {
        const searchString = originSearch.text.split(" ").join("+");

        this.googleService.searchLocation(searchString).then(
          data => {
          	this.isListViewVisible = true;
            this.items = new ObservableArray<any>();

            for (var i = 0; i < data.predictions.length; i++) {
              this.items.push({
                description: data.predictions[i].description,
                placeId: data.predictions[i].place_id,
                searchType: "destination"
              });
              this.searchType = "destination";
              console.log("may be terrfic for destination: " + i);
            }
            this.isDestinationSearched = false;
            this.isloading= false;
          },
          error => {
            this.isDestinationSearched = false;
          	this.isloading= false;
          	this.isListViewVisible = false;
            this.handleErrors(error);
          }
        );
      }
  }
}
  handleErrors(error: any) {
    console.error(error.message);
  }

  public onSelectedTap(args) {
    console.log(">> searchType is <<" + this.searchType);

    if (this.searchType === "destination") {
      console.log(
        ">>Navigation button tapped is for destination <<" +
          JSON.stringify(args.view.bindingContext)
      );
      this.destination = args.view.bindingContext.description;
      appSettings.setString("destination", args.view.bindingContext);
      this.isListViewVisible = false;
      this.isDestinationSearched = true;
    } else {
      console.log(
        ">>Navigation button tapped is for origin <<" +
          JSON.stringify(args.view.bindingContext)
      );
      this.origin = args.view.bindingContext.description;
      appSettings.setString("origin", args.view.bindingContext);
      this.isListViewVisible= false;
      this.isOriginSearched = true
    }
    // //	this.routerExtensions.back();
    //  this.route.navigate(["booking"]);
  }

  onNavBtnTap() {
    // This code will be called only in Android.
    console.log("Navigation button tapped!");
    this.routerExtensions.back();
   // //	topmost().navigate("booking");
  }
}
