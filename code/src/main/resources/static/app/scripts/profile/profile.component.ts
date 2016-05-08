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
	createdStory: string[];
	
	constructor(private _elRef: ElementRef, private _router: Router,private _routeParams:RouteParams,private _authenticationService: AuthenticationService, private _profileService: ProfileService) {}
	
	createNewStory(storyName){
		console.log("CREATING STORY");
	   this._profileService.createNewStory(storyName,this.name, "", 0)
                     .subscribe(
                       createdStory => this.createdStory = createdStory,
                       error =>  this.errorMessage = <any>error);
	}
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
    		vex.open({
    			showCloseButton: true,
    		 	content: `<div id="userEditPage">
						    <div class="userEditFrameContainer">
						        <div class="userEditContainer">
						            <div id="content">
						                <div class="h1bgUserEdit"><h1>EDIT MY INFO</h1></div>
						                
						                <form method="POST" id="changeName" name="changeName" class="handledAjaxForm">
						                        <label>NAME</label><br>
						                        <input class="inputField loadData" placeholder="username" type="text" name="userName" required="">
						                        <div class="buttonFrameContainer"><input class="button" type="submit" value="CHANGE NAME"></div>
						                </form>
						                
						                <form method="POST" id="changeEmail" name="changeEmail" class="handledAjaxForm">
						                        <label>EMAIL</label><br>
						                        <input class="inputField loadData" type="email" name="userMail" required="" placeholder="email">
						                        <div class="buttonFrameContainer"><input class="button" type="submit" value="CHANGE E-MAIL"></div>
						                </form>
						                
						                <form method="POST" id="changePassword" name="changePassword" class="handledAjaxForm">
						                        <label>PASSWORD</label><br>
						                        <input class="inputField" type="password" name="userPassword" required="">
						                        <label>CONFIRM PASSWORD</label><br>
						                        <input class="inputField" type="password" name="userPasswordAgain" required="">
						                        <div class="buttonFrameContainer"><input class="button" type="submit" value="CHANGE PASSWORD"></div>
						                </form>
						                
						                <div class="currPicDiv"><img src="" alt="CurrentPicture" id="currentPicture" class="currentUserPicture"></div>
						                <div class="buttonFrameContainer" id="pictureHandling">
						                <input class="button ajaxFormTrigger userPicture" type="button" id="changePictureButton" value="CHANGE PICTURE"><br>
								</div>         
						                <div class="closeFancyBox"><input onclick="vex.close();"  class="button" type="button" value="CLOSE"></div>
						                
						            </div>
						        </div>
						    </div>
						</div>`
					
			});	
    	});
    	
    	let self = this;
    	jQuery(this._elRef.nativeElement).find('#createNewStory').on('click', function(){
    		vex.open({
    			showCloseButton: true,
    		 	content: `<div id="newStoryPage">
					    <div class="newStoryFrameContainer">
					        <div class="newStoryContainer">
					            <div id="content">
					                <div class="h1bgNewStory"><h1>NEW STORY</h1></div>
					                
					                <form id="changeName" name="changeName">
					                        <label>WHAT IS THE NAME OF YOUR STORY?</label><br>
					                 		<input id="storyName" class="inputField" name="storyName" required="" type="text">
					                        <div class="buttonFrameContainer fullWidth"><input id="create" class="button" value="CREATE STORY" type="button"></div>
					                </form>
					              
					                <div class="closeFancyBox"><input onclick="vex.close();" class="button" value="CLOSE" type="button"></div>
					                
					            </div>
					        </div>
					    </div>
					</div>`
					
			});	
			
			document.getElementById("create").addEventListener('click', function(event) {
				self.createNewStory((<HTMLInputElement>document.getElementById("storyName")).value);			
			});
    	});
    	
	  }
 
}
