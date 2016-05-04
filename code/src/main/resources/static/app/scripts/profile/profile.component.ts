import {Component,OnInit,ElementRef } from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {LogStateComponent} from '../logState/logState.component';
import { AuthenticationService }    from '../login/authentication.service';
import { ProfileService }    from './profile.service';
import {HttpClient}           from '../../headerfct';

declare var jQuery: any;
declare var vex: any;

@Component({
  selector: 'profile',
  templateUrl: `app/html/profile/profile.html`,
  directives: [LogStateComponent],
  styles:['a {cursor: pointer}'],
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
	
	constructor(private _elRef: ElementRef, private _router: Router,private _routeParams:RouteParams,private _authenticationService: AuthenticationService, private _profileService: ProfileService) {}
	
	  ngOnInit():any {
	  	this.name = this._routeParams.get('name');	
	 	if (!this._authenticationService.isLoggedIn()) {
	 		this._router.navigate(['Search']);
	 	}else{
	 		 this._profileService.getUserInfo(this.name)
		                     .subscribe(
		                       details => this.details = details,
		                       error =>  this.errorMessage = <any>error);
	 	}
	 	
	 	jQuery(this._elRef.nativeElement).find('#editProfile').on('click', function(){
    		vex.dialog.prompt({
				  message: 'Edit Profile?',
				  placeholder: 'Planet name',
				  callback: function(value) {
				    return console.log(value);
				  }
			});
    	});
    	
    	jQuery(this._elRef.nativeElement).find('#createNewStory').on('click', function(){
    		vex.open({
    			showCloseButton: false,
    		 	content: `<div id="newStoryPage">
					    <div class="newStoryFrameContainer">
					        <div class="newStoryContainer">
					            <div id="content">
					                <div class="h1bgNewStory"><h1>NEW STORY</h1></div>
					                
					                <form id="changeName" name="changeName">
					                        <label>WHAT IS THE NAME OF YOUR STORY?</label><br>
					                 		<input class="inputField" name="storyName" required="" type="text">
					                        <div class="buttonFrameContainer fullWidth"><input class="button" value="CREATE STORY" type="submit"></div>
					                </form>
					              
					                <div class="closeFancyBox"><input onclick="vex.close();" class="button" value="CLOSE" type="button"></div>
					                
					            </div>
					        </div>
					    </div>
					</div>`
					
			});		
    	});
    	
	  }
	  
	  createNewStory(){
	  
	  }
	
 
}
