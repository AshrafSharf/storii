import {Component,OnInit,ElementRef } from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {LogStateComponent} from '../logState/logState.component';
import {EditBarComponent} from '../editBar/editBar.component';
import { AuthenticationService }    from '../login/authentication.service';
import { AboutService }    from './about.service';
import {HttpClient}           from '../../headerfct';
import { EditBarService }    from '../editBar/editBar.service';

declare var jQuery: any;
declare var vex: any;

@Component({
  selector: 'about',
  templateUrl: `app/html/about/about.html`,
  directives: [LogStateComponent, EditBarComponent],
  styles:['a {cursor: pointer}'],
  providers:[EditBarService, AboutService,AuthenticationService,HttpClient]
  
})

export class AboutComponent implements OnInit {
	defaultStoryPic = 'app/assets/files/dummyStory.jpg';
	yellowStar = 'app/assets/files/star.png';
	halfStar = 'app/assets/files/halfstar.png';
	grayStar = 'app/assets/files/star2.png';
	storyName;
	name; 
	loggedIn; 
	storyid; 
	errorMessage;
	loggedInUser;
	rating; 
	allowed; 
	coAuthor; 
	details;
	
	constructor(
	private _elRef: ElementRef,
	private _router: Router,
	private _routeParams:RouteParams,
	private _authenticationService: AuthenticationService,
	private _aboutService: AboutService,
	private _editBarService: EditBarService) {	
	this.details = [];
	this.rating = [];
    }
	
	  ngOnInit():any {
	  	this.storyName = this._routeParams.get('storyName');	
	  	this.storyid = this._routeParams.get('id');	
	  	this.name = this._routeParams.get('name');
	 	this.loggedIn = this._authenticationService.isLoggedIn();
	 	let self = this; 
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
	 	
	
	 	this._aboutService.getStoryById(this.storyid)
	 						.subscribe((result) => {	
	      							if(jQuery.isEmptyObject(result)){
	      							 this._router.navigate(['Error']);
	      							}else if(result) { 
	      							 this._aboutService.getStoryRanking(this.storyid)
	 												.subscribe((done) => {
	 													
	 													for(var i = 0; i < parseInt(done['average_rating']); i++){
	 														self.rating[i]=this.yellowStar;
	 													}
	 													if(done['average_rating'] % 2 != 0){
	 													 	self.rating[parseInt(done['average_rating'])]=this.halfStar;	
	 														for(var j = parseInt(done['average_rating'])+1; j < 5; j++){
	 														self.rating[j]=this.grayStar;
	 														}
	 													}else{
	 														for(var j = parseInt(done['average_rating']); j < 5; j++){
	 														self.rating[j]=this.grayStar;
	 														}
	 													}
 
	 												},
                       								error => { this._router.navigate(['Error']);});	
                       								
	      							 for(var key in result['ratings']){
      							 		this._aboutService.getUserById(result['ratings'][key]['ratingUser'])
											.subscribe((found) => {
											 for(var user in result['ratings']){
											 	if(result['ratings'][user]['ratingUser'] == found['id']){
											 		console.log(found['name']);
													result['ratings'][user]['ratingUser'] = found['name'];
											 	}
											 }
												
											},
               								error => { this._router.navigate(['Error']);});	
	      							 }
	      							 
	      							 this.details.push(result);
	      							}
	      							
	      							},
                       				error => { this._router.navigate(['Error']);});
		                       
	 	
	 	
	 	//get story by id
	 	
	 	
	  }
	  
	  gotoProfile(){
	   	this._router.navigate(['Profile', { name: this.name }]);
	  }
	  
	  gotoPresentation(){
	   	this._router.navigate(['Presentation', { name: this.name, storyName: this.storyName, id: this.storyid }]);
	  }
 
}
