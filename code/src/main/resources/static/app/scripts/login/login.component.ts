import {Component,Input,OnInit} from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {NgForm, FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgIf} from 'angular2/common';
import {Observable}       from 'rxjs/Observable';
import {Subject}          from 'rxjs/Subject';
import { AuthenticationService }    from './authentication.service';


@Component({
  selector: 'login',
  templateUrl: `app/html/login/login.html`,
  styles:['a {cursor: pointer}'],
  providers:[AuthenticationService]
})

export class LoginComponent {
	title = 'Login:';	
	loginname = 'Username';
	pw= 'Password';
	register = 'Register';
	
	form: ControlGroup;
  	error: boolean = false;
	
	
	constructor (private fb: FormBuilder, private _router: Router, private _authenticationService: AuthenticationService, private _routeParams: RouteParams) {
		this.form = fb.group({
	      username:  ['', Validators.required],
	      password:  ['', Validators.required]
	    });
	}
	
	login(username, password){
		  	  this._authenticationService.login(username,password)
		             		  .subscribe((result) => {
		             		  		console.log(result);
	      							if (result) {
	      								
	        							this._router.navigate(['Search']);
	      							}
    							},
        						() => { this.error = true; });
        						
		  	  //  console.log(localStorage.getItem('auth_token'));
		  	  //	this._router.navigate(['Search']);	  
	 		
	 		
    
		            
    }
	
	gotoRegister() {
     this._router.navigate(['Register']);
    }
   
 
}
