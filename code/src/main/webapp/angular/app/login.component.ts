import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgForm}    from 'angular2/common';
import { Router } from 'angular2/router';
import {RegisterComponent} from './register.component';

@Component({
  selector: 'login',
  templateUrl: `app/login/login.html`,
  styles:['a {cursor: pointer}']
})
export class LoginComponent {
	title = 'LOGIN:';	 
	
	constructor(private _router: Router) { }
	
	gotoRegister() {
    this._router.navigate(['Register']);
  }
 
}
