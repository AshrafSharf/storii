import {Component,OnInit,ViewChild } from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {LogStateComponent} from '../logState/logState.component';
import { AuthenticationService }    from '../login/authentication.service';
import { ProfileService }    from './profile.service';
import {HttpClient}           from '../../headerfct';


@Component({
  selector: 'profile',
  templateUrl: `app/html/profile/profile.html`,
  directives: [LogStateComponent],
  providers:[AuthenticationService,ProfileService,HttpClient]
  
})

export class ProfileComponent implements OnInit {

	newStoryIcon = 'app/assets/files/dummyNewStory.jpg';
	name;
	errorMessage;
	title = "Profile";
	myinfo = "My Info";
	username = "Username:";
	email = "E-Mail:";
	aboutme = "About me:";
	edit = "Edit Profile";
	myinspiration = "My Inspiration:";
	profilepic = "Profile Pic:";
	mystories = "My Strories";
	
	details: string[];
	
	
	constructor(private _router: Router,private _routeParams:RouteParams,private _authenticationService: AuthenticationService, private _profileService: ProfileService) {}
	
	  ngOnInit() {
	  	this.name = this._routeParams.get('name');	
	 	if (!this._authenticationService.isLoggedIn()) {
	 		this._router.navigate(['Search']);
	 	}else{
	 		 this._profileService.getUserInfo(this.name)
		                     .subscribe(
		                       details => this.details = details,
		                       error =>  this.errorMessage = <any>error);
	 	}
	  }
	  
	  createNewStory(){
	  
	  }
	
 
}
