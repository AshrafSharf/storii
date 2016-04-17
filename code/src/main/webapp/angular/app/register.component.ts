import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgForm}    from 'angular2/common';
import {SearchFormComponent} from './search-form.component';


@Component({
  selector: 'register',
  templateUrl: `app/register/register.html`,
  styles:['a {cursor: pointer}']
})
export class RegisterComponent {
	title = 'REGISTRATION:';
	
	constructor(private _router: Router) { }
	
	goHome() {
    this._router.navigate(['Search']);
   }	
}
