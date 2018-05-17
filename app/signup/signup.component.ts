import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
// import "rxjs/Rx"
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'signup',
	templateUrl: './signup/signup.component.html',
	styleUrls: ['./signup/signup.component.css']
})

export class SignupComponent implements OnInit {

	public input: any;

	constructor(private router: Router) { 
		this.input = {
            "firstname": "",
            "lastname": "",
            "email": "",
            "password": ""
        };
	}

	ngOnInit() { }

	register() {
        // if(this.input.email && this.input.password) {
        //     let headers = new Headers({ "content-type": "application/json" });
        //     let options = new RequestOptions({ headers: headers });
        //     this.http.post("http://localhost:3000/account", JSON.stringify(this.input), options)
        //         .map(result => result.json())
        //         .subscribe(result => {
        //             this.router.navigate(["/login"]);
        //         });
        // }
    }
}