import { RequestOptions } from '@angular/http';
import { Component, OnInit } from '@angular/core';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'login',
	templateUrl: './login/login.component.html',
	styleUrls: ['./login/login.component.css']
})

export class LoginComponent implements OnInit {

	public input: any;

	constructor() {
		this.input = {
            "email": "",
            "password": ""
        };
	 }

	ngOnInit() { }


	login() {
        // if(this.input.email && this.input.password) {
        //     let headers = new Headers({ "content-type": "application/json" });
        //     let options = new RequestOptions({ headers: headers });
        //     this.http.post("http://localhost:3000/login", JSON.stringify(this.input), options)
        //         .map(result => result.json())
        //         .subscribe(result => {
        //             this.router.navigate(["/blogs"], { "queryParams": result });
        //         });
        // }
    }
}