import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgForm}    from 'angular2/common';
import {RegisterComponent} from '../register/register.component';


@Component({
  selector: 'login',
  templateUrl: `app/html/login/login.html`,
  styles:['a {cursor: pointer}']
})

export class LoginComponent {
	title = 'LOGIN:';	 
	
	constructor(private _router: Router) {}
	
	gotoRegister() {
     this._router.navigate(['Register']);
    }
   
 
}
