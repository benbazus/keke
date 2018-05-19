import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { compose as composeEmail } from "nativescript-email";
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

	ngOnInit() { 
   //  email.available((avail: boolean) => {
   //   console.log("Email available? " + avail);
  //});
 }

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

    sendMail() {
        // let's first create a File object using the tns file module
 // var fs = require("file-system");
 // var appPath = fs.knownFolders.currentApp().path;
 // var logoPath = appPath + "/res/telerik-logo.png";

 // email.compose({
   //   subject: "Yo",
   //   body: "Hello <strong>dude</strong> :)",
   //   to: ['eddyverbruggen@gmail.com', 'to@person2.com'],
   //   cc: ['ccperson@somewhere.com'],
   //   bcc: ['eddy@combidesk.com', 'eddy@x-services.nl'],
   //   attachments: [
    //    {
   //         fileName: 'arrow1.png',
   //         path: 'base64://iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAHGlET1QAAAACAAAAAAAAABQAAAAoAAAAFAAAABQAAAB5EsHiAAAAAEVJREFUSA1iYKAimDhxYjwIU9FIBgaQgZMmTfoPwlOmTJGniuHIhlLNxaOGwiNqNEypkwlGk9RokoIUfaM5ijo5Clh9AAAAAP//ksWFvgAAAEFJREFUY5g4cWL8pEmT/oMwiM1ATTBqONbQHA2W0WDBGgJYBUdTy2iwYA0BrILDI7VMmTJFHqv3yBUEBQsIg/QDAJNpcv6v+k1ZAAAAAElFTkSuQmCC',
   //         mimeType: 'image/png'
   //     },
   //     {
   //         fileName: 'telerik-logo.png',
   //         path: logoPath,
   //         mimeType: 'image/png'
   //   }]
  //}).then(
  //  function() {
  //    console.log("Email composer closed");
  //  }, function(err) {
  //    console.log("Error: " + err);
  //  });
    }
}