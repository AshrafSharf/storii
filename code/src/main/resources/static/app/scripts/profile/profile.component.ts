import {Component,OnInit,ElementRef } from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {LogStateComponent} from '../logState/logState.component';
import {EditBarComponent} from '../editBar/editBar.component';
import { AuthenticationService }    from '../login/authentication.service';
import { ProfileService }    from './profile.service';
import { EditBarService }    from '../editBar/editBar.service';
import {HttpClient}           from '../../headerfct';

declare var jQuery: any;
declare var vex: any;

@Component({
  selector: 'profile',
  templateUrl: `app/html/profile/profile.html`,
  directives: [LogStateComponent, EditBarComponent],
  styles:['a {cursor: pointer}'],
  providers:[EditBarService,AuthenticationService,ProfileService,HttpClient]
  
})

export class ProfileComponent implements OnInit {

	newStoryIcon = 'app/assets/files/dummyNewStory.jpg';
	defaultUserPic = 'app/assets/files/dummyProfile.jpg';
	defaultStoryPic = 'app/assets/files/dummyStory.jpg';
	name;
	id;
	errorMessage;
	title = "Profile";
	myinfo = "My Info";
	username = "Username:";
	email = "E-Mail:";
	aboutme = "About me:";
	edit = "Edit Profile";
	myinspiration = "My Inspiration:";
	profilepic = "Profile Pic:";
	mystories = "My Stories";
	loggedIn; 
	loggedInUser;
	allowed;
	
	
	details: string[];
	createdStory: string[];
	stories: string[];
	
	constructor(
	private _elRef: ElementRef, 
	private _router: Router,
	private _routeParams:RouteParams,
	private _authenticationService: AuthenticationService,
	private _profileService: ProfileService ,
	private _editBarService: EditBarService) {}
	
	invert(element){
		jQuery('.'+element['nextElementSibling']['className']).slideToggle('fast');
		var arrow = jQuery('.'+element['className']).find('i');
		var classes = arrow.attr('class');
		if(classes == 'fa fa-angle-up'){
			arrow.removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
		}else if(classes == 'fa fa-angle-down'){
			arrow.removeClass('fa fa-angle-down').addClass('fa fa-angle-up');
		}
	}
	
	
	gotoStory(storyname) {	
   		 this._router.navigate(['About', { name: this.name, storyName: storyname['name'] }]);
   	}
	
	createNewStory(storyName){
	   this._profileService.createNewStory(storyName,this.name, "", false)
                     .subscribe((createdStory) => {
	      							if (createdStory) {
	      							   this.createdStory = createdStory;
	      							   vex.close();	
	      							   this.stories.push(createdStory);
	      							}},
                       				error =>  this.errorMessage = <any>error);
	}
	
	openVex(){
		let self = this;
    		vex.open({
    			showCloseButton: true,
    		 	content: `<div id="newStoryPage">
					    <div class="newStoryFrameContainer">
					        <div class="newStoryContainer">
					            <div id="content">
					                <div class="h1bgNewStory"><h1>NEW STORY</h1></div>
					                
					                <form onSubmit="return false;" id="changeName" name="changeName">
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
				if((<HTMLInputElement>document.getElementById("storyName")).value != ""){
					self.createNewStory((<HTMLInputElement>document.getElementById("storyName")).value);			
				}
			});
    
	}
	
	  ngOnInit():any {
	  	this.name = this._routeParams.get('name');	
	 	this.loggedIn = this._authenticationService.isLoggedIn();
	 	
	 	if(this.loggedIn){
 		this._editBarService.getLoggedInUser()
		                     .subscribe(
		                       loggedInUser => {    
		                        this.loggedInUser = loggedInUser;
		                        if(this.loggedInUser['name'] === this.name){
		                        	this.allowed = true; 
		                        }
    
		                       },
		                       error =>  this.errorMessage = <any>error);
 	 	}
	 	
	 this._profileService.getUserInfo(this.name)
		                     .subscribe(
		                       details => {    
		                         this.details = details;
		                         this.stories = this.details[0]['stories'];
		                       },
		                   
		                       error =>  this.errorMessage = <any>error);
    	
	  }
 
}
