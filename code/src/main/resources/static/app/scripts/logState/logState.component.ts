import {Component,bind} from 'angular2/core';
import {ROUTER_PROVIDERS,RouteConfig, ROUTER_DIRECTIVES,APP_BASE_HREF,LocationStrategy,RouteParams,ROUTER_BINDINGS} from 'angular2/router';
import {LoginComponent} from '../login/login.component';
import { Router, Location} from 'angular2/router';
import {RegisterComponent} from '../register/register.component';
import { AuthenticationService }    from '../login/authentication.service';
    
@Component({
      selector: 'logState',
      templateUrl:`app/html/logState/logState.html`,
      styles:['a {cursor: pointer}'],
  	  providers:[AuthenticationService]
})


export class LogStateComponent {

	logState = "Login";
	register = "Register";
	user= "User";
	name;
	loggedIn;

 constructor(private _router: Router, private _authenticationService: AuthenticationService) {
 	this.loggedIn=_authenticationService.isLoggedIn();
 	if (this.loggedIn) {
 		this.logState = "Logout";
 		var string = localStorage.getItem("auth_token");
		var headerParts = string.split(" ");
		var token = atob(headerParts[1]).split(":");
		this.name = token[0];
 		this.user = this.name;
 		
 			

 	}

  }
 
  gotoLogin() {
   	if (!this.loggedIn) {
   		this._router.navigate(['Login']);
   	}else{
   		this._authenticationService.logout();
   		this.loggedIn=this._authenticationService.isLoggedIn();
   		this.logState = "Login";
    	this._router.navigate(['Search']);
   	}
    
  }
  
  gotoRegister() {
    this._router.navigate(['Register']);
  }
  
	gotoProfil() {	
   		 this._router.navigate(['Profile', { name: this.name }]);
   	}
  	
 
}