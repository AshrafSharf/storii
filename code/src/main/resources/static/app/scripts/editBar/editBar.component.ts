import {Component,bind,OnInit,ElementRef} from 'angular2/core';
import {ROUTER_PROVIDERS,RouteConfig, ROUTER_DIRECTIVES,APP_BASE_HREF,LocationStrategy,RouteParams,ROUTER_BINDINGS} from 'angular2/router';
import { Router, Location} from 'angular2/router';
import { AuthenticationService }    from '../login/authentication.service';
import { ProfileService }    from '../profile/profile.service';
import {HttpClient}           from '../../headerfct';
  
declare var jQuery: any;
declare var vex: any;
    
@Component({
      selector: 'editBar',
      templateUrl:`app/html/editBar/editBar.html`,
      styles:['a {cursor: pointer}'],
  	  providers:[AuthenticationService,ProfileService,HttpClient]
})


export class EditBarComponent implements OnInit {

	editProfile = "Edit Profile";
	lookAtIt = "Look at it";
	edit = "Edit";
	profilePage;
	aboutPage;
	name;
	loggedIn;


	constructor(private _elRef: ElementRef, private _router: Router,private _authenticationService: AuthenticationService) {
 	this.loggedIn=_authenticationService.isLoggedIn();
	}
	
	openVex(){
		let self = this;
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
	}
	
	ngOnInit():any {
   	
    	
    	if(document.getElementById("profilePage")){
			this.profilePage = true;
		}
		if(document.getElementById("userStoryPage")){
			this.aboutPage = true;
		}

    	
    	}
  
  
}