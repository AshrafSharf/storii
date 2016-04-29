import {Component,OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {LogStateComponent} from '../logState/logState.component';
import { AuthenticationService }    from '../login/authentication.service';


@Component({
  selector: 'profile',
  templateUrl: `app/html/profile/profile.html`,
  directives: [LogStateComponent],
  providers:[AuthenticationService]
})

export class ProfileComponent implements OnInit {	
	name;
	title = "Profile";
	myinfo = "My Info";
	username = "Username:";
	email = "E-Mail:";
	level = "Level:";
	edit = "Edit Profile";
	profilepic = "Profile Pic:";
	mystories = "My Strories";
	
	
	constructor(private _router: Router,private _routeParams:RouteParams,private _authenticationService: AuthenticationService) {}
	
	  ngOnInit() {
	  	this.name = this._routeParams.get('name');	
	 	if (!this._authenticationService.isLoggedIn()) {
	 		this._router.navigate(['Search']);
	 	}
	  }
	
 
}
