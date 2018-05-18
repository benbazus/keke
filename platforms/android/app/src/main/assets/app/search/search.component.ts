import { Component, OnInit } from '@angular/core';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
import { EventData, Observable } from 'data/observable';
import { ObservableProperty } from '~/shared/observable-decorator';
//import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'search',
	templateUrl: './search/search.component.html',
	styleUrls: ['./search/search.component.css']
})

export class SearchComponent extends Observable implements OnInit  {

	@ObservableProperty()
	public message: string;
	
	constructor() {
		super();
	 }

	ngOnInit() {

	// 	this.isLoading= true;
	// 	this.isAnonymous = BackendService.isAnonymous;
	// 	this.sub$ = this.route.params;
	// 	this.articles$ = this.sub$.switchMap((params: any) =&#x3E; {
	// 								this.categoryTitle = params[&#x27;categoryTitle&#x27;];
	// 								return &#x3C;any&#x3E;this.firebaseService.getArticleList(params[&#x27;id&#x27;])});&#x9;
	//    this.articles$.subscribe(()=&#x3E;{
	// 			 this.isLoading= false;
	//    });
	 }
}