import {Component,bind,Input,OnInit,ElementRef} from 'angular2/core';
import {ROUTER_PROVIDERS,RouteConfig, ROUTER_DIRECTIVES,APP_BASE_HREF,LocationStrategy,RouteParams,ROUTER_BINDINGS} from 'angular2/router';
import { Router, Location} from 'angular2/router';
import { AuthenticationService }    from '../login/authentication.service';
import { ProfileService }    from '../profile/profile.service';
import { EditBarService }    from './editBar.service';
import {HttpClient}           from '../../headerfct';
  
declare var jQuery: any;
declare var vex: any;
    
@Component({
      selector: 'editBar',
      inputs:['details'],
      templateUrl:`app/html/editBar/editBar.html`,
      styles:['a {cursor: pointer}'],
  	  providers:[EditBarService,AuthenticationService,ProfileService,HttpClient]
})


export class EditBarComponent implements OnInit {

	editProfile = "Edit Profile";
	editPages = "Edit Pages";
	editStory = "Edit Story";
	allowed;
	name; 
	profilePage;
	aboutPage;
	details;
	wrongPassword; 

	loggedIn;
	loggedInUser
	errorMessage;
	update: string[];


	constructor(private _elRef: ElementRef, private _router: Router,private _routeParams:RouteParams,private _authenticationService: AuthenticationService,private _editBarService: EditBarService) {
 	this.loggedIn=_authenticationService.isLoggedIn();
 	this.name = this._routeParams.get('name');	
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
 	
	}
	
	changeValues(key, value){
		this._editBarService.updateValues(key,value,this.details[0]['id'])
		                     .subscribe(
		                       update => {    
		                        this.update = update;
		                        vex.close();
		                        if(key == 'name'){
		                        	var string = localStorage.getItem("auth_token");
									var headerParts = string.split(" ");
									var token = atob(headerParts[1]).split(":");
									var pw = token[1];
		                        	localStorage.removeItem('auth_token');
		                        	 var string = value +":"+ pw; 
    								 var token = "Basic " + btoa(string);
    								 localStorage.setItem('auth_token',token);
    								 this._router.navigate(['Profile', { name: value }]);
		                        }else{
		                        	this.details[0][key] = value; 
		                        }
		                        
		                       },
		                       error =>  this.errorMessage = <any>error);
	
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
						                
						                <form id="changeName" class="change" name="changeName" class="handledAjaxForm">
						                        <label>NAME</label><br>
						                        <input class="inputField loadData name" type="text" name="userName" required="">
						                        <div class="buttonFrameContainer"><input id="name" class="button" type="button" value="CHANGE NAME"></div>
						                </form>
						                
						                <form id="changeEmail" class="change" name="changeEmail" class="handledAjaxForm">
						                        <label>EMAIL</label><br>
						                        <input class="inputField loadData email" type="email" name="userMail" required="">
						                        <div class="buttonFrameContainer"><input id="email" class="button" type="button" value="CHANGE E-MAIL"></div>
						                </form>
						                
						                <form id="changePassword" class="change" name="changePassword" class="handledAjaxForm">
						                		<p>
						                        <label>PASSWORD</label><br>
						                        <input class="inputField" type="password" placeholder="Enter new password" name="userPassword" required=""><br>
						                        </p>  
						                        <br>
						                        <label>CONFIRM PASSWORD</label><br>
						                        <input class="inputField" type="password" placeholder="Repeat new password" name="userPasswordAgain" required=""> 
						                        <div class="buttonFrameContainer"><input id="password" class="button" type="button" value="CHANGE PASSWORD"></div>
						                </form>
						                
						                 <form id="changeAboutMe" class="change" name="changeAboutMe" class="handledAjaxForm">
						                        <label>ABOUT ME</label><br>
						                        <textarea class="inputField loadData" type="text" name="userAboutme" required="" ></textarea>
						                        <div class="buttonFrameContainer"><input id="aboutMe" class="button" type="button" value="CHANGE ABOUT ME"></div>
						               	 </form>
						               	 
						               	 <form id="changeMyInspiration" class="change" name="changeMyInpiration" class="handledAjaxForm">
						                        <label>MY INSPIRATION</label><br>
						                        <textarea class="inputField loadData" type="text" name="userMyInspiration" required=""></textarea>
						                        <div class="buttonFrameContainer"><input id="myInspiration" class="button" type="button" value="CHANGE MY INSPIRATION"></div>
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
			
			jQuery('#changeName input:text').attr("value", self.details[0]['name']);
			jQuery('#changeEmail .inputField').attr("value", self.details[0]['email']);
			jQuery('#changeAboutMe textarea').text(self.details[0]['aboutMe']);
			jQuery('#changeMyInspiration textarea').text(self.details[0]['myInspiration']);
			
			jQuery('.change input:button').on('click', function(event) {
				var id = jQuery(this).attr('id');
				var value; 
				if(id == 'password'){
					var fields = jQuery(this).parent().parent().find('.inputField');
					if(fields[0].val() != fields[1].val()){
						this.wrongPassword = true; 
					}else{
						value = fields[0].val();
					}
				}else{
					value = jQuery(this).parent().parent().find('.inputField').val();
				}
				if(value != self.details[0][id]){
					self.changeValues(id,value);		
				}
				
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